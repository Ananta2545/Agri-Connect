import React, { useState, useEffect } from 'react';
import newRequest from '../../utils/newRequest.js';
import './CropComponent.scss';

const CropForm = () => {
  const [name, setName] = useState('');
  const [growthProgress, setGrowthProgress] = useState(0);
  const [yieldData, setYieldData] = useState([{ month: '', yield: 0 }]);
  const [message, setMessage] = useState('');
  const [crops, setCrops] = useState([]); // List of existing crops
  const [selectedCrop, setSelectedCrop] = useState(''); // Selected crop for updating

  // Fetch existing crops
  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const response = await newRequest.get('/api/crops');
        setCrops(response.data);
      } catch (error) {
        console.error("Error fetching crops:", error);
      }
    };
    fetchCrops();
  }, []);

  // Populate form when a crop is selected from the dropdown
  const handleCropSelect = (e) => {
    const cropId = e.target.value;
    setSelectedCrop(cropId);
    if (cropId) {
      const selectedCropData = crops.find((crop) => crop._id === cropId);
      setName(selectedCropData.name);
      setGrowthProgress(selectedCropData.growthProgress);
      setYieldData(selectedCropData.yieldData);
    } else {
      resetForm();
    }
  };

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
    setSelectedCrop('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (selectedCrop) {
        // Update existing crop
        await newRequest.patch(`/api/crops/update/${selectedCrop}`, { name, growthProgress, yieldData });
        setMessage('Crop data updated successfully!');
      } else {
        // Add new crop
        await newRequest.post('/api/crops/add', { name, growthProgress, yieldData });
        setMessage('Crop data added successfully!');
      }
      resetForm();
      setTimeout(() => setMessage(''), 2000);
    } catch (error) {
      setMessage('Failed to submit crop data. Please try again.');
      console.error("Error submitting crop data:", error);
    }
  };

  return (
    <form className="crop-form" onSubmit={handleSubmit}>
      <h2>Enter Crop Details</h2>
      
      <label>Select Existing Crop (Optional):</label>
      <select value={selectedCrop} onChange={handleCropSelect}>
        <option value="">New Crop</option>
        {crops.map((crop) => (
          <option key={crop._id} value={crop._id}>{crop.name}</option>
        ))}
      </select>

      <label>Crop Name:</label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
      
      <label>Growth Progress (%):</label>
      <input type="number" value={growthProgress} onChange={(e) => setGrowthProgress(e.target.value)} required min="0" max="100" />

      <h3>Yield Data</h3>
      {yieldData.map((data, index) => (
        <div key={index} className="yield-data-row">
          <label>Month:</label>
          <input type="text" value={data.month} onChange={(e) => handleYieldChange(index, 'month', e.target.value)} required />
          <label>Yield:</label>
          <input type="number" value={data.yield} onChange={(e) => handleYieldChange(index, 'yield', e.target.value)} required />
        </div>
      ))}

      {message && <p className={`form-message ${message.includes('Failed') ? 'error' : ''}`}>{message}</p>}
      <button type="button" onClick={addYieldDataField}>Add Yield Data</button>
      <button type="submit">{selectedCrop ? 'Update Crop' : 'Submit'}</button>
    </form>
  );
};

export default CropForm;
