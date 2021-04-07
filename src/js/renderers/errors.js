exports.renderErrors = (state) => {
  const { error } = state;
  const errorContainer = document.querySelector('#alert');
  errorContainer.innerHTML = error.description;
  errorContainer.classList.remove('invisible');

  setTimeout(() => {
    errorContainer.innerHTML = '';
    errorContainer.classList.add('invisible');
    error.state = 'waiting';
  }, 3000);
};
