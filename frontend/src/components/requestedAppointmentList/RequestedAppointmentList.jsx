import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import socket from '../../utils/socket.js';
import './RequestedAppointmentList.scss';
import newRequest from '../../utils/newRequest';

const RequestedAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCalls, setActiveCalls] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await newRequest.get('/appointments/farmer');
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

  useEffect(() => {
    const handleJoinCall = (data) => {
      console.log('Received join-call event on farmer side:', data);
      if (data && data.appointmentId) {
        setActiveCalls((prevCalls) => ({
          ...prevCalls,
          [data.appointmentId]: true,
        }));
      }
    };

    // Debugging: log when socket listener is set up
    console.log('Setting up join-call event listener');

    socket.on('join-call', handleJoinCall);

    return () => {
      console.log('Cleaning up join-call event listener');
      socket.off('join-call', handleJoinCall);
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
