import { refs } from "./refs.js";
import { btnUp } from "./scroll.js";

const lightbox = new SimpleLightbox('.gallery a');

export function makeCardMarkup(arr) {
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
        return `<div class="photo-card">
        <div class="photo-container">
        <a class="gallery__link" href="${largeImageURL}">
    <img src="${webformatURL}" alt="${tags}" loading="lazy" />
    </a>
    </div>
    <div class="info">
      <p class="info-item">
        <b>Likes</b>
        ${likes}
      </p>
      <p class="info-item">
        <b>Views</b>
        ${views}
      </p>
      <p class="info-item">
        <b>Comments</b>
        ${comments}
      </p>
      <p class="info-item">
        <b>Downloads</b>
        ${downloads}
      </p>
    </div>
  </div>`
}).join("");

refs.card.insertAdjacentHTML("beforeend", markup);

lightbox.refresh();
refs.btnUp.hidden = false;
btnUp;
}