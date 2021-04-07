const { validate } = require('./validator');
const { parseNewFeeds } = require('./parsers/parseNewFeeds');
const { parseNewPosts } = require('./parsers/parseNewPosts');
const { view } = require('./view');

const updatePosts = {
  id: 0,
  timer(watcher) {
    clearTimeout(this.id);

    const { feedsItems } = watcher.feeds;
    const urls = feedsItems.map((item) => item.url);

    parseNewPosts(urls, watcher).then((result) => {
      watcher.posts.postsItems = result;
      watcher.posts.state = 'render';
    });

    // make feeds inactive
    const feedsListItems = document.querySelectorAll('#feeds > ul >  li');
    [...feedsListItems].forEach((feed) => feed.classList.remove('bg-info'));

    this.id = setTimeout(() => this.timer(watcher), 5000);
  },
};

exports.app = () => {
  const state = {
    form: {
      state: 'waiting',
      validationDescription: '',
    },

    feeds: {
      state: 'waiting',
      feedsItems: [],
    },

    posts: {
      state: 'waiting',
      postsItems: [],
    },
    error: {
      state: 'waiting',
      description: '',
    },
  };

  const watcher = view(state);

  const form = document.querySelector('#rss-form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const url = formData.get('url').trim();

    validate(url, watcher)
      .then((valid) => {
        // block button
        watcher.form.state = 'loading';

        // parse and render feeds if url was valid
        if (!valid) {
          watcher.form.state = 'render';
          return false;
        }

        return parseNewFeeds(url, watcher).then(() => {
          watcher.form.state = 'render';
          watcher.feeds.state = 'render';
          watcher.posts.state = 'render';
        });
      })
      .then(() => {
        // update post every 5 seconds
        updatePosts.timer(watcher);
      })
      .catch((error) => {
        watcher.error.description = error;
        watcher.error.state = 'render';
      });
  });
};
