const display = document.getElementById("display");

const units = {
  metric: ["C", "km/h"],
  imperial: ["F", "mph"],
};

let currentUnit = "metric";

const displayWeather = ({ ...weatherData }) => {
  const displayUnits = units[currentUnit];
  display.innerHTML = `
  <div>
    <h1>${weatherData.name}</h1>
    <h3>${weatherData.country}</h3>
    <h2>${weatherData.condition.text}</h2>
    <h2>${weatherData.celcius} ${displayUnits[0]}</h2>
  </div>
  <div>
  <h4>${weatherData.feelsCelcius} ${displayUnits[0]}</h4>
  <h4>${weatherData.windK} ${displayUnits[1]}</h4>
  <h4>${weatherData.humidity}</h4>
  <h4>${weatherData.uv}</h4>
  </div>
  `;
};

export { displayWeather };

// temp_c: celcius,
//     feelslike_c: feelsCelcius,
//     temp_f: farenheit,
//     feelslike_f: feelsFarenheit,
//     wind_kph: windK,
//     wind_mph: windM,
//     humidity,
//     uv,
//     condition,
