const apiKey = "1d51eac063923cb65d9bca8466ecba32";
const apiUrl =
    "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchbox = document.querySelector(".search input");

const searchbutton = document.querySelector(".search button");

const weatherIcon = document.querySelector(".weather-icon");

const card = document.querySelector(".card");

searchbutton.addEventListener("click", () => {
    checkWeather(searchbox.value);
});

async function checkWeather(city) {
    const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

    if (response.status == 404) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    } else {
        var data = await response.json();
        console.log(data);

        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C";

        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";

        document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

        if (data.weather[0].main === "Clouds") {
            weatherIcon.src = "images/clouds.png";
            card.style.background =
                "linear-gradient(135deg, #D3D3D3, #B0C4DE, #A9A9A9)";
        } else if (data.weather[0].main === "Clear") {
            weatherIcon.src = "images/clear.png";
            card.style.background = "linear-gradient(135deg, #87CEEB, #FFD700)";
        } else if (data.weather[0].main === "Drizzle") {
            weatherIcon.src = "images/drizzle.png";
            card.style.background =
                "linear-gradient(135deg, #B0C4DE, #4682B4, #5F9EA0);";
        } else if (data.weather[0].main === "Mist") {
            weatherIcon.src = "images/mist.png";
            card.style.background =
                "linear-gradient(135deg, #E0E0E0, #F5F5F5, #DCDCDC)";
        } else if (data.weather[0].main === "Rain") {
            weatherIcon.src = "images/rain.png";
            card.style.background =
                "linear-gradient(135deg, #5F9EA0, #4682B4, #2F4F4F)";
        } else if (data.weather[0].main === "Snow") {
            weatherIcon.src = "images/snow.png";
            card.style.background =
                "linear-gradient(135deg, #FFFFFF, #E0FFFF, #AFEEEE)";
        }

        document.querySelector(".weather").style.display = "block";
        document.querySelector(".error").style.display = "none";
    }
}
