const createFeedsItem = (feedItem) => {
  const feedsListItem = document.createElement('li');
  feedsListItem.classList.add('list-group-item');
  feedsListItem.dataset.feedId = feedItem.feedId;
  feedsListItem.style = 'cursor:pointer';

  feedsListItem.innerHTML = `
  <h3>${feedItem.title}</h3>
  <p>${feedItem.description}</p>
  `;
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
  secondPostsList.textContent = '';

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
  const { feedsItems } = state.feeds;

  const feedsContainer = document.querySelector('#feeds');
  feedsContainer.textContent = '';
  feedsContainer.innerHTML = `
  <h2>${i18n.t('feed.feedHead')}</h2>
  <ul class="list-group mb-5"></ul>
  `;

  const feedsListElement = feedsContainer.querySelector('ul');
  // create and render every feed element
  feedsItems.forEach((feedsItem) => {
    const feedsListItem = createFeedsItem(feedsItem);
    feedsListElement.append(feedsListItem);
  });

  // add events
  feedsListElement.removeEventListener('click', showFeedPosts);
  feedsListElement.addEventListener('click', showFeedPosts);
};
