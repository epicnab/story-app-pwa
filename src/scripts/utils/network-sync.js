import { addStory } from "../data/api.js";
import {
  getUnsyncedStories,
  markStoryAsSynced,
} from "./indexeddb.js";

/**
 * Sync offline stories to API
 */
export async function syncOfflineStories() {
  const stories = await getUnsyncedStories();

  let syncedCount = 0;

  for (const story of stories) {
    try {
      const formData = new FormData();
      formData.append("description", story.description);
      formData.append(
        "photo",
        new Blob([story.photoBlob], { type: story.photoType })
      );
      formData.append("lat", story.lat);
      formData.append("lon", story.lon);

      await addStory(formData);
      await markStoryAsSynced(story.id);
      syncedCount++;
    } catch (error) {
      console.warn("Sync failed for story:", story.id);
    }
  }

  return syncedCount;
}
