export const loadWeather = async (city) => {
  let key = 'a5ac7798787781b914ccdd29364dbe6e';
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`;

  const options = {
    mode: 'cors',
  };

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return console.error(error);
  }
};

export const loadLocation = async (searchPrefix) => {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/adminDivisions?sort=-population&namePrefix=${searchPrefix}&limit=3`;

  const options = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': 'ca87c9b581mshf548f5073e04131p1d4601jsnf79b596036f0',
      'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com',
    },
  };

  const response = await fetch(url, options);
  const responseJson = await response.json();
  return responseJson.data;
};

export const loadForecast = async (city) => {
  let key = 'a5ac7798787781b914ccdd29364dbe6e';
  let url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}`;

  const options = {
    mode: 'cors',
  };

  try {
    const response = await fetch(url, options);
    const responseJson = await response.json();
    return responseJson;
  } catch (error) {
    return console.error(error);
  }
};

