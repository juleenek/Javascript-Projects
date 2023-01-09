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

searchInput.addEventListener('input', () => {
  console.log(loadLocation(searchInput.value));
});

refreshPage();
