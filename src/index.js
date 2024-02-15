import _ from "lodash";
import { displayWeather, displayForecast, changeUnits } from "./UIDisplay";

const errorMessage = document.getElementById("error-message");
let currentWeatherData;
let currentForecastData;

const processWeatherData = (weatherData) => {
  const {
    temp_c: celsius,
    feelslike_c: feelsCelsius,
    temp_f: farenheit,
    feelslike_f: feelsFarenheit,
    wind_kph: windK,
    wind_mph: windM,
    humidity,
    uv,
    condition,
  } = weatherData.current;

  const { name, country } = weatherData.location;

  currentWeatherData = {
    name,
    country,
    celsius,
    feelsCelsius,
    farenheit,
    feelsFarenheit,
    windK,
    windM,
    humidity,
    uv,
    condition,
  };

  displayWeather(currentWeatherData);
};

const processForecastData = (forecastData) => {
  currentForecastData = forecastData.forecast.forecastday;
  displayForecast(currentForecastData);
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
      // console.log(weatherData);
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
      // console.log(forecastData);
      processForecastData(forecastData);
    }
  } catch (error) {
    errorMessage.textContent = "Location not found";
  }
}

const searchLocationInput = document.getElementById("location");
const searchForm = document.getElementById("search-form");

const searchLocation = () => {
  const newCity = searchLocationInput.value;
  if (newCity) {
    getWeatherData(newCity);
    getForecastData(newCity);
    searchLocationInput.value = "";
  }
};

searchForm.addEventListener("submit", (event) => {
  event.preventDefault();
  searchLocation();
});

const temperatureInput = document.getElementById("temperature-input");
const celciusText = document.getElementById("celcius");
const farenheitText = document.getElementById("farenheit");

temperatureInput.addEventListener("change", () => {
  changeUnits();

  celciusText.classList.toggle("hidden");
  farenheitText.classList.toggle("hidden");

  displayWeather(currentWeatherData);
  displayForecast(currentForecastData);
});

getWeatherData("toronto");
getForecastData("toronto");
