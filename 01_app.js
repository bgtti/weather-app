import { apiKey } from "./secrets.js";
import { locationAndWeatherObject, resetLocationAndWeatherObject } from "./03_weatherObject.js"
import { populatingTheHTML } from "./04_displayDataHtml.js"
import { loaderDisplay } from "./XX_loader.js"

//Turning Loader on
window.addEventListener("load", () => { loaderDisplay("on") });

//Reverse Geocoding: used to convert geographic coordinates to a city / place name. Uses Big Data Cloud API from https://www.bigdatacloud.com
//getCityName sets the city and country name to the weatherObject
//more information on error handling with fetch: https://learnwithparam.com/blog/how-to-handle-fetch-errors/
const reverseGeocoding = (function () {
    let urlReverseGeocode = `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${locationAndWeatherObject.latitude}&longitude=${locationAndWeatherObject.longitude}&localityLanguage=en&key=${apiKey.API_KEY_BIG_DATA}`;
    const getCityName = async function () {
        try {
            const response = await fetch(urlReverseGeocode, { mode: 'cors' });
            const data = await response.json();
            if (data.status && data.status > 200) {
                console.warn(`Problem fetching data. Reverse Geolocation could not get city name. Latitude: ${locationAndWeatherObject.latitude}, longitude: ${locationAndWeatherObject.longitude}`)
            } else {
                console.log("Reverse Geolocation data fetch successfull.")
                data.city === "" ? locationAndWeatherObject.city = data.locality : locationAndWeatherObject.city = data.city;
                locationAndWeatherObject.country = data.countryName;
            }
        } catch (error) {
            console.warn(`ERROR(${err.code}) in Reverse Geocoding: ${err.message}`);
        }
    }
    return {
        getCityName
    }
})()

//Getting Weather information: takes in geographic coordinates to fetch weather data. Uses Open Weather API from https://home.openweathermap.org 
//saves data to weatherObject
const getWeatherData = (function () {
    const getWeather = async function () {
        let urlWeatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationAndWeatherObject.latitude}&lon=${locationAndWeatherObject.longitude}&exclude=minutely&units=${locationAndWeatherObject.measurement}&appid=${apiKey.API_KEY_OPEN_WEATHER}`;
        try {
            const response = await fetch(urlWeatherData, { mode: 'cors' });
            const data = await response.json();
            console.log("Weather data fetch successfull.")
            locationAndWeatherObject.dateTime = data.current.dt.toString();
            locationAndWeatherObject.tempNow = Math.round(data.current.temp).toString();
            locationAndWeatherObject.weatherIdNow = data.current.weather[0].id.toString();
            locationAndWeatherObject.weatherDescriptionNow = data.current.weather[0].description.toString();
            locationAndWeatherObject.tempTodayMax = Math.round(data.daily[0].temp.max).toString();
            locationAndWeatherObject.tempTodayMin = Math.round(data.daily[0].temp.min).toString();
            locationAndWeatherObject.humidity = Math.round(data.current.humidity).toString();
            locationAndWeatherObject.feelsLike = Math.round(data.current.feels_like).toString();
            locationAndWeatherObject.wind = Math.round(data.current.wind_speed).toString();
            locationAndWeatherObject.hourly = [
                [data.hourly[0].dt.toString(), data.hourly[0].weather[0].id.toString(), data.hourly[0].temp.toString()],
                [data.hourly[1].dt.toString(), data.hourly[1].weather[0].id.toString(), data.hourly[1].temp.toString()],
                [data.hourly[2].dt.toString(), data.hourly[2].weather[0].id.toString(), data.hourly[2].temp.toString()],
                [data.hourly[3].dt.toString(), data.hourly[3].weather[0].id.toString(), data.hourly[3].temp.toString()],
                [data.hourly[4].dt.toString(), data.hourly[4].weather[0].id.toString(), data.hourly[4].temp.toString()],
            ] //time stamp, id, temperature. Temperature rounding done in displayDataHtml
            locationAndWeatherObject.daily = [
                [data.daily[0].dt.toString(), data.daily[0].weather[0].id.toString(), data.daily[0].temp.max.toString(), data.daily[0].temp.min.toString()],
                [data.daily[1].dt.toString(), data.daily[1].weather[0].id.toString(), data.daily[1].temp.max.toString(), data.daily[1].temp.min.toString()],
                [data.daily[2].dt.toString(), data.daily[2].weather[0].id.toString(), data.daily[2].temp.max.toString(), data.daily[2].temp.min.toString()],
                [data.daily[3].dt.toString(), data.daily[3].weather[0].id.toString(), data.daily[3].temp.max.toString(), data.daily[3].temp.min.toString()],
                [data.daily[4].dt.toString(), data.daily[4].weather[0].id.toString(), data.daily[4].temp.max.toString(), data.daily[4].temp.min.toString()],
            ] //time stamp, id, temperature max, temperature min

            populatingTheHTML.dataToHtml()
            loaderDisplay("off")

        } catch (error) {
            console.warn(`ERROR(${error.code}) in retrieving weather data: ${error.message}`);
        }
    }
    return {
        getWeather
    }
})()

//Getting User's Geolocation
const settingLocation = (function () {
    function defaultLocation() {
        console.warn("Getting user's geolocation failed. Default location in use: Zurich, Switzerland.")
        resetLocationAndWeatherObject()
            .then(getWeatherData.getWeather())
            .catch((error) => console.warn(`Problem in setting location data. Error ${error.code}: ${error.message}`));
    }
    function success(position) {
        locationAndWeatherObject.latitude = position.coords.latitude.toString();
        locationAndWeatherObject.longitude = position.coords.longitude.toString();
        console.warn(`User's geolocation in use. Latitude: ${locationAndWeatherObject.latitude}, longitude: ${locationAndWeatherObject.longitude}`);
        reverseGeocoding.getCityName()
            .then(getWeatherData.getWeather())
            .catch((error) => console.warn(`Problem in setting location data. Error ${error.code}: ${error.message}`));
    }
    function error(error) {
        console.warn(`ERROR(${error.code}): ${error.message}`);
        defaultLocation();
    }
    const options = {
        timeout: 5000, // allowed time for geolocation to process
        enableHighAccuracy: true,
    };
    //browser location
    function getBrowserLocation() {
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(success, error, options) : defaultLocation();
    }
    getBrowserLocation()
})()

