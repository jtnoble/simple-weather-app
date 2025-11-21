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