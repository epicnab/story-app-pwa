import routes from '../routes/routes';
import { getActiveRoute } from '../routes/url-parser';

const pageTitles = {
  "/": "Home | Story App",
  "/about": "About Us | Story App",
  "/login": "Login | Story App",
  "/register": "Register | Story App",
  "/stories": "All Stories | Story App",
  "/add-story": "Add a New Story | Story App",
  "/story/:id": "Story Details | Story App",
  "/offline": "Offline Stories | Story App",
};

class App {
  #content = null;
  #drawerButton = null;
  #navigationDrawer = null;

  constructor({ navigationDrawer, drawerButton, content }) {
    this.#content = content;
    this.#drawerButton = drawerButton;
    this.#navigationDrawer = navigationDrawer;

    this.#setupDrawer();
  }

  #setupDrawer() {
    this.#drawerButton.addEventListener('click', () => {
      this.#navigationDrawer.classList.toggle('open');
    });

    document.body.addEventListener('click', (event) => {
      if (
        !this.#navigationDrawer.contains(event.target) &&
        !this.#drawerButton.contains(event.target)
      ) {
        this.#navigationDrawer.classList.remove('open');
      }

      this.#navigationDrawer.querySelectorAll('a').forEach((link) => {
        if (link.contains(event.target)) {
          this.#navigationDrawer.classList.remove('open');
        }
      });
    });
  }

  async renderPage() {
    const url = getActiveRoute();
    const page = routes[url];

    document.title = pageTitles[url] || "Story App";

    if ('startViewTransition' in document) {
      await document.startViewTransition(async () => {
        this.#content.innerHTML = await page.render();
        await page.afterRender();
      }).finished;
    } else {
      this.#content.innerHTML = await page.render();
      await page.afterRender();
    }
  }
}

export default App;
