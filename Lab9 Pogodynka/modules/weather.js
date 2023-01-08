let id = 1;

export class Weather {
  constructor(data) {
    this.id = id;
    this.location = data.name;
    this.county = data.sys.country;
    this.description = data.weather[0].description;
    this.temperature = Math.round(data.main.temp) - 273;
    this.humidity = data.main.humidity;
    this.wind = Math.round(data.wind.speed);
    this.icon = data.weather[0].icon;
  }

  save() {
    localStorage.setItem(id, JSON.stringify(this));
    id++;
  }
}
