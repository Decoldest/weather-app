const errorMessage = document.getElementById('error-message');

const processWeatherData = (weatherData) => {
  const { feelslike_c: celcius, feelslike_f: farenheit, condition } = weatherData.current;
  console.log({ celcius, farenheit, condition });
};

async function getWeatherData(city) {
  try {
    const response = await
    fetch(
      `https://api.weatherapi.com/v1/current.json?key=52c4081c780640549c415817241102&q=${city}`,
      { mode: 'cors' },
    );
    const weatherData = await response.json();
    console.log(weatherData);
    if (weatherData) {
      processWeatherData(weatherData);
    }
  } catch (error) {
    errorMessage.textContent = 'Could not find city';
    alert(error);
    console.log(error);
  }
}

getWeatherData('toronto');

const searchLocationInput = document.getElementById('location');
const searchLocationButton = document.querySelector('button#search');

searchLocationButton.addEventListener('click', () => {
  const newCity = searchLocationInput.value;
  if (newCity) {
    getWeatherData(newCity);
    searchLocationInput.value = '';
  }
});
