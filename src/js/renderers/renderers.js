import i18n from 'i18next';
import { ru } from '../../../locales/ru';
import renderForm from './form';
import renderFeeds from './feeds';
import renderPosts from './posts';
import renderErrors from './errors';

i18n.init({
  lng: 'ru',
  debug: true,
  resources: {
    ru,
  },
});

export default {
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
