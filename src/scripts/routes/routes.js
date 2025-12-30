import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import StoriesPage from "../pages/stories/stories-page";
import AddStoryPage from "../pages/add-story/add-story-page";
import StoryDetailPage from "../pages/story-detail/story-detail-page";
import OfflineStoriesPage from "../pages/offline-stories/offline-stories-page";

function requireAuth(PageClass) {
  return class extends PageClass {
    async render() {
      const token = localStorage.getItem("token");
      if (!token) {
        setTimeout(() => {
          window.location.hash = "#/login";
        }, 100);

        return `
          <section class="auth-section">
            <div class="auth-container">
              <h1>Access Denied</h1>
              <p>You need to login first to access this page.</p>
              <p>Redirecting to login page...</p>
              <p><a href="#/login">Click here if not redirected</a></p>
            </div>
          </section>
        `;
      }
      return super.render();
    }
  };
}

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/stories": new StoriesPage(),
  "/add-story": new (requireAuth(AddStoryPage))(), 
  "/story/:id": new StoryDetailPage(),
  "/offline": new OfflineStoriesPage(),
};

export default routes;
