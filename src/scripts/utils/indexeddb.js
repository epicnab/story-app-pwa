const DB_NAME = "StoryAppDB";
const DB_VERSION = 2; // ⬅️ NAIKKAN VERSION
const STORIES_STORE = "stories";
const SYNC_STORE = "syncQueue";

export async function initDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onerror = () => reject(request.error);

    request.onsuccess = () => resolve(request.result);

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (db.objectStoreNames.contains(STORIES_STORE)) {
        db.deleteObjectStore(STORIES_STORE);
      }

      const storiesStore = db.createObjectStore(STORIES_STORE, {
        keyPath: "id",
      });

      storiesStore.createIndex("synced", "synced", { unique: false });
      storiesStore.createIndex("createdAt", "createdAt", { unique: false });

      if (!db.objectStoreNames.contains(SYNC_STORE)) {
        const syncStore = db.createObjectStore(SYNC_STORE, {
          keyPath: "id",
          autoIncrement: true,
        });
        syncStore.createIndex("type", "type", { unique: false });
      }
    };
  });
}

async function getDB() {
  return await initDB();
}

export async function addStoryToDB(story) {
  const db = await getDB();
  const tx = db.transaction(STORIES_STORE, "readwrite");
  const store = tx.objectStore(STORIES_STORE);

  const data = {
    id: `offline_${Date.now()}`,
    description: story.description,
    lat: story.lat,
    lon: story.lon,

    // 🔥 INI YANG PENTING
    photoBlob: story.photo,
    photoType: story.photo.type,

    synced: false,
    createdAt: new Date().toISOString(),
  };

  store.add(data);
  return data;
}

export async function getUnsyncedStories() {
  const db = await getDB();
  const tx = db.transaction(STORIES_STORE, "readonly");
  const store = tx.objectStore(STORIES_STORE);
  const index = store.index("synced");

  return new Promise((resolve) => {
    index.getAll(IDBKeyRange.only(false)).onsuccess = (e) =>
      resolve(e.target.result || []);
  });
}

export async function markStoryAsSynced(id) {
  const db = await getDB();
  const tx = db.transaction(STORIES_STORE, "readwrite");
  const store = tx.objectStore(STORIES_STORE);

  const story = await store.get(id);
  story.synced = true;
  store.put(story);
}
