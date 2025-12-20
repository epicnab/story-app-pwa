import '../styles/styles.css';

import App from './pages/app';
import { initPushNotification } from './utils/push-notification.js';
import './utils/network-sync.js';

document.addEventListener('DOMContentLoaded', async () => {
  const app = new App({
    content: document.querySelector('#main-content'),
    drawerButton: document.querySelector('#drawer-button'),
    navigationDrawer: document.querySelector('#navigation-drawer'),
  });
  await app.renderPage();

  window.addEventListener('hashchange', async () => {
    await app.renderPage();
  });

  // Initialize push notifications
  initPushNotification();
});
