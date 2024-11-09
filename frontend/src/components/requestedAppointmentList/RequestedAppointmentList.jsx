// RequestedAppointmentList.js
import React, { useEffect, useState } from 'react';
import './RequestedAppointmentList.scss';
import newRequest from '../../utils/newRequest';

const RequestedAppointmentList = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default RequestedAppointmentList;
