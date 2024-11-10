import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest.js';
import './UpdateExpertProfile.scss';
import { getFormLabelUtilityClasses } from '@mui/material';

const UpdateExpertProfile = () => {
  const navigate = useNavigate();
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
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState('');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await newRequest.get('/api/expert-details/user/profile');
        setUser(response.data);
        setLoading(false)
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setLoading(false)
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchExpertDetails = async () => {
      // console.log(user._id);
      if(user._id){
        try {
            const response = await newRequest.get(`/api/expert-details/${user._id}`);
            if (response.data) {
              setExpertDetails(response.data);
              setLoading(false);
            }
          } catch (error) {
            console.error('Error fetching expert details:', error);
            setLoading(false)
          }
      }
    };

    fetchExpertDetails();
  }, [user._id]);

  const handleInputChange = (section, field, value) => {
    setExpertDetails(prevState => {
      // Check if the field contains a dot (e.g., 'adviceAreas.cropManagement')
      if (field.includes('.')) {
        const [subSection, subField] = field.split('.');
  
        return {
          ...prevState,
          [section]: {
            ...prevState[section],
            [subSection]: {
              ...prevState[section][subSection],
              [subField]: value
            }
          }
        };
      } else {
        return {
          ...prevState,
          [section]: {
            ...prevState[section],
            [field]: value
          }
        };
      }
    });
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.put(`/api/expert-details/${user._id}`, expertDetails);
      // console.log(response.data)
      if (response.status === 200) {
        setSuccessMessage('Profile updated successfully!');
        setTimeout(() => navigate('/expert-profile'), 2000);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="update-profile">
      <h2>Update Expert Profile</h2>
      <form onSubmit={handleSubmit}>
        <div className="profile-section">
          <h4>Expert Stats</h4>
          <label>
            Successful Appointments:
            <input
              type="number"
              value={expertDetails.expertStats.successfulAppointments}
              onChange={(e) => handleInputChange('expertStats', 'successfulAppointments', e.target.value)}
            />
          </label> 
          <label>
            Farmers Helped:
            <input
              type="number"
              value={expertDetails.expertStats.farmersHelped}
              onChange={(e) => handleInputChange('expertStats', 'farmersHelped', e.target.value)}
            />
          </label>
          <label>
            Experience (years):
            <input
              type="number"
              value={expertDetails.expertStats.experience}
              onChange={(e) => handleInputChange('expertStats', 'experience', e.target.value)}
            />
          </label>
          <label>
            Rating:
            <input
              type="number"
              step="0.1"
              value={expertDetails.expertStats.rating}
              onChange={(e) => handleInputChange('expertStats', 'rating', e.target.value)}
            />
          </label>
        </div>

        <div className="profile-section">
          <h4>Appointment Stats</h4>
          <label>
            Total Appointments:
            <input
              type="number"
              value={expertDetails.appointmentStats.totalAppointments}
              onChange={(e) => handleInputChange('appointmentStats', 'totalAppointments', e.target.value)}
            />
          </label>
          <label>
            Satisfaction Rating:
            <input
              type="number"
              step="0.1"
              value={expertDetails.appointmentStats.satisfactionRating}
              onChange={(e) => handleInputChange('appointmentStats', 'satisfactionRating', e.target.value)}
            />
          </label>
          <label>
            Crop Management:
            <input
              type="number"
              value={expertDetails.appointmentStats.adviceAreas.cropManagement}
              onChange={(e) => handleInputChange('appointmentStats', 'adviceAreas.cropManagement', e.target.value)}
            />
          </label>
          <label>
            Pest Control:
            <input
              type="number"
              value={expertDetails.appointmentStats.adviceAreas.pestControl}
              onChange={(e) => handleInputChange('appointmentStats', 'adviceAreas.pestControl', e.target.value)}
            />
          </label>
          <label>
            Irrigation:
            <input
              type="number"
              value={expertDetails.appointmentStats.adviceAreas.irrigation}
              onChange={(e) => handleInputChange('appointmentStats', 'adviceAreas.irrigation', e.target.value)}
            />
          </label>
        </div>

        <div className="profile-section">
          <h4>Blog Engagement</h4>
          <label>
            Views:
            <input
              type="number"
              value={expertDetails.blogEngagement.views}
              onChange={(e) => handleInputChange('blogEngagement', 'views', e.target.value)}
            />
          </label>
          <label>
            Comments:
            <input
              type="number"
              value={expertDetails.blogEngagement.comments}
              onChange={(e) => handleInputChange('blogEngagement', 'comments', e.target.value)}
            />
          </label>
          <label>
            Likes:
            <input
              type="number"
              value={expertDetails.blogEngagement.likes}
              onChange={(e) => handleInputChange('blogEngagement', 'likes', e.target.value)}
            />
          </label>
        </div>

        <button type="submit" className="updateButton">Update Profile</button>
        {successMessage && <p className="success-message">{successMessage}</p>}
      </form>
    </div>
  );
};

export default UpdateExpertProfile;
