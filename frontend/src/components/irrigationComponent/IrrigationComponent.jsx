// src/components/IrrigationComponent/IrrigationForm.jsx
import React, { useState, useEffect } from 'react';
import newRequest from '../../utils/newRequest.js';
import './IrrigationComponent.scss';

const IrrigationForm = () => {
  const [cropId, setCropId] = useState('');
  const [crops, setCrops] = useState([]);
  const [month, setMonth] = useState('');
  const [waterUsage, setWaterUsage] = useState(0);
  const [forecastedUsage, setForecastedUsage] = useState(0);
  const [message, setMessage] = useState('');

  // Fetch available crops from the backend
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await newRequest.get('/api/crops');
        setCrops(response.data);
      } catch (error) {
        console.error('Error fetching crops:', error);
      }
    };
    fetchCrops();
  }, []);

  const resetForm = () => {
    setCropId('');
    setMonth('');
    setWaterUsage(0);
    setForecastedUsage(0);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use cropId in the request URL to associate the data with the crop
      const response = await newRequest.post(`/api/irrigation/${cropId}/add`, {
        month,
        waterUsage,
        forecastedUsage,
      });
      setMessage('Irrigation data added successfully!');
      console.log('Irrigation data added successfully:', response.data);
      resetForm();
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Failed to add irrigation data. Please try again.');
      console.error('Error adding irrigation data:', error);
      setTimeout(() => setMessage(''), 2000);
    }
  };

  return (
    <form className="irrigation-form" onSubmit={handleSubmit}>
      <h2>Enter Irrigation Details for a Crop</h2>
      <label>
        Select Crop:
        <select
          value={cropId}
          onChange={(e) => setCropId(e.target.value)}
          required
        >
          <option value="">Select a crop</option>
          {crops.map((crop) => (
            <option key={crop._id} value={crop._id}>
              {crop.name}
            </option>
          ))}
        </select>
      </label>
      <label>
        Month:
        <input
          type="text"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          required
        />
      </label>
      <label>
        Water Usage (liters):
        <input
          type="number"
          value={waterUsage}
          onChange={(e) => setWaterUsage(Number(e.target.value))}
          required
        />
      </label>
      <label>
        Forecasted Usage (liters):
        <input
          type="number"
          value={forecastedUsage}
          onChange={(e) => setForecastedUsage(Number(e.target.value))}
          required
        />
      </label>
      {message && <p className="form-message">{message}</p>}
      <button type="submit">Submit</button>
    </form>
  );
};

export default IrrigationForm;
