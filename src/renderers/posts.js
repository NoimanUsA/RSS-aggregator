const createPostsItem = (postsItem, i18n) => {
  // create li item
  const postListItem = document.createElement('li');
  postListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  postListItem.dataset.feedId = postsItem.feedId;

  // create reference
  const postRef = document.createElement('a');
  if (!postsItem.visited) {
    postRef.classList.add('font-weight-bold');
  } else {
    postRef.classList.add('font-weight-normal');
  }
  postRef.target = '_blank';
  postRef.textContent = postsItem.title;
  postRef.href = postsItem.link;
  postRef.dataset.postId = postsItem.postId;

  // create post button
  const postButton = document.createElement('button');
  postButton.classList.add('btn', 'btn-success');
  postButton.textContent = i18n.t('feed.postButton');
  postButton.dataset.bsToggle = 'modal';
  postButton.dataset.bsTarget = '#modal';

  postListItem.append(postRef, postButton);

  // add events
  // delete font-weight on click
  postRef.addEventListener('click', (e) => {
    e.currentTarget.classList.remove('font-weight-bold');
    e.currentTarget.classList.add('font-weight-normal');
    postsItem.visited = true;
  });

  // change modal on click to  post button
  postButton.addEventListener('click', () => {
    postRef.classList.remove('font-weight-bold');
    postRef.classList.add('font-weight-normal');
    const modalDialog = document.querySelector('.modal-dialog');
    const modalHeader = modalDialog.querySelector('.modal-header > h5');
    const modalBody = modalDialog.querySelector('.modal-body > p');
    const btnReadMore = modalDialog.querySelector('.btn-read-more');
    const btnCloseModal = modalDialog.querySelector('.btn-close-modal');

    modalHeader.textContent = postsItem.title;
    modalBody.textContent = postsItem.description;
    btnReadMore.textContent = i18n.t('modal.readMore');
    btnReadMore.href = postsItem.link;
    btnCloseModal.textContent = i18n.t('modal.closeModal');
  });

  return postListItem;
};

export default (state, i18n) => {
  const { posts } = state;
  const { postsItems } = posts;

  const postsContainer = document.querySelector('#posts');
  postsContainer.innerHTML = '';

  const postsHeader = document.createElement('h2');
  postsContainer.append(postsHeader);
  postsHeader.innerText = i18n.t('feed.postsHead');

  // create main post list having all posts items
  const mainPostsList = document.createElement('ul');
  mainPostsList.classList.add('list-group', 'main-posts-list');

  // create second post list having only clicked posts items
  const secondPostsList = document.createElement('ul');
  secondPostsList.classList.add('list-group', 'd-none', 'second-posts-list');

  postsContainer.append(postsHeader, mainPostsList, secondPostsList);

  // add post items to posts list
  postsItems.forEach((postsItem) => {
    const postsListItem = createPostsItem(postsItem, i18n);
    mainPostsList.append(postsListItem);
  });

  posts.state = 'waiting';
};
