import './ExpertAppointment.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../utils/socket.js'; // Use shared socket instance
import newRequest from '../../utils/newRequest.js';

const ExpertAppointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch appointments from the API
    const fetchAppointments = async () => {
      try {
        const response = await newRequest.get('/appointments/expert');
        if (response.status === 200) {
          setAppointments(response.data);
        }
      } catch (err) {
        setError("Failed to fetch appointments.");
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();

    // Clean up the listener on component unmount
    return () => {
      socket.off('join-call');
    };
  }, []);

  // Join call handler
  const handleJoinCall = (appointmentId) => {
    socket.emit('join-call', { appointmentId, role: 'expert' });
    navigate(`/video-call/${appointmentId}`);  // Navigate to video call room
  };

  if (loading) return <p>Loading appointments...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="appointments">
      <h2>Your Appointments</h2>
      <ul>
        {appointments.map((appointment) => (
          <li key={appointment._id}>
            <p><strong>Farmer:</strong> {appointment.farmerId.name}</p>
            <p><strong>Status:</strong> {appointment.status}</p>

            {/* Button to join call */}
            {appointment.status === 'accepted' && (
              <button onClick={() => handleJoinCall(appointment._id)}>Join Video Call</button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpertAppointments;
