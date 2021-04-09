export default (state, i18n) => {
  const { form } = state;
  const color = form.validationDescription === 'added' ? 'text-success' : 'text-danger';
  const descContainer = document.querySelector('#rss-description');
  descContainer.innerHTML = i18n.t(`form.${form.validationDescription}`);
  descContainer.classList.add(color);

  const formButton = document.querySelector('#rss-form #form-btn');
  formButton.disabled = false;
  form.state = 'waiting';

  // remove description after 3 seconds(commented to get tests)
  /* setTimeout(() => {
  descContainer.innerHTML = '';
  descContainer.classList.remove(color);
}, 3000); */
};
