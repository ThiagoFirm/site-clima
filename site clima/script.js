const apikey = "1539e712d124b2562d526b6051b4e2d1"; 
const apiCountryURL = "https://flagsapi.com/BR/shiny/64.png";

const cityinput = document.querySelector("#city-input"); 
const searchBtn = document.querySelector("#search");

const cityElement = document.querySelector("#city");
const tempElement = document.querySelector("#temperature span");
const descElement = document.querySelector("#description");
const weatherElement = document.querySelector("#weather-icon");
const countryElement = document.querySelector("#country");
const humidityElement = document.querySelector("#humidity span");
const windyElement = document.querySelector("#windy span");
const bodyElement = document.body; 

const weatherContainer = document.querySelector("#weather-data");

//funcao
const showWeatherData = (data) => {
    cityElement.textContent = data.name;
    tempElement.textContent = data.main.temp;
    descElement.textContent = data.weather[0].description;
    weatherElement.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
    countryElement.src = `https://flagsapi.com/${data.sys.country}/shiny/64.png`;
    humidityElement.textContent = `${data.main.humidity}%`;
    windyElement.textContent = `${data.wind.speed} km/h`;
    bodyElement.classList.remove("sunny", "rainy", "cloudy", "default");
    weatherContainer.classList.remove("hide");

    const weatherDescription = data.weather[0].main.toLowerCase();
    if (weatherDescription.includes("rain")) {
        bodyElement.classList.add("rainy");
    } else if (weatherDescription.includes("clear")) {
        bodyElement.classList.add("sunny");
    } else if (weatherDescription.includes("clouds")) {
        bodyElement.classList.add("cloudy");
    } else {
        bodyElement.classList.add("default");
    }
};

const getWeatherData = async (city) => {
    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}&lang=pt_br`;
    
    try {
        const res = await fetch(apiWeatherURL);
        if (!res.ok) {
            throw new Error("Cidade não encontrada");
        }
        const data = await res.json();
        console.log(data);

        showWeatherData(data);
    } catch (error) {
        console.error("Erro ao buscar dados do clima:", error);
        alert("Erro ao buscar dados do clima: " + error.message);
    }
};

searchBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const city = cityinput.value;
    getWeatherData(city);
});
