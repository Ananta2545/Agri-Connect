import React from 'react'
import './ProfilePage.scss'
import Profile from '../../components/profile/Profile'
import BackToHome from '../../components/backToHome/BackToHome'

const ProfilePage = () => {
  return (
    <div className='profile-page-container'>
        <Profile/>
        <BackToHome/>
    </div>
  )
}

export default ProfilePage