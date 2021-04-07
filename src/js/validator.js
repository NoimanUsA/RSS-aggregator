const axios = require('axios');
const yup = require('yup');

const schema = yup.string().url();

const isExist = (url, state) => {
  const { feeds } = state;
  const { form } = state;
  if (feeds.feedsItems.find((item) => item.url === url)) {
    form.validationDescription = 'has';
    return false;
  }

  form.validationDescription = 'added';
  return true;
};

const isRSS = (url, state) => {
  const { form } = state;
  return axios.get(`https://hexlet-allorigins.herokuapp.com/raw?url=${url}`)
    .then((res) => {
      if (res.status >= 300) {
        return Promise.reject(new Error(`Network error ${res.status}`));
      }
      return res.data;
    })
    .then((xml) => new DOMParser().parseFromString(xml, 'text/xml')
      .querySelector('rss'))
    .then((p) => {
      if (!p) {
        form.validationDescription = 'isntRss';
        return false;
      }

      return isExist(url, state);
    });
};

const isURL = (url, state) => {
  const { form } = state;
  return schema.isValid(url).then((valid) => {
    if (!valid) {
      form.validationDescription = 'isntUrl';
      return false;
    }
    return isRSS(url, state);
  });
};

exports.validate = (url, state) => isURL(url, state);
