import newPostsParser from '../parsers/newPostsParser';

export default {
  id: 0,
  timer(watcher) {
    const { feeds } = watcher;
    const { postsItems } = feeds;
    const urls = feeds.feedsItems.map((item) => item.url);

    newPostsParser(urls, watcher).then((newPosts) => {
      if (postsItems.length !== newPosts.length) {
        feeds.postsItems = newPosts;
        feeds.state = 'updatingPosts';
      }
    })
      .then(() => { feeds.state = 'waiting'; });

    // make feeds inactive
    const feedsListItems = document.querySelectorAll('#feeds > ul >  li');
    [...feedsListItems].forEach((feed) => feed.classList.remove('bg-info'));

    clearTimeout(this.id);
    this.id = setTimeout(() => this.timer(watcher), 10000);
  },
};
