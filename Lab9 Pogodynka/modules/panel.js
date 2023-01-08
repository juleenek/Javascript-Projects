const panelsContainer = document.querySelector('.panels');
const panelTemplate = document.querySelector('.panel');

const createPanel = (weather) => {
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

export { createPanel };
