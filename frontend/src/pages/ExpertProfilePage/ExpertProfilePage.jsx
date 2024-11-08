import React from 'react'
import ExpertProfile from '../../components/expertProfile/ExpertProfile'
import './ExpertProfilePage.scss'
import BackToExpertHome from '../../components/backToExpertHome/BackToExpertHome'
import UpdateExpertProfileButton from '../../components/UpdateExpertProfileButton/UpdateExpertProfileButton'

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
