import { getStoriesFromDB, deleteStoryFromDB, initDB } from '../../utils/indexeddb.js';

export default class OfflineStoriesPage {
  async render() {
    return `
      <section class="stories-section">
        <div class="container">
          <h1>Offline Stories</h1>
          <p>These are the stories you have saved for offline access.</p>
          <div id="offline-stories-list" class="stories-list">
            <div class="loading">Loading offline stories...</div>
          </div>
        </div>
      </section>
    `;
  }

  async afterRender() {
    await initDB();
    const storiesListContainer = document.getElementById('offline-stories-list');
    await this.#renderOfflineStories(storiesListContainer);
  }

  async #renderOfflineStories(container) {
    try {
      const stories = await getStoriesFromDB();
      if (stories.length > 0) {
        container.innerHTML = stories.map(story => this.#renderStoryCard(story)).join('');
        this.#bindRemoveButtons();
      } else {
        container.innerHTML = '<p class="empty-message">No stories saved for offline viewing yet.</p>';
      }
    } catch (error) {
      console.error('Error rendering offline stories:', error);
      container.innerHTML = '<p class="error-message">Error loading offline stories. Please try again.</p>';
    }
  }

  #renderStoryCard(story) {
    let photoSrc = "";
    if (story.photoBlob) {
      photoSrc = URL.createObjectURL(story.photoBlob);
    } else if (story.photoUrl) {
      // Fallback to URL if blob is missing for some reason
      photoSrc = story.photoUrl;
    } else {
      photoSrc = "/images/placeholder.png";
    }

    const createdAt = story.createdAt ? new Date(story.createdAt).toLocaleString() : "Unknown date";
    const isOfflinePost = story.id.startsWith?.('offline_');
    const badgeClass = isOfflinePost ? 'badge offline' : 'badge synced';
    const badgeText = isOfflinePost ? 'Waiting for Sync' : 'Saved Online Story';

    return `
      <article class="story-card" id="story-${story.id}">
        <img src="${photoSrc}" alt="Story photo" class="story-image" loading="lazy">
        <div class="story-content">
          <a href="#/story/${story.id}" class="story-link">
            <div class="story-badges">
              <span class="${badgeClass}">${badgeText}</span>
            </div>
            <p class="story-description">${story.description || "No description"}</p>
            <small class="story-date">${createdAt}</small>
          </a>
          <div class="story-actions">
            <button class="remove-offline-btn cta-button" data-id="${story.id}">
              Remove from Offline
            </button>
          </div>
        </div>
      </article>
    `;
  }

  #bindRemoveButtons() {
    document.querySelectorAll('.remove-offline-btn').forEach(button => {
      button.addEventListener('click', async (event) => {
        const storyId = event.target.dataset.id;
        if (confirm('Are you sure you want to remove this story from your offline storage?')) {
          try {
            await deleteStoryFromDB(storyId);
            const storyCard = document.getElementById(`story-${storyId}`);
            if (storyCard) {
              storyCard.remove();
            }
            
            // Check if the list is now empty
            const storiesList = document.getElementById('offline-stories-list');
            if (storiesList.childElementCount === 0) {
              storiesList.innerHTML = '<p class="empty-message">No stories saved for offline viewing yet.</p>';
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