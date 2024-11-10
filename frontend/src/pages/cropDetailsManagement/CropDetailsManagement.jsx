import React from 'react'
import Sidebar from '../../components/sidebar/Sidebar.jsx'
import './CropDetailsManagement.scss'

import BackToHome from '../../components/backToHome/BackToHome.jsx'
import CropForm from '../../components/cropComponent/CropComponent.jsx'
import IrrigationForm from '../../components/irrigationComponent/IrrigationComponent.jsx'

const CropDetailsPage = () => {
  return (
    <div className='cropManagement-container'>
        <div className="left">
            <Sidebar/>
        </div>
        <div className="right">
            <div className="top">
                <BackToHome/>
            </div>
            <div className="bottom">
                <CropForm/>
                <IrrigationForm/>
            </div>
        </div>
    </div>
  )
}

export default CropDetailsPage