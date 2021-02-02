//Show Day & Time//


let now = new Date();

let date = now.getDate();
let year = now.getFullYear();
let hours = now.getHours();
let minutes = (now.getMinutes() < 10 ? "0" : "") + now.getMinutes();
let months = [
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
    "December"
]
let month = months[now.getMonth()];

 let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"]

let day = days[now.getDay()];

let currentTime = document.querySelector("h4");
currentTime.innerHTML = `${hours}:${minutes}, ${day} ${date} ${month} ${year}`

//Show City//


function showWeatherSearch(response) {
  console.log(response.data);
  document.querySelector("#current-city").innerHTML = response.data.name;
  document.querySelector("#current-temp").innerHTML = Math.round(response.data.main.temp  );
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
}

function search(event) {
  event.preventDefault();
  let apiKey = "adfd65ee729dfdb8d93f0ffbb4c5f25e";
  let units = "metric";
  let city = document.querySelector("#search-text-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  axios.get(apiUrl).then(showWeatherSearch);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
