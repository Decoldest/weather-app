async function getWeatherData(city) {
  const response = await
  fetch(
    `https://api.weatherapi.com/v1/current.json?key=52c4081c780640549c415817241102&q=${city}`,
    { mode: 'cors' },
  );
  const weatherData = await response.json();
  console.log(weatherData);
  processWeatherData(weatherData);
}

const processWeatherData = (weatherData) => {
  const { feelslike_c: celcius, feelslike_f: farenheit, condition } = weatherData.current;
  console.log({ celcius, farenheit, condition });
};

getWeatherData('toronto');

const searchLocationInput = document.getElementById('location');
const searchLocationButton = document.querySelector('button#search');

searchLocationButton.addEventListener('click', () => {
  const newCity = searchLocationInput.value;
  if (newCity) {
    getWeatherData(newCity);
  } else {
    return;
  }
});
