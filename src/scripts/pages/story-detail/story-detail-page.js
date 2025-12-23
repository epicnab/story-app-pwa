import { getStories } from "../../data/api.js";
import {
  getStoryFromDB,
  addStoryToDB,
  deleteStoryFromDB,
} from "../../utils/indexeddb.js";
import { getLeaflet } from "../../utils/map.js";

export default class StoryDetailPage {
  constructor() {
    this.storyId = null;
    this.story = null;
  }

  async render() {
    const hash = window.location.hash;
    const match = hash.match(/#\/story\/([^\/]+)/);
    if (!match) {
      return "<p>Invalid story URL</p>";
    }
    this.storyId = match[1];

    return `
      <section class="story-detail-section">
        <div class="container">
          <div class="detail-actions">
            <button id="back-btn" class="back-button">← Back to Stories</button>
            <button id="save-offline-btn" class="save-button" style="display: none;">Save for Offline</button>
            <button id="delete-offline-btn" class="delete-button" style="display: none;">Delete Offline Story</button>
          </div>
          <div id="story-content" class="story-content">
            <div class="loading">Loading story...</div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const backBtn = document.getElementById("back-btn");
    const storyContent = document.getElementById("story-content");
    const saveOfflineBtn = document.getElementById("save-offline-btn");
    const deleteOfflineBtn = document.getElementById("delete-offline-btn");

    backBtn.addEventListener("click", () => {
      window.location.hash = "#/stories";
    });

    try {
      try {
        const stories = await getStories();
        this.story = stories.find((s) => s.id === this.storyId);
      } catch (error) {
        console.log("API not available, trying IndexedDB");
      }

      if (!this.story) {
        this.story = await getStoryFromDB(this.storyId);
      }

      if (this.story) {
        storyContent.innerHTML = this.#renderStory(this.story);
        this.#initializeMap(this.story);

        const offlineStory = await getStoryFromDB(this.story.id);
        if (offlineStory) {
          deleteOfflineBtn.style.display = "block";
          saveOfflineBtn.style.display = "none";
        } else {
          saveOfflineBtn.style.display = "block";
          deleteOfflineBtn.style.display = "none";
        }
      } else {
        storyContent.innerHTML = "<p>Story not found</p>";
      }
    } catch (error) {
      console.error("Error loading story:", error);
      storyContent.innerHTML = "<p>Error loading story</p>";
    }

    saveOfflineBtn.addEventListener("click", async () => {
      if (this.story) {
        try {
          await addStoryToDB(this.story);
          alert("Story saved for offline viewing!");
          deleteOfflineBtn.style.display = "block";
          saveOfflineBtn.style.display = "none";
        } catch (error) {
          console.error("Error saving story offline:", error);
          alert("Failed to save story offline.");
        }
      }
    });

    deleteOfflineBtn.addEventListener("click", async () => {
      if (this.story) {
        try {
          await deleteStoryFromDB(this.story.id);
          alert("Offline story deleted.");
          saveOfflineBtn.style.display = "block";
          deleteOfflineBtn.style.display = "none";
        } catch (error) {
          console.error("Error deleting offline story:", error);
          alert("Failed to delete offline story.");
        }
      }
    });
  }

  #renderStory(story) {
    return `
      <article class="story-detail">
        <header class="story-header">
          <h1>${story.name}</h1>
          <div class="story-meta">
            <time datetime="${story.createdAt}">${new Date(
      story.createdAt
    ).toLocaleDateString()}</time>
            ${
              story.synced === false
                ? '<span class="badge offline">Offline</span>'
                : ""
            }
          </div>
        </header>

        <div class="story-image-container">
          <img src="${story.photoUrl}" alt="${
      story.name
    }'s story" class="story-detail-image">
        </div>

        <div class="story-description">
          <p>${story.description}</p>
        </div>

        ${
          story.lat && story.lon
            ? `
          <div class="story-location">
            <h3>Location</h3>
            <div id="story-map" class="story-map"></div>
            <p class="coordinates">Coordinates: ${story.lat}, ${story.lon}</p>
          </div>
        `
            : ""
        }
      </article>
    `;
  }

  async #initializeMap(story) {
    if (!story.lat || !story.lon) return;

    const mapElement = document.getElementById("story-map");
    if (!mapElement) return;

    mapElement.style.height = "300px";
    mapElement.style.width = "100%";

    try {
      const L = getLeaflet();

      const map = L.map("story-map").setView([story.lat, story.lon], 15);

      const osmLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }
      );

      osmLayer.addTo(map);

      const marker = L.marker([story.lat, story.lon]).addTo(map);
      marker.bindPopup(
        `<strong>${story.name}</strong><br>${story.description}`
      );

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    } catch (error) {
      console.error("Error initializing map:", error);
      mapElement.innerHTML = "<p>Error loading map</p>";
    }
  }
}
