import { removeErrorMsg } from './error.js';
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
  }

  save() {
    localStorage.setItem(this.id, JSON.stringify(this));
    idCount++;
  }
}

export const createWeather = async (location) => {
  const data = await loadWeather(location);
  if (localStorage.length >= 10) return;
  removeErrorMsg();
  console.log(data);
  const weather = saveDataWeather(data);
  createPanel(weather);
};

const saveDataWeather = (data) => {
  const weather = new Weather(data);
  weather.save();
  return weather;
};
