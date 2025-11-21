import Card from './api.js';
import {formatTemp, fetchPoint} from './api.js';

const submitButtonMainPage = document.getElementById("submit-button-main-page");

// Temp Testing with submit button
submitButtonMainPage.addEventListener("click", async () => { 
    const state = document.getElementById("state");
    const city = document.getElementById("city");
    
    try {
         const point = await fetchPoint(city.value, state.value);

         if (point.lat == undefined || point.lon == undefined) {
            throw new Error("State and City parameters are invalid, try again");
         }

         window.location.href = `pages/weather.html?state=${state.value}&city=${city.value}`;

    }catch(error) {
        console.error(error);
    }
}); 

// // Formats city names seperated by whitespace into a format that can be used with geo API
// async function formatCity(city) {
//     const cityArray = city.split(' ');
//     let citySplit = "";
//     for (word of cityArray) {
//         word === cityArray.at(-1) ?
//         citySplit += `${word}` :
//         citySplit += `${word}+`;
//     }

//     return citySplit;
// }

// // API's
// async function fetchPoint(city, state) {
//     const formatedCity = await formatCity(city);

//     try {
//         const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${formatedCity}&state=${state}&format=jsonv2`);

        
//         if (!response.ok) {
//             throw new Error("Fetch failed")
//         }

//         const data = await response.json();
//         const lat = data[0]?.lat;
//         const lon = data[0]?.lon;

//         return {lat, lon};

//     }catch(error) {
//         console.error(error);
//     }
// }

// async function fetchWeather(lat, lon) {
    
//     try {
//         const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`)

//         if (response == undefined) {
//             throw new Error("fetchWeather() resonse undefined");
//         }

//         const data = await response.json();

//         return data.properties.forecastHourly;

//     }catch(error) {
//         console.error(error);
//     }
// }

// async function fetchForcastHourly(stationAPI) {
    
//     try {
//         const resonse = await fetch(stationAPI);

//         if (resonse == undefined) {
//             throw new Error("fetchStation() resonse undefined");
//         }

//         const data = await resonse.json();

//         return data;

//     }catch(error) {
//         console.error(error);
//     }
// }

// // Getters
// function getCurrentTemp(data) {
//     return data.properties.periods[0].temperature;
// }

// // Formatters
// function formatTemp(temp) {
//     return `${temp}° F`;
// }

// class Card {

//     #point;
//     #lat;
//     #lon;
//     #forcastHourly;
//     #temp;

//     constructor(city, state) {
//         this.city = city;
//         this.state = state;
//     }

//     async init() {
//         this.#point = await fetchPoint(this.city, this.state);
//         this.#lat = this.#point.lat;
//         this.#lon = this.#point.lon;

//         this.#forcastHourly = await fetchForcastHourly(await fetchWeather(this.#lat, this.#lon));
//         this.#temp = await getCurrentTemp(this.#forcastHourly);
//     }

//     getTemp() {
//         return this.#temp;
//     }
// }

async function _init() {

    // Iniialize front page cards 
    const card1 = document.getElementById("popular-places-card-1");
    const card1Obj = new Card("Los Angeles", "CA");
    await card1Obj.init();
    card1.innerHTML = formatTemp(card1Obj.getTemp());

    const card2 = document.getElementById("popular-places-card-2");
    const card2Obj = new Card("Denver", "CO");
    await card2Obj.init();
    card2.innerHTML = formatTemp(card2Obj.getTemp());

    const card3 = document.getElementById("popular-places-card-3");
    const card3Obj = new Card("Chicago", "IL");
    await card3Obj.init();
    card3.innerHTML = formatTemp(card3Obj.getTemp());

    const card4 = document.getElementById("popular-places-card-4");
    const card4Obj = new Card("New York City", "NY");
    await card4Obj.init();
    card4.innerHTML = formatTemp(card4Obj.getTemp());
}

_init();