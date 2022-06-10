The Weather App was developed as a part of the Odin Project.

How the Weather App will work:

When opening the app:

1. Try to get user's location from the browser:
   a) If getting user's location succeeds, use the Reverse Geocoding API from BigDataCloud to get the name of the city and country
   b) If getting user's location fails, use dummie data to display
2. If it gets the user's location, use the OpenWeather API to display local time and weather information

When searching for the weather of a particular city:

1. The user may type the city name, which will be queried with the PositionStack Forward Geocoding API to return the coordinates
2. The coordinated will then be used to query the OpenWeather API to display time and weather information
