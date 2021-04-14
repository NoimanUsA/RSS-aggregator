const createPostsItem = (postsItem, i18n) => {
  // create li item
  const postListItem = document.createElement('li');
  postListItem.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
  postListItem.dataset.feedId = postsItem.feedId;

  // create reference
  const postRef = `<a class="${!postsItem.visited ? 'font-weight-bold' : 'font-weight-normal'}" target="_blank" href="${postsItem.link}" data-post-id="${postsItem.postId}">${postsItem.title}</a>`;
  // create button
  const postButton = `<button class="btn btn-success" data-toggle="modal" data-target="#modal">${i18n.t('feed.postButton')}</button>`;

  postListItem.innerHTML = `${postRef}${postButton}`;

  // add events
  const refElement = postListItem.querySelector('a');
  const buttonElement = postListItem.querySelector('button');

  // delete font-weight on click
  refElement.addEventListener('click', (e) => {
    e.currentTarget.classList.remove('font-weight-bold');
    e.currentTarget.classList.add('font-weight-normal');
    postsItem.visited = true;
  });

  // change modal on click to post button
  buttonElement.addEventListener('click', () => {
    refElement.classList.remove('font-weight-bold');
    refElement.classList.add('font-weight-normal');

    const modalDialog = document.querySelector('.modal-dialog');
    modalDialog.innerHTML = `
    <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title">${postsItem.title}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">×</span>
          </button>
        </div>
        <div class="modal-body">
          <p>${postsItem.description}</p>
        </div>
        <div class="modal-footer">
          <a type="button" class="btn btn-success btn-read-more" target="_blank" href="${postsItem.link}">${i18n.t('modal.readMore')}</a>
          <button type="button" class="btn btn-secondary btn-close-modal" data-dismiss="modal">${i18n.t('modal.closeModal')}</button>
        </div>
      </div>
      `;
  });

  return postListItem;
};

export default (state, i18n) => {
  const { postsItems } = state.feeds;

  const postsContainer = document.querySelector('#posts');
  postsContainer.textContent = '';
  postsContainer.innerHTML = `
  <h2>${i18n.t('feed.postsHead')}</h2>
  <ul class="list-group main-posts-list"></ul>
  <ul class="list-group second-posts-list d-none"></ul>
  `;

  // add post items to posts list
  const mainPostsListElement = postsContainer.querySelector('.main-posts-list');
  postsItems.forEach((postsItem) => {
    const postsListItem = createPostsItem(postsItem, i18n);
    mainPostsListElement.append(postsListItem);
  });
};
