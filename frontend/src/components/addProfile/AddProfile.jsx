import React, { useState } from 'react';
// import axios from 'axios';
import './AddProfile.scss';
import newRequest from '../../utils/newRequest';

const AddFarmerProfile = () => {
  const [formData, setFormData] = useState({
    phone: '',
    address: '',
    region: '',
    climate: '',
    cropNames: '',
    amountOfLand: '',
    otherDetails: ''
  });
  
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post('/api/farmer-details', formData, {
        withCredentials: true, // Ensure the JWT token from cookies is included
      });
      setMessage('Profile added successfully');
      setError(null);
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred');
      setMessage(null);
    }
  };

  return (
    <div className="add-farmer-profile">
      <h2>Add Farmer Profile</h2>
      <form onSubmit={handleSubmit}>
        <label>Phone:</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />

        <label>Address:</label>
        <input
          type="text"
          name="address"
          value={formData.address}
          onChange={handleChange}
          required
        />

        <label>Region:</label>
        <input
          type="text"
          name="region"
          value={formData.region}
          onChange={handleChange}
          required
        />

        <label>Climate:</label>
        <input
          type="text"
          name="climate"
          value={formData.climate}
          onChange={handleChange}
          required
        />

        <label>Crop Names (comma-separated):</label>
        <input
          type="text"
          name="cropNames"
          value={formData.cropNames}
          onChange={handleChange}
          required
        />

        <label>Amount of Land (in acres):</label>
        <input
          type="number"
          name="amountOfLand"
          value={formData.amountOfLand}
          onChange={handleChange}
          required
        />

        <label>Other Details:</label>
        <textarea
          name="otherDetails"
          value={formData.otherDetails}
          onChange={handleChange}
        />

        <button type="submit">Add Profile</button>
      </form>
      
      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddFarmerProfile;
