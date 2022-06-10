//import { apiKey } from "./secrets.js";
import { locationAndWeatherObject } from "./weatherObject.js"

const settingData = (function () {
    let theLatitude = "47.15840858641071";
    let theLongitude = "8.11563130930608";
    let theMeasurementUnit = "metric";

    return {
        theLatitude,
        theLongitude,
        theMeasurementUnit
    }
})()

//Celcius Farenheit Switch
function measurementUnitChange() {
    (settingData.theMeasurementUnit === "metric") ? settingData.theMeasurementUnit = "imperial" : settingData.theMeasurementUnit = "metric";
}
const unitSwitchFC = document.querySelector('.switchFC');
unitSwitchFC.addEventListener('click', measurementUnitChange);

//Getting User's Geolocation
const settingLocation = (function () {
    let lat = "47.15840858641071";
    let long = "8.11563130930608";

    function defaultLocation() {
        console.warn("default location in use: Zurich, Switzerland")
        lat = "8.5417";
        long = "47.3769";
    }
    function success(position) {
        lat = position.coords.latitude;
        long = position.coords.longitude;
        // console.log(lat + "," + long + "here")
    }
    function error(err) {
        console.warn(`ERROR(${err.code}): ${err.message}`);
        defaultLocation();
    }
    const options = {
        timeout: 3000,
    };
    //browser location
    function getBrowserLocation() {
        navigator.geolocation ? navigator.geolocation.getCurrentPosition(success, error, options) : defaultLocation(); //delayed response
        //console.log(lat + "," + long + "maybe here") //logs twice because of delay in coordinate receipt
    }
    getBrowserLocation()

    function getCityName() {

    }
})()

//Getting user's time
// const settingLocalDateTime = (function () {
//     const dateTime = new Date();
// const date =
//     console.log(d);
// })()

//Reverse Geocoding:
// let urlReverseGeocode = `https://api.bigdatacloud.net/data/reverse-geocode?latitude=${settingData.theLatitude}&longitude=${settingData.theLongitude}&localityLanguage=en&key=${"monkey"}`; //apiKey.bigDataCloudAPIKey

// const reverseGeocode = async function () {
//     try {
//         const response = await fetch(urlReverseGeocode, { mode: 'cors' });
//         const data = await response.json();
//         console.log(data);
//     } catch (error) {
//         console.log(error);
//         if (error.status === "...") {
//             //do this
//         } else {
//             //that
//         }
//     }

// }
// reverseGeocode();

// `https://api.openweathermap.org/data/2.5/onecall?lat=${settingData.theLatitude}&lon=${settingData.theLongitude}&exclude=hourly,minutely&units=${settingData.theMeasurementUnit}&appid=${apiKey.weatherAPIKey}`


// settingData.theMeasurementUnit = "imperial";


// reverseGeocode();




//Forward Geocoding
// let myQuery = "Sao Bernardo do Campo";
// let urlForwardGeocode = `http://api.positionstack.com/v1/forward?access_key=${apiKey.positionStackAPIKey}&query=${myQuery}&bbox_module=1&output=json`;

// const forwardGeocode = async function () {
//     try {
//         const response = await fetch(urlForwardGeocode, { mode: 'cors' });
//         const data = await response.json();
//         console.log(data);
//         console.log("this " + data.data[0].latitude);
//         console.log("this " + data.data[0].country);
//         console.log("this " + data.data[0].name);
//     } catch (error) {
//         console.log(error);
//         if (error.status === "...") {
//             //do this
//         } else {
//             //that
//         }
//     }

// }
// forwardGeocode();

//Weather

// let urlWeatherForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${settingData.theLatitude}&lon=${settingData.theLongitude}&exclude=hourly,minutely&units=${settingData.theMeasurementUnit}&appid=${apiKey.weatherAPIKey}`;

// const weatherForecast = async function () {
//     try {
//         const response = await fetch(urlWeatherForecast, { mode: 'cors' });
//         const data = await response.json();
//         console.log(data);
//         console.log("this " + data.current.feels_like);
//         console.log("this " + data.current.humidity);
//         console.log("this " + data.current.wind_speed);
//         console.log("this " + data.current.temp);
//     } catch (error) {
//         console.log(error);
//         if (error.status === "...") {
//             //do this
//         } else {
//             //that
//         }
//     }

// }
// weatherForecast();

// function theWeatherData (data){
//     let {}
// }