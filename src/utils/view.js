import onChange from 'on-change';
import renderer from '../renderers/renderers';

export default (state, i18n) => {
  const watcher = onChange(state, (path, value) => {
    const statePath = path.split('.')[0];
    if (statePath === 'feeds') {
      switch (value) {
        case 'rendering':
          renderer.feeds(state, i18n);
          renderer.posts(state, i18n);
          break;
        case 'updatingPosts':
          renderer.posts(state, i18n);
          break;
        default: break;
      }
    }

    if (statePath === 'form') {
      const formButton = document.querySelector('#form-btn');
      const formLine = document.querySelector('#form-line');
      switch (value) {
        case 'loading':
          formButton.disabled = true;
          formLine.value = '';
          formLine.setAttribute('readonly', true);
          break;
        case 'rendering':
          renderer.form(state, i18n);
          formButton.disabled = false;
          formLine.removeAttribute('readonly');
          break;
        default: break;
      }
    }
  });
  return watcher;
};
