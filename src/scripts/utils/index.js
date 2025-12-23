import App from "./views/app";

// Init App
const app = new App({
  content: document.querySelector("#app"),
  drawerButton: document.querySelector("#drawer-button"),
  navigationDrawer: document.querySelector("#navigation-drawer"),
});

// Handle SPA navigation
window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
});
