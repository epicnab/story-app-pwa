import { getStories } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import {
  getStoriesFromDB,
  deleteStoryFromDB,
  addStoryToDB,
  initDB,
  getUnsyncedStories,
} from "../../utils/indexeddb.js";
import { syncOfflineStories } from "../../utils/network-sync.js";

export default class StoriesPage {
  #stories = [];

  async render() {
    return `
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>

          <div class="stories-controls">
            <a href="#/add-story" class="add-story-button">Add Story</a>
            <a href="#/offline" class="add-story-button secondary">View Offline Stories</a>
            <div class="stories-filters">
              <div class="sync-controls">
                <button id="sync-btn" class="sync-button">Sync Offline Stories</button>
                <div id="sync-status" class="sync-status"></div>
              </div>
            </div>
          </div>

          <div id="stories-list">Loading...</div>

          <div id="map" style="height:400px; margin-top:20px"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();

    document.getElementById("sync-btn").addEventListener("click", () => {
      this.#syncStories();
    });

    await this.#updateSyncStatus();
    await this.#loadAndRender();
  }
  
  async #loadAndRender() {
    await this.#loadStories();
    await this.#renderStories();
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

  async #renderStories() {
    const container = document.getElementById("stories-list");

    if (!this.#stories || this.#stories.length === 0) {
      container.innerHTML = "<p>No stories available</p>";
      return;
    }

    const savedStories = await getStoriesFromDB();
    const savedStoryIds = new Set(savedStories.map(s => s.id));

    container.innerHTML = this.#stories
      .map((story) => {
        const isSaved = savedStoryIds.has(story.id);

        let photoSrc = story.photoUrl;
        if (!photoSrc && story.photoBlob) {
          photoSrc = URL.createObjectURL(story.photoBlob);
        } else if (!photoSrc) {
          photoSrc = "/images/placeholder.png"; 
        }

        const createdAt = story.createdAt
          ? new Date(story.createdAt).toLocaleString()
          : "Just now";

        const isOfflinePost = story.id.startsWith?.('offline_');
        const badgeClass = isOfflinePost ? 'badge offline' : 'badge synced';
        const badgeText = isOfflinePost ? 'Waiting for Sync' : 'Synced';
        
        return `
        <article class="story-card" id="story-${story.id}">
          <img src="${photoSrc}" alt="Story photo" class="story-image" loading="lazy" />
          <div class="story-content">
            <a href="#/story/${story.id}" class="story-link">
              <div class="story-badges">
                <span class="${badgeClass}">${badgeText}</span>
              </div>
              <p class="story-description">${story.description || "No description"}</p>
              <small class="story-date">${createdAt}</small>
            </a>
            <div class="story-actions">
              <button class="save-toggle-btn cta-button" data-id="${story.id}">
                ${isSaved ? 'Remove from Offline' : 'Save for Offline'}
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    this.#bindSaveToggleButtons();
  }

  #bindSaveToggleButtons() {
    document.querySelectorAll(".save-toggle-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const story = this.#stories.find(s => s.id == id);
        if (!story) return;

        btn.disabled = true;
        btn.textContent = "Processing...";

        const isSaved = btn.textContent.includes('Remove');

        try {
            if (isSaved) {
                await deleteStoryFromDB(id);
                btn.textContent = 'Save for Offline';
                alert('Story removed from offline storage.');
            } else {
                let storyToSave = { ...story };
                if (story.photoUrl && !story.photoBlob) {
                    const response = await fetch(story.photoUrl);
                    storyToSave.photoBlob = await response.blob();
                }
                await addStoryToDB(storyToSave);
                btn.textContent = 'Remove from Offline';
                alert('Story saved for offline access.');
            }
        } catch (error) {
            console.error('Failed to toggle save state:', error);
            alert('Operation failed. Please try again.');
            btn.textContent = isSaved ? 'Remove from Offline' : 'Save for Offline';
        } finally {
            btn.disabled = false;
        }

      });
    });
  }

  #renderMap() {
    const mapEl = document.getElementById("map");
    if (!mapEl) return;

    const L = getLeaflet();
    if (!L) return;

    const map = L.map(mapEl).setView([-6.2, 106.816666], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    this.#stories.forEach((story) => {
      if (story.lat && story.lon) {
        L.marker([story.lat, story.lon])
          .addTo(map)
          .bindPopup(`<p><a href="#/story/${story.id}">${story.description || "Story"}</a></p>`);
      }
    });
  }

  async #syncStories() {
    const syncBtn = document.getElementById("sync-btn");
    const syncStatus = document.getElementById("sync-status");

    syncBtn.disabled = true;
    syncBtn.textContent = "Syncing...";
    syncStatus.textContent = "Syncing offline stories...";
    syncStatus.className = "sync-status syncing";

    try {
      const syncedCount = await syncOfflineStories();

      if (syncedCount > 0) {
        syncStatus.textContent = `Successfully synced ${syncedCount} stories!`;
        syncStatus.className = "sync-status success";
        
        // Reload everything to show fresh data
        await this.#loadAndRender();

      } else {
        syncStatus.textContent = "No offline stories to sync";
        syncStatus.className = "sync-status";
      }
    } catch (error) {
      console.error("Sync failed:", error);
      syncStatus.textContent = "Sync failed. Please try again.";
      syncStatus.className = "sync-status error";
    } finally {
      syncBtn.disabled = false;
      syncBtn.textContent = "Sync Offline Stories";
      await this.#updateSyncStatus(); // Update status text after sync
      setTimeout(() => {
        syncStatus.textContent = "";
        syncStatus.className = "sync-status";
      }, 5000);
    }
  }

  async #updateSyncStatus() {
    try {
      const unsyncedStories = await getUnsyncedStories();
      const syncStatus = document.getElementById("sync-status");
      const syncBtn = document.getElementById("sync-btn");

      if (unsyncedStories.length > 0) {
        syncStatus.textContent = `${unsyncedStories.length} stories waiting to sync`;
        syncStatus.className = "sync-status warning";
        syncBtn.style.display = "inline-block";
      } else {
        syncBtn.style.display = "none";
        syncStatus.textContent = "";
      }
    } catch (error) {
      console.warn("Failed to check sync status:", error);
    }
  }
}