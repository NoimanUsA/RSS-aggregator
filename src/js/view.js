import onChange from 'on-change';
import renderer from './renderers/renderers';

export default (state) => {
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
