import { removeErrorMsg, createErrorMsg } from './error.js';
import { loadWeather } from './api.js';
import { createPanel } from './panel.js';

let idCount = 1;

export class Weather {
  constructor(data, id = idCount) {
    this.id = id;
    this.location = data.name;
    this.country = data.sys.country;
    this.description = data.weather[0].description;
    this.temperature = Math.round(data.main.temp) - 273;
    this.humidity = data.main.humidity;
    this.wind = Math.round(data.wind.speed);
    this.icon = data.weather[0].icon;
    this.forecastList = [];
  }

  save(isNew = true) {
    localStorage.setItem(this.id, JSON.stringify(this));
    if (isNew) idCount++;
  }
}

export const createWeather = async (location) => {
  const data = await loadWeather(location);
  if (localStorage.length >= 10) return;
  removeErrorMsg();
  let weather;
  try {
    weather = await saveDataWeather(data);
  } catch (error) {
    createErrorMsg();
    return;
  }
  createPanel(weather);
};

const saveDataWeather = async (data) => {
  const weather = new Weather(data);
  weather.save();
  return weather;
};
