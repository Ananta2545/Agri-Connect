import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../utils/socket.js';
import './RequestedAppointmentList.scss';
import newRequest from '../../utils/newRequest.js';

const RequestedAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await newRequest.get('/api/appointments/farmer');
        if (response.status === 200) {
          setAppointments(response.data);
        } else {
          console.error('Failed to fetch appointments');
        }
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointments();
  }, []);

  // Join call handler
  const handleJoinCall = (appointmentId) => {
    socket.emit('join-call', { appointmentId, role: 'farmer' });
    navigate(`/video-call/${appointmentId}`);  // Navigate to video call room
  };

  if (loading) {
    return <div>Loading appointments...</div>;
  }

  return (
    <div className="requested-appointments">
      <h2>Requested Appointments</h2>
      <div className="appointment-list">
        {appointments.length === 0 ? (
          <p>No appointments found.</p>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment._id} className="appointment-item">
              <div className="appointment-info">
                <h3>Expert: {appointment.expertId?.name}</h3>
                <p>Status: {appointment.status}</p>

                {/* Button to join call */}
                {appointment.status === 'accepted' && (
                  <button onClick={() => handleJoinCall(appointment._id)}>
                    Join Video Call
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestedAppointmentList;
