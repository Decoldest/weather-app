const weatherDisplay = document.getElementById("weather-display");
const forecastDisplay = document.getElementById("forecast-display");

const units = {
  metric: ["°C", "km/h"],
  imperial: ["°F", "mph"],
};

const currentUnit = "metric";

const displayWeather = ({ ...weatherData }) => {
  const displayUnits = units[currentUnit];
  const temperature =
    currentUnit === "metric" ? weatherData.celcius : weatherData.fahrenheit;
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
    <h4>Feels like ${weatherData.feelsCelcius} ${displayUnits[0]}</h4>
    <h4>Wind Speed ${windSpeed} ${displayUnits[1]}</h4>
    <h4>Humidity ${weatherData.humidity}</h4>
    <h4>UV ${weatherData.uv}</h4>
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

    const newDayElement = document.createElement("div");
    newDayElement.innerHTML = `
    <h4>High ${currentDay.day.maxtemp_c} ${displayUnits[0]}</h4>
    <h4>Low ${currentDay.day.mintemp_c} ${displayUnits[0]}</h4>
    <h4>${precipitation}%</h4>
    <h4>${currentDay.day.condition.text}</h4>
    `;
    forecastDisplay.appendChild(newDayElement);
  }

  foreCastData.forEach(createDayForecast);
};

export { displayWeather, displayForecast };
