import { getStories } from "../../data/api.js";
import {
  getStoryFromDB,
  addStoryToDB,
  deleteStoryFromDB,
  initDB,
} from "../../utils/indexeddb.js";
import { getLeaflet } from "../../utils/map.js";

export default class StoryDetailPage {
  #story = null;
  #isSaved = false;

  async render() {
    return `
      <section class="story-detail-section">
        <div id="story-detail-container" class="container">
          <p>Loading story...</p>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();

    const id = window.location.hash.split("/").pop();
    let storyData = null;

    try {
      // Try to fetch from API first
      const stories = await getStories();
      storyData = stories.find((s) => s.id === id);

      if (!storyData) {
        throw new Error("Story not found in API response");
      }
    } catch (e) {
      console.warn("Could not fetch story from API, trying IndexedDB...", e.message);
    }

    // If API fails or story not found, try DB
    if (!storyData) {
      storyData = await getStoryFromDB(id);
    }

    if (storyData) {
      this.#story = storyData;
      // Check if the story is saved in DB
      const savedStory = await getStoryFromDB(id);
      this.#isSaved = !!savedStory;

      this.#renderPage();
      this.#bindSaveButton();
    } else {
      document.getElementById("story-detail-container").innerHTML = "<p>Story not found anywhere.</p>";
    }
  }

  #renderPage() {
    const container = document.getElementById("story-detail-container");
    if (!this.#story) {
      container.innerHTML = "<p>Story not found.</p>";
      return;
    }

    const { name, description, photoUrl, createdAt, lat, lon } = this.#story;
    
    let photoSrc = photoUrl;
    if (!photoSrc && this.#story.photoBlob) {
        photoSrc = URL.createObjectURL(this.#story.photoBlob);
    }

    container.innerHTML = `
      <article class="story-detail-card">
        <img src="${photoSrc}" alt="Story photo for ${name}" class="story-detail-image" />
        <div class="story-detail-content">
          <h1 class="story-detail-title">${name}</h1>
          <p class="story-detail-description">${description}</p>
          <small class="story-detail-date">Posted on: ${new Date(createdAt).toLocaleString()}</small>
          
          <div class="story-detail-actions">
            <button id="save-toggle-btn" class="cta-button">
              ${this.#isSaved ? "Remove from Offline" : "Save for Offline"}
            </button>
          </div>
        </div>
      </article>
      ${lat && lon ? '<div id="story-map" style="height:300px; margin-top: 20px;"></div>' : ''}
    `;

    if (lat && lon) {
      this.#renderMap(lat, lon);
    }
  }

  #bindSaveButton() {
    const saveBtn = document.getElementById("save-toggle-btn");
    if (!saveBtn) return;

    saveBtn.addEventListener("click", async () => {
      saveBtn.disabled = true;
      saveBtn.textContent = "Processing...";

      try {
        if (this.#isSaved) {
          // It's currently saved, so we remove it
          await deleteStoryFromDB(this.#story.id);
          this.#isSaved = false;
          saveBtn.textContent = "Save for Offline";
          alert("Story removed from offline storage.");
        } else {
          // It's not saved, so we save it
          let storyToSave = { ...this.#story };

          // If it's an online story, fetch the image as a blob
          if (storyToSave.photoUrl && !storyToSave.photoBlob) {
            const response = await fetch(storyToSave.photoUrl);
            const blob = await response.blob();
            storyToSave.photoBlob = blob;
          }

          await addStoryToDB(storyToSave);
          this.#isSaved = true;
          saveBtn.textContent = "Remove from Offline";
          alert("Story saved for offline access.");
        }
      } catch (error) {
        console.error("Failed to toggle save state:", error);
        alert("Operation failed. Please try again.");
        // Revert button state
        saveBtn.textContent = this.#isSaved ? "Remove from Offline" : "Save for Offline";
      } finally {
        saveBtn.disabled = false;
      }
    });
  }

  #renderMap(lat, lon) {
    const L = getLeaflet();
    if (!L) return;

    const mapEl = document.getElementById("story-map");
    if (!mapEl) return;

    const map = L.map(mapEl).setView([lat, lon], 13);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    L.marker([lat, lon]).addTo(map)
      .bindPopup(this.#story.name)
      .openPopup();
  }
}