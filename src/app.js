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
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<ul>`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 5) {
      forecastHTML =
        forecastHTML +
        `<li>
                <div class="row">
                  <div class="col-4">
                    <img
                      src="http://openweathermap.org/img/wn/${
                        forecastDay.weather[0].icon
                      }@2x.png"
                      id="icon-seconday"
                      alt=""
                      width="40px"
                    />
                  </div>
                  <div class="col-4 mt-2 day-align">
                    <span class="weather-forecast-date" >${formatDay(
                      forecastDay.dt
                    )} </span>
                  </div>
                  <div class="col-4 mt-2">
                    <span class="weather-forecast-max">${Math.round(
                      forecastDay.temp.max
                    )}° | </span>
                    <span class="weather-forecast-min">${Math.round(
                      forecastDay.temp.min
                    )}°</span>
                  </div>
                </div>
              </li>
            `;
    }
  });

  forecastHTML = forecastHTML + `</ul>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "8ae46e027dbc4c00e587ee2e164d9555";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayTemperature(response) {
  let temperatureId = document.querySelector("#data-temperature");
  let cityId = document.querySelector("#data-city");
  let descriptionId = document.querySelector("#data-description");
  let humidityId = document.querySelector("#data-humidity");
  let windId = document.querySelector("#data-wind");
  let dateElement = document.querySelector("#date-info");
  let iconId = document.querySelector("#icon-main");

  celsiusTemperature = response.data.main.temp;

  temperatureId.innerHTML = Math.round(celsiusTemperature);
  cityId.innerHTML = response.data.name;
  descriptionId.innerHTML = response.data.weather[0].description;
  humidityId.innerHTML = `Humidity: ${response.data.main.humidity}%`;
  windId.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  iconId.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconId.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "8ae46e027dbc4c00e587ee2e164d9555";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#city-input");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSubmit);

search("Montserrat");
