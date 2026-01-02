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
    {
      name: "add-push-handlers",
      closeBundle() {
        const swPath = resolve(__dirname, "dist/sw.js");
        if (!fs.existsSync(swPath)) return;

        let swContent = fs.readFileSync(swPath, "utf-8");

        const pushHandlers = `
self.addEventListener('push', (event) => {
  let data = {};
  if (event.data) {
    data = event.data.json();
  }

  const options = {
    body: data.body || "New story added!",
    icon: "/story-app-pwa/images/logo.png",
    badge: "/story-app-pwa/images/logo.png",
    data: data.data || {},
    actions: [
      { action: "view", title: "View Story" },
      { action: "close", title: "Close" }
    ],
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "New Story Notification",
      options
    )
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === "view") {
    const storyId = event.notification.data?.storyId;
    event.waitUntil(
      clients.openWindow(
        storyId
          ? \`/story-app-pwa/story/\${storyId}\`
          : "/story-app-pwa/stories"
      )
    );
  }
});
`;

        swContent += pushHandlers;
        fs.writeFileSync(swPath, swContent);
        console.log("✅ Push handlers injected into service worker");
      },
    },

    VitePWA({
      registerType: "autoUpdate",
      strategies: "generateSW",
      workbox: {
        globPatterns: ["**/*.{js,css,html,ico,png,svg}"],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/story-api\.dicoding\.dev\/.*/i,
            handler: "NetworkFirst",
            options: {
              cacheName: "api-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365,
              },
            },
          },
        ],
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
        scope: "/story-app-pwa/",
        start_url: "/story-app-pwa/",
        icons: [
          {
            src: "images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "images/maskable_icon_x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
    }),
  ],
});
