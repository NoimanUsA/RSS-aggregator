export default (state, i18n) => {
  const { form } = state;
  const color = form.validationDescription === 'added' ? 'text-success' : 'text-danger';
  const descContainer = document.querySelector('#feedback');
  descContainer.innerHTML = i18n.t(`form.${form.validationDescription}`);
  descContainer.classList.add(color);

  form.state = 'waiting';
};
