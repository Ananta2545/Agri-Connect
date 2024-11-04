// src/components/MonthlySummary.js
import React, { useState, useEffect } from 'react';
import { calculateMonthlySummary, getMonthlySummary } from '../../utils/recordApi.js';
import './MonthlySummary.scss';

const MonthlySummary = () => {
  const [year, setYear] = useState(new Date().getFullYear());
  const [month, setMonth] = useState('');
  const [summaries, setSummaries] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchMonthlySummaries(year);
  }, [year]);

  const fetchMonthlySummaries = async (year) => {
    try {
      const response = await getMonthlySummary(year);
      setSummaries(response.data);
    } catch (error) {
      setMessage('Failed to retrieve summaries');
    }
  };

  const handleCalculateSummary = async () => {
    if (!month) {
      setMessage('Please select a month');
      return;
    }
    try {
      await calculateMonthlySummary(parseInt(month), year);
      setMessage('Monthly summary calculated!');
      fetchMonthlySummaries(year);
    } catch (error) {
      setMessage('Failed to calculate monthly summary');
    }
  };

  return (
    <div className="monthly-summary-container">
      <div className="calculator-section">
        <h2>Monthly Summary Calculator</h2>
        <div className="year-selector">
          <label>Year:</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            min="2000"
            max="2100"
          />
        </div>
        <div className="month-selector">
          <div className="selector">
            <label>Month:</label>
            <select value={month} onChange={(e) => setMonth(e.target.value)}>
                <option value="">Select Month</option>
                {Array.from({ length: 12 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{new Date(0, i).toLocaleString('en', { month: 'long' })}</option>
                ))}
            </select>
          </div>
          <button onClick={handleCalculateSummary}>Calculate Summary</button>
        </div>
        {message && <p className="message">{message}</p>}
      </div>

      <div className="summary-list">
        <h2>Summary List for {year}</h2>
        {summaries.map((summary, index) => (
          <div key={index} className="summary-item">
            <h3>{new Date(0, summary.month - 1).toLocaleString('en', { month: 'long' })} {summary.year}</h3>
            <p><strong>Total Earnings:</strong> ${summary.totalEarnings}</p>
            <p><strong>Total Expenditure:</strong> ${summary.totalExpenditure}</p>
            <p><strong>Revenue:</strong> ${summary.revenue}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MonthlySummary;
