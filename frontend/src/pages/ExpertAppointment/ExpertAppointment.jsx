// ExpertAppointments.js (Frontend for Expert)

import React, { useState, useEffect } from 'react';
import newRequest from '../../utils/newRequest';

const ExpertAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
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
    }, []);

    const handleAccept = async (appointmentId) => {
        try {
            const response = await newRequest.post(`/appointments/${appointmentId}/accept`);
            if (response.status === 200) {
                setAppointments(prevAppointments => 
                    prevAppointments.map(appointment => 
                        appointment._id === appointmentId 
                            ? { ...appointment, status: 'accepted' } 
                            : appointment
                    )
                );
            }
        } catch (err) {
            setError("Failed to accept appointment.");
        }
    };

    const handleDecline = async (appointmentId) => {
        try {
            const response = await newRequest.post(`/appointments/${appointmentId}/decline`);
            if (response.status === 200) {
                setAppointments(prevAppointments => 
                    prevAppointments.map(appointment => 
                        appointment._id === appointmentId 
                            ? { ...appointment, status: 'declined' } 
                            : appointment
                    )
                );
            }
        } catch (err) {
            setError("Failed to decline appointment.");
        }
    };

    if (loading) return <p>Loading appointments...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="appointments">
            <h2>Your Appointments</h2>
            <ul>
                {appointments.map(appointment => (
                    <li key={appointment._id}>
                        <p><strong>Farmer:</strong> {appointment.farmerId.name}</p>
                        <p><strong>Status:</strong> {appointment.status}</p>
                        {appointment.status !== 'accepted' && appointment.status !== 'declined' && (
                            <div>
                                <button onClick={() => handleAccept(appointment._id)}>Accept</button>
                                <button onClick={() => handleDecline(appointment._id)}>Decline</button>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpertAppointments;
