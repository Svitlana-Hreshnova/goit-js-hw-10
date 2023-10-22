import axios from "axios";

axios.defaults.headers.common["x-api-key"] = "live_wC29tI5BapHaUFo6owoLci4dINo1kZhJOlZJpxMiD1F30Yi7R3o8YBWNUuVioRvV";

export function fetchBreeds() {
  return axios.get("https://api.thecatapi.com/v1/breeds")
    .then((response) => response.data)
    .catch((error) => {
      throw error;
    });
}

export function fetchCatByBreed(breedId) {
  return axios.get(`https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`)
    .then((response) => response.data[0])
    .catch((error) => {
      throw error;
    });
}
