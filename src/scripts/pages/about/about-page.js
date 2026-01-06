export default class AboutPage {
  async render() {
    return `
      <section class="about-section container">
        <div class="about-header">
          <h1>About Story App</h1>
          <p class="about-subtitle">
            Your personal corner on the web to share and discover stories from every corner of the globe.
          </p>
        </div>

        <div class="about-content">
          <p>
            <strong>Story App</strong> is more than just an application; it's a community of explorers, adventurers, and storytellers. We believe that every journey has a story worth sharing. Our mission is to provide a beautiful and intuitive platform for you to document your travels, share your experiences, and connect with others through the power of storytelling.
          </p>
          <p>
            Whether you're climbing a mountain, exploring a new city, or just enjoying a local spot, Story App is your companion to capture the moment.
          </p>
        </div>

        <div class="features-section" style="padding: 40px 0; background: none;">
          <h2 style="text-align: left; margin-bottom: 30px;">Key Features</h2>
          <div class="features-grid about-features-grid">
            <div class="feature-card">
              <h3><i data-lucide="map-pin" class="feature-icon"></i> Location Stories</h3>
              <p>Share your stories with location data and see them on an interactive map.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="camera" class="feature-icon"></i> Photo Uploads</h3>
              <p>Upload photos from your gallery or capture them directly with your camera.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="map" class="feature-icon"></i> Interactive Map</h3>
              <p>Explore stories from around the world on an interactive and easy-to-use map.</p>
            </div>
            <div class="feature-card">
              <h3><i data-lucide="smartphone" class="feature-icon"></i> Responsive Design</h3>
              <p>Access your stories seamlessly on any device, whether it's a desktop, tablet, or phone.</p>
            </div>
             <div class="feature-card">
              <h3><i data-lucide="cloud-off" class="feature-icon"></i> Offline Access</h3>
              <p>Save stories for offline viewing and sync them when you're back online.</p>
            </div>
             <div class="feature-card">
              <h3><i data-lucide="bell" class="feature-icon"></i> Push Notifications</h3>
              <p>Get notified about new stories and updates to stay in the loop.</p>
            </div>
          </div>
        </div>

        <div class="about-footer">
          <p>Join our community today and start your storytelling journey!</p>
          <a href="#/register" class="cta-button">Get Started</a>
        </div>
      </section>
    `;
  }

  async afterRender() {
    if (window.lucide) {
      window.lucide.createIcons();
    }
  }
}
