import "../styles/styles.css";

import App from "./pages/app";
import "./utils/network-sync.js";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    // Use different path for GitHub Pages vs local development
    const swPath = window.location.hostname === 'epicnab.github.io' ? '/story-app-pwa/sw.js' : '/sw.js';

    navigator.serviceWorker.register(swPath)
      .then(registration => {
        console.log('ServiceWorker registration successful with scope: ', registration.scope);
        console.log('ServiceWorker registered at:', swPath);
      })
      .catch(err => {
        console.log('ServiceWorker registration failed: ', err);
        console.log('Attempted path:', swPath);
      });
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });
  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
  });
});
