import axios from "axios";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { refs } from "./refs.js";
import { btnUp } from "./scroll.js";

const API_KEY = "39898871-04cb208ea2f2df61877868841";
const BASE_URL = "https://pixabay.com/api/";

const lightbox = new SimpleLightbox('.gallery a');

export function makeCardMarkup(arr) {
    const markup = arr.map(({webformatURL, largeImageURL, tags, likes, views, comments, downloads}) => {
      return `<div class="photo-card">
        <div class="photo-container"><a class="gallery__link" href="${largeImageURL}"><img src="${webformatURL}" alt="${tags}" loading="lazy" /></a></div>
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

export async function getPhoto(query, page) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    image_type: "photo",
    orientation: "horizontal",
    safesearch: true,
    page: page,
    per_page: 40,
  })
  try {
    const resp = await axios.get(`${BASE_URL}?${params}`);
    console.log(resp);
    return resp;
  }
  catch (error) {
    throw new Error("Error");
  }
}