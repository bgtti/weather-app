import { locationAndWeatherObject } from "./03_weatherObject.js"
import { firstLetterUppercase } from "./XX_stringHelper.js"
import { timeFormat, dateFormat } from "./XX_dateAndTime.js"
import { weatherIcons } from "./02_weatherIcons.js"

const populatingTheHTML = (function () {

    const dataToHtml = function () {

        //HTML elements: Farenheit/Celsius display 
        const objMeasurement = document.querySelectorAll(".objMeasurement"); // C or F
        let measurementUnit;
        locationAndWeatherObject.measurement === "metric" ? measurementUnit = "C" : measurementUnit = "F";
        objMeasurement.forEach(item => {
            item.textContent = measurementUnit;
        });

        //HTML elements Section 2
        const objDateNow = document.querySelector(".objDateNow");
        const objTimeNow = document.querySelector(".objTimeNow");
        //Section 2
        objDateNow.textContent = dateFormat(locationAndWeatherObject.dateTime, "WDM");
        objTimeNow.textContent = timeFormat(locationAndWeatherObject.dateTime);

        //HTML elements Section 3
        const objTempNow = document.querySelector(".objTempNow");
        const objDescriptionNow = document.querySelector(".objDescriptionNow");
        const objTempMaxNow = document.querySelector(".objTempMaxNow");
        const objTempMinNow = document.querySelector(".objTempMinNow");
        const objIconNow = document.querySelector(".objIconNow");
        const objHumidityNow = document.querySelector(".objHumidityNow");
        const objFeelsLikeNow = document.querySelector(".objFeelsLikeNow");
        const objWindSpeedNow = document.querySelector(".objWindSpeedNow");
        //Section 3
        objTempNow.textContent = locationAndWeatherObject.tempNow;
        objDescriptionNow.textContent = firstLetterUppercase(locationAndWeatherObject.weatherDescriptionNow);
        objTempMaxNow.textContent = locationAndWeatherObject.tempTodayMax;
        objTempMinNow.textContent = locationAndWeatherObject.tempTodayMin;
        objIconNow.setAttribute("name", weatherIcons.fetchWeatherIcon(locationAndWeatherObject.weatherIdNow));
        objHumidityNow.textContent = locationAndWeatherObject.humidity;
        objFeelsLikeNow.textContent = locationAndWeatherObject.feelsLike;
        objWindSpeedNow.textContent = locationAndWeatherObject.wind;

        //HTML elements Section 4
        const hrlyForecastDivContainer = document.querySelector(".hrlyForecastDivContainer"); //container for forecast divs
        //Section 4
        while (hrlyForecastDivContainer.firstChild) {
            hrlyForecastDivContainer.removeChild(hrlyForecastDivContainer.firstChild)
        }
        let theHourlyForecasts = locationAndWeatherObject.hourly;
        for (let hrlyForecast of theHourlyForecasts) {
            let hrlyForecastDiv = document.createElement("div");
            let theTime;
            (hrlyForecast === theHourlyForecasts[0]) ? theTime = "Now" : theTime = timeFormat(hrlyForecast[0], "H-12");
            hrlyForecastDiv.innerHTML = `
            <div class="forecast-div">
                <p>${theTime}</p>
                <ion-icon name=${weatherIcons.fetchWeatherIcon(hrlyForecast[1])}></ion-icon>
                <p class="font-colour-grey">${Math.round(hrlyForecast[2])}°<span class="objMeasurement">${measurementUnit}</span></p>
            </div>
`
            hrlyForecastDivContainer.append(hrlyForecastDiv);
        }

        //HTML elements Section 5
        const dailyForecastDivContainer = document.querySelector(".dailyForecastDivContainer"); //container for forecast divs
        //Section 5
        while (dailyForecastDivContainer.firstChild) {
            dailyForecastDivContainer.removeChild(dailyForecastDivContainer.firstChild)
        }
        let theDailylyForecasts = locationAndWeatherObject.daily;
        for (let dailyForecast of theDailylyForecasts) {
            let dailyForecastDiv = document.createElement("div");
            let theDay;
            (dailyForecast === theDailylyForecasts[0]) ? theDay = "Today" : theDay = dateFormat(dailyForecast[0], "W");
            dailyForecastDiv.innerHTML = `
            <div class="forecast-div">
                <p>${theDay}</p>
                <p class="forecast-date font-colour-grey">${dateFormat(dailyForecast[0], "DM")}</p>
                <ion-icon name=${weatherIcons.fetchWeatherIcon(dailyForecast[1])}></ion-icon>
                <p class="font-colour-grey">${Math.round(dailyForecast[2])}°<span class="objMeasurement">${measurementUnit}</span> / ${Math.round(dailyForecast[3])}°<span class="objMeasurement">${measurementUnit}</span></p>
            </div>
`
            dailyForecastDivContainer.append(dailyForecastDiv);
        }
    }

    return {
        dataToHtml
    }

})()

export {
    populatingTheHTML,
}