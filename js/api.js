// Formats city names seperated by whitespace into a format that can be used with geo API
async function formatCity(city) {
    const cityArray = city.split(' ');
    let citySplit = "";
    for (let word of cityArray) {
        word === cityArray.at(-1) ?
        citySplit += `${word}` :
        citySplit += `${word}+`;
    }

    return citySplit;
}

// API's
export async function fetchPoint(city, state) {
    const formatedCity = await formatCity(city);

    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${formatedCity}&state=${state}&format=jsonv2`);

        
        if (!response.ok) {
            throw new Error("Fetch failed")
        }

        const data = await response.json();
        const lat = data[0]?.lat;
        const lon = data[0]?.lon;

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

// Getters
function getCurrentTemp(data) {
    return data.properties.periods[0].temperature;
}

// Formatters
export function formatTemp(temp) {
    return `${temp}° F`;
}

export default class Card {

    #point;
    #lat;
    #lon;
    #forcastHourly;
    #temp;

    constructor(city, state) {
        this.city = city;
        this.state = state;
    }

    async init() {
        this.#point = await fetchPoint(this.city, this.state);
        this.#lat = this.#point.lat;
        this.#lon = this.#point.lon;

        this.#forcastHourly = await fetchForcastHourly(await fetchWeather(this.#lat, this.#lon));
        this.#temp = await getCurrentTemp(this.#forcastHourly);
    }

    getTemp() {
        return this.#temp;
    }
}