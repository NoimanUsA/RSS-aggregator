import validate from '../validator';

const createFeed = (id, channel, url) => ({
  feedId: id,
  url,
  title: channel.querySelector('title').textContent,
  description: channel.querySelector('description').textContent,
});

const createPosts = (state, feedId, items) => {
  const { postsItems } = state.posts;
  return [...items].map((item, index) => {
    const post = {
      postId: postsItems.length + index,
      feedId,
      visited: false,
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    };
    return post;
  });
};

export default (url, state) => {
  const { feedsItems } = state.feeds;
  const { postsItems } = state.posts;
  return validate(url, state)
    .then((data) => {
      if (!data) { return false; }

      const channel = data.querySelector('channel');
      const items = data.querySelectorAll('item');

      const newFeedId = feedsItems.length;
      const newFeed = createFeed(newFeedId, channel, url);
      feedsItems.unshift(newFeed);

      const posts = createPosts(state, newFeedId, items);
      state.posts.postsItems = [...posts, ...postsItems];

      return true;
    });
};
