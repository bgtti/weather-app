The Weather App was developed as a part of the Odin Project.

Live preview: https://bgtti.github.io/weather-app/

![Preview of app](/weatherAppPreview.png)

How the Weather App works

When opening the app:

1. Try to get user's location from the browser:
   a) If getting user's location succeeds, use the Reverse Geocoding API from BigDataCloud to get the name of the city and country
   b) If getting user's location fails, use dummie data to display
2. If it gets the user's location, use the OpenWeather API to display local time and weather information

When searching for the weather of a particular city:

1. The user may type the city name, which will be queried with the OpenWeather Forward Geocoding API to return the coordinates
2. The coordinated will then be used to query the OpenWeather API to display time and weather information

The aim of this project was to get comfortable with the use of async functions in JavaScript.
Although 2 different APIs are being used, similar results could be acomplished by using the Weather API alone. Using BigDataCloud was a personal choice.

Hiding API Keys:
The 3 API keys used in this project are all free to use, but it still is good practice not to make them public.
Since this is a front-end only project, and these are all free APIs, they have been exposed.

If you plan to use this project, please do the following:

1. create a free account at https://home.openweathermap.org to get your API key
2. create a free account at https://www.bigdatacloud.com to get your API key
3. paste your own API keys in the secrets.js file

For more information about the Weather App project requirements, please refer to: https://www.theodinproject.com/lessons/node-path-javascript-weather-app
