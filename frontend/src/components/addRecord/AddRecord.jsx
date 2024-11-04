// src/components/AddRecord.js
import React, { useState } from 'react';
import { addRecord } from '../../utils/recordApi.js';
import './AddRecord.scss';

const AddRecord = ({ onRecordAdded }) => {
  const [date, setDate] = useState('');
  const [expenditure, setExpenditure] = useState('');
  const [earnings, setEarnings] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = { date, expenditure: parseFloat(expenditure), earnings: parseFloat(earnings) };
    console.log('Data being submitted:', data);
    try {
      await addRecord(data);
      setMessage('Record added successfully!');
      onRecordAdded();  // Callback to refresh summary if needed
      setDate('');
      setExpenditure('');
      setEarnings('');
    } catch (error) {
      // Log detailed error information
      console.error('Error adding record:', error);
      if (error.response) {
        console.error('Error response:', error.response.data);
        setMessage(`Failed to add record: ${error.response.data.message || 'Unknown error'}`);
      } else if (error.request) {
        console.error('No response received:', error.request);
        setMessage('Failed to add record: No response from server');
      } else {
        console.error('Request setup error:', error.message);
        setMessage(`Failed to add record: ${error.message}`);
      }
    }
  };

  return (
    <div className="add-record">
      <h2>Add Daily Record</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Date:</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Expenditure:</label>
          <input type="number" value={expenditure} onChange={(e) => setExpenditure(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Earnings:</label>
          <input type="number" value={earnings} onChange={(e) => setEarnings(e.target.value)} required />
        </div>
        <button type="submit">Add Record</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default AddRecord;
