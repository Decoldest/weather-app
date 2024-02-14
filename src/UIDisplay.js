const display = document.getElementById("display");

const displayWeather = ({ ...weatherData }) => {
  display.innerHTML = `
  <div>
    <h1>${weatherData.name}</h1>
    <h3>${weatherData.country}</h3>
    <h2>${weatherData.condition.text}</h2>
    <h2>${weatherData.celcius}</h2>
  </div>
  <div>

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