// ExpertDetails.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ExpertDetails.scss';

const ExpertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  // Sample data for expert details
  const expert = {
    name: "Srijita Baksi",
    specialization: "Crop Specialist",
    experience: "10+ years",
    problemsSolved: 150,
    ratings: 4.8,
    education: "Ph.D. in Agricultural Science, XYZ University",
    languages: "English, Hindi, Bengali",
    description: "An experienced crop specialist who has been helping farmers improve their crop yield through advanced techniques.",
    image: 'https://www.pngfind.com/pngs/m/468-4686427_profile-demo-hd-png-download.png'
  };

  const handleBookAppointment = () => {
    alert('Appointment booked!');
  };

  const handleStartVideoCall = () => {
    alert('Starting video call...');
  };

  return (
    <div className="expert-details">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="expert-info-card">
        <img src={expert.image} alt={expert.name} className="expert-image" />
        <h2 className="expert-name">{expert.name}</h2>
        <p className="expert-specialization">{expert.specialization}</p>
        
        {/* New Fields */}
        <div className="expert-stats">
          <p><strong>Experience:</strong> {expert.experience}</p>
          <p><strong>Problems Solved:</strong> {expert.problemsSolved}</p>
          <p><strong>Ratings:</strong> {expert.ratings} / 5</p>
          <p><strong>Education:</strong> {expert.education}</p>
          <p><strong>Languages Spoken:</strong> {expert.languages}</p>
        </div>
        
        <p className="expert-description">{expert.description}</p>
        
        <div className="actions">
          <button className="book-appointment-button" onClick={handleBookAppointment}>Book Appointment</button>
          <button className="start-video-call-button" onClick={handleStartVideoCall}>Start Video Call</button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;
