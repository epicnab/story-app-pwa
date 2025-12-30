import "../styles/styles.css";

import App from "./pages/app";
import { syncOfflineStories } from "./utils/network-sync.js";

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
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

function updateNavigation() {
  const navList = document.getElementById("nav-list");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  let navItems = '';

  navItems += '<li><a href="#/">Beranda</a></li>';
  navItems += '<li><a href="#/about">About</a></li>';

  if (isLoggedIn) {
    navItems += '<li><a href="#/stories">Stories</a></li>';
    navItems += '<li><a href="#/add-story">Add Story</a></li>';
    navItems += '<li><a href="#/offline">Offline Stories</a></li>';
    navItems += '<li><a id="logout-btn" href="#/" style="cursor: pointer; color: #dc2626;">Logout</a></li>';
  } else {
    navItems += '<li><a href="#/stories">Stories</a></li>';
    navItems += '<li><a href="#/login">Login</a></li>';
    navItems += '<li><a href="#/register">Register</a></li>';
  }

  navList.innerHTML = navItems;

  if (isLoggedIn) {
    const logoutBtn = document.getElementById("logout-btn");
    if (logoutBtn) {
      logoutBtn.addEventListener("click", (e) => {
        e.preventDefault();
        localStorage.removeItem("token");
        updateNavigation(); 
        window.location.hash = "#/"; 
      });
    }
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  const app = new App({
    content: document.querySelector("#main-content"),
    drawerButton: document.querySelector("#drawer-button"),
    navigationDrawer: document.querySelector("#navigation-drawer"),
  });

  updateNavigation();

  await app.renderPage();

  window.addEventListener("hashchange", async () => {
    await app.renderPage();
    updateNavigation();
  });

  let isOnline = navigator.onLine;

  async function handleNetworkChange(online) {
    if (online && !isOnline) {
      console.log("Network back online, syncing offline stories...");
      try {
        const syncedCount = await syncOfflineStories();
        if (syncedCount > 0) {
          console.log(`Successfully synced ${syncedCount} stories`);

          if (window.location.hash === "#/stories" || window.location.hash === "#/offline") {
            await app.renderPage();
          }
        }
      } catch (error) {
        console.warn("Auto-sync failed:", error);
      }
    }
    isOnline = online;
  }

  async function initialSyncCheck() {
    if (navigator.onLine) {
      console.log("Checking for unsynced stories on app load...");
      try {
        const syncedCount = await syncOfflineStories();
        if (syncedCount > 0) {
          console.log(`Successfully synced ${syncedCount} stories on app load`);

          if (window.location.hash === "#/stories" || window.location.hash === "#/offline") {
            await app.renderPage();
          }
        }
      } catch (error) {
        console.warn("Initial sync failed:", error);
      }
    }
  }

  window.addEventListener("online", () => handleNetworkChange(true));
  window.addEventListener("offline", () => handleNetworkChange(false));

  document.addEventListener("visibilitychange", () => {
    if (!document.hidden && navigator.onLine && !isOnline) {
      handleNetworkChange(true);
    }
  });

  await initialSyncCheck();
});
