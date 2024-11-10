import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Profile.scss';
import newRequest from '../../utils/newRequest.js';

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [farmerData, setFarmerData] = useState(null);
  const navigate = useNavigate(); // Hook for navigation

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userResponse = await newRequest.get('/api/farmer-details/user/profile');
        setUserData(userResponse.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUserData();
  }, []);

  // Fetch farmer details if userData is available
  useEffect(() => {
    const fetchFarmerDetails = async () => {
      if (userData && userData._id) {
        try {
          const response = await newRequest.get(`/api/farmer-details/${userData._id}`);
          if (response.data) {
            setFarmerData(response.data);
          } else {
            navigate('/add-profile'); // Redirect to add profile page if no data
          }
        } catch (error) {
          console.error("Error fetching farmer details", error);
          navigate('/add-profile'); // Redirect on error (e.g., 404 if not found)
        }
      }
    };
    fetchFarmerDetails();
  }, [userData, navigate]);

  // Show loading state until data is fetched
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
