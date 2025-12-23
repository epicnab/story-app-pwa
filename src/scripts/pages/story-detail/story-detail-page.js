import { getStories } from "../../data/api.js";
import {
  getStoryFromDB,
  addStoryToDB,
  deleteStoryFromDB,
  initDB,
} from "../../utils/indexeddb.js";

export default class StoryDetailPage {
  async render() {
    return `
      <section>
        <div id="story-detail">
          <p>Loading story...</p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();

    const container = document.getElementById("story-detail");
    const id = window.location.hash.split("/").pop();

    try {
      const stories = await getStories();
      const story = stories.find((s) => s.id === id);

      if (story) {
        await addStoryToDB({ ...story, synced: true });
        this.#renderStory(container, story);
        return;
      }

      throw new Error("Not found online");
    } catch (error) {
      const offlineStory = await getStoryFromDB(id);

      if (offlineStory) {
        this.#renderStory(container, offlineStory);
      } else {
        container.innerHTML = "<p>Story not found</p>";
      }
    }
  }

  #renderStory(container, story) {
    container.innerHTML = `
      <article>
        <img src="${story.photoUrl}" alt="${story.name}" />
        <h1>${story.name}</h1>
        <p>${story.description}</p>
        <small>${new Date(story.createdAt).toLocaleString()}</small>
      </article>
    `;
  }
}