//Forward Geocoding: converts free-text address or place to location data. Uses Direct Geocoding API from https://openweathermap.org/api/geocoding-api
//Searching for location using the search input field
const searchAddress = (function () {
    const getCoords = async function (theQuery) {
        let myQuery = theQuery;
        let urlOpenWeatherGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${myQuery}&limit=1&appid=${apiKey.API_KEY_OPEN_WEATHER}`
        try {
            const response = await fetch(urlOpenWeatherGeocoding, { mode: 'cors' });
            const data = await response.json();
            console.log("Coordinates data fetch successfull.")
            console.log(data);
            locationAndWeatherObject.longitude = data[0].lon;
            locationAndWeatherObject.latitude = data[0].lat;
            locationAndWeatherObject.city = data[0].name;
            locationAndWeatherObject.country = data[0].country;
            getWeatherData.getWeather();
            populatingTheHTML.populatingCityInputField(locationAndWeatherObject.city, locationAndWeatherObject.country)
        } catch (error) {
            console.warn(`ERROR(${error.code}) in retrieving forward geocoding data: ${error.message}`);
        }
    }

    const searchBox = document.querySelector('.searchBox');
    const searchButton = document.querySelector('.searchButton');

    const searchLocation = function () {
        if (searchBox.value === "" || searchBox.value === " ") {
            return
        } else {
            console.log("Searching for address");
            loaderDisplay("on");
            getCoords(searchBox.value);
        }
    }
    searchButton.addEventListener('click', searchLocation);
    document.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            searchLocation();
        }
    })
    return { getCoords }
})()

//Celcius/Farenheit Switch
function measurementUnitChange() {
    (locationAndWeatherObject.measurement === "metric") ? locationAndWeatherObject.measurement = "imperial" : locationAndWeatherObject.measurement = "metric";
    loaderDisplay("on");
    getWeatherData.getWeather();
}
const unitSwitchFC = document.querySelector('.switchFC');
unitSwitchFC.addEventListener('click', measurementUnitChange);