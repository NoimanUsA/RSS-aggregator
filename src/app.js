import i18next from 'i18next';
import rssParser from './parsers/feedParser';
import view from './utils/view';
import ru from '../locales/ru';
import postsUpdater from './utils/postsUpdater';
import validate from './utils/validator';

export default () => {
  const state = {
    form: {
      state: '',
      validationDescription: '',
    },

    feeds: {
      state: '',
      feedsItems: [],
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
    watcher.form.state = 'loading';

    validate(url, state).then((isValid) => {
      if (!isValid) {
        watcher.form.state = 'rendering';
        return false;
      }

      return rssParser(url, state).then((feedsAndPosts) => {
        const newFeed = feedsAndPosts.feed;
        const newPosts = feedsAndPosts.posts;
        const { feedsItems } = state.feeds;
        const { postsItems } = state.feeds;

        state.feeds.feedsItems = [newFeed, ...feedsItems];
        state.feeds.postsItems = [...newPosts, ...postsItems];

        watcher.form.state = 'rendering';
        watcher.feeds.state = 'rendering';
        return true;
      })
        .then(() => {
          postsUpdater.timer(watcher);
        })
        .catch((error) => {
          if (error.isAxiosError) {
            state.form.validationDescription = 'netError';
          } else {
            state.form.validationDescription = 'isntRss';
          }
          watcher.form.state = 'rendering';
          watcher.feeds.state = 'waiting';
        });
    });
  });
};
