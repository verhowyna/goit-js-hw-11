import axios from "axios";

const API_KEY = "39898871-04cb208ea2f2df61877868841";
const BASE_URL = "https://pixabay.com/api/";

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