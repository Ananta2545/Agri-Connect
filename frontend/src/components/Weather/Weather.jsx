import React, { useEffect, useState } from 'react';
import './Weather.scss';

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity] = useState('');
    const [searchCity, setSearchCity] = useState('Kolkata');

    const API_KEY = import.meta.env.VITE_API_KEY;

    useEffect(() => {
        const fetchWeatherData = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`);
                const data = await response.json();
                if (response.ok) {
                    setWeather({
                        description: data.weather[0].description,
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        windSpeed: data.wind.speed,
                        pressure: data.main.pressure,
                        visibility: data.visibility / 1000, // Convert to km
                        cloudiness: data.clouds.all,
                        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
                        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
                        feels_like: data.main.feels_like,
                        windDirection: data.wind.deg,
                        weatherIcon: data.weather[0].icon
                    });
                } else {
                    setWeather(null);
                    console.log('City not found');
                }
            } catch (err) {
                console.log('Error fetching weather data: ', err);
            }
        };

        fetchWeatherData();
    }, [searchCity, API_KEY]);

    const handleCityChange = (e) => setCity(e.target.value);
    const handleSearch = () => city && setSearchCity(city);

    return (
        <div className="weather-home">
            <div className="weather-dashboard">
                <h2>Weather Report for Farmers</h2>
                <div className="search-section">
                    <input
                        type="text"
                        placeholder="Enter your city name"
                        value={city}
                        onChange={handleCityChange}
                    />
                    <button onClick={handleSearch}>Search</button>
                </div>
                {weather ? (
                    <div className="weather-details">
                        <p>The current weather is described as "{weather.description}".</p>
                        <p>The temperature right now is {weather.temp}°C, which feels like {weather.feels_like}°C.</p>
                        <p>The humidity level is {weather.humidity}%, which could impact plant growth and watering needs.</p>
                        <p>The atmospheric pressure is {weather.pressure} hPa, indicating stable or changing weather conditions.</p>
                        <p>The wind is blowing at a speed of {weather.windSpeed} km/h from {weather.windDirection}° direction. Be cautious of strong winds when working outdoors.</p>
                        <p>The visibility in your area is currently {weather.visibility} km, which is good for planning field activities.</p>
                        <p>The sky is {weather.cloudiness}% covered with clouds.</p>
                        <p>The sun will rise at {weather.sunrise} and set at {weather.sunset}. Plan your day accordingly.</p>
                    </div>
                ) : (
                    <p>Loading... Please enter your city name to see the weather report.</p>
                )}
            </div>
        </div>
    );
};

export default Weather;
