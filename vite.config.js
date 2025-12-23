import { defineConfig } from "vite";
import { resolve } from "path";
import { VitePWA } from "vite-plugin-pwa";
import fs from "fs";

export default defineConfig({
  base: "/story-app-pwa/",
  root: resolve(__dirname, "src"),
  publicDir: resolve(__dirname, "src", "public"),
  build: {
    outDir: resolve(__dirname, "dist"),
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": resolve(__dirname, "src"),
    },
  },
  plugins: [
    // Plugin to add push notification handlers after build
    {
      name: 'add-push-handlers',
      closeBundle() {
        // Read the generated service worker
        const swPath = resolve(__dirname, 'dist/sw.js');
        if (fs.existsSync(swPath)) {
          let swContent = fs.readFileSync(swPath, 'utf-8');

          // Add push notification handlers before the final closing
          const pushHandlers = `
self.addEventListener('push', function(event) {
  console.log('Push received: ', event);

  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || "New story added!",
    icon: data.icon || "/images/logo.png",
    badge: "/images/logo.png",
    vibrate: [100, 50, 100],
    data: data.data || {},
    actions: [
      {
        action: "view",
        title: "View Story",
        icon: "/images/logo.png",
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

self.addEventListener('notificationclick', function(event) {
  console.log('Notification click received: ', event);

  event.notification.close();

  if (event.action === 'view') {
    const storyId = event.notification.data?.storyId;
    if (storyId) {
      event.waitUntil(clients.openWindow(\`/story/\${storyId}\`));
    } else {
      event.waitUntil(clients.openWindow('/stories'));
    }
  } else if (event.action === 'close') {
    // Do nothing
  } else {
    event.waitUntil(clients.openWindow('/stories'));
  }
});`;

          // Insert push handlers before the final closing parenthesis and semicolon
          swContent = swContent.replace(/\)\s*;?\s*$/, pushHandlers + '\n});');

          fs.writeFileSync(swPath, swContent);
          console.log('Push notification handlers added to service worker');
        }
      },
    },
    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/story-api\.dicoding\.dev\/.*/i,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
        additionalManifestEntries: [
          {
            url: '/sw.js',
            revision: null,
          },
        ],
        // Add push notification handlers
        importScripts: [],
        clientsClaim: true,
        skipWaiting: true,
      },
      injectRegister: null,
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "Story App",
        short_name: "StoryApp",
        description: "A Progressive Web App for sharing stories",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        orientation: "portrait",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/images/logo.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/images/logo.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "/images/logo.png",
            sizes: "192x192",
            type: "image/png",
            purpose: "maskable",
          },
          {
            src: "/images/logo.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
