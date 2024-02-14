const weatherDisplay = document.getElementById("weather-display");
const forecastDisplay = document.getElementById("forecast-display");

const units = {
  metric: ["°C", "km/h"],
  imperial: ["°F", "mph"],
};

let currentUnit = "metric";

const displayWeather = ({ ...weatherData }) => {
  const displayUnits = units[currentUnit];
  const temperature =
    currentUnit === "metric" ? weatherData.celsius : weatherData.fahrenheit;
  const windSpeed =
    currentUnit === "metric" ? weatherData.windK : weatherData.windM;

  weatherDisplay.innerHTML = `
  <div>
    <h1>${weatherData.name}</h1>
    <h3>${weatherData.country}</h3>
    <h2>${weatherData.condition.text}</h2>
    <h2>${temperature} ${displayUnits[0]}</h2>
  </div>
  <div>
    <h4>Feels like ${weatherData.feelsCelsius} ${displayUnits[0]}</h4>
    <h4><img src="imgs/wind.png">${windSpeed} ${displayUnits[1]}</h4>
    <h4><img src="imgs/h2o.png">${weatherData.humidity}</h4>
    <h4><img src="imgs/uv.png">${weatherData.uv}</h4>
  </div>
  `;
};

function precipitationPercent(rain, snow) {
  return rain + snow > 100 ? 100 : rain + snow;
}

const displayForecast = (foreCastData) => {
  const displayUnits = units[currentUnit];

  function createDayForecast(currentDay) {
    const precipitation = precipitationPercent(
      currentDay.day.daily_chance_of_rain,
      currentDay.day.daily_chance_of_snow,
    );
    console.log(currentDay);
    const newDayElement = document.createElement("div");
    newDayElement.innerHTML = `
    <h4>High ${currentDay.day.maxtemp_c} ${displayUnits[0]}</h4>
    <h4>Low ${currentDay.day.mintemp_c} ${displayUnits[0]}</h4>
    <h4>${precipitation}%</h4>
    <h4>${currentDay.day.condition.text}</h4>
    <img src=https:${currentDay.day.condition.icon}>

    `;
    forecastDisplay.appendChild(newDayElement);
  }

  foreCastData.forEach(createDayForecast);
};

const temperatureInput = document.getElementById("temperature-input");
const celciusText = document.getElementById("celcius");
const farenheitText = document.getElementById("farenheit");

temperatureInput.addEventListener("change", function () {
  if (this.checked) {
    currentUnit = "fahrenheit";
  } else {
    currentUnit = "celcius";
  }
  celciusText.classList.toggle("hidden");
  farenheitText.classList.toggle("hidden");
});

export { displayWeather, displayForecast };
