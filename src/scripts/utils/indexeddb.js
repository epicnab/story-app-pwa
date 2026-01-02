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

export async function addStoryToDB(story) {
  const db = await initDB();

  return db.put(STORE_NAME, {
    ...story,
    synced: story.synced ?? false,
    createdAt: story.createdAt ?? new Date().toISOString(),
  });
}

export async function getStoriesFromDB() {
  const db = await initDB();
  return db.getAll(STORE_NAME);
}

export async function getStoryFromDB(id) {
  const db = await initDB();
  return db.get(STORE_NAME, id);
}


export async function deleteStoryFromDB(id) {
  console.log(`Deleting story from IndexedDB with ID: ${id}`);
  const db = await initDB();

  const existingStory = await db.get(STORE_NAME, id);
  console.log(`Story exists before delete:`, !!existingStory);

  const result = await db.delete(STORE_NAME, id);
  console.log(`Delete operation completed for ID: ${id}`);

  const storyAfterDelete = await db.get(STORE_NAME, id);
  console.log(`Story exists after delete:`, !!storyAfterDelete);

  return result;
}

export async function getUnsyncedStories() {
  const db = await initDB();
  const allStories = await db.getAll(STORE_NAME);
  return allStories.filter(story => story.synced === false || story.synced === undefined || story.synced === null);
}

export async function markStoryAsSynced(id) {
  const db = await initDB();
  const story = await db.get(STORE_NAME, id);

  if (story) {
    story.synced = true;
    await db.put(STORE_NAME, story);
  }
}

export async function isStoryBookmarked(storyId) {
  const db = await initDB();
  const story = await db.get(STORE_NAME, storyId);
  return story?.bookmarked === true;
}

export async function toggleBookmark(storyId) {
  const db = await initDB();
  const story = await db.get(STORE_NAME, storyId);

  if (story) {
    story.bookmarked = !story.bookmarked;
    await db.put(STORE_NAME, story);
    return story.bookmarked;
  }

  return false;
}

export async function getBookmarkedStories() {
  const db = await initDB();
  const allStories = await db.getAll(STORE_NAME);
  return allStories.filter(story => story.bookmarked === true);
}
