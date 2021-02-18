//Show Day & Time//

function formatDate(timestamp) {
  let date = new Date(timestamp);
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

let month = months[date.getMonth()];
  
return `${day} ${formatHours(timestamp)} ${month}`;
}


function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  return `${hours}:${minutes}`;
}


//Convert Celcius to Farenheight //

function displayFarenheightTemp(event){
event.preventDefault();
 let farenheightTemperature = (celciusTemperature *9)/5+32;  
 let tempElement = document.querySelector ("#current-temp")
 tempElement.innerHTML = Math.round(farenheightTemperature)

}

function displayCelciusTemp(event){
event.preventDefault();
let tempElement = document.querySelector ("#current-temp")
 tempElement.innerHTML = Math.round(celciusTemperature);
}

let celciusTemperature = null

let farenheightLink = document.querySelector("#farenheight-link")
farenheightLink.addEventListener("click", displayFarenheightTemp)

let celciusLink = document.querySelector("#celcius-link")
celciusLink.addEventListener("click", displayCelciusTemp)



//Show Weather Conditions == Temp, Weather Description, WindSpeed & Humditidy//

function showWeatherSearch(response) {
  console.log(response.data);
  celciusTemperature = response.data.main.temp
  document.querySelector("#current-city").innerHTML = (response.data.name)
  document.querySelector("#current-temp").innerHTML = Math.round(celciusTemperature);
  document.querySelector("#weather-description").innerHTML = response.data.weather[0].main;
  document.querySelector("#windspeed-updated-figure").innerHTML = Math.round(response.data.wind.speed);
  document.querySelector("#humidity-updated-figure").innerHTML = response.data.main.humidity;
  document.querySelector("#current-weather-icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  document.querySelector("#current-weather-icon").setAttribute("alt", `http://openweathermap.org/img/wn/${response.data.weather[0].main}@2x.png`)
  document.querySelector("#current-date-day").innerHTML = formatDate (response.data.dt * 1000);

  }



  //Show City//

function displayForecast (response){
let forecastElement = document.querySelector("#forecast");
let forecast = response.data.list[0];
forecastElement.innerHTML = `  
                <div class="col-2">
                <h3 id="time1">${formatHours(forecast.dt*1000)}</h3>
                <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
                <h5 class="degrees"><strong>${Math.round(forecast.main.temp_max)}°</strong>/ ${Math.round(forecast.main.temp_min)}°</h5>
            </div>`;


let forecast = response.data.list[1];
  forecastElement.innerHTML += `  
        <div class="col-2">
        <h3 id="time1">${formatHours(forecast.dt*1000)}</h3>
        <img src="http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png">
        <h5 class="degrees"><strong>${Math.round(forecast.main.temp_max)}°</strong>/ ${Math.round(forecast.main.temp_min)}°</h5>
 </div>`; 
}







  function search(city){
  let apiKey = "adfd65ee729dfdb8d93f0ffbb4c5f25e";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeatherSearch);


  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`
  axios.get(apiUrl).then(displayForecast);
  }


  function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search-text-input");
  search(city.value)
  }



let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


//Current Location Button   //

function getCurrentLocation (event){
  event.preventDefault();
   navigator.geolocation.getCurrentPosition(searchLocation);
}
function searchLocation (position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "adfd65ee729dfdb8d93f0ffbb4c5f25e";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${units}`

  axios.get(apiUrl).then(showWeatherSearch);
}

  let currentLocationButton = document.querySelector("#current-location-button")
  currentLocationButton.addEventListener("click", getCurrentLocation)


  search("Dublin")