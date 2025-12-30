import { getStoriesFromDB, deleteStoryFromDB } from '../../utils/indexeddb.js';

export default class OfflineStoriesPage {
  async render() {
    return `
      <section class="stories-section">
        <div class="container">
          <h1>Offline Stories</h1>
          <div id="offline-stories-list" class="stories-list">
            <div class="loading">Loading offline stories...</div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    const storiesList = document.getElementById('offline-stories-list');
    await this.renderStories(storiesList);
  }

  async renderStories(container) {
    try {
      const stories = await getStoriesFromDB();
      if (stories.length > 0) {
        container.innerHTML = stories.map(story => this.renderStoryCard(story)).join('');
      } else {
        container.innerHTML = '<p>No stories saved for offline viewing.</p>';
      }

      this.addDeleteEventListeners();
    } catch (error) {
      console.error('Error rendering offline stories:', error);
      container.innerHTML = '<p>Error loading offline stories.</p>';
    }
  }

  renderStoryCard(story) {
    let photoSrc = "";
    if (story.photoBlob) {
      photoSrc = URL.createObjectURL(story.photoBlob);
    } else if (story.photoUrl) {
      photoSrc = story.photoUrl;
    } else {
      photoSrc = "/images/placeholder.png";
    }

    return `
      <div class="story-card" id="story-${story.id}">
        <img src="${photoSrc}" alt="Story photo" class="story-image">
        <div class="story-content">
          <p class="story-description">${story.description || "No description"}</p>
          <div class="story-meta">
            <time datetime="${story.createdAt}">${new Date(story.createdAt).toLocaleDateString()}</time>
            <button class="delete-button" data-id="${story.id}">Delete</button>
            <button class="save-button" data-id="${story.id}" ${story.synced ? 'disabled' : ''}>${story.synced ? 'Synced' : 'Save Offline'}</button>
          </div>
        </div>
      </div>
    `;
  }

  addDeleteEventListeners() {
    const deleteButtons = document.querySelectorAll('.delete-button');
    deleteButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        const storyId = event.target.dataset.id;
        if (confirm('Are you sure you want to delete this offline story?')) {
          try {
            await deleteStoryFromDB(storyId);
            const storyCard = document.getElementById(`story-${storyId}`);
            if (storyCard) {
              storyCard.remove();
            }
            const storiesList = document.getElementById('offline-stories-list');
            if (storiesList.childElementCount === 0) {
              storiesList.innerHTML = '<p>No stories saved for offline viewing.</p>';
            }
          } catch (error) {
            console.error('Error deleting offline story:', error);
            alert('Failed to delete offline story.');
          }
        }
      });
    });
  }
}
