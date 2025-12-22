import { getStories, deleteStory } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import {
  getStoriesFromDB,
  addStoryToDB,
  deleteStoryFromDB,
  getUnsyncedStories,
  markStoryAsSynced,
  initDB,
} from "../../utils/indexeddb.js";

export default class StoriesPage {
  #stories = [];
  #filteredStories = [];
  #currentSort = "newest";
  #currentFilter = "all";
  #searchQuery = "";

  async render() {
    return `
      <section class="stories-section">
        <div class="container">
          <h1>Stories</h1>
          <div class="stories-controls">
            <button id="add-story-btn" class="add-story-button">Add New Story</button>
            <div class="view-toggle">
              <button id="list-view-btn" class="view-button active">List View</button>
              <button id="map-view-btn" class="view-button">Map View</button>
            </div>
          </div>

          <div class="stories-filters">
            <div class="filter-controls">
              <div class="search-box">
                <label for="search-input" class="sr-only">Search stories</label>
                <input type="text" id="search-input" placeholder="Search stories..." aria-label="Search stories">
                <button id="clear-search" class="clear-search-btn" aria-label="Clear search">×</button>
              </div>
              <select id="filter-select" aria-label="Filter stories">
                <option value="all">All Stories</option>
                <option value="synced">Synced Online</option>
                <option value="offline">Offline Only</option>
              </select>
              <select id="sort-select" aria-label="Sort stories">
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="name">By Name</option>
              </select>
              <button id="sync-btn" class="sync-button">Sync Offline Data</button>
            </div>
            <div id="sync-status" class="sync-status"></div>
          </div>

          <div id="list-view" class="stories-list">
            <div id="loading" class="loading">Loading stories...</div>
          </div>

          <div id="map-view" class="stories-map" style="display: none;">
            <div id="map" class="map-container"></div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    try {
      await initDB();
    } catch (error) {
      console.error("Failed to initialize IndexedDB:", error);
    }

    const addButton = document.getElementById("add-story-btn");
    const listViewBtn = document.getElementById("list-view-btn");
    const mapViewBtn = document.getElementById("map-view-btn");
    const listView = document.getElementById("list-view");
    const mapView = document.getElementById("map-view");
    const loading = document.getElementById("loading");

    const searchInput = document.getElementById("search-input");
    const clearSearchBtn = document.getElementById("clear-search");
    const filterSelect = document.getElementById("filter-select");
    const sortSelect = document.getElementById("sort-select");
    const syncBtn = document.getElementById("sync-btn");
    const syncStatus = document.getElementById("sync-status");

    addButton.addEventListener("click", () => {
      window.location.hash = "#/add-story";
    });

    listViewBtn.addEventListener("click", () => {
      listView.style.display = "block";
      mapView.style.display = "none";
      listViewBtn.classList.add("active");
      mapViewBtn.classList.remove("active");
    });

    mapViewBtn.addEventListener("click", () => {
      listView.style.display = "none";
      mapView.style.display = "block";
      mapViewBtn.classList.add("active");
      listViewBtn.classList.remove("active");
      this.#initializeMap();
    });

    searchInput.addEventListener("input", (e) => {
      this.#searchQuery = e.target.value.toLowerCase();
      this.#applyFiltersAndSort();
    });

    clearSearchBtn.addEventListener("click", () => {
      searchInput.value = "";
      this.#searchQuery = "";
      this.#applyFiltersAndSort();
    });

    filterSelect.addEventListener("change", (e) => {
      this.#currentFilter = e.target.value;
      this.#applyFiltersAndSort();
    });

    sortSelect.addEventListener("change", (e) => {
      this.#currentSort = e.target.value;
      this.#applyFiltersAndSort();
    });

    syncBtn.addEventListener("click", async () => {
      await this.#syncOfflineData(syncStatus);
    });

    try {
      await this.#loadStories();
    } catch (error) {
      loading.textContent = `Error loading stories: ${error.message}`;
      loading.className = "error";
    }

    window.addEventListener("syncCompleted", (event) => {
      const { syncedCount, errorCount } = event.detail;
      if (syncedCount > 0) {
        this.#loadStories();
      }
    });
  }

  async #loadStories() {
    const loading = document.getElementById("loading");

    try {
      const onlineStories = await getStories();

      const offlineStories = await getStoriesFromDB();

      const storyMap = new Map();

      offlineStories.forEach((story) => {
        storyMap.set(story.id, { ...story, source: "offline" });
      });

      onlineStories.forEach((story) => {
        storyMap.set(story.id, { ...story, source: "online", synced: true });
      });

      this.#stories = Array.from(storyMap.values());
      this.#applyFiltersAndSort();
    } catch (error) {
      console.error("Error loading stories:", error);
      try {
        this.#stories = await getStoriesFromDB();
        this.#applyFiltersAndSort();
      } catch (dbError) {
        loading.textContent = `Error loading stories: ${error.message}`;
        loading.className = "error";
      }
    }
  }

  #applyFiltersAndSort() {
    let filtered = [...this.#stories];

    if (this.#searchQuery) {
      filtered = filtered.filter(
        (story) =>
          story.name.toLowerCase().includes(this.#searchQuery) ||
          story.description.toLowerCase().includes(this.#searchQuery)
      );
    }

    if (this.#currentFilter === "synced") {
      filtered = filtered.filter((story) => story.synced === true);
    } else if (this.#currentFilter === "offline") {
      filtered = filtered.filter((story) => story.synced === false);
    }

    filtered.sort((a, b) => {
      switch (this.#currentSort) {
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        case "name":
          return a.name.localeCompare(b.name);
        case "newest":
        default:
          return new Date(b.createdAt) - new Date(a.createdAt);
      }
    });

    this.#filteredStories = filtered;
    this.#renderFilteredStoriesList();
  }

  #renderFilteredStoriesList() {
    const listContainer = document.getElementById("list-view");
    const storiesHtml = this.#filteredStories
      .map(
        (story) => `
      <article class="story-card" data-story-id="${story.id}">
        <img src="${story.photoUrl}" alt="${
          story.name
        }'s story" class="story-image">
        <div class="story-content">
          <div class="story-header">
            <h2>${story.name}</h2>
            <div class="story-badges">
              ${
                story.synced === false
                  ? '<span class="badge offline">Offline</span>'
                  : '<span class="badge synced">Synced</span>'
              }
            </div>
            <button class="delete-story-btn" data-story-id="${
              story.id
            }" aria-label="Delete story">
              <i data-lucide="trash-2" class="delete-icon"></i>
            </button>
          </div>
          <p class="story-description">${story.description}</p>
          <time datetime="${story.createdAt}" class="story-date">
            ${new Date(story.createdAt).toLocaleDateString()}
          </time>
        </div>
      </article>
    `
      )
      .join("");

    listContainer.innerHTML = storiesHtml || "<p>No stories found.</p>";

    this.#setupDeleteHandlers();
  }

  async #syncOfflineData(syncStatus) {
    try {
      syncStatus.textContent = "Syncing offline data...";
      syncStatus.className = "sync-status syncing";

      const unsyncedStories = await getUnsyncedStories();

      if (unsyncedStories.length === 0) {
        syncStatus.textContent = "All data is already synced!";
        syncStatus.className = "sync-status success";
        setTimeout(() => {
          syncStatus.textContent = "";
          syncStatus.className = "sync-status";
        }, 3000);
        return;
      }

      let syncedCount = 0;
      let errorCount = 0;

      for (const story of unsyncedStories) {
        try {
          await markStoryAsSynced(story.id);
          syncedCount++;
        } catch (error) {
          console.error("Failed to sync story:", story.id, error);
          errorCount++;
        }
      }

      if (syncedCount > 0) {
        await this.#loadStories();
      }

      syncStatus.textContent = `Synced ${syncedCount} stories${
        errorCount > 0 ? ` (${errorCount} failed)` : ""
      }`;
      syncStatus.className =
        errorCount === 0 ? "sync-status success" : "sync-status warning";

      setTimeout(() => {
        syncStatus.textContent = "";
        syncStatus.className = "sync-status";
      }, 5000);
    } catch (error) {
      console.error("Sync failed:", error);
      syncStatus.textContent = "Sync failed. Please try again.";
      syncStatus.className = "sync-status error";

      setTimeout(() => {
        syncStatus.textContent = "";
        syncStatus.className = "sync-status";
      }, 5000);
    }
  }

  #setupDeleteHandlers() {
    const deleteButtons = document.querySelectorAll(".delete-story-btn");
    deleteButtons.forEach((button) => {
      button.addEventListener("click", async (e) => {
        e.preventDefault();
        const storyId = button.dataset.storyId;

        if (
          confirm(
            "Are you sure you want to delete this story? This action cannot be undone."
          )
        ) {
          try {
            await deleteStory(storyId);
            await deleteStoryFromDB(storyId);
            this.#stories = this.#stories.filter(
              (story) => story.id !== storyId
            );
            this.#applyFiltersAndSort();
          } catch (error) {
            alert(`Failed to delete story: ${error.message}`);
          }
        }
      });
    });

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  async #initializeMap() {
    const mapElement = document.getElementById("map");
    if (!mapElement || mapElement._leaflet_id) {
      return;
    }

    try {
      const L = getLeaflet();

      const map = L.map("map").setView([-6.2, 106.816666], 10);

      const osmLayer = L.tileLayer(
        "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenStreetMap contributors",
          maxZoom: 19,
        }
      );

      const satelliteLayer = L.tileLayer(
        "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
        {
          attribution:
            "© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community",
          maxZoom: 19,
        }
      );

      const terrainLayer = L.tileLayer(
        "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
        {
          attribution: "© OpenTopoMap contributors",
          maxZoom: 17,
        }
      );

      const baseLayers = {
        OpenStreetMap: osmLayer,
        Satellite: satelliteLayer,
        Terrain: terrainLayer,
      };

      osmLayer.addTo(map);

      L.control.layers(baseLayers).addTo(map);

      this.#stories.forEach((story) => {
        if (story.lat && story.lon) {
          const marker = L.marker([story.lat, story.lon]).addTo(map);
          marker.bindPopup(`
            <div class="popup-content">
              <img src="${story.photoUrl}" alt="${story.name}'s story" class="popup-image">
              <h3>${story.name}</h3>
              <p>${story.description}</p>
            </div>
          `);
        }
      });

      if (this.#stories.length > 0) {
        const bounds = this.#stories
          .filter((story) => story.lat && story.lon)
          .map((story) => [story.lat, story.lon]);
        if (bounds.length > 0) {
          map.fitBounds(bounds);
        }
      }

      setTimeout(() => {
        map.invalidateSize();
      }, 100);
    } catch (error) {
      console.error("Error initializing map:", error);
      mapElement.innerHTML = "<p>Error loading map. Please try again.</p>";
    }
  }
}
