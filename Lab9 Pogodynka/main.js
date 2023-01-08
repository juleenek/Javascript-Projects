'use strict';

import { fetchData } from './modules/data.js';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const searchWeather = () => {
  const location = searchInput.value;
  if (location.length < 3) return;
  fetchData(location);
  searchInput.value = '';
};

searchBtn.addEventListener('click', searchWeather);
document.addEventListener('keyup', function (event) {
  event.preventDefault();
  if (event.key === 'Enter') {
    searchWeather();
  }
});

const refreshPage = () => {
  localStorage.clear();
  fetchData('Krakow');
};

refreshPage();
