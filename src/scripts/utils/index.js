import "../styles/styles.css";

import App from "./pages/app";
import "./utils/network-sync.js";

// ==============================
// SERVICE WORKER REGISTRATION
// ==============================
if ("serviceWorker" in navigator) {
  window.addEventListener("load", async () => {
    try {
      const swPath = `${import.meta.env.BASE_URL}sw.js`;

      const registration = await navigator.serviceWorker.register(swPath);

      console.log("✅ ServiceWorker registered");
      console.log("📍 Scope:", registration.scope);
      console.log("📄 Script:", swPath);
    } catch (error) {
      console.error("❌ ServiceWorker registration failed:", error);
    }
  });
}

// ==============================
// NAVIGATION
// ==============================
function updateNavigation() {
  const navList = document.getElementById("nav-list");
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  let navItems = "";

  navItems += '<li><a href="#/">Beranda</a></li>';
  navItems += '<li><a href="#/about">About</a></li>';

  if (isLoggedIn) {
    navItems += '<li><a href="#/stories">Stories</a></li>';
    navItems += '<li><a href="#/add-story">Add Story</a></li>';
    navItems += '<li><a href="#/offline">Offline Stories</a></li>';
    navItems +=
      '<li><a id="logout-btn" href="#/" style="cursor: pointer; color: #dc2626;">Logout</a></li>';
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

// ==============================
// APP INIT
// ==============================
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
});
