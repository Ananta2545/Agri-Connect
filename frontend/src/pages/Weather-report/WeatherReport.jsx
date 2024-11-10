import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
// import Navbar from '../../components/navbar/Navbar'
import Weather from '../../components/Weather/Weather.jsx'
import './WeatherReport.scss'
import BackToHome from '../../components/backToHome/BackToHome.jsx'

const WeatherReport = () => {
  return (
    <div className='weather-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
              <BackToHome/>
            </div>
            <div className="bottom">
             <Weather/>
            </div>
           
        </div>
    </div>
  )
}

export default WeatherReport