import Card from './api.js';
import { formatTemp } from './api.js';

// Placeholder, should be replaced with actual API call logic.
setTimeout(async () => {
    let queryParams = getQueryParams();

    let weatherData = new Card(queryParams.city, queryParams.state);
    await weatherData.init();

    document.getElementById("temperature").textContent = formatTemp(weatherData.getTemp());

    console.log(`City: ${queryParams.city} | State ${queryParams.state}`)
}, 3000);

/*
* Get Query Params
* Assumes parameters City and State, such as '/websitePage?state=IA&city=Altoona
* Returns {city: city, state: state}
*/
function getQueryParams() {
    let params = new URLSearchParams(document.location.search);
    let state = params.get("state");
    let city = params.get("city");

    return {"city": city, "state": state};
}

/*
* onLoad
* Replace necessary DOM content with query parameters
*/
function _init() {
    let params = getQueryParams();
    let cityElem = document.getElementById("city");
    let stateElem = document.getElementById("state");
    cityElem.textContent = params.city;
    stateElem.textContent = params.state;
}

_init();