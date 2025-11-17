const submitButtonMainPage = document.getElementById("submit-button-main-page")

// TODO: Replace with API
submitButtonMainPage.addEventListener("click", () => { 
    const state = document.getElementById("state");
    const city = document.getElementById("city");

    console.log(`Clicked Submit with State: ${state.value} and City: ${city.value}.`);
}); 


// Cards
async function fetchPoint() {

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?q=Los+Angeles&format=jsonv2`)

        
        if (!response.ok) {
            throw new Error("Fetch failed")
        }

        const data = await response.json();
        const lat = data[0].lat;
        const lon = data[0].lon;

        return {lat, lon};

    }catch(error) {
        console.error(error);
    }
}

async function fetchWeather(lat, lon) {
    
    try {
        const response = await fetch(`https://api.weather.gov/points/${lat},${lon}`)

        if (response == undefined) {
            throw new Error("fetchWeather() resonse undefined");
        }

        const data = await response.json();

        return data.properties.forecastHourly;

    }catch(error) {
        console.error(error);
    }
}

async function fetchForcastHourly(stationAPI) {
    
    try {
        const resonse = await fetch(stationAPI);

        if (resonse == undefined) {
            throw new Error("fetchStation() resonse undefined");
        }

        const data = await resonse.json();

        return data;

    }catch(error) {
        console.error(error);
    }
}

function getCurrentTemp(data) {
    return data.properties.periods[0].temperature;
}

// Testing
async function test() {
    const point = await fetchPoint();

    const station = await fetchWeather(point.lat, point.lon);

    const current = await fetchForcastHourly(station);

    const temp = getCurrentTemp(current);

    const card1 = document.getElementById("popular-places-card-1");

    card1.innerHTML = `${temp}° F`;
}

test();
