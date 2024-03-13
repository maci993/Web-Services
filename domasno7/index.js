const express = require("express");
const { getSection } = require("./pkg/config");
const { getForCity, getForCityHourly, getCityWeatherByDay } = require("./handlers/weather");
const { getCharacterRickAndMorty } = require("./handlers/rickAndMorty")
const app = express();

app.get("/api/weather/:city", getForCity);
app.get("api/weather/hourly/:city", getForCityHourly);
app.get("api/weather/daily/:city", getCityWeatherByDay);

app.get("/api/rick_and_morty/character/:id", getCharacterRickAndMorty);

// server startup
app.listen(8000, (err) => {
    err ? console.log(err) : console.log("Server started at port 10000");
  });
