'use strict';

import { fetchData } from './modules/data.js';

const searchInput = document.querySelector('.search-input');
const searchBtn = document.querySelector('.search-btn');

const searchWeather = () => {
  const location = searchInput.value;
  if (location.length < 3) return;
  fetchData(location);
};

searchBtn.addEventListener('click', searchWeather);

fetchData('Krakow');
