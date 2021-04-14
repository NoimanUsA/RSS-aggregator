import * as yup from 'yup';

const schema = yup.string().url();

const isExist = (url, state) => {
  const { feeds } = state;
  const { form } = state;
  const currentUrlFeed = feeds.feedsItems.find((item) => item.url === url);
  if (currentUrlFeed) {
    form.validationDescription = 'has';
    return false;
  }

  form.validationDescription = 'added';
  return true;
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
