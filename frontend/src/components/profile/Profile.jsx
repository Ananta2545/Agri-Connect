import React, { useEffect, useState } from 'react';
import './Profile.scss';
import axios from 'axios';
import newRequest from '../../utils/newRequest.js';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [farmerData, setFarmerData] = useState(null);

  // Fetch user profile and farmer details on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await newRequest.get('/farmer-details/user/profile');
        setUserData(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  useEffect(()=>{
    const fetchFarmerDetails = async ()=>{
      if(userData._id){
        try{
          const response = await newRequest.get(`/farmer-details/${userData._id}`)
           if(response.data){
            setFarmerData(response.data)
           } 

        }catch(error){
          console.error("Error fetching farmer details ",error)
        }
      }else {
        console.log('User ID not available yet. Waiting...');
      }
    }
    fetchFarmerDetails()
  },[userData])

  if (!userData || !farmerData) return <p>Loading...</p>;

  const dummyAppointments = [
    { date: '2024-11-01', purpose: 'Soil testing' },
    { date: '2024-10-20', purpose: 'Consultation for pest control' },
    { date: '2024-10-05', purpose: 'Weather forecast discussion' },
  ];

  return (
    <div className="profile-page">
      <div className="profile-header">
        <h1 className="profile-name">{userData.name}</h1>
      </div>
      <div className="profile-details">
        <p><strong>Phone Number:</strong> {farmerData.phone}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Address:</strong> {farmerData.address}</p>
        <p><strong>Region:</strong> {farmerData.region}</p>
        <p><strong>Climate:</strong> {farmerData.climate}</p>
        <p><strong>Types of Crops:</strong> {farmerData.cropNames.join(', ')}</p>
        <p><strong>Amount of Land:</strong> {farmerData.amountOfLand} acres</p>
        <p><strong>Other Details:</strong> {farmerData.otherDetails}</p>
      </div>
      <div className="profile-history">
        <h2>History of Appointment Bookings</h2>
        <ul>
          {dummyAppointments.map((appointment, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Purpose:</strong> {appointment.purpose}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
