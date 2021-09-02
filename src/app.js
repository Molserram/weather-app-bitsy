function displayTemperature(response) {
  let temperatureId = document.querySelector("#data-temperature");
  let cityId = document.querySelector("#data-city");
  let descriptionId = document.querySelector("#data-description");
  let humidityId = document.querySelector("#data-humidity");
  let windId = document.querySelector("#data-wind");

  temperatureId.innerHTML = Math.round(response.data.main.temp);
  cityId.innerHTML = response.data.name;
  descriptionId.innerHTML = response.data.weather[0].description;
  humidityId.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windId.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
}
let apiKey = "8ae46e027dbc4c00e587ee2e164d9555";
let cityName = "Montreal";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);
