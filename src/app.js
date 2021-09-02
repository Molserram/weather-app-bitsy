function formatDate(timestamp) {
  //calculate the date
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDate()];
  return `${day} ${hours} ${minutes}`;
}

function displayTemperature(response) {
  let temperatureId = document.querySelector("#data-temperature");
  let cityId = document.querySelector("#data-city");
  let descriptionId = document.querySelector("#data-description");
  let humidityId = document.querySelector("#data-humidity");
  let windId = document.querySelector("#data-wind");
  let dateId = document.querySelector("#date");

  temperatureId.innerHTML = Math.round(response.data.main.temp);
  cityId.innerHTML = response.data.name;
  descriptionId.innerHTML = response.data.weather[0].description;
  humidityId.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windId.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateId.innerHTML = formatDate(response.data.dt * 1000);
}
let apiKey = "8ae46e027dbc4c00e587ee2e164d9555";
let cityName = "Montreal";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayTemperature);
