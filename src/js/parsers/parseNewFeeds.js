const axios = require('axios');

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

exports.parseNewFeeds = (url, state) => {
  const { feedsItems } = state.feeds;
  const { postsItems } = state.posts;
  return axios.get(`https://api.allorigins.win/raw?url=${url}&timestamp=${new Date().getTime()}`)
    .then((res) => {
      if (res.status >= 300) {
        return Promise.reject(new Error(`Network error ${res.status}`));
      }
      return res.data;
    })
    .then((xml) => new DOMParser().parseFromString(xml, 'text/xml'))
    .then((data) => {
      const channel = data.querySelector('channel');
      const items = data.querySelectorAll('item');

      const newFeedId = feedsItems.length;
      const newFeed = createFeed(newFeedId, channel, url);
      feedsItems.unshift(newFeed);

      const posts = createPosts(state, newFeedId, items);
      state.posts.postsItems = [...posts, ...postsItems];
    })
    .catch((error) => {
      state.error.description = error;
      state.error.state = 'render';
    });
};
