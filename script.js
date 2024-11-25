const input = document.querySelector("#city");
const btn = document.getElementById("btn");

const icon = document.querySelector(".icon");
const weather = document.querySelector(".weather");
const temperature = document.querySelector(".temperature");
const description = document.querySelector(".description");

btn.addEventListener("click", function () {
    const city = input.value.trim();
    if (city) {
        getWeather(city);
    } else {
        description.innerHTML = "Please enter a city name!";
        description.style.color = "red";
    }
});

function getWeather(city) {
    const apiKey = "0c20eec5cf42c1a31d8772c280797c75";
    const apiURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiURL)
        .then((response) => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then((data) => {
            console.log(data);

            const iconCode = data.weather[0].icon;
            icon.innerHTML = `<img src="https://openweathermap.org/img/wn/${iconCode}.png" alt="Weather icon">`;

            const weatherCity = data.name;
            const weatherCountry = data.sys.country;
            weather.innerHTML = `${weatherCity}, ${weatherCountry}`;

            const weatherTemp = data.main.temp;
            temperature.innerHTML = `${Math.round(weatherTemp)}°C`;

            const weatherDesc = data.weather[0].description;
            description.innerHTML = `${weatherDesc.charAt(0).toUpperCase() + weatherDesc.slice(1)}`;
            description.style.color = "#333";
        })
        .catch((error) => {
            console.error("Error:", error);
            description.innerHTML = "Unable to fetch weather data. Please try again.";
            description.style.color = "red";
        });
}
