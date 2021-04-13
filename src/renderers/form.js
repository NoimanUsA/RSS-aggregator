export default (state, i18n) => {
  const { form } = state;
  const color = form.validationDescription === 'added' ? 'text-success' : 'text-danger';
  const descContainer = document.querySelector('#feedback');
  descContainer.classList.remove('text-success', 'text-danger');

  descContainer.classList.add(color);
  descContainer.textContent = i18n.t(`form.${form.validationDescription}`);

  form.state = 'waiting';
};
