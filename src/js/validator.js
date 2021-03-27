const axios = require('axios');
const yup = require('yup');

const schema = yup.string().url();

const isExist = (url, state) => {
  const { feed } = state;
  const { form } = state;
  if (feed.feedLinks.has(url)) {
    form.validationDescription = 'RSS уже добавлен';
    return false;
  }

  feed.feedLinks.add(url);
  form.validationDescription = 'RSS добавлен';
  return true;
};

const isRSS = (url, state) => {
  const { form } = state;
  return axios.get(`https://api.allorigins.win/raw?url=${url}`)
    .then((res) => res.data)
    .then((xml) => new DOMParser().parseFromString(xml, 'text/xml')
      .querySelector('rss'))
    .then((p) => {
      if (!p) {
        form.validationDescription = 'Ресурс не содержит валидный RSS';
        return false;
      }

      return isExist(url, state);
    })
    .catch((error) => error);
};

const isURL = (url, state) => {
  const { form } = state;
  return schema.isValid(url).then((valid) => {
    if (!valid) {
      form.validationDescription = 'Ссылка должна быть валидным URL';
      return false;
    }
    return isRSS(url, state);
  })
    .catch((error) => error);
};

exports.validate = (url, state) => isURL(url, state);
