import './ExpertAppointment.scss';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { io } from 'socket.io-client'; // Import socket.io-client
import newRequest from '../../utils/newRequest';

const socket = io('http://localhost:8000'); // Replace with your backend's socket server URL

const ExpertAppointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        // Establish socket connection
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

        // Clean up socket connection when component unmounts
        return () => {
            socket.off('call-started');
        };
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

    const handleStartCall = (appointmentId) => {
        // Emit 'start-call' event when expert clicks on "Start Video Call"
        socket.emit('start-call', { appointmentId });
        // Navigate to video call page
        navigate(`/video-call/${appointmentId}`);
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
                        
                        {/* Show Accept/Decline buttons if not yet accepted or declined */}
                        {appointment.status !== 'accepted' && appointment.status !== 'declined' && (
                            <div>
                                <button onClick={() => handleAccept(appointment._id)}>Accept</button>
                                <button onClick={() => handleDecline(appointment._id)}>Decline</button>
                            </div>
                        )}

                        {/* Show Start Video Call button if the appointment is accepted */}
                        {appointment.status === 'accepted' && (
                            <button onClick={() => handleStartCall(appointment._id)}>Start Video Call</button>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ExpertAppointments;
