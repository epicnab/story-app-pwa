import { addStory } from "../../data/api.js";
import { getLeaflet } from "../../utils/map.js";
import { addStoryToDB, initDB } from "../../utils/indexeddb.js";

export default class AddStoryPage {
  #lat = null;
  #lon = null;

  async render() {
    return `
      <section class="add-story">
        <h1>Add Story</h1>

        <form id="story-form">
          <textarea
            id="description"
            placeholder="Story description"
            required
          ></textarea>

          <input type="file" id="photo" accept="image/*" required />

          <div id="map" style="height:300px"></div>
          <p id="coords">No location selected</p>

          <button type="submit">Submit</button>
          <button type="button" id="cancel-btn">Cancel</button>
        </form>

        <p id="message"></p>
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

      document.getElementById(
        "coords"
      ).textContent = `${this.#lat}, ${this.#lon}`;
    });
  }

  #bindForm() {
    const form = document.getElementById("story-form");
    const msg = document.getElementById("message");

    document.getElementById("cancel-btn").onclick = () => {
      window.location.hash = "#/stories";
    };

    form.onsubmit = async (e) => {
      e.preventDefault();

      if (!this.#lat || !this.#lon) {
        msg.textContent = "Please select location";
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
      } catch (error) {
        await addStoryToDB({
          description,
          lat: this.#lat,
          lon: this.#lon,
          photoBlob: file,
          photoType: file.type,
          synced: false,
        });
        msg.textContent = "Offline: story saved locally";
      }

      setTimeout(() => {
        window.location.hash = "#/stories";
      }, 1200);
    };
  }
}
