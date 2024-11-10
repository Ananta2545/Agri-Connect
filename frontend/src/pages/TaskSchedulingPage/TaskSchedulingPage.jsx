import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import Navbar from '../../components/navbar/Navbar'
// import Weather from '../../components/Weather/Weather'
// import './WeatherReport.scss'
import './TaskSchedulingPage.scss'
import TaskSchedular from '../../components/taskSchedular/TaskSchedular.jsx'
import BackToHome from '../../components/backToHome/BackToHome.jsx'

const TaskSchedulingPage = () => {
  return (
    <div className='taskScheduling-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToHome/>
            </div>
            <div className="bottom">
                <TaskSchedular/>
            </div>
        </div>
    </div>
  )
}

export default TaskSchedulingPage