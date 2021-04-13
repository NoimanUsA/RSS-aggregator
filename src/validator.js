import * as yup from 'yup';
import loadData from './loadData';

const schema = yup.string().url();

const isRSS = (url, state) => {
  const { form } = state;
  return loadData(url)
    .then((data) => {
      const type = data.querySelector('rss');
      if (!type) {
        form.validationDescription = 'isntRss';
        return false;
      }

      form.validationDescription = 'added';
      return data;
    });
};

const isExist = (url, state) => {
  const { feeds } = state;
  const { form } = state;
  const currentUrlFeed = feeds.feedsItems.find((item) => item.url === url);
  if (currentUrlFeed) {
    form.validationDescription = 'has';
    return false;
  }

  return isRSS(url, state);
};

const isURL = (url, state) => {
  const { form } = state;
  return schema.isValid(url).then((valid) => {
    if (!valid) {
      form.validationDescription = 'isntUrl';
      return false;
    }
    return isExist(url, state);
  });
};

export default (url, state) => isURL(url, state);
