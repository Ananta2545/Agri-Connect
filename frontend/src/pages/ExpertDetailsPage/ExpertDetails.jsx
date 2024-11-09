import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ExpertDetails.scss';
import newRequest from '../../utils/newRequest';

const ExpertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expertName, setExpertName] = useState(null);

  // Fetch expert details from the backend
  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const response = await newRequest.get(`/expert-details/${id}`);
        if (response.status === 200) {
          setExpert(response.data);
        }
      } catch (err) {
        setError("An error occurred while fetching the data");
      } finally {
        setLoading(false);
      }
    };
    fetchExpertDetails();
  }, [id]);

  // Fetch all experts and find the expert by ID
  useEffect(() => {
    const fetchExpertName = async () => {
      try {
        const response = await newRequest.get('/users/experts');
        if (response.status === 200) {
          // Find the expert by ID from the fetched list
          const selectedExpert = response.data.find(expert => expert._id === id);
          setExpertName(selectedExpert); // Set the selected expert details
        }
      } catch (err) {
        setError("Failed to fetch the name");
      } finally {
        setLoading(false);
      }
    };
    fetchExpertName();
  }, [id]);

  const handleBookAppointment = () => {
    alert('Appointment booked!');
  };

  const handleStartVideoCall = () => {
    alert('Starting video call...');
  };

  // Check if expertName and expert are loaded before rendering
  if (loading) return <p>Loading Expert Details...</p>;
  if (error) return <p>{error}</p>;

  // Ensure expertName is available before trying to access expertName.name
  if (!expertName) return <p>Expert name not found</p>;

  return (
    <div className="expert-details">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="expert-info-card">
        {/* Only render the expert name if expertName is available */}
        <h2 className="expert-name">{expertName?.name || 'Unknown Expert'}</h2>
        
        {/* New Fields */}
        <div className="expert-stats">
          <p><strong>Experience:</strong> {expert?.expertStats?.experience} years</p>
          <p><strong>Successful Appointments:</strong> {expert?.expertStats?.successfulAppointments}</p>
          <p><strong>Farmers Helped:</strong> {expert?.expertStats?.farmersHelped}</p>
          <p><strong>Rating:</strong> {expert?.expertStats?.rating} / 5</p>
        </div>

        <div className="appointment-stats">
          <p><strong>Total Appointments:</strong> {expert?.appointmentStats?.totalAppointments}</p>
          <p><strong>Satisfaction Rating:</strong> {expert?.appointmentStats?.satisfactionRating} / 5</p>
          <p><strong>Advice Areas:</strong></p>
          <ul>
            <li>Crop Management: {expert?.appointmentStats?.adviceAreas?.cropManagement}</li>
            <li>Pest Control: {expert?.appointmentStats?.adviceAreas?.pestControl}</li>
            <li>Irrigation: {expert?.appointmentStats?.adviceAreas?.irrigation}</li>
          </ul>
        </div>

        <div className="blog-engagement">
          <p><strong>Blog Views:</strong> {expert?.blogEngagement?.views}</p>
          <p><strong>Blog Comments:</strong> {expert?.blogEngagement?.comments}</p>
          <p><strong>Blog Likes:</strong> {expert?.blogEngagement?.likes}</p>
        </div>
        
        <p className="expert-description">{expert?.description}</p>
        
        <div className="actions">
          <button className="book-appointment-button" onClick={handleBookAppointment}>Book Appointment</button>
          <button className="start-video-call-button" onClick={handleStartVideoCall}>Start Video Call</button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;
