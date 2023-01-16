const panelsContainer = document.querySelector('.panels');
const panelTemplate = document.querySelector('.panel');
const autocompleteBox = document.querySelector('.autocomplete-options');

import { searchWeather } from '../main.js';
import { getChart } from './chart.js';

export const createPanel = (weather) => {
  const panel = panelTemplate.cloneNode(true);
  panel.classList.remove('invisible');

  const weatherContent = panel.querySelector('.weather-content');
  const deleteIcon = panel.querySelector('.delete-icon');

  panel.querySelector(
    '.weather-icon'
  ).src = `https://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  deleteIcon.addEventListener('click', () => {
    localStorage.removeItem(weather.id);
    panel.remove();
  });

  panel.addEventListener('click', () => {
    getChart(weather);
  });

  weatherContent.querySelector(
    '.location-title'
  ).textContent = `${weather.location}, ${weather.country}`;
  weatherContent.querySelector(
    '.weather-desc'
  ).textContent = `${weather.description}`;
  weatherContent.querySelector(
    '.weather-temp'
  ).textContent = `Temperature: ${weather.temperature}°C`;
  weatherContent.querySelector(
    '.weather-humidity'
  ).textContent = `Humidity: ${weather.humidity}%`;
  weatherContent.querySelector(
    '.weather-wind'
  ).textContent = `Wind-speed: ${weather.wind}MPH`;

  panelsContainer.appendChild(panel);
};

export const createAutocompletePanels = (locationsArray) => {
  for (const loc of locationsArray) {
    const option = document.createElement('div');
    option.classList.add('option');
    const optionText = document.createElement('p');
    optionText.classList.add('option-text');
    optionText.textContent = `${loc.name}, ${loc.countryCode}`;

    const name = loc.name.split(' ');
    option.addEventListener('click', () => {
      searchWeather(name[0]);
      clearAutocompletePanels();
    });

    option.appendChild(optionText);
    autocompleteBox.appendChild(option);
  }
};

export const clearAutocompletePanels = () => {
  autocompleteBox.innerHTML = '';
};
