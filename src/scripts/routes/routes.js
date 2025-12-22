import HomePage from "../pages/home/home-page";
import AboutPage from "../pages/about/about-page";
import LoginPage from "../pages/auth/login/login-page";
import RegisterPage from "../pages/auth/register/register-page";
import StoriesPage from "../pages/stories/stories-page";
import AddStoryPage from "../pages/add-story/add-story-page";
import StoryDetailPage from "../pages/story-detail/story-detail-page";

const routes = {
  "/": new HomePage(),
  "/about": new AboutPage(),
  "/login": new LoginPage(),
  "/register": new RegisterPage(),
  "/stories": new StoriesPage(),
  "/add-story": new AddStoryPage(),
  "/story/:id": new StoryDetailPage(),
};

export default routes;
