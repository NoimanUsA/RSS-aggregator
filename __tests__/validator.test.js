const axios = require('axios');
axios.defaults.adapter = require('axios/lib/adapters/http');

const { validate } = require('../src/js/validator');

const urls = [
  ['This is not a link', false, 'Ссылка должна быть валидным URL'],
  ['https://ru.hexlet.io/lessons.rss', true, 'RSS добавлен'],
  ['https://ru.hexlet.io/lessons.rss', false, 'RSS уже добавлен'],
  ['https://www.google.com', false, 'Ресурс не содержит валидный RSS'],
];

const state = {
  form: {
    validationDescription: '',
  },
  feed: { feedLinks: new Set() },

};

test.each(urls)('test %p', (url, isValid, validationDescription) => validate(url, state).then((result) => {
  const { form } = state;
  expect(result).toBe(isValid);
  expect(form.validationDescription).toBe(validationDescription);
}));
