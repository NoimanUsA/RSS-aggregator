const i18n = require('i18next').default;
const { ru } = require('../../../locales/ru');
const { renderForm } = require('./form');
const { renderFeeds } = require('./feeds');
const { renderPosts } = require('./posts');
const { renderErrors } = require('./errors');

i18n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

exports.renderer = {
  form(state) {
    return renderForm(state, i18n);
  },

  feeds(state) {
    return renderFeeds(state, i18n);
  },

  posts(state) {
    return renderPosts(state, i18n);
  },

  error(state) {
    return renderErrors(state);
  },

};
