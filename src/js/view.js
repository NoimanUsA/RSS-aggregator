const onChange = require('on-change');
const {
  renderForm, renderFeed, renderError, renderPosts,
} = require('./renderer');

exports.view = (state) => {
  const watcher = onChange(state, (path, value) => {
    if (path === 'error') {
      renderError(value);
    }

    if (path === 'form.state' && value === 'render') {
      renderForm(state.form);
    }

    if (path === 'feed.state') {
      if (value === 'renderFeed') {
        renderFeed(state.feed);
      }
      if (value === 'renderPosts') {
        renderPosts(state.feed);
      }
    }
  });

  return watcher;
};
