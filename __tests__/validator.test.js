import axios from 'axios';

import validate from '../src/validator';

axios.defaults.adapter = require('axios/lib/adapters/http');

const urls = [
  ['lorem-rss.herokuapp.com', false, 'isntUrl'],
  ['http://lorem-rss.herokuapp.com/feed?unit=second', true, 'added'],
  ['http://lorem-rss.herokuapp.com/feed', false, 'has'],
  ['https://lorem-rss.herokuapp.com', false, 'isntRss'],
];

const state = {
  form: {
    validationDescription: '',
  },
  feeds: {
    feedsItems: [{ url: 'http://lorem-rss.herokuapp.com/feed' }],
  },

};

test.each(urls)('test %p', (url, isValid, validationDescription) => validate(url, state).then((result) => {
  const { form } = state;
  expect(result).toBe(isValid);
  expect(form.validationDescription).toBe(validationDescription);
}));
