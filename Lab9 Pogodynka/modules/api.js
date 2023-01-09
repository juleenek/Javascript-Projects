import { createErrorMsg } from './error.js';

export const loadWeather = async (location) => {
  let key = 'a5ac7798787781b914ccdd29364dbe6e';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`;

  const options = {
    mode: 'cors',
  };

  try {
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    return jsonResponse;
  } catch (err) {
    createErrorMsg();
    return console.error(err);
  }
};

export const loadLocation = async (searchPrefix) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?sort=name&minPopulation=0000&namePrefix=${searchPrefix}&limit=1`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ca87c9b581mshf548f5073e04131p1d4601jsnf79b596036f0',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  try {
    const response = await fetch(url, options);
    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (err) {
    return console.error(err);
  }
};
