import React, { useState, useEffect } from 'react';
import newRequest from '../../utils/newRequest.js';
import './ExpertProfile.scss';

const ExpertProfile = () => {
  const [user, setUser] = useState({});
  const [expertDetails, setExpertDetails] = useState({
    expertStats: { successfulAppointments: 0, farmersHelped: 0, experience: 0, rating: 0 },
    appointmentStats: { 
      totalAppointments: 0, 
      satisfactionRating: 0, 
      adviceAreas: { cropManagement: 0, pestControl: 0, irrigation: 0 } 
    },
    blogEngagement: { views: 0, comments: 0, likes: 0 }
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await newRequest.get('/api/expert-details/user/profile');
        console.log('User profile fetched:', response.data); // Log user data
        setUser(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchExpertDetails = async () => {
      if (user._id) {
        console.log('Fetching expert details for user ID:', user._id); // Log user._id before making the request
        try {
          const response = await newRequest.get(`/api/expert-details/${user._id}`);
          console.log('Expert details fetched:', response.data); // Log expert details
          if (response.data) {
            setExpertDetails(response.data); // Set fetched expert details
          }
        } catch (error) {
          console.error("Error fetching expert details:", error);
          // Handle the case where no expert details exist (by leaving default values)
        }
      } else {
        console.log('User ID not available yet. Waiting...');
      }
    };

    fetchExpertDetails();
  }, [user]);

  if (!user._id) {
    return <div>Loading...</div>; // Show loading if user._id is not available
  }

  return (
    <div className="expert-profile">
      <h2>User Profile</h2>
      <p><strong>Name:</strong> {user.name}</p>
      <p><strong>Email:</strong> {user.email}</p>
      <p><strong>Role:</strong> {user.role}</p>

      {user.role === 'expert' && (
        <>
          <h3>Expert Details</h3>

          <div className="profile-section">
            <h4>Expert Stats</h4>
            <p><strong>Successful Appointments:</strong> {expertDetails.expertStats?.successfulAppointments || 0}</p>
            <p><strong>Farmers Helped:</strong> {expertDetails.expertStats?.farmersHelped || 0}</p>
            <p><strong>Experience (years):</strong> {expertDetails.expertStats?.experience || 0}</p>
            <p><strong>Rating:</strong> {expertDetails.expertStats?.rating || 0}</p>
          </div>

          <div className="profile-section">
            <h4>Appointment Stats</h4>
            <p><strong>Total Appointments:</strong> {expertDetails.appointmentStats?.totalAppointments || 0}</p>
            <p><strong>Satisfaction Rating:</strong> {expertDetails.appointmentStats?.satisfactionRating || 0}</p>
            
            <h5>Advice Areas</h5>
            <p><strong>Crop Management:</strong> {expertDetails.appointmentStats?.adviceAreas?.cropManagement || 0}</p>
            <p><strong>Pest Control:</strong> {expertDetails.appointmentStats?.adviceAreas?.pestControl || 0}</p>
            <p><strong>Irrigation:</strong> {expertDetails.appointmentStats?.adviceAreas?.irrigation || 0}</p>
          </div>

          <div className="profile-section">
            <h4>Blog Engagement</h4>
            <p><strong>Views:</strong> {expertDetails.blogEngagement?.views || 0}</p>
            <p><strong>Comments:</strong> {expertDetails.blogEngagement?.comments || 0}</p>
            <p><strong>Likes:</strong> {expertDetails.blogEngagement?.likes || 0}</p>
          </div>
        </>
      )}
    </div>
  );
};

export default ExpertProfile;
