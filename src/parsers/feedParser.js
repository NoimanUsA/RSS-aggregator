import DOMPurify from 'dompurify';
import loadData from '../utils/loadData';

const createFeed = (id, channel, url) => ({
  feedId: id,
  url,
  title: channel.querySelector('title').textContent,
  description: channel.querySelector('description').textContent,
});

const createPosts = (state, feedId, items) => {
  const { postsItems } = state.feeds;
  return [...items].map((item, index) => {
    const postTitle = item.querySelector('title').textContent;
    const postDesc = item.querySelector('description').textContent;
    const postLink = item.querySelector('link').textContent;
    const postId = postsItems.length + index;

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
};

export default (url, state) => {
  const { feedsItems } = state.feeds;
  return loadData(url).then((data) => {
    const channel = data.querySelector('channel');
    const items = data.querySelectorAll('item');

    const feedId = feedsItems.length;
    const feed = createFeed(feedId, channel, url);

    const posts = createPosts(state, feedId, items);

    return {
      feed,
      posts,
    };
  });
};
