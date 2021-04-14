import renderForm from './form';
import renderFeeds from './feeds';
import renderPosts from './posts';

export default {
  form(state, i18n) {
    return renderForm(state, i18n);
  },

  feeds(state, i18n) {
    return renderFeeds(state, i18n);
  },

  posts(state, i18n) {
    return renderPosts(state, i18n);
  },
};
