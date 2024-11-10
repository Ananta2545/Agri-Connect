import React from 'react'
import './ProfilePage.scss'
import Profile from '../../components/profile/Profile.jsx'
import BackToHome from '../../components/backToHome/BackToHome.jsx'
import UpdateFarmerProfileButton from '../../components/UpdateFarmerProfileButton/UpdateFarmerProfileButton.jsx'
import AddFarmerProfile from '../../components/addProfile/AddProfile.jsx'

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