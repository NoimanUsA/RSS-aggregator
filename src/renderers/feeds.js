const createFeedsItem = (feedItem) => {
  const feedsListItem = document.createElement('li');
  feedsListItem.classList.add('list-group-item');
  feedsListItem.dataset.feedId = feedItem.feedId;
  feedsListItem.style = 'cursor:pointer';

  const feedHeader = document.createElement('h3');
  feedHeader.innerText = feedItem.title;

  const feedDescription = document.createElement('p');
  feedDescription.innerText = feedItem.description;

  feedsListItem.append(feedHeader, feedDescription);

  return feedsListItem;
};

const showFeedPosts = (feedsList) => {
  const { target, currentTarget } = feedsList;
  const feedsListItems = currentTarget.querySelectorAll('li');

  const mainPostsList = document.querySelector('#posts ul.main-posts-list');
  mainPostsList.classList.add('d-none');
  const postsListItems = mainPostsList.querySelectorAll('li');

  const secondPostsList = document.querySelector('#posts > ul.second-posts-list');
  secondPostsList.classList.remove('d-none');
  secondPostsList.innerHTML = '';

  const feedsListItem = target.closest('li');
  const { feedId } = feedsListItem.dataset;

  feedsListItems.forEach((item) => item.classList.remove('bg-info'));
  feedsListItem.classList.add('bg-info');
  [...postsListItems].filter((item) => item.dataset.feedId === feedId)
    .forEach((item) => {
      const copy = item.cloneNode(true);
      secondPostsList.append(copy);
    });
};

export default (state, i18n) => {
  const { feeds } = state;
  const { feedsItems } = feeds;
  const feedsContainer = document.querySelector('#feeds');
  feedsContainer.textContent = '';

  const feedsHeader = document.createElement('h2');
  feedsHeader.textContent = i18n.t('feed.feedHead');

  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-5');

  feedsContainer.append(feedsHeader, feedsList);

  // create and render every feed element
  feedsItems.forEach((feedsItem) => {
    const feedsListItem = createFeedsItem(feedsItem);
    feedsList.append(feedsListItem);
  });

  // add events
  feedsList.removeEventListener('click', showFeedPosts);
  feedsList.addEventListener('click', showFeedPosts);

  feeds.state = 'waiting';
};
