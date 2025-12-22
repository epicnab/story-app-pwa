import { registerUser } from "../../../data/api.js";

export default class RegisterPage {
  async render() {
    return `
      <section class="auth-section">
        <div class="auth-container">
          <h1>Register</h1>
          <form id="register-form" class="auth-form">
            <div class="form-group">
              <label for="name">Name:</label>
              <input type="text" id="name" name="name" required>
            </div>
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required minlength="8">
            </div>
            <button type="submit" class="auth-button">Register</button>
            <p class="auth-link">Already have an account? <a href="#/login">Login</a></p>
          </form>
          <div id="register-message" class="message" role="alert" aria-live="polite"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById("register-form");
    const messageDiv = document.getElementById("register-message");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      messageDiv.textContent = "Registering...";

      const formData = new FormData(form);
      const userData = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
      };

      try {
        await registerUser(userData);
        messageDiv.textContent = "Registration successful! Please login.";
        messageDiv.className = "message success";
        setTimeout(() => {
          window.location.hash = "#/login";
        }, 2000);
      } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.className = "message error";
      }
    });
  }
}
