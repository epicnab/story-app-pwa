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
            <div class="setting-card">
              <h3><i data-lucide="bell" class="setting-icon"></i> Push Notifications</h3>
              <p>Receive notifications when new stories are added.</p>
              <div class="setting-toggle">
                <label class="switch">
                  <input type="checkbox" id="push-notification-toggle">
                  <span class="slider round"></span>
                </label>
                <span class="toggle-status" id="push-status">Disabled</span>
              </div>
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

    this.initPushNotificationToggle();
  }

  async initPushNotificationToggle() {
    const toggle = document.getElementById("push-notification-toggle");
    const status = document.getElementById("push-status");

    if (!toggle || !status) return;

    const { isPushNotificationEnabled, togglePushNotification } = await import(
      "../../utils/push-notification.js"
    );

    toggle.checked = isPushNotificationEnabled();
    status.textContent = toggle.checked ? "Enabled" : "Disabled";

    toggle.addEventListener("change", async () => {
      try {
        const isEnabled = await togglePushNotification();
        toggle.checked = isEnabled;
        status.textContent = isEnabled ? "Enabled" : "Disabled";
      } catch (error) {
        console.error("Failed to toggle push notifications:", error);
        toggle.checked = !toggle.checked;
      }
    });
  }
}
