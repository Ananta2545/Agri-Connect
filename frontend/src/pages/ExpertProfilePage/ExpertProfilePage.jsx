import React from 'react'
import ExpertProfile from '../../components/expertProfile/ExpertProfile.jsx'
import './ExpertProfilePage.scss'
import BackToExpertHome from '../../components/backToExpertHome/BackToExpertHome.jsx'
import UpdateExpertProfileButton from '../../components/UpdateExpertProfileButton/UpdateExpertProfileButton.jsx'

const ExpertProfilePage = () => {
  return (
    <div className='expert-profile-page'>
       
        <div className="top">
            <ExpertProfile/>
        </div>
        <div className="bottom">
          <UpdateExpertProfileButton/>
          <BackToExpertHome/>
        </div>
    </div>
  )
}

export default ExpertProfilePage
