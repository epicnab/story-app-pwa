import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { skipWaiting, clientsClaim } from "workbox-core";

skipWaiting();
clientsClaim();

precacheAndRoute(self.__WB_MANIFEST);

// Runtime caching untuk Dicoding Story API
registerRoute(
  ({ url }) => url.origin === "https://story-api.dicoding.dev",
  new NetworkFirst({
    cacheName: "dicoding-story-api",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 20,
        maxAgeSeconds: 60 * 60 * 24 * 30, // 30 hari
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
          // Path harus sesuai folder publik
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
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch {
      data = { title: "Story App", body: event.data.text() };
    }
  }

  const options = {
    body: data.body || "Ada story baru 🎉",
    icon: "/images/logo.png",
    badge: "/images/logo.png",
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "Story App", options)
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(clients.openWindow("/#/stories"));
});
