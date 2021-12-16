const apiKey = "a22bb3672a61767ba111ec9a163020d7";
const baseUrl = "https://api.openweathermap.org/data/2.5/weather?";
const units = "metric";

// Creating date dynamically
let date = new Date();
// let appDate = document.querySelector('.date');
let newDate = buildDate(date);

function buildDate(d) {
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    let months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

    let day = days[d.getDay()];
    let dates = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day}, ${dates} ${month} ${year}`;
}

// get the button to getWeather
const getWeather = document.querySelector('#get-weather');
getWeather.addEventListener('click', generateZipcode);

function generateZipcode(e) {
    const zip = document.querySelector('#zipcode').value;
    const country = document.querySelector('#country-code').value;
    console.log(country);
    getWeatherInfo(baseUrl, zip, country, units, apiKey);

}

// getting information from the weather website
const getWeatherInfo = async(baseUrl, zip, country, units, apiKey) => {
    const res = await fetch(`${baseUrl}zip=${zip},${country}&units=${units}&appid=${apiKey}`);
    console.log(res);

    try {
        const data = await res.json();
        data.date = newDate;
        data.feelings = document.querySelector('#feel').value;
        console.log(data);
        postData(data);
        return data;
    } catch (error) {
        console.log("error", error);
    }
};

// posting the information to the server and updating the client side
const postData = async (data) => {
    const res = await fetch('/weather/saved', {
        method: "POST",
        credentials: "same-origin",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    }).then(async (data) =>{
        const res = await fetch ('/weather');
        try {
            weatherUpdate = await res.json();
            console.log(weatherUpdate);
            document.querySelector('.date').textContent = weatherUpdate.date;
            document.querySelector('.temp').innerHTML = `${Math.round(weatherUpdate.main.temp)}<span>°C</span>`;
            document.querySelector('.humidity').textContent = weatherUpdate.main.humidity;
            document.querySelector('.location').textContent = `${weatherUpdate.name}, ${weatherUpdate.sys.country}`;
            document.querySelector('.my-feelings').textContent = weatherUpdate.feelings;
            document.querySelector('.description').textContent = weatherUpdate.weather[0].description;
            document.querySelector('.weather-icon').src = `http://openweathermap.org/img/wn/${weatherUpdate.weather[0].icon}@2x.png`;
        } catch (error) {
            console.log(error);
        }
    });
};



