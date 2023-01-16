import { loadForecast } from './api.js';

export const createChart = (forecast) => {
  const ctx = document.getElementById('myChart');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
      datasets: [
        {
          label: '# of Votes',
          data: [12, 19, 3, 5, 2, 3],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

export const getChart = async (weather) => {
  const data = await loadForecast(weather.location);
  for (const item of data.list) {
    weather.forecastList.push(item.main.temp);
  }
  weather.save(false);
  createChart(data);
};