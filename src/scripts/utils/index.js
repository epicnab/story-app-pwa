import App from "./views/app";

const app = new App({
  content: document.querySelector("#app"),
  drawerButton: document.querySelector("#drawer-button"),
  navigationDrawer: document.querySelector("#navigation-drawer"),
});

window.addEventListener("hashchange", () => {
  app.renderPage();
});

window.addEventListener("load", () => {
  app.renderPage();
});
