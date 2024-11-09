// RequestedAppointmentList.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client';
import './RequestedAppointmentList.scss';
import newRequest from '../../utils/newRequest';

const socket = io('http://localhost:5173'); // Replace with your backend's socket server URL

const RequestedAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCalls, setActiveCalls] = useState({}); // Track active calls by appointment ID
  const navigate = useNavigate();

  // Fetch appointments for the farmer
  useEffect(() => {
    const fetchAppointments = async () => {
        try {
            const response = await newRequest.get('/appointments/farmer');
            if (response.status === 200) {
                setAppointments(response.data); // Set the appointments data
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

    // Listen for 'call-started' event from the server
    socket.on('call-started', (data) => {
        // Ensure that the received data has the appointmentId
        if (data && data.appointmentId) {
            setActiveCalls((prevCalls) => ({
                ...prevCalls,
                [data.appointmentId]: true,  // Update the activeCalls state with the appointmentId
            }));
        }
    });

    return () => {
        socket.off('call-started'); // Clean up the listener when the component unmounts
    };
}, []);

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
                
                {/* Show Join Video Call button if appointment is accepted and call has started */}
                {appointment.status === 'accepted' && activeCalls[appointment._id] && (
                  <button onClick={() => navigate(`/video-call/${appointment._id}`)}>
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
