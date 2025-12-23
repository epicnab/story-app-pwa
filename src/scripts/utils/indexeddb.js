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
   CREATE
====================== */
export async function addStoryToDB(story) {
  const db = await initDB();
  return db.add(STORE_NAME, {
    ...story,
    synced: false,
    createdAt: new Date().toISOString(),
  });
}

/* ======================
   READ (INI YANG ERROR)
====================== */
export async function getStoriesFromDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
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
