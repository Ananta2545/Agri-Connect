import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar'
import BackToHome from '../../components/backToHome/BackToHome'
import Appointments from '../../components/bookAppointments/Appointments'
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