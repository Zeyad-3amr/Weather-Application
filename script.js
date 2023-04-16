const tomorrowbtn = document.querySelector(".tomorrow");
const yesterdaybtn = document.querySelector(".yesterday");
const yesterday = document.querySelector(".yesterday-btn");
const tomorrow = document.querySelector(".tomorrow-btn");
const search = document.querySelector(".search");
const text = document.getElementById("search-bar");
const weatherCondition = document.querySelector(".weather-conditions");
const high_low = document.querySelector(".tempreature-high-low");
const tempreature = document.querySelector(".tempreature");
const sunSetRise = document.querySelector(".sun-rise-set");
const countryName = document.querySelector(".country-name");
const timeZone = document.querySelector(".date");

let time;
let date;
let hour24;
let hour;
let month;
let day;
let capital;
let country;
let currentObj;
let isDay;
let pointer = 0;
let forecastArr;
const conditions = document.querySelector(".conditions");

const getWeather = async function (country) {
  try {
    const res = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=40bb1bd50e9f44df86b224156221112&q=${country}&days=7&aqi=no&alerts=no`
    );
    const data = await res.json();

    const { lat: lat, lon: lon } = data.location;
    const response = await fetch(
      `https://api.timezonedb.com/v2.1/get-time-zone?key=BNKMFF79LUTH&format=json&by=position&lat=${lat}&lng=${lon}`
    );
    const timeData = await response.json();

    return {
      forecast: data.forecast.forecastday,
      location: data.location,
      timeData,
      current: data.current,
    };
  } catch (err) {
    console.error(error);
  }
};

const main = async (_country) => {
  const { forecast, location, timeData, current } = await getWeather(_country);
  console.log(forecast);
  currentObj = current;
  isDay = current.is_day;
  pointer = 0;
  forecastArr = forecast;
  console.log(timeData);
  time = timeData.formatted;
  hour24 = time.slice(11, -3);
  hour = Number(hour24.slice(0, 2));
  capital = location.name;
  country = timeData.countryCode;
  date = new Date(time);
  month = date.toLocaleString("default", { month: "long" });
  day = date.toLocaleDateString("default", { weekday: "long" });
  renderTitle();
  renderBLueContainer();
  renderGreen_container();
  renderSunSetRise();
  tomorrowButton();
  yesterdayButton_disabled();
};
main("egypt");

tomorrowbtn.addEventListener("click", () => {
  if (pointer < 2) {
    pointer += 1;
    renderGreen_container();
    renderBLueContainer();
    renderSunSetRise();
    if (pointer == 2) {
      tomorrowButton_disabled();
    } else {
      tomorrowButton();
    }
    yesterdayButton();
  }
});

yesterdaybtn.addEventListener("click", () => {
  if (pointer > 0) {
    pointer -= 1;
    renderGreen_container();
    renderBLueContainer();
    renderSunSetRise();
    tomorrowButton();
    if (pointer == 0) {
      yesterdayButton_disabled();
    } else {
      yesterdayButton();
    }
  }
});

const renderGreen_container = () => {
  conditions.innerHTML = "";
  conditions.insertAdjacentHTML(
    "beforeend",
    `
  <div class="lists">
  <ul class="list">
    <li>
      <div class="list-data">
        <p class="title">Visibility</p>
        <p class="vis">${forecastArr[pointer].day.avgvis_km} KM</p>
      </div>
    </li>
    <li>
      <div class="list-data">
        <p class="title">Wind</p>
        <p class="vis">${forecastArr[pointer].day.maxwind_kph}km/h</p>
      </div>
    </li>
    <li>
      <div class="list-data">
        <p class="title">Humidity</p>
        <p class="vis">${forecastArr[pointer].day.avghumidity}%</p>
      </div>
    </li>

  </ul>
</div>
  `
  );
};

search.addEventListener("submit", (e) => {
  e.preventDefault();
  if (text.value === "") return;
  let searchedCountry = text.value;
  main(searchedCountry);
  text.value = " ";
});

const yesterdayButton = () => {
  yesterday.innerHTML = "";
  yesterdaybtn.disabled = false;
  yesterdaybtn.style.pointerEvents = "auto";
  return yesterday.insertAdjacentHTML(
    "beforeend",
    `

  <div class="btn">
  <div class="yesterday-btn">
  <p class="yesterday-text">Yesterday</p>
  <div class="sunrise">
    <ion-icon name="sunny-outline"></ion-icon>
    <p>Sunrise</p>
    <p class="time">${forecastArr[pointer - 1].astro.sunrise}</p>
  </div>
  <div class="yesterday-tempreature">
    <p>High ${forecastArr[pointer - 1].day.maxtemp_c}°C</p>
  </div>
  <ion-icon class="backward" name="caret-back-outline"></ion-icon>
  <div class="sunset">
    <ion-icon name="moon-outline"></ion-icon>
    <p>Sunset</p>
    <p class="time">${forecastArr[pointer - 1].astro.sunset}</p>
  </div>
  <div class="yesterday-tempreature">
    <p>Low ${forecastArr[pointer - 1].day.mintemp_c}°C</p>
  </div>
</div>
</div>

  `
  );
};

