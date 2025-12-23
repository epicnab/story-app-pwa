import { getStories, deleteStory } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import {
  getStoriesFromDB,
  deleteStoryFromDB,
  initDB,
} from "../../utils/indexeddb.js";

export default class StoriesPage {
  #stories = [];

  async render() {
    return `
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>

          <button id="add-story-btn">Add Story</button>

          <div id="stories-list">Loading...</div>

          <div id="map" style="height:400px; margin-top:20px"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();

    document
      .getElementById("add-story-btn")
      .addEventListener("click", () => {
        window.location.hash = "#/add-story";
      });

    await this.#loadStories();
    this.#renderStories();
    this.#renderMap();
  }

  async #loadStories() {
    try {
      this.#stories = await getStories();
    } catch (error) {
      console.warn("Offline mode → load from IndexedDB");
      this.#stories = await getStoriesFromDB();
    }
  }

  #renderStories() {
    const container = document.getElementById("stories-list");

    if (this.#stories.length === 0) {
      container.innerHTML = "<p>No stories available</p>";
      return;
    }

    container.innerHTML = this.#stories
      .map(
        (story) => `
        <article class="story-card">
          <img src="${story.photoUrl}" alt="Story photo" />
          <p>${story.description}</p>
          <small>${new Date(story.createdAt).toLocaleString()}</small>
          <button class="delete-btn" data-id="${story.id}">Delete</button>
        </article>
      `
      )
      .join("");

    this.#bindDelete();
  }

  #bindDelete() {
    document.querySelectorAll(".delete-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;

        if (!confirm("Delete this story?")) return;

        try {
          await deleteStory(id);
        } catch (error) {
          console.warn("Delete online failed, deleting offline");
        }

        await deleteStoryFromDB(id);
        await this.#loadStories();
        this.#renderStories();
        this.#renderMap();
      });
    });
  }

  #renderMap() {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;

    const L = getLeaflet();
    const map = L.map(mapEl).setView([-6.2, 106.816666], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    this.#stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<p>${story.description}</p>`);
      }
    });
  }
}
