import React from 'react'
import './ProfilePage.scss'
import Profile from '../../components/profile/Profile'
import BackToHome from '../../components/backToHome/BackToHome'
import UpdateFarmerProfileButton from '../../components/UpdateFarmerProfileButton/UpdateFarmerProfileButton'

const ProfilePage = () => {
  return (
    <div className='profile-page-container'>
        <Profile/>
        <UpdateFarmerProfileButton/>
        <BackToHome/>
    </div>
  )
}

export default ProfilePage