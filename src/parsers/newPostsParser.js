import * as _ from 'lodash';
import DOMPurify from 'dompurify';
import loadData from '../utils/loadData';

const createPosts = (accLength, feedId, items) => [...items].map((item, index) => {
  const postTitle = item.querySelector('title').textContent;
  const postDesc = item.querySelector('description').textContent;
  const postLink = item.querySelector('link').textContent;
  const postId = accLength + index;

  const post = {
    postId,
    feedId,
    link: postLink,
    title: postTitle,
    visited: false,
    description: DOMPurify.sanitize(postDesc),

  };
  return post;
});

export default (urls, state) => {
  const { feedsItems } = state.feeds;
  const { postsItems } = state.feeds;

  return urls.reduce((acc, url) => {
    const newAcc = acc.then((accPosts) => loadData(url, state)
      .then((data) => {
        const items = data.querySelectorAll('item');

        const currentFeed = feedsItems.find((feed) => feed.url === url);
        const { feedId } = currentFeed;

        const accLength = accPosts.length;
        const posts = createPosts(accLength, feedId, items);
        return [...posts, ...accPosts];
      }));

    return newAcc;
  }, Promise.resolve([...postsItems]))
    .then((posts) => {
      const newPosts = _.differenceBy(posts, postsItems, 'link');
      return [...newPosts, ...postsItems];
    });
};
