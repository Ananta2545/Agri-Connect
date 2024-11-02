import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Weather from '../../components/Weather/Weather'
import './WeatherReport.scss'

const WeatherReport = () => {
  return (
    <div className='weather-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
              <Navbar/>
            </div>
            <div className="bottom">
             <Weather className="weather"/>
            </div>
           
        </div>
    </div>
  )
}

export default WeatherReport