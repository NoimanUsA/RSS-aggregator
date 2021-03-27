const { validate } = require('./validator');
const { parser } = require('./parser');
const { view } = require('./view');

const makeFeedActive = () => {
  const feedsList = document.querySelectorAll('#feeds li');
  const postsList = document.querySelectorAll('#posts  ul');

  feedsList.forEach((feedsListItem) => {
    feedsListItem.addEventListener('click', (e) => {
      const { currentTarget } = e;
      const { feedId } = currentTarget.dataset;

      postsList.forEach((item) => (item.dataset.feedId === feedId ? item.classList.remove('d-none') : item.classList.add('d-none')));

      feedsList.forEach((item) => item.classList.remove('bg-info'));
      currentTarget.classList.add('bg-info');
    });
  });
};

exports.app = () => {
  const state = {
    form: {
      state: 'waiting',
      descriptionColor: '',
      validationDescription: '',
    },

    feed: {
      feedLinks: new Set(),
      state: 'waiting',
      feeds: [],
      posts: [],
    },
    error: '',
  };

  const watcher = view(state);
  const form = document.querySelector('#rss-form');

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const url = formData.get('url');

    validate(url, state)
      .then((valid) => {
        // render form by valid type.
        state.form.descriptionColor = valid ? 'text-success' : 'text-danger';
        watcher.form.state = 'render';

        // parse and render feeds if url was valid
        if (!valid) return false;

        const { feed } = state;
        return parser(url, feed);
      })
      .then(() => {
        watcher.feed.state = 'renderFeed';
        watcher.feed.state = 'renderPosts';

        // show needed posts on click
        makeFeedActive();
      })
      .catch((error) => {
        watcher.error = error;
      });
  });
};
