const DB_NAME = "StoryAppDB";
const DB_VERSION = 1;
const STORIES_STORE = "stories";
const SYNC_STORE = "syncQueue";

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => {
      console.error("IndexedDB error:", request.error);
      reject(request.error);
    };

    request.onsuccess = () => {
      console.log("IndexedDB initialized successfully");
      resolve(request.result);
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains(STORIES_STORE)) {
        const storiesStore = db.createObjectStore(STORIES_STORE, {
          keyPath: "id",
        });
        storiesStore.createIndex("synced", "synced", { unique: false });
        storiesStore.createIndex("createdAt", "createdAt", { unique: false });
      }

      if (!db.objectStoreNames.contains(SYNC_STORE)) {
        const syncStore = db.createObjectStore(SYNC_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        syncStore.createIndex("type", "type", { unique: false });
        syncStore.createIndex("timestamp", "timestamp", { unique: false });
      }
    };
  });
}

async function getDB() {
  if (!window.indexedDB) {
    throw new Error("IndexedDB is not supported");
  }

  return await initDB();
}

export async function addStoryToDB(story) {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORIES_STORE], "readwrite");
    const store = transaction.objectStore(STORIES_STORE);

    const storyWithMeta = {
      ...story,
      id:
        story.id ||
        `offline_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      synced: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const request = store.add(storyWithMeta);

      request.onsuccess = () => {
        console.log("Story added to IndexedDB:", storyWithMeta.id);
        resolve(storyWithMeta);
      };

      request.onerror = () => {
        console.error("Failed to add story to IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error adding story to DB:", error);
    throw error;
  }
}

export async function getStoriesFromDB() {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORIES_STORE], "readonly");
    const store = transaction.objectStore(STORIES_STORE);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        const stories = request.result || [];
        console.log("Retrieved stories from IndexedDB:", stories.length);
        resolve(stories);
      };

      request.onerror = () => {
        console.error("Failed to get stories from IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error getting stories from DB:", error);
    throw error;
  }
}

export async function getStoryFromDB(storyId) {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORIES_STORE], "readonly");
    const store = transaction.objectStore(STORIES_STORE);

    return new Promise((resolve, reject) => {
      const request = store.get(storyId);

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Failed to get story from IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error getting story from DB:", error);
    throw error;
  }
}

export async function updateStoryInDB(storyId, updates) {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORIES_STORE], "readwrite");
    const store = transaction.objectStore(STORIES_STORE);

    const existingStory = await getStoryFromDB(storyId);
    if (!existingStory) {
      throw new Error("Story not found");
    }

    const updatedStory = {
      ...existingStory,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const request = store.put(updatedStory);

      request.onsuccess = () => {
        console.log("Story updated in IndexedDB:", storyId);
        resolve(updatedStory);
      };

      request.onerror = () => {
        console.error("Failed to update story in IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error updating story in DB:", error);
    throw error;
  }
}

export async function deleteStoryFromDB(storyId) {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORIES_STORE], "readwrite");
    const store = transaction.objectStore(STORIES_STORE);

    return new Promise((resolve, reject) => {
      const request = store.delete(storyId);

      request.onsuccess = () => {
        console.log("Story deleted from IndexedDB:", storyId);
        resolve(true);
      };

      request.onerror = () => {
        console.error("Failed to delete story from IndexedDB:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error deleting story from DB:", error);
    throw error;
  }
}

export async function markStoryAsSynced(storyId) {
  try {
    return await updateStoryInDB(storyId, { synced: true });
  } catch (error) {
    console.error("Error marking story as synced:", error);
    throw error;
  }
}

export async function getUnsyncedStories() {
  try {
    const db = await getDB();
    const transaction = db.transaction([STORIES_STORE], "readonly");
    const store = transaction.objectStore(STORIES_STORE);
    const index = store.index("synced");

    return new Promise((resolve, reject) => {
      const request = index.getAll(false); // Get all stories where synced = false

      request.onsuccess = () => {
        const unsyncedStories = request.result || [];
        console.log("Retrieved unsynced stories:", unsyncedStories.length);
        resolve(unsyncedStories);
      };

      request.onerror = () => {
        console.error("Failed to get unsynced stories:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error getting unsynced stories:", error);
    throw error;
  }
}

export async function addToSyncQueue(operation) {
  try {
    const db = await getDB();
    const transaction = db.transaction([SYNC_STORE], "readwrite");
    const store = transaction.objectStore(SYNC_STORE);

    const syncItem = {
      ...operation,
      timestamp: new Date().toISOString(),
    };

    return new Promise((resolve, reject) => {
      const request = store.add(syncItem);

      request.onsuccess = () => {
        console.log("Operation added to sync queue:", request.result);
        resolve(request.result);
      };

      request.onerror = () => {
        console.error("Failed to add operation to sync queue:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error adding to sync queue:", error);
    throw error;
  }
}

export async function getPendingSyncOperations() {
  try {
    const db = await getDB();
    const transaction = db.transaction([SYNC_STORE], "readonly");
    const store = transaction.objectStore(SYNC_STORE);

    return new Promise((resolve, reject) => {
      const request = store.getAll();

      request.onsuccess = () => {
        const operations = request.result || [];
        console.log("Retrieved pending sync operations:", operations.length);
        resolve(operations);
      };

      request.onerror = () => {
        console.error("Failed to get pending sync operations:", request.error);
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error getting pending sync operations:", error);
    throw error;
  }
}

export async function removeFromSyncQueue(operationId) {
  try {
    const db = await getDB();
    const transaction = db.transaction([SYNC_STORE], "readwrite");
    const store = transaction.objectStore(SYNC_STORE);

    return new Promise((resolve, reject) => {
      const request = store.delete(operationId);

      request.onsuccess = () => {
        console.log("Operation removed from sync queue:", operationId);
        resolve(true);
      };

      request.onerror = () => {
        console.error(
          "Failed to remove operation from sync queue:",
          request.error
        );
        reject(request.error);
      };
    });
  } catch (error) {
    console.error("Error removing from sync queue:", error);
    throw error;
  }
}

export async function clearAllData() {
  try {
    const db = await getDB();
    const transaction = db.transaction(
      [STORIES_STORE, SYNC_STORE],
      "readwrite"
    );

    return new Promise((resolve, reject) => {
      const storiesStore = transaction.objectStore(STORIES_STORE);
      const syncStore = transaction.objectStore(SYNC_STORE);

      const clearStories = storiesStore.clear();
      const clearSync = syncStore.clear();

      let completed = 0;

      const checkComplete = () => {
        completed++;
        if (completed === 2) {
          console.log("All data cleared from IndexedDB");
          resolve(true);
        }
      };

      clearStories.onsuccess = checkComplete;
      clearSync.onsuccess = checkComplete;

      clearStories.onerror = () => reject(clearStories.error);
      clearSync.onerror = () => reject(clearSync.error);
    });
  } catch (error) {
    console.error("Error clearing data:", error);
    throw error;
  }
}
