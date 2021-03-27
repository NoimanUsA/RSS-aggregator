const axios = require('axios');

const createFeed = (id, channel) => ({
  feedId: id,
  link: channel.querySelector('link').textContent,
  title: channel.querySelector('title').textContent,
  description: channel.querySelector('description').textContent,
});

const createPosts = (feedId, items) => {
  const posts = {
    feedId,
    items: [],
  };
  items.forEach((item) => {
    const post = {
      title: item.querySelector('title').textContent,
      description: item.querySelector('description').textContent,
      link: item.querySelector('link').textContent,
    };

    posts.items.push(post);
  });

  return posts;
};

exports.parser = (url, state) => {
  const { feeds, posts } = state;
  return axios.get(`https://api.allorigins.win/raw?url=${url}`)
    .then((res) => res.data)
    .then((xml) => new DOMParser().parseFromString(xml, 'text/xml'))
    .then((data) => {
      const channel = data.querySelector('channel');
      const items = data.querySelectorAll('item');

      const newFeed = createFeed(feeds.length, channel);
      feeds.push(newFeed);

      const newPosts = createPosts(newFeed.feedId, items);
      posts.push(newPosts);
      return Promise.resolve();
    })
    .catch((error) => error);
};
