import _ from "lodash";
import { displayWeather } from "./UIDisplay";

const errorMessage = document.getElementById("error-message");

const processWeatherData = (weatherData) => {
  const {
    temp_c: celcius,
    feelslike_c: feelsCelcius,
    temp_f: farenheit,
    feelslike_f: feelsFarenheit,
    wind_kph: windK,
    wind_mph: windM,
    humidity,
    uv,
    condition,
  } = weatherData.current;

  const { name, country } = weatherData.location;

  displayWeather({
    name,
    country,
    celcius,
    feelsCelcius,
    farenheit,
    feelsFarenheit,
    windK,
    windM,
    humidity,
    uv,
    condition,
  });
};

const processForecastData = (forecastData) => {
  const days = forecastData.forecast.forecastday;
  console.log(days);
};

async function getWeatherData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=52c4081c780640549c415817241102&q=${city}`,
      { mode: "cors" },
    );
    if (response.status === 400) {
      throw new Error("Location not found");
    } else {
      const weatherData = await response.json();
      errorMessage.textContent = "";
      console.log(weatherData);
      processWeatherData(weatherData);
    }
  } catch (error) {
    errorMessage.textContent = "Location not found";
  }
}

async function getForecastData(city) {
  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=52c4081c780640549c415817241102&q=${city}&days=7`,
      { mode: "cors" },
    );
    if (response.status === 400) {
      throw new Error("Location not found");
    } else {
      const forecastData = await response.json();
      errorMessage.textContent = "";
      console.log(forecastData);
      processForecastData(forecastData);
    }
  } catch (error) {
    errorMessage.textContent = "Location not found";
  }
}

const searchLocationInput = document.getElementById("location");
const searchLocationButton = document.querySelector("button#search");

searchLocationButton.addEventListener("click", () => {
  const newCity = searchLocationInput.value;
  if (newCity) {
    console.log(newCity);
    getWeatherData(newCity);
    getForecastData(newCity);
    searchLocationInput.value = "";
  }
});

getWeatherData("toronto");
getForecastData("toronto");