const tomorrowButton = () => {
  tomorrow.innerHTML = "";
  tomorrowbtn.disabled = false;
  tomorrowbtn.style.pointerEvents = "auto";
  return tomorrow.insertAdjacentHTML(
    "beforeend",
    `<div class="btn">
    <div class="tomorrow-btn">
  <p class="tomorrow-text">Tomorrow</p>
  <div class="sunrise">
    <ion-icon name="sunny-outline"></ion-icon>
    <p>Sunrise</p>
    <p class="time">${forecastArr[pointer + 1].astro.sunrise}</p>
  </div>
  <div class="tomorrow-tempreature">
    <p>High ${forecastArr[pointer + 1].day.maxtemp_c}°C</p>
  </div>
  <ion-icon class="forward" name="caret-forward-outline"></ion-icon>
  <div class="sunset">
    <ion-icon name="moon-outline"></ion-icon>
    <p>Sunset</p>
    <p class="time">${forecastArr[pointer + 1].astro.sunset}</p>
  </div>
  <div class="tomorrow-tempreature">
    <p>Low ${forecastArr[pointer + 1].day.mintemp_c}°C</p>
  </div>
  </div>
  </div>
  `
  );
};
const yesterdayButton_disabled = function () {
  yesterday.innerHTML = "";
  yesterdaybtn.disabled = true;
  yesterdaybtn.style.pointerEvents = "none";
  return yesterday.insertAdjacentHTML(
    "beforeend",
    `
  <div class="btn">
  <div class="yesterday-btn">
  <p class="yesterday-text">Yesterday</p>
  <div class="sunrise">
    <ion-icon name="sunny-outline"></ion-icon>
    <p>Sunrise</p>
    <p class="time"></p>
  </div>
  <div class="yesterday-tempreature">
    <p></p>
  </div>
  <div class="sunset">
    <ion-icon name="moon-outline"></ion-icon>
    <p>Sunset</p>
    <p class="time"></p>
  </div>
  <div class="yesterday-tempreature">
    <p></p>
  </div>
</div>
</div>

  `
  );
};

const tomorrowButton_disabled = function () {
  tomorrow.innerHTML = "";
  tomorrowbtn.disabled = true;
  tomorrowbtn.style.pointerEvents = "none";
  return tomorrow.insertAdjacentHTML(
    "beforeend",
    `

    <div class="btn">
    <div class="tomorrow-btn">
  <p class="tomorrow-text">Tomorrow</p>
  <div class="sunrise">
    <ion-icon name="sunny-outline"></ion-icon>
    <p>Sunrise</p>
    <p </p>
  </div>
  <div class="tomorrow-tempreature">
    <p></p>
  </div>

  <div class="sunset">
  <ion-icon name="moon-outline"></ion-icon>
  <p>Sunset</p>
  <p> </p>
  </div>
  <div class="tomorrow-tempreature">
  <p></p>
  </div>
  </div>
  </div>

  `
  );
};
const renderBLueContainer = () => {
  tempreature.innerHTML = `${forecastArr[pointer].day.maxtemp_c}°C `;

  high_low.innerHTML = "";
  high_low.insertAdjacentHTML(
    "afterbegin",
    ` <p>High ${forecastArr[pointer].day.maxtemp_c}°C</p>
    <p>Low ${forecastArr[pointer].day.mintemp_c}°C</p>
  `
  );
  weatherCondition.innerHTML = "";
  weatherCondition.insertAdjacentHTML(
    `beforeend`,
    `<p>${currentObj.condition.text}</p>
    <p>feels Like ${currentObj.feelslike_c}°C</p>
    `
  );
};
const renderSunSetRise = () => {
  sunSetRise.innerHTML = "";
  if (isDay == 0) {
    sunSetRise.style.backgroundImage =
      "linear-gradient(rgba(1, 1, 1, 0.2), rgba(1, 1, 1, 0.2)), url(images/nighttime.jpg)";
  }
  if (isDay == 1) {
    sunSetRise.style.backgroundImage =
      "linear-gradient(rgba(1, 1, 1, 0.2), rgba(1, 1, 1, 0.2)), url(images/daytime.jpg)";
  }

  sunSetRise.insertAdjacentHTML(
    `beforeend`,
    `
<div class="sunrise">
  <ion-icon name="sunny-outline"></ion-icon>
  <p>Sunrise</p>
  <p class="time">${forecastArr[pointer].astro.sunrise}</p>
</div>
<div class="sunset">
<ion-icon name="moon-outline"></ion-icon>
<p>Sunset</p>
  <p class="time">${forecastArr[pointer].astro.sunset}</p>
</div>

`
  );
};

const renderTitle = () => {
  if (hour == 12 || hour == 24) {
    hour = 12;
  } else if (Number(hour) > 12 || (Number(hour) < 24 && Number)) {
    hour = hour % 12;
  }

  countryName.innerHTML = `${capital}, ${country}`;
  timeZone.innerHTML = "";
  timeZone.insertAdjacentHTML(
    "beforeend",
    `
    <p>${day}, ${month} ${date.getDay() + 1} at ${hour}${hour24.slice(2, 5)} ${
      Number(hour24.slice(0, 2)) < 12 ? "AM" : "PM"
    }</p>
  `
  );
};
