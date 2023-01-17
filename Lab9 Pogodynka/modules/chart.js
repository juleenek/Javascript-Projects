import { loadForecast } from './api.js';

let lineChart;
let isChartExists = false;
let counterData = 0;

export const createChart = (weather) => {
  const ctx = document.getElementById('myChart');
  const list = [...weather.forecastList];
  const times = [];
  const temps = [];
  isChartExists = true;
  counterData = 0;

  for (const [key, object] of Object.entries(list)) {
    if (counterData < 9) {
      const time = new Date(object.time);
      let hours = time.getHours();
      let minutes = time.getMinutes();
      if (hours < 10) hours = '0' + hours;
      if (minutes < 10) minutes = '0' + minutes;
      times.push(`${hours}:${minutes}`);
      temps.push(object.temp);
      console.log(object.temp);
    }
    counterData++;
  }

  lineChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: times,
      datasets: [
        {
          label: 'Temperature',
          data: temps,
          borderWidth: 1,
        },
      ],
    },
    options: {
      responsive: true,
      elements: {
        point: {
          radius: 8,
          hitRadius: 8,
          hoverRadius: 8,
        },
      },
    },
    
  });
};

export const getChart = async (weather) => {
  if (isChartExists) lineChart.destroy();
  const data = await loadForecast(weather.location);
  for (const item of data.list) {
    const date = new Date(item.dt * 1000);

    const forecastItem = {
      time: date,
      temp: Math.round(item.main.temp) - 273,
    };

    weather.forecastList.push(forecastItem);
  }
  weather.save(false);
  createChart(weather);
};
