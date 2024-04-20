import React, { useState } from 'react';
import './Weather.css';
import search_icon from "../Assets/search.png";
import clear_icon from "../Assets/clear.png";
import cloud_icon from "../Assets/cloud.png";
import drizzle_icon from "../Assets/drizzle.png";
import rain_icon from "../Assets/rain.png";
import snow_icon from "../Assets/snow.png";
import wind_icon from "../Assets/wind.png";
import humidity_icon from "../Assets/humidity.png";

const Weather = () => {
    let api_key = "8e3066aca1b086d4c5c25de98adf7812";
    const [wicon, setWicon] = useState(cloud_icon);

    const search = async () => {
        const element = document.getElementsByClassName("cityInput");
        if (element[0].value === "") {
            return 0;
        }
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${element[0].value}&units=Metric&appid=${api_key}`;

        let response = await fetch(url);
        let data = await response.json();

        const humidity = document.getElementsByClassName("humidity-percent");
        const wind = document.getElementsByClassName("wind-rate");
        const temp = document.getElementsByClassName("weather-temp");
        const location = document.getElementsByClassName("weather-location");

        // Check if data.main exists before accessing data.main properties
        if (data.main) {
            humidity[0].innerHTML = data.main.humidity + " %";
            temp[0].innerHTML = Math.floor(data.main.temp) + "°c";
        }

        // Check if data.wind exists before accessing data.wind properties
        if (data.wind) {
            wind[0].innerHTML = Math.floor(data.wind.speed) + " km/h";
        }

        // Check if data.name exists before accessing data.name
        if (data.name) {
            location[0].innerHTML = data.name;
        }

        // Check if data.weather and data.weather[0] exists before accessing data.weather[0].icon
        if (data.weather && data.weather[0]) {
            const weatherIcon = data.weather[0].icon;
            if (weatherIcon === "01d" || weatherIcon === "01n") {
                setWicon(clear_icon);
            } else if (weatherIcon === "02d" || weatherIcon === "02n" || weatherIcon === "03d" || weatherIcon === "03n" || weatherIcon === "04d" || weatherIcon === "04n") {
                setWicon(cloud_icon);
            } else if (weatherIcon === "09d" || weatherIcon === "09n" || weatherIcon === "10d" || weatherIcon === "10n") {
                setWicon(rain_icon);
            } else if (weatherIcon === "13d" || weatherIcon === "13n") {
                setWicon(snow_icon);
            } else {
                setWicon(clear_icon);
            }
        }
    }

    return (
        <div className="container">
            <div className="top-bar">
                <input type="text" className='cityInput' placeholder='Search' />
                <div className="search-icon" onClick={() => { search() }}>
                    <img src={search_icon} alt="" />
                </div>
            </div>
            <div className="weather-image">
                <img src={wicon} alt="" />
            </div>
            <div className="weather-temp">24°c</div>
            <div className="weather-location">Tonk</div>
            <div className="data-container">
                <div className="element">
                    <img src={humidity_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="humidity-percent">64%</div>
                        <div className="text">Humidity</div>
                    </div>
                </div>
                <div className="element">
                    <img src={wind_icon} alt="" className='icon' />
                    <div className="data">
                        <div className="wind-rate">18 km/h</div>
                        <div className="text">Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Weather;
