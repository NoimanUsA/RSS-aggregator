const createPostsItem = (postsItem, i18n) => {
  // create li item
  const postListItem = document.createElement('li');
  postListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  postListItem.dataset.feedId = postsItem.feedId;

  // create reference
  const postRef = document.createElement('a');
  if (!postsItem.visited) {
    postRef.classList.add('fw-bold');
  } else {
    postRef.classList.add('fw-normal');
  }
  postRef.classList.add('text-decoration-none');
  postRef.target = '_blank';
  postRef.innerText = postsItem.title;
  postRef.href = postsItem.link;
  postRef.dataset.postId = postsItem.postId;

  // create post button
  const postButton = document.createElement('button');
  postButton.classList.add('btn', 'btn-success');
  postButton.innerText = i18n.t('feed.postButton');
  postButton.dataset.bsToggle = 'modal';
  postButton.dataset.bsTarget = '#modal';

  postListItem.append(postRef, postButton);

  // add events
  // delete font-weight on click
  postRef.addEventListener('click', (e) => {
    e.currentTarget.classList.remove('fw-bold');
    e.currentTarget.classList.add('fw-normal');
    postsItem.visited = true;
  });

  // change modal on click to  post button
  postButton.addEventListener('click', () => {
    const modalDialog = document.querySelector('.modal-dialog');
    const modalHeader = modalDialog.querySelector('.modal-header > h5');
    const modalBody = modalDialog.querySelector('.modal-body > p');
    const btnReadMore = modalDialog.querySelector('.btn-read-more');
    const btnCloseModal = modalDialog.querySelector('.btn-close-modal');

    modalHeader.innerText = postsItem.title;
    modalBody.innerText = postsItem.description;
    btnReadMore.innerText = i18n.t('modal.readMore');
    btnReadMore.href = postsItem.link;
    btnCloseModal.innerText = i18n.t('modal.closeModal');
  });

  return postListItem;
};

exports.renderPosts = (state, i18n) => {
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
};
