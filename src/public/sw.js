importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/6.4.1/workbox-sw.js"
);

const { registerRoute } = workbox.routing;
const { NetworkFirst } = workbox.strategies;
const { ExpirationPlugin } = workbox.expiration;

registerRoute(
  /^https:\/\/story-api\.dicoding\.dev\/.*/i,
  new NetworkFirst({
    cacheName: "api-cache",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 60 * 60 * 24 * 365, 
      }),
    ],
  })
);

self.addEventListener("push", function (event) {
  console.log("Push received: ", event);

  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || "New story added!",
    icon: data.icon || "/favicon.png",
    badge: "/favicon.png",
    vibrate: [100, 50, 100],
    data: data.data || {},
    actions: [
      {
        action: "view",
        title: "View Story",
        icon: "/favicon.png",
      },
      {
        action: "close",
        title: "Close",
      },
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "New Story Notification",
      options
    )
  );
});

self.addEventListener("notificationclick", function (event) {
  console.log("Notification click received: ", event);

  event.notification.close();

  if (event.action === "view") {
    const storyId = event.notification.data?.storyId;
    if (storyId) {
      event.waitUntil(clients.openWindow(`/#/story/${storyId}`));
    } else {
      event.waitUntil(clients.openWindow("/#/stories"));
    }
  } else if (event.action === "close") {
  } else {
    event.waitUntil(clients.openWindow("/#/stories"));
  }
});

self.addEventListener("sync", function (event) {
  console.log("Background sync triggered: ", event.tag);

  if (event.tag === "background-sync-stories") {
    event.waitUntil(syncStories());
  }
});

async function syncStories() {
  try {
    const stories = await getStoriesFromIndexedDB();

    for (const story of stories) {
      if (!story.synced) {
        try {
          await addStoryToAPI(story);
          await markStoryAsSynced(story.id);
        } catch (error) {
          console.error("Failed to sync story:", error);
        }
      }
    }
  } catch (error) {
    console.error("Background sync failed:", error);
  }
}

async function getStoriesFromIndexedDB() {
  return [];
}

async function addStoryToAPI(story) {
  return Promise.resolve();
}

async function markStoryAsSynced(storyId) {
  return Promise.resolve();
}
