const onChange = require('on-change');
const { renderer } = require('./renderers/renderers');

exports.view = (state) => {
  const watcher = onChange(state, (path, value) => {
    const renderType = path.split('.')[0];
    if (value === 'render') {
      renderer[renderType](state);
    }

    if (renderType === 'form' && value === 'loading') {
      const formButton = document.querySelector('#rss-form #form-btn');
      formButton.disabled = true;
    }
  });
  return watcher;
};
