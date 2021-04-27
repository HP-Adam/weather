// 5e4b42d67c9b9c0dc3b293600b15c202 <- OpenWeather api key
const userInputFormEl = document.getElementById("userForm");
const userInputEl = document.getElementById("citySearch");
const currentWeatherContainer = document.getElementById(
  "currentWeatherContainer"
);
const forecastContainer = document.getElementById("forecastContainer");
const searchHistContainer = document.getElementById("searchHistContainer");
let searchHistory = [];

const loadLocalStorage = () => {
  searchHistory = JSON.parse(localStorage.getItem("weatherSearchHistory"));

  if (!searchHistory) {
    searchHistory = [];
  }
  dispSearchHistory();
};

const localStorageHandler = (city) => {
  // make sure user searched city is not already in the local storage weatherSearchHistory array
  for (let i = 0; i < searchHistory.length; i++) {
    if (city === searchHistory[i]) {
      return;
    }
  }
  searchHistory.push(city);
  localStorage.setItem("weatherSearchHistory", JSON.stringify(searchHistory));
  dispSearchHistory();
};

const searchHandler = (event) => {
  event.preventDefault();

  let userSearch = userInputEl.value.trim();

  if (userSearch) {
    getWeatherData(userSearch);
  } else {
    alert("Please enter valid a US City");
  }
};

const getWeatherData = async (userSearch) => {
  try {
    let requestCity = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${userSearch}&appid=5e4b42d67c9b9c0dc3b293600b15c202`
    );
    let dataCity = await requestCity.json();
    if (dataCity.cod < 200 || dataCity.cod > 299) {
      alert(dataCity.message);
      return;
    }

    let requestLatLon = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${dataCity.coord.lat}&lon=${dataCity.coord.lon}&exclude=minutely,hourly,alerts&units=imperial&appid=5e4b42d67c9b9c0dc3b293600b15c202`
    );
    let dataLatLon = await requestLatLon.json();
    displayWeather(dataLatLon, userSearch);
  } catch (error) {
    alert(error.message);
  }
};

const getDailyWeatherImg = (weatherCall, index) => {
  let weatherImg = "./assets/images/sunny.png";
  if (weatherCall.daily[index].weather[0].main === "Clouds") {
    weatherImg = "./assets/images/partly_cloudy.png";
  } else if (weatherCall.daily[index].weather[0].main === "Rain") {
    weatherImg = "./assets/images/rain_s_cloudy.png";
  }
  return weatherImg;
};

const displayWeather = (weatherCall, city) => {
  localStorageHandler(city.toUpperCase());
  console.log(weatherCall);

  let currentDate = moment().format("l");

  let currentWeatherImg = "./assets/images/sunny.png";
  if (weatherCall.current.weather[0].main === "Clouds") {
    currentWeatherImg = "./assets/images/partly_cloudy.png";
  } else if (weatherCall.current.weather[0].main === "Rain") {
    currentWeatherImg = "./assets/images/rain_s_cloudy.png";
  }

  currentWeatherContainer.innerHTML = `
  <div class="card">
    <h2 class="card-title">
      ${city.toUpperCase()} (${currentDate})
    </h2>
    <img src=${currentWeatherImg} class="imageStyle" />
    <p class="card-text">Temp: ${weatherCall.current.feels_like}°F</p>
    <p class="card-text">Wind: ${weatherCall.current.wind_speed}mph</p>
    <p class="card-text">Humidty: ${weatherCall.current.humidity}%</p>
    <p class="card-text">UV Index: ${weatherCall.current.uvi}</p>
  </div>
`;

  forecastContainer.innerHTML = `
  <h3>5-Day Forecast:</h3>
  <div class="row">
    <div class="card col">
      <h4 class="card-title">${moment(currentDate)
        .add(1, "days")
        .format("l")}</h4>
      <img src="${getDailyWeatherImg(weatherCall, 1)}" class="imageStyle" />
      <p class="card-text">
        Hi: ${weatherCall.daily[1].temp.max}°F
      </p>
      <p class="card-text">
        Low: ${weatherCall.daily[1].temp.min}°F
      </p>
      <p class="card-text">
        Wind: ${weatherCall.daily[1].wind_speed}mph
      </p>
      <p class="card-text">
        Humidty: ${weatherCall.daily[1].humidity}%
      </p>
    </div>
    <div class="card col">
      <h4 class="card-title">${moment(currentDate)
        .add(2, "days")
        .format("l")}</h4>
      <img src="${getDailyWeatherImg(weatherCall, 2)}" class="imageStyle" />
      <p class="card-text">
        Hi: ${weatherCall.daily[2].temp.max}°F
      </p>
      <p class="card-text">
        Low: ${weatherCall.daily[2].temp.min}°F
      </p>
      <p class="card-text">
        Wind: ${weatherCall.daily[2].wind_speed}mph
      </p>
      <p class="card-text">
        Humidty: ${weatherCall.daily[2].humidity}%
      </p>
    </div>
    <div class="card col">
      <h4 class="card-title">${moment(currentDate)
        .add(3, "days")
        .format("l")}</h4>
      <img src="${getDailyWeatherImg(weatherCall, 3)}" class="imageStyle" />
      <p class="card-text">
        Hi: ${weatherCall.daily[3].temp.max}°F
      </p>
      <p class="card-text">
        Low: ${weatherCall.daily[3].temp.min}°F
      </p>
      <p class="card-text">
        Wind: ${weatherCall.daily[3].wind_speed}mph
      </p>
      <p class="card-text">
        Humidty: ${weatherCall.daily[3].humidity}%
      </p>
    </div>
    <div class="card col">
      <h4 class="card-title">${moment(currentDate)
        .add(4, "days")
        .format("l")}</h4>
      <img src="${getDailyWeatherImg(weatherCall, 4)}" class="imageStyle" />
      <p class="card-text">
        Hi: ${weatherCall.daily[4].temp.max}°F
      </p>
      <p class="card-text">
        Low: ${weatherCall.daily[4].temp.min}°F
      </p>
      <p class="card-text">
        Wind: ${weatherCall.daily[4].wind_speed}mph
      </p>
      <p class="card-text">
        Humidty: ${weatherCall.daily[4].humidity}%
      </p>
    </div>
    <div class="card col">
      <h4 class="card-title">${moment(currentDate)
        .add(5, "days")
        .format("l")}</h4>
      <img src="${getDailyWeatherImg(weatherCall, 5)}" class="imageStyle" />
      <p class="card-text">
        Hi: ${weatherCall.daily[5].temp.max}°F
      </p>
      <p class="card-text">
        Low: ${weatherCall.daily[5].temp.min}°F
      </p>
      <p class="card-text">
        Wind: ${weatherCall.daily[5].wind_speed}mph
      </p>
      <p class="card-text">
        Humidty: ${weatherCall.daily[5].humidity}%
      </p>
    </div>
  </div>
`;
};

const dispSearchHistory = () => {
  searchHistContainer.innerHTML = "";
  searchHistory.forEach((element) => {
    histBtnEL = document.createElement("button");
    histBtnEL.setAttribute("class", "btn btn-secondary mb-1 w-100");
    histBtnEL.setAttribute("type", "button");
    histBtnEL.setAttribute("data-city", element);
    histBtnEL.setAttribute("id", element);
    histBtnEL.innerHTML = element;
    searchHistContainer.appendChild(histBtnEL);
  });
};

loadLocalStorage();
userInputFormEl.addEventListener("submit", searchHandler);
searchHistContainer.addEventListener("click", (e) => {
  getWeatherData(e.target.id);
});
