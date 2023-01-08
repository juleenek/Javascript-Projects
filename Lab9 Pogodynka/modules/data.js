import { Weather } from './weather.js';
import { createPanel } from './panel.js';

const errorMsg = document.querySelector('.error-msg');

export const fetchData = (location) => {
  let key = 'a5ac7798787781b914ccdd29364dbe6e';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

  fetch(url, {
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      if (localStorage.length >= 10) return;
      removeErrorMsg();
      const weather = saveDataWeather(data);
      createPanel(weather);
    })
    .catch(() => {
      createErrorMsg();
    });
};

const saveDataWeather = (data) => {
  const weather = new Weather(data);
  weather.save();
  return weather;
};

const refreshData = () => {
  const id = setInterval(apiCall, 50000);
  return () => clearInterval(id);
};

const createErrorMsg = () => {
  errorMsg.classList.remove('invisible');
};

const removeErrorMsg = () => {
  errorMsg.classList.add('invisible');
};
