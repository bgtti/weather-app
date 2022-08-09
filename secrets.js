//The APIs used in this project are free to use
//Exposing the API keys are bad practice, but done so as part of the Odin Project guidelines
//Please do not use the keys bellow. Sign up for a free account to get access to your own personal API key.

//API Keys
const apiKey = (function () {
    //API Key from https://home.openweathermap.org (using One Call API and Geocoding API)
    const API_KEY_OPEN_WEATHER = "db69635716536284309ae4b0216984f1";
    //API Key from https://www.bigdatacloud.com (Reverse Geocoding to City API)
    const API_KEY_BIG_DATA = "bdc_4d6487cd45ce4d31a11191691a7200b8"

    return {
        API_KEY_OPEN_WEATHER,
        API_KEY_BIG_DATA,
    }
})()

export { apiKey }