exports.renderForm = (form) => {
  const color = form.descriptionColor;
  const descContainer = document.querySelector('#rss-description');
  descContainer.innerHTML = form.validationDescription;
  descContainer.classList.add(color);
  form.state = 'waiting';

  setTimeout(() => {
    descContainer.innerHTML = '';
    descContainer.classList.remove(color);
  }, 3000);
};
exports.renderError = (error) => {
  const errorContainer = document.querySelector('#alert');
  errorContainer.innerHTML = error;
  errorContainer.classList.remove('invisible');

  setTimeout(() => {
    errorContainer.innerHTML = '';
    errorContainer.classList.add('invisible');
  }, 3000);
};

const createPosts = (feedPosts) => {
  const postsList = document.createElement('ul');
  postsList.classList.add('list-group');
  postsList.dataset.feedId = feedPosts.feedId;

  const postItems = feedPosts.items;
  postItems.forEach((item) => {
    const postListItem = document.createElement('li');
    postListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');

    const postRef = document.createElement('a');
    postRef.classList.add('fw-bold', 'text-decoration-none');
    postRef.target = '_blank';
    postRef.innerText = item.title;
    postRef.href = item.link;

    const postButton = document.createElement('button');
    postButton.classList.add('btn', 'btn-success');
    postButton.innerText = 'Просмотр';

    postListItem.append(postRef, postButton);
    postsList.append(postListItem);
  });

  return postsList;
};

exports.renderPosts = (feedState) => {
  const postsContainer = document.querySelector('#posts');
  postsContainer.innerHTML = '';

  const postsHeader = document.createElement('h2');
  postsContainer.append(postsHeader);
  postsHeader.innerText = 'Посты';

  const { feeds, posts } = feedState;

  feeds.forEach((feed) => {
    const { feedId } = feed;

    // find posts with feed id
    const feedPosts = posts.find((el) => el.feedId === feedId);
    const feedPostsList = createPosts(feedPosts);
    postsContainer.append(feedPostsList);
  });

  feedState.state = 'waiting';
};

const createFeed = (feedElement) => {
  const feedListItem = document.createElement('li');
  feedListItem.classList.add('list-group-item');
  feedListItem.dataset.feedId = feedElement.feedId;
  feedListItem.style = 'cursor:pointer';

  const feedHeader = document.createElement('h3');
  feedHeader.innerText = feedElement.title;

  const feedDescription = document.createElement('p');
  feedDescription.innerText = feedElement.description;

  feedListItem.append(feedHeader, feedDescription);

  return feedListItem;
};

exports.renderFeed = (feedState) => {
  const feedsContainer = document.querySelector('#feeds');
  feedsContainer.innerHTML = '';
  const feedsHeader = document.createElement('h2');
  feedsHeader.innerText = 'Фиды';

  const { feeds } = feedState;
  const feedsList = document.createElement('ul');
  feedsList.classList.add('list-group', 'mb-5');
  feedsContainer.append(feedsHeader, feedsList);

  // create and render every feed element
  feeds.forEach((element) => {
    const feedListItem = createFeed(element);
    feedsList.append(feedListItem);
  });

  feedState.state = 'waiting';
};
