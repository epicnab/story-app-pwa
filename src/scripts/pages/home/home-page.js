export default class HomePage {
  async render() {
    return `
      <section class="hero-section">
        <div class="container">
          <h1>Welcome to Story App</h1>
          <p>Share your travel stories and discover amazing places around the world.</p>
          <div class="hero-actions">
            <a href="#/stories" class="cta-button">View Stories</a>
            <a href="#/login" class="cta-button secondary">Login</a>
            <a href="#/register" class="cta-button secondary">Register</a>
          </div>
        </div>
      </section>

      <section class="settings-section">
        <div class="container">
          <h2>App Settings</h2>
          <div class="settings-grid">
            <div class="setting-card" id="push-notification-card">
              <h3><i data-lucide="bell" class="setting-icon"></i> Push Notifications</h3>
              <p id="push-description">Receive notifications when new stories are added.</p>
              <div class="setting-toggle" id="push-toggle-container">
                <label class="switch">
                  <input type="checkbox" id="push-notification-toggle">
                  <span class="slider round"></span>
                </label>
                <span class="toggle-status" id="push-status">Disabled</span>
              </div>
              <div class="login-required" id="login-required-message" style="display: none;">
                <p class="login-prompt">Please <a href="#/login">login</a> first to enable push notifications.</p>
              </div>
            </div>
            <div class="setting-card" id="pwa-install-card" style="display: none;">
              <h3><i data-lucide="download" class="setting-icon"></i> Install App</h3>
              <p>Install this app on your device for a better experience.</p>
              <button class="install-button" id="install-button">
                <i data-lucide="smartphone" class="button-icon"></i>
                Install App
              </button>
            </div>
          </div>
        </div>
      </section>

      <section class="features-section">
        <div class="container">
          <h2>Features</h2>
          <div class="features-grid">
            <div class="feature-card">
              <h3><i data-lucide="map-pin" class="feature-icon"></i> Location Stories</h3>
              <p>Share your stories with location data and see them on an interactive map.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="camera" class="feature-icon"></i> <span class="title-text">Photo<br>Upload</span></h3>
              <p>Upload photos from your gallery or capture directly with your camera.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="map" class="feature-icon"></i> Interactive Maps</h3>
              <p>Explore stories on an interactive map with multiple view options.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="smartphone" class="feature-icon"></i> Responsive Design</h3>
              <p>Access your stories seamlessly across all devices.</p>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    if (window.lucide) {
      window.lucide.createIcons();
    }

    // Initialize push notifications for this page
    const { initPushNotification } = await import("../../utils/push-notification.js");
    await initPushNotification();

    // Initialize PWA install functionality
    const { initPWAInstall, canInstallPWA, showInstallPrompt } = await import("../../utils/pwa-install.js");
    initPWAInstall();

    this.initPushNotificationToggle();
    this.initPWAInstall();
  }

  async initPushNotificationToggle() {
    const toggleContainer = document.getElementById("push-toggle-container");
    const toggle = document.getElementById("push-notification-toggle");
    const status = document.getElementById("push-status");
    const loginRequiredMessage = document.getElementById("login-required-message");

    if (!toggleContainer || !toggle || !status || !loginRequiredMessage) return;

    // Check if user is logged in
    const token = localStorage.getItem("token");
    const isLoggedIn = !!token;

    if (!isLoggedIn) {
      // Hide toggle and show login required message
      toggleContainer.style.display = "none";
      loginRequiredMessage.style.display = "block";
      return;
    }

    // User is logged in, show toggle and initialize push notifications
    toggleContainer.style.display = "flex";
    loginRequiredMessage.style.display = "none";

    const { isPushNotificationEnabled, togglePushNotification } = await import(
      "../../utils/push-notification.js"
    );

    toggle.checked = isPushNotificationEnabled();
    status.textContent = toggle.checked ? "Enabled" : "Disabled";

    toggle.addEventListener("change", async () => {
      try {
        status.textContent = "Processing...";
        toggle.disabled = true;

        const isEnabled = await togglePushNotification();
        toggle.checked = isEnabled;
        status.textContent = isEnabled ? "Enabled" : "Disabled";

        console.log("Push notification toggle successful, enabled:", isEnabled);
      } catch (error) {
        console.error("Failed to toggle push notifications:", error);
        toggle.checked = !toggle.checked; // Revert toggle state

        // Show specific error message
        let errorMessage = "Failed to toggle push notifications.";
        if (error.message.includes("VAPID key")) {
          errorMessage += " Please check your internet connection.";
        } else if (error.message.includes("permission")) {
          errorMessage += " Please allow notifications in your browser.";
        } else if (error.message.includes("token")) {
          errorMessage += " Please login again.";
        } else {
          errorMessage += " Please try again.";
        }

        alert(errorMessage);
        status.textContent = "Disabled";
      } finally {
        toggle.disabled = false;
      }
    });
  }

  async initPWAInstall() {
    const installCard = document.getElementById("pwa-install-card");
    const installButton = document.getElementById("install-button");

    if (!installCard || !installButton) return;

    const { canInstallPWA, showInstallPrompt, isPWAInstallable } = await import("../../utils/pwa-install.js");

    // Check if PWA can be installed
    if (canInstallPWA()) {
      installCard.style.display = "block";
    }

    // Listen for PWA install availability
    window.addEventListener('pwa-installable', (event) => {
      if (event.detail.installable) {
        installCard.style.display = "block";
      }
    });

    // Handle install button click
    installButton.addEventListener("click", async () => {
      try {
        const installed = await showInstallPrompt();
        if (installed) {
          installCard.style.display = "none";
          console.log("PWA installed successfully");
        }
      } catch (error) {
        console.error("Failed to install PWA:", error);
      }
    });

    // Hide install card after successful installation
    window.addEventListener('pwa-installed', () => {
      installCard.style.display = "none";
    });
  }
}
