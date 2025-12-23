import { openDB } from "idb";

const DB_NAME = "story-app-db";
const DB_VERSION = 1;
const STORE_NAME = "stories";

let dbPromise = null;

export async function initDB() {
  if (!dbPromise) {
    dbPromise = openDB(DB_NAME, DB_VERSION, {
      upgrade(db) {
        if (!db.objectStoreNames.contains(STORE_NAME)) {
          const store = db.createObjectStore(STORE_NAME, {
            keyPath: "id",
            autoIncrement: true,
          });
          store.createIndex("synced", "synced");
        }
      },
    });
  }
  return dbPromise;
}

/* ======================
   CREATE / UPDATE
====================== */
export async function addStoryToDB(story) {
  const db = await initDB();

  return db.put(STORE_NAME, {
    ...story,
    synced: story.synced ?? false,
    createdAt: story.createdAt ?? new Date().toISOString(),
  });
}

/* ======================
   READ (ALL)
====================== */
export async function getStoriesFromDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

/* ======================
   READ (SINGLE) ✅ FIX ERROR BUILD
====================== */
export async function getStoryFromDB(id) {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}

/* ======================
   DELETE
====================== */
export async function deleteStoryFromDB(id) {
  const db = await initDB();
  return db.delete(STORE_NAME, id);
}

/* ======================
   SYNC HELPERS
====================== */
export async function getUnsyncedStories() {
  const db = await initDB();
  return db.getAllFromIndex(STORE_NAME, "synced", false);
}

export async function markStoryAsSynced(id) {
  const db = await initDB();
  const story = await db.get(STORE_NAME, id);

  if (story) {
    story.synced = true;
    await db.put(STORE_NAME, story);
  }
}
