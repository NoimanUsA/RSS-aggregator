import i18next from 'i18next';
import parseNewFeeds from './parsers/parseNewFeeds';
import parseNewPosts from './parsers/parseNewPosts';
import view from './view';
import ru from '../locales/ru';

const updatePosts = {
  id: 0,
  timer(watcher) {
    const { feedsItems } = watcher.feeds;
    const { postsItems } = watcher.posts;
    const urls = feedsItems.map((item) => item.url);

    parseNewPosts(urls, watcher)
      .then((result) => {
        if (result.length === postsItems.length) {
          return false;
        }
        watcher.posts.postsItems = result;
        watcher.posts.state = 'render';
        return true;
      })
      .then(() => {
        watcher.posts.state = 'waiting';
      });

    // make feeds inactive
    const feedsListItems = document.querySelectorAll('#feeds > ul >  li');
    [...feedsListItems].forEach((feed) => feed.classList.remove('bg-info'));

    clearTimeout(this.id);
    this.id = setTimeout(() => this.timer(watcher), 5000);
  },
};

export default () => {
  const state = {
    form: {
      state: 'loading',
      validationDescription: '',
    },

    feeds: {
      state: '',
      feedsItems: [],
    },

    posts: {
      state: '',
      postsItems: [],
    },
  };

  const i18n = i18next.createInstance();
  i18n.init({
    lng: 'ru',
    debug: true,
    resources: {
      ru,
    },
  });

  const watcher = view(state, i18n);

  const form = document.querySelector('#rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const input = form.querySelector('.form-control');
    const url = input.value.trim();
    input.readOnly = true;
    watcher.form.state = 'load';

    parseNewFeeds(url, state).then((response) => {
      watcher.form.state = 'render';
      if (!response) {
        return false;
      }

      watcher.feeds.state = 'render';
      watcher.posts.state = 'render';
      return true;
    })
      .then(() => {
        updatePosts.timer(watcher);
      })
      .catch((error) => {
        console.log(error, state);
        state.form.validationDescription = 'netError';
        watcher.form.state = 'render';
      });
  });
};
