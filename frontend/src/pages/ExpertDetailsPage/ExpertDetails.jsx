import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ExpertDetails.scss';
import newRequest from '../../utils/newRequest.js';

const ExpertDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [expert, setExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [expertName, setExpertName] = useState(null);

  useEffect(() => {
    const fetchExpertDetails = async () => {
      try {
        const response = await newRequest.get(`/api/expert-details/${id}`);
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

  useEffect(() => {
    const fetchExpertName = async () => {
      try {
        const response = await newRequest.get('/api/users/experts');
        if (response.status === 200) {
          const selectedExpert = response.data.find(expert => expert._id === id);
          setExpertName(selectedExpert);
        }
      } catch (err) {
        setError("Failed to fetch the name");
      } finally {
        setLoading(false);
      }
    };
    fetchExpertName();
  }, [id]);

  const handleBookAppointment = async () => {
    try {
        const token = document.cookie.replace('token=', ''); // Retrieve the token from the cookie
        
        const response = await newRequest.post('/api/appointments/book', {
            expertId: id, // The server should get farmerId from the token in the cookie
        }, {
            headers: {
                Authorization: `Bearer ${token}`, // Pass the token in the Authorization header
            }
        });

        if (response.status === 200) {
            alert('Appointment booked successfully!');
        }
    } catch (err) {
        alert('Failed to book the appointment. Please try again later.');
    }
  };


  if (loading) return <p>Loading Expert Details...</p>;
  if (error) return <p>{error}</p>;
  if (!expertName) return <p>Expert name not found</p>;

  return (
    <div className="expert-details">
      <button onClick={() => navigate(-1)} className="back-button">← Back</button>
      <div className="expert-info-card">
        <h2 className="expert-name">{expertName?.name || 'Unknown Expert'}</h2>
        <div className="expert-stats">
          <p><strong>Experience:</strong> {expert?.expertStats?.experience} years</p>
          <p><strong>Successful Appointments:</strong> {expert?.expertStats?.successfulAppointments}</p>
          <p><strong>Farmers Helped:</strong> {expert?.expertStats?.farmersHelped}</p>
          <p><strong>Rating:</strong> {expert?.expertStats?.rating} / 5</p>
        </div>
        <p className="expert-description">{expert?.description}</p>
        <div className="actions">
          <button className="book-appointment-button" onClick={handleBookAppointment}>Book Appointment</button>
        </div>
      </div>
    </div>
  );
};

export default ExpertDetails;
