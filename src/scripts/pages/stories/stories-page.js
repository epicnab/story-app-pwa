import { getStories, deleteStory, bookmarkStory, unbookmarkStory } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import {
  getStoriesFromDB,
  deleteStoryFromDB,
  addStoryToDB,
  initDB,
  getUnsyncedStories,
  isStoryBookmarked,
  toggleBookmark,
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
            <button id="add-story-btn" class="add-story-button">Add Story</button>
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

    document.getElementById("add-story-btn").addEventListener("click", () => {
      window.location.hash = "#/add-story";
    });

    // Sync button functionality
    document.getElementById("sync-btn").addEventListener("click", () => {
      this.#syncStories();
    });

    // Debug buttons (temporary for debugging)
    const testBtn = document.createElement("button");
    testBtn.textContent = "Test API";
    testBtn.style.marginLeft = "10px";
    testBtn.onclick = () => this.#testAPI();

    const debugBtn = document.createElement("button");
    debugBtn.textContent = "Debug DB";
    debugBtn.style.marginLeft = "10px";
    debugBtn.onclick = () => this.#debugDB();

    const clearBtn = document.createElement("button");
    clearBtn.textContent = "Clear All";
    clearBtn.style.marginLeft = "10px";
    clearBtn.style.backgroundColor = "#dc2626";
    clearBtn.onclick = () => this.#clearAllStories();

    const container = document.getElementById("sync-btn").parentElement;
    container.appendChild(testBtn);
    container.appendChild(debugBtn);
    container.appendChild(clearBtn);

    await this.#updateSyncStatus();
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

    // Check bookmark status for each story
    const storiesWithBookmarks = await Promise.all(
      this.#stories.map(async (story) => {
        const isBookmarked = await isStoryBookmarked(story.id);
        return { ...story, isBookmarked };
      })
    );

    container.innerHTML = storiesWithBookmarks
      .map((story) => {
        let photoSrc = "";
        // Jika online API → gunakan photoUrl
        if (story.photoUrl) {
          photoSrc = story.photoUrl;
        }
        // Jika offline → buat URL dari photoBlob
        else if (story.photoBlob) {
          photoSrc = URL.createObjectURL(story.photoBlob);
        } else {
          photoSrc = "/images/placeholder.png"; // fallback
        }

        const createdAt = story.createdAt
          ? new Date(story.createdAt).toLocaleString()
          : "Offline";

        const isOffline = !story.photoUrl; // Stories without photoUrl are from local DB
        const badgeClass = isOffline ? 'badge offline' : 'badge synced';
        const badgeText = isOffline ? 'Offline' : 'Synced';

        return `
        <article class="story-card">
          <img src="${photoSrc}" alt="Story photo" class="story-image" />
          <div class="story-content">
            <div class="story-badges">
              <span class="${badgeClass}">${badgeText}</span>
            </div>
            <p class="story-description">${story.description || "No description"}</p>
            <small class="story-date">${createdAt}</small>
            <div class="story-actions">
              <button class="bookmark-btn ${story.isBookmarked ? 'bookmarked' : ''}" data-id="${story.id}" title="${story.isBookmarked ? 'Remove bookmark' : 'Bookmark story'}">
                <span class="bookmark-icon">${story.isBookmarked ? '⭐' : '☆'}</span> ${story.isBookmarked ? 'Bookmarked' : 'Bookmark'}
              </button>
              <button class="save-offline-btn" data-id="${story.id}" title="Save offline">
                <span class="save-icon">💾</span> Save Offline
              </button>
              <button class="delete-story-btn" data-id="${story.id}" title="Delete story">
                <span class="delete-icon">🗑️</span> Delete
              </button>
            </div>
          </div>
        </article>
      `;
      })
      .join("");

    this.#bindBookmarks();
    this.#bindSaveOffline();
    this.#bindDelete();
  }

  #bindBookmarks() {
    document.querySelectorAll(".bookmark-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const story = this.#stories.find(s => s.id == id);

        if (!story) return;

        try {
          // Try API bookmark/unbookmark first if online and story has photoUrl
          let apiSuccess = false;
          if (navigator.onLine && story.photoUrl) {
            try {
              if (story.isBookmarked) {
                await unbookmarkStory(id);
                console.log("Story unbookmarked on API");
              } else {
                await bookmarkStory(id);
                console.log("Story bookmarked on API");
              }
              apiSuccess = true;
            } catch (error) {
              console.warn("API bookmark failed:", error);
            }
          }

          // Always update local bookmark status
          const newBookmarkStatus = await toggleBookmark(id);
          console.log(`Bookmark status updated locally: ${newBookmarkStatus}`);

          // Update button appearance
          const wasBookmarked = story.isBookmarked;
          story.isBookmarked = newBookmarkStatus;

          btn.classList.toggle('bookmarked', newBookmarkStatus);
          btn.title = newBookmarkStatus ? 'Remove bookmark' : 'Bookmark story';

          const iconSpan = btn.querySelector('.bookmark-icon');
          const textSpan = btn.querySelector('span:last-child');

          if (iconSpan) {
            iconSpan.textContent = newBookmarkStatus ? '⭐' : '☆';
          }
          if (textSpan && textSpan !== iconSpan) {
            textSpan.textContent = newBookmarkStatus ? 'Bookmarked' : 'Bookmark';
          } else if (!iconSpan) {
            // Fallback if no spans found
            btn.innerHTML = `<span class="bookmark-icon">${newBookmarkStatus ? '⭐' : '☆'}</span> ${newBookmarkStatus ? 'Bookmarked' : 'Bookmark'}`;
          }

          // If API failed but we have online story, show warning
          if (!apiSuccess && story.photoUrl && navigator.onLine) {
            console.warn("Bookmark updated locally, but API sync may be needed");
          }

        } catch (error) {
          console.error("Bookmark toggle failed:", error);
          alert("Failed to update bookmark. Please try again.");
        }
      });
    });
  }

  #bindSaveOffline() {
    document.querySelectorAll(".save-offline-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const story = this.#stories.find(s => s.id == id);

        if (!story) return;

        try {
          // Check if story is already in DB
          const existingStory = await getStoriesFromDB().then(stories => stories.find(s => s.id == id));

          if (existingStory) {
            alert("Story is already saved offline");
            return;
          }

          // Fetch the image as blob if it's an online story
          let photoBlob = null;
          if (story.photoUrl) {
            const response = await fetch(story.photoUrl);
            photoBlob = await response.blob();
          }

          // Save to IndexedDB
          await addStoryToDB({
            ...story,
            photoBlob,
            synced: true, // Online stories are considered synced
          });

          alert("Story saved offline successfully");
          console.log("Story saved offline:", story.id);
        } catch (error) {
          console.error("Save offline failed:", error);
          alert("Failed to save story offline");
        }
      });
    });
  }

  #bindDelete() {
    document.querySelectorAll(".delete-story-btn").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const story = this.#stories.find(s => s.id == id);

        if (!confirm("Delete this story?")) return;

        console.log("Deleting story:", { id, story });

        // Always try to delete from local DB first (this handles both online and offline stories)
        try {
          await deleteStoryFromDB(id);
          console.log("✅ Story deleted from local DB");
        } catch (error) {
          console.error("❌ Local DB delete failed:", error);
          alert("Failed to delete story from local storage");
          return;
        }

        // For online stories, also try to delete from API
        if (navigator.onLine && story?.photoUrl) {
          try {
            await deleteStory(id);
            console.log("✅ Story also deleted from API");
          } catch (error) {
            console.warn("API delete failed (this is expected if API doesn't support deletion):", error);
          }
        }

        // Refresh the display
        await this.#loadStories();
        await this.#renderStories();
        this.#renderMap();

        console.log("Delete operation completed");
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
          .bindPopup(`<p>${story.description || "No description"}</p>`);
      }
    });
  }

  async #syncStories() {
    const syncBtn = document.getElementById("sync-btn");
    const syncStatus = document.getElementById("sync-status");

    // Disable button and show syncing status
    syncBtn.disabled = true;
    syncBtn.textContent = "Syncing...";
    syncStatus.textContent = "Syncing offline stories...";
    syncStatus.className = "sync-status syncing";

    try {
      const syncedCount = await syncOfflineStories();

      if (syncedCount > 0) {
        syncStatus.textContent = `Successfully synced ${syncedCount} stories!`;
        syncStatus.className = "sync-status success";

        // Refresh the stories list
        await this.#loadStories();
        await this.#renderStories();
        this.#renderMap();
      } else {
        syncStatus.textContent = "No offline stories to sync";
        syncStatus.className = "sync-status";
      }
    } catch (error) {
      console.error("Sync failed:", error);
      syncStatus.textContent = "Sync failed. Please try again.";
      syncStatus.className = "sync-status error";
    } finally {
      // Re-enable button
      syncBtn.disabled = false;
      syncBtn.textContent = "Sync Offline Stories";

      // Clear status after 5 seconds
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
        syncStatus.textContent = `${unsyncedStories.length} offline stories waiting to sync`;
        syncStatus.className = "sync-status warning";
        syncBtn.style.display = "inline-block";
      } else {
        syncStatus.textContent = "All stories synced";
        syncStatus.className = "sync-status success";
        syncBtn.style.display = "none";
      }
    } catch (error) {
      console.warn("Failed to check sync status:", error);
    }
  }

  async #testAPI() {
    console.log("Testing API connection...");
    try {
      const stories = await getStories();
      console.log("✅ API test successful, got", stories.length, "stories");
      alert(`API test successful! Got ${stories.length} stories.`);
    } catch (error) {
      console.error("❌ API test failed:", error);
      alert(`API test failed: ${error.message}`);
    }
  }

  async #debugDB() {
    console.log("=== DATABASE DEBUG ===");
    try {
      const db = await initDB();
      const allStories = await db.getAll("stories");
      console.log("All stories in DB:", allStories);
      console.log(`Total stories: ${allStories.length}`);

      const onlineStories = allStories.filter(s => s.photoUrl);
      const offlineStories = allStories.filter(s => !s.photoUrl);

      console.log(`Online stories: ${onlineStories.length}`);
      console.log(`Offline stories: ${offlineStories.length}`);

      const unsynced = allStories.filter(s => !s.synced);
      console.log(`Unsynced stories: ${unsynced.length}`);

      alert(`DB Debug:\nTotal: ${allStories.length}\nOnline: ${onlineStories.length}\nOffline: ${offlineStories.length}\nUnsynced: ${unsynced.length}`);
    } catch (error) {
      console.error("DB debug failed:", error);
      alert("DB debug failed: " + error.message);
    }
  }

  async #clearAllStories() {
    if (!confirm("This will delete ALL stories from local storage. Continue?")) return;

    console.log("=== CLEARING ALL STORIES ===");
    try {
      const db = await initDB();
      const allStories = await db.getAll("stories");
      console.log(`Found ${allStories.length} stories to delete`);

      for (const story of allStories) {
        await db.delete("stories", story.id);
        console.log(`Deleted story ${story.id}`);
      }

      console.log("All stories cleared");
      alert("All stories cleared from local storage");

      // Refresh display
      await this.#loadStories();
      await this.#renderStories();
      this.#renderMap();
    } catch (error) {
      console.error("Clear all failed:", error);
      alert("Failed to clear stories: " + error.message);
    }
  }
}
