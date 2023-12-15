const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const monthsShort = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const monthYear = document.querySelector("#month-year");
const date = document.querySelector("#date");
const time = document.querySelector("#time");

const windSpeed = document.querySelector("#wind-speed");
const windDeg = document.querySelector("#wind-deg");
const pressure = document.querySelector("#pressure");
const humidity = document.querySelector("#humidity");

const loc = document.querySelector("#location");
const weather = document.querySelector("#weather");
const temperature = document.querySelector("#temperature");
const description = document.querySelector("#description");

const sunrise = document.querySelector("#sunrise");
const sunset = document.querySelector("#sunset");
const lastSunrise = document.querySelector("#last-sunrise");
const nextSunset = document.querySelector("#next-sunset");

const formatTime = (currentDate) => {
  const hours = currentDate.getHours();
  const minutes = currentDate.getMinutes();

  let hh = hours > 12 ? hours - 12 : hours;
  hh = hh.toString().padStart(2, "0");
  const meridiem = hours >= 12 ? "PM" : "AM";
  let mm = minutes.toString().padStart(2, "0");

  return `${hh}:${mm} ${meridiem}`;
};

const getDateAndTime = () => {
  const currentDate = new Date();

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const day = currentDate.getDate();
  const dayofTheWeek = currentDate.getDay();

  monthYear.textContent = `${months[month]} ${year}`;
  date.textContent = `${days[dayofTheWeek]}, ${monthsShort[month]} ${day}, ${year}`;
  time.textContent = formatTime(currentDate);
  // time.textContent = `02:53 PM`;
};

getDateAndTime();

setInterval(getDateAndTime, 1000);
const x = document.getElementById("demo");

///
/* function getLocations() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition);
  } else {
    x.innerHTML = "Geolocation is not supported by this browser.";
  }
}

function showPosition(position) {
  x.innerHTML = "Latitude: " + position.coords.latitude +
  "<br>Longitude: " + position.coords.longitude;
} */

let lat = 0;
let long = 0;
const OWM_APIKEY = "32d2a23752b3e6e4a2a71a9947b3ac56";

const geoLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      lat = position.coords.latitude;
      long = position.coords.longitude;

      //   alert(`The longitude is: ${long}; The lattitude is: ${lat}`);
      fetch(
        `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${OWM_APIKEY}`
      )
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          windSpeed.textContent = res.wind.speed;
          windDeg.textContent = res.wind.deg;
          pressure.textContent = res.main.pressure;
          humidity.textContent = res.main.humidity;
          temperature.textContent = Math.round(res.main.temp - 273);
          loc.textContent = res.name;
          weather.textContent = res.weather[0].main;
          description.textContent = res.weather[0].description;

          sunrise.textContent = formatTime(new Date(res.sys.sunrise * 1000));
          sunset.textContent = formatTime(new Date(res.sys.sunset * 1000));

          let hoursFromSunrise = new Date(
            Date.now() - res.sys.sunrise * 1000
          ).getHours();

          let hoursFromSunset = new Date(
            res.sys.sunset * 1000 - Date.now()
          ).getHours();

          lastSunrise.textContent = `${hoursFromSunrise} hour${
            hoursFromSunrise > 1 ? "s" : ""
          } ago`;
          nextSunset.textContent = `in ${hoursFromSunset} hour${
            hoursFromSunset > 1 ? "s" : ""
          }`;
        });
    });
  } else {
    alert("Geolocation is not supported by this browser.");
  }
};

geoLocation();
// setInterval(geoLocation, 1000);

// const api_Url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=32d2a23752b3e6e4a2a71a9947b3ac56`;
