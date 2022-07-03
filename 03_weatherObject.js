const locationAndWeatherObject = {
    longitude: "8.115612416666668",
    latitude: "47.15850475000001",
    city: "Zurich",
    country: "Switzerland",
    dateTime: "",
    measurement: "metric",
    tempNow: "",
    weatherIdNow: "",
    weatherDescriptionNow: "",
    tempTodayMax: "",
    tempTodayMin: "",
    humidity: "",
    feelsLike: "",
    wind: "",
    hourly: [],
    daily: [],
}

const resetLocationAndWeatherObject = function () {
    locationAndWeatherObject.longitude = "8.5417";
    locationAndWeatherObject.latitude = "47.3769";
    locationAndWeatherObject.city = "Zurich";
    locationAndWeatherObject.country = "Switzerland";
    locationAndWeatherObject.measurement = "metric";
}
export {
    locationAndWeatherObject,
    resetLocationAndWeatherObject
}

//ZUrich:
// longitude: "8.5417",
//     latitude: "47.3769",

// OBERKIRCH:
// longitude: "8.115612416666668",
//     latitude: "47.15850475000001",

//wrong
// longitude: "4444.115612416666668",
//     latitude: "4987.15850475000001",