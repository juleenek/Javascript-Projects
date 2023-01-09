'use strict';

import { loadLocation } from './modules/api.js';
import { createWeather } from './modules/weather.js';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const searchWeather = (location) => {
  if (location.length < 3) return;
  createWeather(location);
  searchInput.value = '';
};

searchBtn.addEventListener('click', searchWeather);
document.addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.key === 'Enter') {
    searchWeather(searchInput.value);
  }
});

const refreshPage = () => {
  localStorage.clear();
  searchWeather('Krakow');
};
const autocomplete = () => {
  if (searchInput.value.length >= 3)
    setTimeout(() => {
      loadLocation(searchInput.value);
    }, 1000);
};

const autocompleteOnKeydown = () => {
  let timer;
  const waitTime = 400;

  searchInput.addEventListener('keyup', (e) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      autocomplete();
    }, waitTime);
  });
};

autocompleteOnKeydown();
refreshPage();
