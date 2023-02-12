function getWeather() {
    const city = document.querySelector("#city").value;
    const API_KEY = "baeb9b13b94b2ce8be345ee818a7f583";
    const API_URL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}`;

    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            const output = document.querySelector("#output");

        let forecast = "";
        for (let i = 0; i < data.list.length; i += 8) {
            const date = new Date(data.list[i].dt * 1000).toDateString();
            const tempMax = (data.list[i].main.temp_max - 273.15) * 9/5 + 32;
            const tempMin = (data.list[i].main.temp_min - 273.15) * 9/5 + 32;
            const humidity = data.list[i].main.humidity;

        forecast += `
            <h3>${date}</h3>
            <p>Temperature (max): ${tempMax.toFixed(2)}°F</p>
            <p>Temperature (min): ${tempMin.toFixed(2)}°F</p>
            <p>Humidity: ${humidity}%</p>
            <br>
          `;
        }

        output.innerHTML = forecast;
    })
        .catch(error => {
            console.error(error);
            const output = document.querySelector("#output");
            output.innerHTML = "An error occurred while fetching the weather data.";
        });
}