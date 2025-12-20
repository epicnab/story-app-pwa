import { addStory } from '../../data/api.js';
import { getLeaflet } from '../../utils/map.js';
import { addStoryToDB, initDB } from '../../utils/indexeddb.js';

export default class AddStoryPage {
  constructor() {
    this._map = null;
    this._selectedLat = null;
    this._selectedLon = null;
    this._stream = null;
  }

  async render() {
    return `
      <section class="add-story-section">
        <div class="container">
          <h1>Add New Story</h1>
          <form id="add-story-form" class="story-form" enctype="multipart/form-data">
            <div class="form-group">
              <label for="description">Description:</label>
              <textarea id="description" name="description" required rows="4"></textarea>
            </div>

            <div class="form-group">
              <label for="photo">Photo:</label>
              <div class="photo-options">
                <input type="file" id="photo" name="photo" accept="image/*" required>
                <button type="button" id="camera-btn" class="camera-button">Use Camera</button>
              </div>
              <div id="camera-container" class="camera-container" style="display: none;">
                <video id="camera-video" autoplay playsinline></video>
                <canvas id="camera-canvas" style="display: none;"></canvas>
                <div class="camera-controls">
                  <button type="button" id="capture-btn">Capture</button>
                  <button type="button" id="cancel-camera-btn">Cancel</button>
                </div>
              </div>
              <img id="photo-preview" class="photo-preview" style="display: none;" alt="Photo preview">
            </div>

            <div class="form-group">
              <label for="location-map">Location (Click on map to select):</label>
              <div id="location-map" class="location-map" tabindex="0" role="img" aria-label="Interactive map for selecting location coordinates"></div>
              <div id="coordinates-display" class="coordinates-display">
                Selected: <span id="coords">None</span>
              </div>
              <p class="map-instruction">Click anywhere on the map to select coordinates for your story location.</p>
            </div>

            <button type="submit" class="submit-button">Add Story</button>
            <button type="button" id="cancel-btn" class="cancel-button">Cancel</button>
          </form>
          <div id="form-message" class="message" role="alert" aria-live="polite"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    // Initialize IndexedDB
    try {
      await initDB();
    } catch (error) {
      console.error('Failed to initialize IndexedDB:', error);
    }

    this._initializeMap();
    this._setupFormValidation();
    this._setupCamera();
    this._setupFormSubmission();
  }

  _initializeMap() {
    const mapElement = document.getElementById('location-map');
    if (!mapElement) {
      console.error('Map element not found');
      return;
    }

    mapElement.style.height = '300px';
    mapElement.style.width = '100%';

    if (this._map) {
      this._map.remove();
    }

    try {
      const L = getLeaflet();

      this._map = L.map('location-map', {
        center: [-6.2, 106.816666],
        zoom: 10,
        zoomControl: true,
        attributionControl: true
      });

      const osmLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
      });

      const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        attribution: '© Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community',
        maxZoom: 19
      });

      osmLayer.addTo(this._map);

      let marker = null;

      this._map.on('click', (e) => {
        console.log('Map clicked:', e.latlng);
        const { lat, lng } = e.latlng;
        this._selectedLat = lat;
        this._selectedLon = lng;

        if (marker) {
          this._map.removeLayer(marker);
        }

        marker = L.marker([lat, lng]).addTo(this._map);
        const coordsElement = document.getElementById('coords');
        if (coordsElement) {
          coordsElement.textContent = `${lat.toFixed(6)}, ${lng.toFixed(6)}`;
        }
      });

      setTimeout(() => {
        this._map.invalidateSize();
      }, 100);
    } catch (error) {
      console.error('Failed to initialize map:', error);
      mapElement.innerHTML = '<p>Map could not be loaded. Please refresh the page.</p>';
      return;
    }
  }

  _setupFormValidation() {
    const textarea = document.getElementById('description');
    const fileInput = document.getElementById('photo');
    const preview = document.getElementById('photo-preview');

    textarea.addEventListener('input', () => {
      if (textarea.value.trim().length < 10) {
        textarea.setCustomValidity('Description must be at least 10 characters long');
      } else {
        textarea.setCustomValidity('');
      }
    });

    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (file) {
        if (!file.type.startsWith('image/')) {
          fileInput.setCustomValidity('Please select an image file');
          return;
        }
        if (file.size > 1024 * 1024) { 
          fileInput.setCustomValidity('File size must be less than 1MB');
          return;
        }
        fileInput.setCustomValidity('');

        const reader = new FileReader();
        reader.onload = (e) => {
          preview.src = e.target.result;
          preview.style.display = 'block';
        };
        reader.readAsDataURL(file);
      }
    });
  }

  _setupCamera() {
    const cameraBtn = document.getElementById('camera-btn');
    const cameraContainer = document.getElementById('camera-container');
    const video = document.getElementById('camera-video');
    const canvas = document.getElementById('camera-canvas');
    const captureBtn = document.getElementById('capture-btn');
    const cancelBtn = document.getElementById('cancel-camera-btn');
    const fileInput = document.getElementById('photo');
    const preview = document.getElementById('photo-preview');

    cameraBtn.addEventListener('click', async () => {
      try {
        this._stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' }
        });
        video.srcObject = this._stream;
        cameraContainer.style.display = 'block';
        fileInput.style.display = 'none';
        cameraBtn.style.display = 'none';
      } catch (error) {
        alert('Camera access denied or not available');
      }
    });

    captureBtn.addEventListener('click', () => {
      const context = canvas.getContext('2d');
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      context.drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], 'camera-photo.jpg', { type: 'image/jpeg' });
        const dataTransfer = new DataTransfer();
        dataTransfer.items.add(file);
        fileInput.files = dataTransfer.files;

        preview.src = canvas.toDataURL('image/jpeg');
        preview.style.display = 'block';

        this._stopCamera();
      }, 'image/jpeg');
    });

    cancelBtn.addEventListener('click', () => {
      this._stopCamera();
    });
  }

  _stopCamera() {
    if (this._stream) {
      this._stream.getTracks().forEach(track => track.stop());
      this._stream = null;
    }
    document.getElementById('camera-container').style.display = 'none';
    document.getElementById('photo').style.display = 'block';
    document.getElementById('camera-btn').style.display = 'inline-block';
  }

  _setupFormSubmission() {
    const form = document.getElementById('add-story-form');
    const cancelBtn = document.getElementById('cancel-btn');
    const messageDiv = document.getElementById('form-message');

    cancelBtn.addEventListener('click', () => {
      window.location.hash = '#/stories';
    });

    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      if (!this._selectedLat || !this._selectedLon) {
        messageDiv.textContent = 'Please select a location on the map';
        messageDiv.className = 'message error';
        return;
      }

      messageDiv.textContent = 'Adding story...';
      messageDiv.className = 'message';

      const formData = new FormData(form);
      formData.append('lat', this._selectedLat);
      formData.append('lon', this._selectedLon);

      try {
        // Try to add story online first
        await addStory(formData);
        messageDiv.textContent = 'Story added successfully!';
        messageDiv.className = 'message success';
        setTimeout(() => {
          window.location.hash = '#/stories';
        }, 1000);
      } catch (error) {
        console.error('Failed to add story online:', error);

        // Fallback to offline storage
        try {
          messageDiv.textContent = 'Connection failed. Saving offline...';
          messageDiv.className = 'message';

          const file = formData.get('photo');
          const reader = new FileReader();

          reader.onload = async (e) => {
            const storyData = {
              name: 'Offline User', // Could be improved to get actual user name
              description: formData.get('description'),
              photoUrl: e.target.result, // Base64 encoded image
              createdAt: new Date().toISOString(),
              lat: this._selectedLat,
              lon: this._selectedLon,
            };

            try {
              await addStoryToDB(storyData);
              messageDiv.textContent = 'Story saved offline! It will sync when you\'re back online.';
              messageDiv.className = 'message success';
              setTimeout(() => {
                window.location.hash = '#/stories';
              }, 2000);
            } catch (dbError) {
              console.error('Failed to save story offline:', dbError);
              messageDiv.textContent = 'Failed to save story both online and offline. Please try again.';
              messageDiv.className = 'message error';
            }
          };

          reader.onerror = () => {
            messageDiv.textContent = 'Failed to process image. Please try again.';
            messageDiv.className = 'message error';
          };

          reader.readAsDataURL(file);

        } catch (fallbackError) {
          console.error('Offline fallback failed:', fallbackError);
          messageDiv.textContent = 'Failed to save story. Please check your connection and try again.';
          messageDiv.className = 'message error';
        }
      }
    });
  }
}
