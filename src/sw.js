import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { skipWaiting, clientsClaim } from "workbox-core";

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

registerRoute(
  ({ url }) => url.origin === "https://story-api.dicoding.dev",
  new NetworkFirst({
    cacheName: "dicoding-story-api",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 30,
      }),
    ],
  })
);

/* =====================
   Background Sync
===================== */
self.addEventListener("sync", (event) => {
  if (event.tag === "sync-stories") {
    event.waitUntil(
      (async () => {
        try {
          const module = await import("/scripts/utils/network-sync.js");
          const { syncOfflineStories } = module;
          const count = await syncOfflineStories();
          console.log(`Background Sync: ${count} story(s) synced`);
        } catch (err) {
          console.error("Background sync failed", err);
        }
      })()
    );
  }
});

/* =====================
   Push Notification
===================== */
self.addEventListener("push", (event) => {
  console.log("Service Worker: PUSH");

  let data;
  try {
    data = event.data.json();
  } catch (error) {
    console.error("Service Worker: Failed to parse push data", error);
    data = { title: "New Notification", options: { body: "Something new happened!" } };
  }

  const title = data.title || "New Notification";
  const options = {
    body: data.options?.body || "Something new happened!",
    icon: "/story-app-pwa/images/icon-192x192.png",
    badge: "/story-app-pwa/images/icon-96x96.png",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
    ...data.options,
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/#/stories"));
});
