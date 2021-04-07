const axios = require('axios');

const hasPost = (currentPosts, link) => (!!currentPosts.find((post) => post.link === link));

const updatePosts = (postsItems, feedId, items) => {
  const currentPosts = postsItems.filter((item) => item.feedId === feedId);
  const postsLength = postsItems.length;

  const newPosts = [...items].reverse()
    .reduce((acc, item, index) => {
      const link = item.querySelector('link').textContent;

      if (hasPost(currentPosts, link)) {
        return acc;
      }

      const post = {
        postId: postsLength + index,
        feedId,
        visited: false,
        title: item.querySelector('title').textContent,
        description: item.querySelector('description').textContent,
        link: item.querySelector('link').textContent,
      };
      return [post, ...acc];
    }, []);

  return newPosts;
};

exports.parseNewPosts = (urls, state) => {
  const { feedsItems } = state.feeds;
  const { postsItems } = state.posts;

  const newPosts = urls.reduce((acc, url) => {
    const newAcc = acc.then((accumulator) => axios.get(`https://api.allorigins.win/raw?url=${url}&timestamp=${new Date().getTime()}`)
      .then((res) => {
        if (res.status >= 300) {
          return Promise.reject(new Error(`Network error ${res.status} during posts update`));
        }
        return res.data;
      })
      .then((xml) => new DOMParser().parseFromString(xml, 'text/xml'))
      .then((data) => {
        const items = data.querySelectorAll('item');

        const currentFeed = feedsItems.find((item) => item.url === url);
        const currentFeedId = currentFeed.feedId;

        const feedNewPosts = updatePosts(accumulator, currentFeedId, items);
        return [...feedNewPosts, ...accumulator];
      })
      .catch((error) => {
        state.error.description = error;
        state.error.state = 'render';
      }));

    return newAcc;
  }, Promise.resolve([...postsItems]));
  return newPosts;
};
