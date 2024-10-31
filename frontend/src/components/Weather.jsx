import React, { useEffect, useState } from 'react'
import './Weather.scss'

const Weather = () => {
    const [weather, setWeather] = useState(null);
    const [city, setCity]= useState('')
    const [searchCity, setSearchCity] = useState('Kolkata');

    const API_KEY = import.meta.env.VITE_API_KEY ;
    
    useEffect(()=>{
        const fetchWeatherData = async()=>{
            try{
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric`)

                const data = await response.json();
                if(response.ok){
                    console.log(data);
                    setWeather({
                        description: data.weather[0].description,
                        temp: data.main.temp,
                        humidity: data.main.humidity,
                        windSpeed: data.wind.speed,
                        pressure: data.main.pressure,
                        visibility: data.visibility,
                        cloudiness: data.clouds.all,
                        sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(), // this is the sunrise time
                        sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(), // this is the sunset time
                        feels_like: data.main.feels_like,
                        windDirection: data.wind.deg,
                        weatherIcon: data.weather[0].weatherIcon
                    });
                }
                else{
                    setWeather(null);
                    console.log("City not found");
                }
            }catch(err){
                console.log("Error fetching weather data: ", err)
            }
        }

        fetchWeatherData();
    },[searchCity, API_KEY])


    const handleCityChange = (e) => setCity(e.target.value);
    const handleSearch = ()=>city && setSearchCity(city);

  return (
    <div className="weather-home">
        <div className="weather-dashboard">
            <h2>Weather Report</h2>
            <div className="search-section">
                <input type="text" placeholder='Enter your city name' value={city} onChange={handleCityChange} />
                <button onClick={handleSearch}>Search</button>
            </div>
            {
                weather? (
                    <div className="weather-details">
                        <p>{weather.description}</p>
                        <p>Temperature: {weather.temp}°C</p>
                        <p>Feels Like: {weather.feels_like}°C</p>
                        <p>Humidity: {weather.humidity}%</p>
                        <p>Pressure: {weather.pressure} hPa</p>
                        <p>Wind Speed: {weather.windSpeed} km/h</p>
                        <p>Wind Direction: {weather.windDirection}°</p>
                        <p>Visibility: {weather.visibility} km</p>
                        <p>Cloudiness: {weather.cloudiness}%</p>
                        <p>Sunrise: {weather.sunrise}</p>
                        <p>Sunset: {weather.sunset}</p>
                    </div>
                ):(
                    <p>Loading...</p>
                )
            }
        </div>
    </div>
  )
}

export default Weather