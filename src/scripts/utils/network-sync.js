import { getUnsyncedStories, markStoryAsSynced } from './indexeddb.js';
import { addStory } from '../data/api.js';

// Network status
let isOnline = navigator.onLine;

window.addEventListener('online', () => {
  isOnline = true;
  console.log('Network is online');
  syncOfflineData();
});

window.addEventListener('offline', () => {
  isOnline = false;
  console.log('Network is offline');
});

export function getNetworkStatus() {
  return isOnline;
}

export async function syncOfflineData() {
  if (!isOnline) {
    console.log('Skipping sync - offline');
    return;
  }

  try {
    console.log('Starting automatic sync of offline data');

    const unsyncedStories = await getUnsyncedStories();

    if (unsyncedStories.length === 0) {
      console.log('No unsynced stories to sync');
      return;
    }

    let syncedCount = 0;
    let errorCount = 0;

    for (const story of unsyncedStories) {
      try {
        // Convert base64 to blob for upload
        const response = await fetch(story.photoUrl);
        const blob = await response.blob();
        const file = new File([blob], 'story-photo.jpg', { type: 'image/jpeg' });

        const formData = new FormData();
        formData.append('description', story.description);
        formData.append('photo', file);
        formData.append('lat', story.lat);
        formData.append('lon', story.lon);

        await addStory(formData);
        await markStoryAsSynced(story.id);
        syncedCount++;

        console.log(`Synced story: ${story.id}`);
      } catch (error) {
        console.error(`Failed to sync story ${story.id}:`, error);
        errorCount++;
      }
    }

    console.log(`Sync completed: ${syncedCount} synced, ${errorCount} failed`);

    // Dispatch event to notify UI of sync completion
    window.dispatchEvent(new CustomEvent('syncCompleted', {
      detail: { syncedCount, errorCount }
    }));

  } catch (error) {
    console.error('Sync failed:', error);
  }
}

// Initial sync check
if (isOnline) {
  setTimeout(syncOfflineData, 1000); // Small delay to allow app to initialize
}
