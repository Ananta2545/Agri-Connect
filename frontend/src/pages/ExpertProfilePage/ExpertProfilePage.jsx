import React from 'react'
import ExpertProfile from '../../components/expertProfile/ExpertProfile'
import './ExpertProfilePage.scss'
import BackToExpertHome from '../../components/backToExpertHome/BackToExpertHome'

const ExpertProfilePage = () => {
  return (
    <div className='expert-profile-page'>
       
        <div className="top">
            <ExpertProfile/>
        </div>
        <div className="bottom">
          <BackToExpertHome/>
        </div>
    </div>
  )
}

export default ExpertProfilePage
