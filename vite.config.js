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
    VitePWA({
      strategies: "injectManifest",
      swSrc: "src/sw.js",
      swDest: "dist/sw.js",
      registerType: "autoUpdate",
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
            src: "/story-app-pwa/images/icon-48x48.png",
            sizes: "48x48",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-72x72.png",
            sizes: "72x72",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-96x96.png",
            sizes: "96x96",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-128x128.png",
            sizes: "128x128",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-144x144.png",
            sizes: "144x144",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-152x152.png",
            sizes: "152x152",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-192x192.png",
            sizes: "192x192",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-256x256.png",
            sizes: "256x256",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-384x384.png",
            sizes: "384x384",
            type: "image/png"
          },
          {
            src: "/story-app-pwa/images/icon-512x512.png",
            sizes: "512x512",
            type: "image/png"
          }
        ],
        screenshots: [
          {
            src: "/story-app-pwa/images/app.png",
            sizes: "640x480",
            type: "image/png",
            form_factor: "wide",
            label: "Story App Screenshot"
          },
          {
            src: "/story-app-pwa/images/app.png",
            sizes: "320x480",
            type: "image/png",
            form_factor: "narrow",
            label: "Story App Screenshot"
          }
        ],
      },
    }),
  ],
});
