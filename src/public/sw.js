import { precacheAndRoute } from "workbox-precaching";
import { registerRoute } from "workbox-routing";
import { NetworkFirst } from "workbox-strategies";
import { ExpirationPlugin } from "workbox-expiration";
import { skipWaiting, clientsClaim } from "workbox-core";

/**
 * Activate new service worker immediately
 */
skipWaiting();
clientsClaim();

/**
 * Precache build assets
 */
precacheAndRoute(self.__WB_MANIFEST);

/**
 * Runtime caching for Dicoding Story API
 */
registerRoute(
  ({ url }) =>
    url.origin === "https://story-api.dicoding.dev",
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

/**
 * Push Notification Handler
 */
self.addEventListener("push", (event) => {
  let data = {};

  if (event.data) {
    try {
      data = event.data.json();
    } catch (e) {
      data = { title: "Story App", body: event.data.text() };
    }
  }

  const options = {
    body: data.body || "Ada story baru 🎉",
    icon: "/images/logo.png",
    badge: "/images/logo.png",
    data: data.data || {},
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Story App",
      options
    )
  );
});

/**
 * Notification click handler
 */
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  event.waitUntil(
    clients.openWindow("/#/stories")
  );
});
