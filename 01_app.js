import { apiKey } from "./secrets.js";
import { locationAndWeatherObject, resetLocationAndWeatherObject } from "./03_weatherObject.js"

//Celcius/Farenheit Switch
function measurementUnitChange() {
    (locationAndWeatherObject.measurement === "metric") ? locationAndWeatherObject.measurement = "imperial" : locationAndWeatherObject.measurement = "metric";
}
const unitSwitchFC = document.querySelector('.switchFC');
unitSwitchFC.addEventListener('click', measurementUnitChange);

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
    let urlWeatherData = `https://api.openweathermap.org/data/2.5/onecall?lat=${locationAndWeatherObject.latitude}&lon=${locationAndWeatherObject.longitude}&exclude=minutely&units=${locationAndWeatherObject.measurement}&appid=${apiKey.API_KEY_OPEN_WEATHER}`;
    const getWeather = async function () {
        try {
            const response = await fetch(urlWeatherData, { mode: 'cors' });
            const data = await response.json();
            console.log("Weather data fetch successfull.")
            locationAndWeatherObject.dateTime = data.current.dt;
            locationAndWeatherObject.tempNow = data.current.temp;
            locationAndWeatherObject.weatherIdNow = data.current.weather[0].id;
            locationAndWeatherObject.weatherDescriptionNow = data.current.weather[0].description;
            locationAndWeatherObject.tempTodayMax = data.daily[0].temp.max;
            locationAndWeatherObject.tempTodayMin = data.daily[0].temp.min;
            locationAndWeatherObject.humidity = data.current.humidity;
            locationAndWeatherObject.feelsLike = data.current.feels_like;
            locationAndWeatherObject.wind = data.current.wind_speed;
            locationAndWeatherObject.hourly = [
                [data.hourly[0].dt, data.hourly[0].weather[0].id, data.hourly[0].temp],
                [data.hourly[1].dt, data.hourly[1].weather[0].id, data.hourly[1].temp],
                [data.hourly[2].dt, data.hourly[2].weather[0].id, data.hourly[2].temp],
                [data.hourly[3].dt, data.hourly[3].weather[0].id, data.hourly[3].temp],
                [data.hourly[4].dt, data.hourly[4].weather[0].id, data.hourly[4].temp],
            ] //time stamp, id, temperature 
            locationAndWeatherObject.daily = [
                [data.daily[0].dt, data.daily[0].weather[0].id, data.daily[0].temp.max, data.daily[0].temp.min],
                [data.daily[1].dt, data.daily[1].weather[0].id, data.daily[1].temp.max, data.daily[1].temp.min],
                [data.daily[2].dt, data.daily[2].weather[0].id, data.daily[2].temp.max, data.daily[2].temp.min],
                [data.daily[3].dt, data.daily[3].weather[0].id, data.daily[3].temp.max, data.daily[3].temp.min],
                [data.daily[4].dt, data.daily[4].weather[0].id, data.daily[4].temp.max, data.daily[4].temp.min],
            ] //time stamp, id, temperature max, temperature min

            console.log("curr date time" + data.current.dt); //ok
            console.log("weather tomorrow (1) date " + data.daily[1].dt);
            console.log(data);

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
        resetLocationAndWeatherObject();
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
        timeout: 5000, // ************allowed time for geolocation to process
        enableHighAccuracy: true,
    };
    //browser location
    function getBrowserLocation() {
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(success, error, options) : defaultLocation(); //delayed response
        //console.log(lat + "," + long + "maybe here") //logs twice because of delay in coordinate receipt
    }
    getBrowserLocation()
})()

//Forward Geocoding: converts free-text address or place to location data. Uses Forward Geocoding API from https://positionstack.com
const searchAddress = (function () {
    const getCoords = async function (theQuery) {
        let myQuery = theQuery;
        let urlPositionStack = `http://api.positionstack.com/v1/forward?access_key=${apiKey.API_KEY_POSITION_STACK}&query=${myQuery}&bbox_module=1&output=json`;
        try {
            const response = await fetch(urlPositionStack, { mode: 'cors' });
            const data = await response.json();
            console.log("Coordinates data fetch successfull.")
            console.log(data)
            console.log(data.data[0].label);
            console.log(data.data[0].latitude.toString())
            console.log(data.data[0].longitude.toString())
        } catch (error) {
            console.warn(`ERROR(${error.code}) in retrieving forward geocoding data: ${error.message}`);
        }
    }
    return { getCoords }
})()

searchAddress.getCoords("Oberkirch, Switzerland");


//Getting user's time
// const settingLocalDateTime = (function () {
//     const dateTime = new Date();
// const date =
//     console.log(d);
// })()

