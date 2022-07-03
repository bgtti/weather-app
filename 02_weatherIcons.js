//In this file: a dictionary of weather conditions, associated icons and weather id

//Since the icons provided by OpenWeather did not match my UI design, I opted to using icons from https://ionic.io
//I used te weather condition codes from https://openweathermap.org/weather-conditions#Weather-Condition-Codes-2
//and https://gist.github.com/tbranyen/62d974681dea8ee0caa1 to make the icon object.

//The weatherIcons object: the first value corresponds to the ion-icon to be displayed
//the second (and subsequent) value corresponds to the weather id given by OpenWeather's API
//in the case the value is an array with two ids, it is a range: num1>= id < num2

//The fetchWeatherIcon method takes in the weather id as a parameter, checks the group it belongs to, and spits out the name of the ion-icon.
//This name can be used as the attribute on the <ion-icon></ion-icon> html element to display the corresponding icon. (For more info on usage refer to: https://ionic.io)

export const weatherIcons = {
    sunny: ["sunny-outline", ["800", "801"], ["905"]],
    partiallyCloudy: ["partly-sunny-outline", ["801", "803"]],
    cloudy: ["cloudy-outline", ["803", "805"]],
    rainy: ["rainy-outline", ["300", "600"]],
    snowy: ["snow-outline", ["600", "700"], ["903"]],
    thunderstorm: ["thunderstorm-outline", ["200", "300"], ["771"], ["960"]],
    hurricane: ["warning-outline", ["900", "903"], ["781"], ["962"]],
    foggy: ["cloud-circle-outline", ["700", "770"]],
    windy: ["filter-outline", ["952", "960"], ["905"]],
    hail: ["keypad-outline", ["906", "907"]],
    hot: ["thermometer-outline", ["904", "905"]],

    fetchWeatherIcon: function (weatherId) {
        let weatherIcon;
        switch (true) {
            case (((weatherId >= this.sunny[1][0]) && (weatherId < this.sunny[1][1])) || (weatherId === this.sunny[2][0])):
                weatherIcon = this.sunny[0];
                break;
            case ((weatherId >= this.partiallyCloudy[1][0]) && (weatherId < this.partiallyCloudy[1][1])):
                weatherIcon = this.partiallyCloudy[0];
                break;
            case ((weatherId >= this.cloudy[1][0]) && (weatherId < this.cloudy[1][1])):
                weatherIcon = this.cloudy[0];
                break;
            case ((weatherId >= this.rainy[1][0]) && (weatherId < this.rainy[1][1])):
                weatherIcon = this.rainy[0];
                break;
            case (((weatherId >= this.snowy[1][0]) && (weatherId < this.snowy[1][1])) || (weatherId === this.snowy[2][0])):
                weatherIcon = this.snowy[0];
                break;
            case (((weatherId >= this.thunderstorm[1][0]) && (weatherId < this.thunderstorm[1][1])) || (weatherId === this.thunderstorm[2][0]) || (weatherId === this.thunderstorm[3][0])):
                weatherIcon = this.thunderstorm[0];
                break;
            case (((weatherId >= this.hurricane[1][0]) && (weatherId < this.hurricane[1][1])) || (weatherId === this.hurricane[2][0]) || (weatherId === this.hurricane[3][0])):
                weatherIcon = this.hurricane[0];
                break;
            case ((weatherId >= this.foggy[1][0]) && (weatherId < this.foggy[1][1])):
                weatherIcon = this.foggy[0];
                break;
            case (((weatherId >= this.windy[1][0]) && (weatherId < this.windy[1][1])) || (weatherId === this.windy[2][0])):
                weatherIcon = this.windy[0];
                break;
            case ((weatherId >= this.hail[1][0]) && (weatherId < this.hail[1][1])):
                weatherIcon = this.hail[0];
                break;
            case ((weatherId >= this.hot[1][0]) && (weatherId < this.hot[1][1])):
                weatherIcon = this.hot[0];
                break;
            default:
                weatherIcon = "help-outline";
                break;
        }
        return weatherIcon
    }
}
//Example: weatherIcons.fetchWeatherIcon("115")

