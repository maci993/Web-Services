const { getCityWeather, getCityWeatherByHour, getCityWeatherDaily } = require("../pkg/openweathermap");

const getForCity = async (req, res) => {
  try {
    const data = await getCityWeather(req.params.city);
    return res.status(200).send(data);
  } catch (err) {
    return res.status(500).send("Internal Server Error");
  }
};

const getForCityHourly = async (req, res) => {
    try {
        const data = await getCityWeatherByHour(req.params.city);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send("Internal Server Error");
    }
};

const getCityWeatherByDay = async (req, res) => {
    try {
        const data = await getCityWeatherDaily(req.params.city);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(500).send("Internal Sevrer Error!");
    }
};

module.exports = {
  getForCity,
  getForCityHourly,
  getCityWeatherByDay,
};