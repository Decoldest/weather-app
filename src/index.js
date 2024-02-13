import _ from "lodash";

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
    condition,
  } = weatherData.current;
  console.log({
    celcius,
    feelsCelcius,
    farenheit,
    feelsFarenheit,
    windK,
    windM,
    humidity,
    condition,
  });
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

getWeatherData("toronto");

const searchLocationInput = document.getElementById("location");
const searchLocationButton = document.querySelector("button#search");

searchLocationButton.addEventListener("click", () => {
  const newCity = searchLocationInput.value;
  if (newCity) {
    console.log(newCity);
    getWeatherData(newCity);
    searchLocationInput.value = "";
  }
});
