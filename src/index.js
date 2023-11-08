import { Notify } from 'notiflix';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchData } from './api.js';
import { refs } from './refs.js';

let pageCounter = 0;
let pictures = '';

var lightbox = new SimpleLightbox('.gallery a');

refs.loadMoreRef.classList.add('is-hidden');

refs.submitBtnRef.addEventListener('click', e => {
  e.preventDefault();
  pageCounter = 1;
  refs.galleryRef.innerHTML = '';

  searchImages(e.target.parentNode.searchQuery.value);
  e.target.parentNode.reset();
});

async function searchImages(searchedPictures) {
    pictures = searchedPictures;
  const images = await fetchData(searchedPictures, pageCounter);

  if (images.hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.loadMoreRef.classList.add('is-hidden');
  } else {
    createPictures(images.hits);
    Notify.success(`Hooray! We found ${images.totalHits} images.`);
    refs.loadMoreRef.classList.remove('is-hidden');

    lightbox.refresh();
  }

}

// refs.loadMoreRef.addEventListener('click', async () => {
//     pageCounter += 1;
//     refs.loadMoreRef.classList.add('is-hidden');
//     const receivedImages = await fetchData(pictures, pageCounter)

//     createPictures(receivedImages.hits);
//     lightbox.refresh();
//     refs.loadMoreRef.classList.remove('is-hidden');

//     const totalValue = document.querySelectorAll('.photo-card');
//     if(totalValue.length === receivedImages.totalHits) {
//         refs.loadMoreRef.classList.add('is-hidden');
//         Notify.failure("We're sorry, but you've reached the end of search results.")
//     }
// });

function createPictures(pictures) {
  const markup = pictures
    .map(picture => {
      return `<div class="photo-card">
    <a href="${picture.largeImageURL}">
    <img class="photo-img" src="${picture.webformatURL}" alt="${picture.tags}" loading="lazy" />
    </a>
    <div class="info">
      <p class="info-item">
        <b class="info-name">Likes: </b><span class="info-value">${picture.likes}</span>
      </p>
      <p class="info-item">
        <b class="info-name">Views: </b><span class="info-value">${picture.views}</span>
      </p>
      <p class="info-item">
        <b class="info-name">Comments: </b><span class="info-value">${picture.comments}</span>
      </p>
      <p class="info-item">
        <b class="info-name">Downloads: </b><span class="info-value">${picture.downloads}</span>
      </p>
    </div>
  </div>`;
    })
    .join('');

  refs.galleryRef.insertAdjacentHTML('beforeend', markup);
}
// small German Shepherd

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    onInfiniteScroll();
  }
}

window.addEventListener("scroll", handleScroll);

async function onInfiniteScroll() {
    pageCounter += 1;
    refs.loadMoreRef.classList.add('is-hidden');
    const receivedImages = await fetchData(pictures, pageCounter)

    createPictures(receivedImages.hits);
    lightbox.refresh();
    refs.loadMoreRef.classList.remove('is-hidden');

    const totalValue = document.querySelectorAll('.photo-card');
    if(totalValue.length === receivedImages.totalHits) {
        refs.loadMoreRef.classList.add('is-hidden');
        Notify.failure("We're sorry, but you've reached the end of search results.")
    }
}