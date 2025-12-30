import { addStory } from "../data/api.js";
import { getUnsyncedStories, markStoryAsSynced } from "./indexeddb.js";

/**
 * Sync offline stories ke API
 */
export async function syncOfflineStories() {
  const stories = await getUnsyncedStories();
  console.log(`Found ${stories.length} unsynced stories to sync`);

  let syncedCount = 0;

  for (const story of stories) {
    try {
      console.log(`Syncing story ${story.id}...`);

      const token = localStorage.getItem("token");
      if (!token) {
        console.warn(`No auth token found, skipping story ${story.id}`);
        continue;
      }

      let file;
      if (story.photoBlob instanceof Blob) {
        file = new File([story.photoBlob], `story-${story.id}.jpg`, {
          type: story.photoType || 'image/jpeg',
        });
        console.log(`Created file from Blob for story ${story.id}:`, file.name, file.type, file.size);
      } else {
        console.error(`Invalid photoBlob for story ${story.id}:`, typeof story.photoBlob);
        continue;
      }

      const formData = new FormData();
      formData.append("description", story.description);
      formData.append("photo", file);
      formData.append("lat", story.lat);
      formData.append("lon", story.lon);

      console.log(`Sending story ${story.id} to API...`);
      await addStory(formData);
      await markStoryAsSynced(story.id);
      syncedCount++;
      console.log(`✅ Story ${story.id} synced successfully`);
    } catch (error) {
      console.error(`❌ Sync failed for story ${story.id}:`, error);
    }
  }

  console.log(`Sync completed: ${syncedCount} stories synced successfully`);
  return syncedCount;
}
