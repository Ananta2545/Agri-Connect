// src/components/CropComponent/CropForm.jsx
import React, { useState } from 'react';
import newRequest from '../../utils/newRequest.js';
import './CropComponent.scss';

const CropForm = () => {
  const [name, setName] = useState('');
  const [growthProgress, setGrowthProgress] = useState(0);
  const [yieldData, setYieldData] = useState([{ month: '', yield: 0 }]);
  const [message, setMessage] = useState('');

  const handleYieldChange = (index, field, value) => {
    const newYieldData = [...yieldData];
    newYieldData[index][field] = value;
    setYieldData(newYieldData);
  };

  const addYieldDataField = () => {
    setYieldData([...yieldData, { month: '', yield: 0 }]);
  };

  const resetForm = () => {
    setName('');
    setGrowthProgress(0);
    setYieldData([{ month: '', yield: 0 }]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await newRequest.post('/crops/add', { name, growthProgress, yieldData });
      setMessage('Crop data added successfully!');
      resetForm();
      setTimeout(() => setMessage(''), 1000);
    } catch (error) {
      setMessage('Failed to add crop data. Please try again.');
    }
  };

  return (
    <form className="crop-form" onSubmit={handleSubmit}>
      <h2>Enter Crop Details</h2>
      <label>Crop Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      <label>Growth Progress (%):</label>
      <input type="number" value={growthProgress} onChange={(e) => setGrowthProgress(e.target.value)} required min="0" max="100" />
      <h3>Yield Data</h3>
      {yieldData.map((data, index) => (
        <div key={index}>
          <label>Month:</label>
          <input type="text" value={data.month} onChange={(e) => handleYieldChange(index, 'month', e.target.value)} required />
          <label>Yield:</label>
          <input type="number" value={data.yield} onChange={(e) => handleYieldChange(index, 'yield', e.target.value)} required />
        </div>
      ))}
      {message && <p>{message}</p>}
      <button type="button" onClick={addYieldDataField}>Add Yield Data</button>
      <button type="submit">Submit</button>
    </form>
  );
};

export default CropForm;
