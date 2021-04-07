exports.renderForm = (state, i18n) => {
  const { form } = state;
  const color = form.validationDescription === 'added' ? 'text-success' : 'text-danger';
  const descContainer = document.querySelector('#rss-description');
  descContainer.innerHTML = i18n.t(`form.${form.validationDescription}`);
  descContainer.classList.add(color);

  const formButton = document.querySelector('#rss-form #form-btn');
  formButton.disabled = false;
  // remove description after 3 seconds
  setTimeout(() => {
    descContainer.innerHTML = '';
    descContainer.classList.remove(color);
    form.state = 'waiting';
  }, 3000);
};
