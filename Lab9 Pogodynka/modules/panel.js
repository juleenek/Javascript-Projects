const panelsContainer = document.querySelector('.panels');
const panelTemplate = document.querySelector('.panel');

const createPanel = (weather) => {
  const panel = panelTemplate.cloneNode(true);
  panel.classList.remove('invisible');
  const weatherContent = panel.querySelector('.weather-content');

  weatherContent.querySelector(
    '.location-title'
  ).textContent = `${weather.location}, ${weather.country}`;
  weatherContent.querySelector(
    '.weather-desc'
  ).textContent = `${weather.description}`;
  weatherContent.querySelector(
    '.weather-temp'
  ).textContent = `${weather.temperature}°C`;
  weatherContent.querySelector(
    '.weather-humidity'
  ).textContent = `${weather.humidity}%`;
  weatherContent.querySelector(
    '.weather-wind'
  ).textContent = `${weather.wind}MPH`;

  panelsContainer.appendChild(panel);
};

const removePanel = () => {};

export { createPanel };
