import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import BackToHome from '../../components/backToHome/BackToHome.jsx'
import Appointments from '../../components/bookAppointments/Appointments.jsx'
import './AppointmentPage.scss'

const AppointmentPage = () => {
  return (
    <div className='appointment-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToHome/>
            </div>
            <div className="bottom">
                <Appointments/>
            </div>
        </div>
    </div>
  )
}

export default AppointmentPage