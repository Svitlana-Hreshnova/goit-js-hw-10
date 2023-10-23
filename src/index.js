import { fetchBreeds, fetchCatByBreed } from './cat-api';

const breedSelect = document.querySelector('.breed-select');
const loader = document.querySelector('.loader');
const error = document.querySelector('.error');
const catInfo = document.querySelector('.cat-info');
const catImage = document.querySelector('.cat-image');
const breedName = document.querySelector('.breed-name');
const breedDescription = document.querySelector('.breed-description');
const breedTemperament = document.querySelector('.breed-temperament');

function getRandomCatImage() {
  const apiKey = 'live_wC29tI5BapHaUFo6owoLci4dINo1kZhJOlZJpxMiD1F30Yi7R3o8YBWNUuVioRvV';
  const apiUrl = 'https://api.thecatapi.com/v1/images/search';
  const headers = {
    'x-api-key': apiKey
  };

  fetch(apiUrl, { headers })
    .then(response => response.json())
    .then(data => {
      const catImageUrl = data[0].url;
      catImage.src = catImageUrl;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

fetchBreeds()
  .then((breeds) => {
    breeds.forEach((breed) => {
      const option = document.createElement('option');
      option.value = breed.id;
      option.textContent = breed.name;
      breedSelect.appendChild(option);
    });
  })
  .catch((err) => {
    error.style.display = 'block';
    console.error(err);
  });

breedSelect.addEventListener('change', () => {
  const selectedBreedId = breedSelect.value;

  loader.style.display = 'none';
  error.style.display = 'none';
  catInfo.style.display = 'none';

  if (selectedBreedId === 'random') {
    getRandomCatImage();
  } else {
    loader.style.display = 'block';

    fetchCatByBreed(selectedBreedId)
      .then((catData) => {
        catImage.src = catData.url;
        breedName.textContent = catData.breeds[0].name;
        breedDescription.textContent = catData.breeds[0].description;
        breedTemperament.textContent = `Temperament: ${catData.breeds[0].temperament}`;

        loader.style.display = 'none';
        catInfo.style.display = 'block';
      })
      .catch((err) => {
        error.style.display = 'block';
        console.error(err);
      });
  }
});
