import { addStory } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import { addStoryToDB, initDB } from "../../utils/indexeddb.js";

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

          <form id="add-story-form" enctype="multipart/form-data">
            <label>Description</label>
            <textarea id="description" required minlength="10"></textarea>

            <label>Photo</label>
            <input type="file" id="photo" accept="image/*" required />

            <button type="button" id="camera-btn">Use Camera</button>

            <div id="camera-container" style="display:none">
              <video id="camera-video" autoplay playsinline></video>
              <canvas id="camera-canvas" style="display:none"></canvas>
              <button type="button" id="capture-btn">Capture</button>
              <button type="button" id="cancel-camera-btn">Cancel</button>
            </div>

            <img id="photo-preview" style="display:none;max-width:100%" />

            <div id="location-map" style="height:300px"></div>
            <p>Selected: <span id="coords">None</span></p>

            <button type="submit">Add Story</button>
            <button type="button" id="cancel-btn">Cancel</button>
          </form>

          <div id="form-message"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();
    this._initMap();
    this._setupCamera();
    this._setupForm();
  }

  _initMap() {
    const L = getLeaflet();
    this._map = L.map("location-map").setView([-6.2, 106.8], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
    }).addTo(this._map);

    let marker = null;

    this._map.on("click", (e) => {
      this._selectedLat = e.latlng.lat;
      this._selectedLon = e.latlng.lng;

      if (marker) this._map.removeLayer(marker);
      marker = L.marker(e.latlng).addTo(this._map);

      document.getElementById(
        "coords"
      ).textContent = `${this._selectedLat.toFixed(
        6
      )}, ${this._selectedLon.toFixed(6)}`;
    });
  }

  _setupCamera() {
    const cameraBtn = document.getElementById("camera-btn");
    const container = document.getElementById("camera-container");
    const video = document.getElementById("camera-video");
    const canvas = document.getElementById("camera-canvas");
    const captureBtn = document.getElementById("capture-btn");
    const cancelBtn = document.getElementById("cancel-camera-btn");
    const fileInput = document.getElementById("photo");
    const preview = document.getElementById("photo-preview");

    cameraBtn.onclick = async () => {
      this._stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      video.srcObject = this._stream;
      container.style.display = "block";
      cameraBtn.style.display = "none";
      fileInput.style.display = "none";
    };

    captureBtn.onclick = () => {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);

      canvas.toBlob((blob) => {
        const file = new File([blob], "camera.jpg", {
          type: "image/jpeg",
        });
        const dt = new DataTransfer();
        dt.items.add(file);
        fileInput.files = dt.files;

        preview.src = URL.createObjectURL(blob);
        preview.style.display = "block";
        this._stopCamera();
      });
    };

    cancelBtn.onclick = () => this._stopCamera();
  }

  _stopCamera() {
    this._stream?.getTracks().forEach((t) => t.stop());
    document.getElementById("camera-container").style.display = "none";
    document.getElementById("camera-btn").style.display = "inline-block";
    document.getElementById("photo").style.display = "block";
  }

  _setupForm() {
    const form = document.getElementById("add-story-form");
    const msg = document.getElementById("form-message");

    document.getElementById("cancel-btn").onclick = () => {
      window.location.hash = "#/stories";
    };

    form.onsubmit = async (e) => {
      e.preventDefault();

      if (!this._selectedLat || !this._selectedLon) {
        msg.textContent = "Please select a location";
        return;
      }

      const file = document.getElementById("photo").files[0];
      const description = document.getElementById("description").value;

      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", file);
      formData.append("lat", this._selectedLat);
      formData.append("lon", this._selectedLon);

      try {
        await addStory(formData);
        msg.textContent = "Story added successfully!";
        setTimeout(() => (window.location.hash = "#/stories"), 1000);
      } catch {
        await addStoryToDB({
          description,
          lat: this._selectedLat,
          lon: this._selectedLon,
          photo: file,
        });

        msg.textContent =
          "Offline mode: story saved and will sync automatically.";
        setTimeout(() => (window.location.hash = "#/stories"), 1500);
      }
    };
  }
}
