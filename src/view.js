import onChange from 'on-change';
import renderer from './renderers/renderers';

export default (state, i18n) => {
  const watcher = onChange(state, (path, value) => {
    const renderType = path.split('.')[0];
    if (renderType !== 'form' && value === 'render') {
      renderer[renderType](state, i18n);
    }

    if (renderType === 'form') {
      const formButton = document.querySelector('#form-btn');
      const formLine = document.querySelector('#form-line');
      if (value === 'load') {
        formButton.disabled = true;
        formLine.readOnly = true;
      }
      if (value === 'render') {
        renderer.form(state, i18n);
        formButton.disabled = false;
        formLine.readOnly = false;
        formLine.innerHTML = '';
      }
    }
  });
  return watcher;
};
