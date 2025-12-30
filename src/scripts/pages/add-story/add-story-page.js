import { addStory } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import { addStoryToDB, initDB } from "../../utils/indexeddb.js";

export default class AddStoryPage {
  #lat = null;
  #lon = null;

  async render() {
    return `
      <section class="add-story-section">
        <h1>Add Story</h1>

        <form class="story-form">
          <div class="form-group">
            <label for="description">Description:</label>
            <textarea
              id="description"
              placeholder="Story description"
              required
            ></textarea>
          </div>

          <div class="form-group">
            <label for="photo">Photo:</label>
            <input type="file" id="photo" accept="image/*" required />
          </div>

          <div id="map" class="location-map"></div>
          <div id="coords" class="coordinates-display">No location selected</div>

          <button type="submit" class="submit-button">Submit</button>
          <button type="button" id="cancel-btn" class="cancel-button">Cancel</button>
        </form>

        <div id="message" class="message"></div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();
    this.#initMap();
    this.#bindForm();
  }

  #initMap() {
    const L = getLeaflet();
    const map = L.map("map").setView([-6.2, 106.816666], 10);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "© OpenStreetMap contributors",
    }).addTo(map);

    let marker;

    map.on("click", (e) => {
      this.#lat = e.latlng.lat;
      this.#lon = e.latlng.lng;

      if (marker) map.removeLayer(marker);
      marker = L.marker(e.latlng).addTo(map);

      document.getElementById("coords").textContent = `${this.#lat}, ${
        this.#lon
      }`;
    });
  }

  #bindForm() {
    const form = document.querySelector(".story-form");
    const msg = document.querySelector(".message");

    document.getElementById("cancel-btn").onclick = () => {
      window.location.hash = "#/stories";
    };

    form.onsubmit = async (e) => {
      e.preventDefault();

      if (!this.#lat || !this.#lon) {
        msg.textContent = "Please select location";
        msg.classList.add("error");
        msg.classList.remove("success");
        return;
      }

      const file = document.getElementById("photo").files[0];
      const description = document.getElementById("description").value;

      const formData = new FormData();
      formData.append("description", description);
      formData.append("photo", file);
      formData.append("lat", this.#lat);
      formData.append("lon", this.#lon);

      try {
        await addStory(formData);
        msg.textContent = "Story added successfully";
        msg.classList.add("success");
        msg.classList.remove("error");
      } catch (error) {
        await addStoryToDB({
          description,
          lat: this.#lat,
          lon: this.#lon,
          photoBlob: file,
          photoType: file.type,
          synced: false,
          createdAt: new Date().toISOString(),
        });
        msg.textContent = "Offline: story saved locally";
        msg.classList.add("success");
        msg.classList.remove("error");

        if ("serviceWorker" in navigator && "SyncManager" in window) {
          const sw = await navigator.serviceWorker.ready;
          try {
            await sw.sync.register("sync-stories");
            console.log("Background sync registered");
          } catch (err) {
            console.warn("Background sync registration failed", err);
          }
        }
      }

      setTimeout(() => {
        window.location.hash = "#/stories";
      }, 1200);
    };
  }
}
