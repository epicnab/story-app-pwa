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
self.addEventListener('push', (event) => {
  console.log('Service worker pushing...');
  async function chainPromise() {
    const data = await event.data.json();
    await self.registration.showNotification(data.title, {
      body: data.options.body,
    });
  }
  event.waitUntil(chainPromise());
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/#/stories"));
});
