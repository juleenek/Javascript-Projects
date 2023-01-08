import { Weather } from './weather.js';

export const fetchData = (location) => {
  let key = 'a5ac7798787781b914ccdd29364dbe6e';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

  fetch(url, {
    mode: 'cors',
  })
    .then((response) => response.json())
    .then((data) => {
      saveDataWeather(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
};

const saveDataWeather = (data) => {
  const weather = new Weather(data);
  weather.save();
};
