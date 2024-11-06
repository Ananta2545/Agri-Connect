import React from 'react';
import './Profile.scss';

const Profile = () => {
  const farmerData = {
    image: 'https://via.placeholder.com/150', // Replace with the actual image URL
    name: 'John Doe',
    phoneNumber: '+1 234 567 890',
    email: 'johndoe@example.com',
    crops: ['Wheat', 'Corn', 'Rice', 'Soybeans'],
    appointments: [
      { date: '2024-11-01', purpose: 'Soil testing' },
      { date: '2024-10-20', purpose: 'Consultation for pest control' },
      { date: '2024-10-05', purpose: 'Weather forecast discussion' },
    ],
    weatherRecommendation: 'Rain expected on November 7th - plan irrigation accordingly.',
    tasksScheduled: [
      { date: '2024-11-03', task: 'Harvest wheat field' },
      { date: '2024-11-05', task: 'Apply fertilizer to corn' },
    ],
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <div className="profile-image-container">
          <img src={farmerData.image} alt={`${farmerData.name}`} className="profile-image" />
        </div>
        <h1 className="profile-name">{farmerData.name}</h1>
      </div>
      <div className="profile-details">
        <p><strong>Phone Number:</strong> {farmerData.phoneNumber}</p>
        <p><strong>Email:</strong> {farmerData.email}</p>
        <p><strong>Types of Crops:</strong> {farmerData.crops.join(', ')}</p>
        <p><strong>Weather Recommendation:</strong> {farmerData.weatherRecommendation}</p>
      </div>
      <div className="profile-history">
        <h2>History of Appointment Bookings</h2>
        <ul>
          {farmerData.appointments.map((appointment, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {appointment.date}</p>
              <p><strong>Purpose:</strong> {appointment.purpose}</p>
            </li>
          ))}
        </ul>
      </div>
      <div className="profile-tasks">
        <h2>Scheduled Tasks</h2>
        <ul>
          {farmerData.tasksScheduled.map((task, index) => (
            <li key={index}>
              <p><strong>Date:</strong> {task.date}</p>
              <p><strong>Task:</strong> {task.task}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Profile;
