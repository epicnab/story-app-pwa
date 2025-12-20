import { loginUser } from '../../../data/api.js';

export default class LoginPage {
  async render() {
    return `
      <section class="auth-section">
        <div class="auth-container">
          <h1>Login</h1>
          <form id="login-form" class="auth-form">
            <div class="form-group">
              <label for="email">Email:</label>
              <input type="email" id="email" name="email" required>
            </div>
            <div class="form-group">
              <label for="password">Password:</label>
              <input type="password" id="password" name="password" required>
            </div>
            <button type="submit" class="auth-button">Login</button>
            <p class="auth-link">Don't have an account? <a href="#/register">Register</a></p>
          </form>
          <div id="login-message" class="message" role="alert" aria-live="polite"></div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const form = document.getElementById('login-form');
    const messageDiv = document.getElementById('login-message');

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      messageDiv.textContent = 'Logging in...';

      const formData = new FormData(form);
      const userData = {
        email: formData.get('email'),
        password: formData.get('password'),
      };

      try {
        await loginUser(userData);
        messageDiv.textContent = 'Login successful! Redirecting...';
        messageDiv.className = 'message success';
        setTimeout(() => {
          window.location.hash = '#/stories';
        }, 1000);
      } catch (error) {
        messageDiv.textContent = error.message;
        messageDiv.className = 'message error';
      }
    });
  }
}
