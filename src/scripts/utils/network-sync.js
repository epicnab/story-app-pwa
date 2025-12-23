for (const story of unsyncedStories) {
  try {
    // photoBlob disimpan langsung dari IndexedDB
    const file = new File([story.photoBlob], "story-photo.jpg", {
      type: story.photoType || "image/jpeg",
    });

    const formData = new FormData();
    formData.append("description", story.description);
    formData.append("photo", file);
    formData.append("lat", story.lat);
    formData.append("lon", story.lon);

    await addStory(formData);
    await markStoryAsSynced(story.id);
    syncedCount++;

    console.log(`Synced story: ${story.id}`);
  } catch (error) {
    console.error(`Failed to sync story ${story.id}:`, error);
    errorCount++;
  }
}
