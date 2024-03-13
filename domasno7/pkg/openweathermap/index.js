// logika koja ke komunicira so openweathermap api-to
// Primitivni podatocni tipovi
// string, number, boolean

const { getSection } = require("../config");

// Ne primitvni tipovi
// functions, objects, arrays

const CACHE = {};

// CACHE = {
//     skopje: {
//         timestamp: 1800,
//         data: {}
//     },
//     strumica: {

//     },
//     stip: {

//     }
// }

// skopje: {
//   timestamp: 1800, //21:00 -> 5 minutes passed
//   data: {},
// },

const getCityWeather = async (city) => {
  console.log("CACHE", CACHE);

  let now = new Date().getTime() / 1000; // vremeto od 1 januari 1970 vo sekundi

  // console.log("now", now);

  // console.log(CACHE[city].timestamp + getSection("weather").cache_expiery);

  if (
    CACHE[city] &&
    now < CACHE[city].timestamp + getSection("weather").cache_expiery
  ) {
    return CACHE[city];
  }

  const URL = `${
    getSection("weather").API_URL
  }/weather?q=${city}&units=metric&appid=${getSection("weather").api_key}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE[city] = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

const CACHE2 = {};

const getCityWeatherByHour = async (req, res) => {
  console.log("CACHE2", CACHE2);
  let now = new Date().getTime() / 1000;

  if (
    CACHE2[city] &&
    now < CACHE2[city].timestamp + getSection("weather").cache_expiery_hour
  ) {
    return CACHE2[city];
  }

  const URL = `${
    getSection("weather").API_URL
  }/weather?q=${city}&units=metric&appid=${getSection("weather").api_key}`;

  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE2[city] = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

const CACHE3 = {};

const getCityWeatherDaily = async (city) => {
  console.log("CACHE3", CACHE3);
  let now = new Date().getTime() / 1000;

  if (
    CACHE3[city] &&
    now < CACHE3[city].timestamp + getSection("weather").cache_expiery_daily
  ) {
    return CACHE3[city];
  }
  const URL = `${
    getSection("weather").API_URL_DAILY
  }/direct?q=${city}&limit=10&appid=${getSection("weather").api_key}`;
  try {
    const res = await fetch(URL);
    const data = await res.json();

    CACHE3[city] = {
      timestamp: new Date().getTime() / 1000,
      data: data,
    };
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getCityWeather,
  getCityWeatherByHour,
  getCityWeatherDaily,
};
