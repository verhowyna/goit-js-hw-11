import axios from "axios";
import Notiflix from "notiflix";
import { throttle } from "lodash";
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

import { endMessage, loadMoreBtn, refs } from "./refs.js";
import { makeCardMarkup } from "./helpers.js";

const API_KEY = "39898871-04cb208ea2f2df61877868841";
const BASE_URL = "https://pixabay.com/api/";

let query = "";
let page = 1;

refs.form.addEventListener("input", throttle(handleInput, 500));
refs.form.addEventListener("submit", onSearch);
refs.loadMoreBtn.addEventListener("click", onLoad);

function handleInput(evt) {
query = evt.target.value;
}
//* Search photo and make card
function onSearch(evt) {
    evt.preventDefault();
    page = 1;
    refs.card.innerHTML = "";
    endMessage.hidden = true;
    loadMoreBtn.hidden = true;
    refs.btnUp.hidden = true;
    Notiflix.Loading.circle("Loading...");

    getPhoto(query)
    .then(({data: {hits, totalHits}}) => {
        if (hits.length === 0 || query.trim() === "") {
        Notiflix.Notify.failure("Sorry, there are no images matching your search query. Please try again.");
        refs.card.innerHTML = "";
        Notiflix.Loading.remove();
        } else {
            makeCardMarkup(hits);
            const totalPages = Math.ceil(totalHits/40);
            if (page === totalPages) {
              loadMoreBtn.hidden = true;
              endMessage.hidden = false;
            } else {
            loadMoreBtn.hidden = false;
            }
            Notiflix.Loading.remove();
            Notiflix.Notify.success(`Hooray! We found ${totalHits} images.`);
        }
}
    )
    .catch(error =>
        console.log(error));
}

//* Button "Load more"
function onLoad() {
  page += 1;
  loadMoreBtn.hidden = true;
  Notiflix.Loading.circle("Loading...");

  getPhoto(query)
    .then(({data: {hits, totalHits}}) => {
            makeCardMarkup(hits);
            const totalPages = Math.ceil(totalHits/40);
            if (page === totalPages) {
              loadMoreBtn.hidden = true;
              endMessage.hidden = false;
            } else {
            loadMoreBtn.hidden = false;
            }
            Notiflix.Loading.remove();
        }
      )
    .catch(error =>
        console.log(error));
}

//* fetch info with axios
async function getPhoto(query) {
    const params = new URLSearchParams({
        key: API_KEY,
        q: query,
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        page: page,
        per_page: 40,
    })
    // console.log(params.toString());
    const response = await axios.get(`${BASE_URL}?${params}`);
    console.log(response);
return response;
}

//* Card markup

