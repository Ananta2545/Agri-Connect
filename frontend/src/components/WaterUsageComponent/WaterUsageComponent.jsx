// src/components/WaterUsageGraph/WaterUsageGraph.jsx
import React, { useEffect, useRef, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import newRequest from "../../utils/newRequest.js";
import "./WaterUsageComponent.scss";

const WaterUsageGraph = ({ cropId,cropName }) => {
  const [irrigationData, setIrrigationData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const chartRef = useRef(null); // Reference to manage individual chart instances

  useEffect(() => {
    let chartInstance; // Track Chart.js instance if applicable
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/api/irrigation/${cropId}`);
        setIrrigationData(response.data || []);
        setLoading(false);
      } catch (error) {
        setError("Failed to load irrigation data.");
        console.log("hello")
        setLoading(false);
      }
    };

    if (cropId) fetchData();

    // Cleanup function to destroy chart on unmount
    return () => {
      if (chartInstance) {
        chartInstance.destroy();
        chartInstance = null;
      }
    };
  }, [cropId]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="error">{error}</p>;

  return (
    <div className="waterUsageGraph">
      <h3>Water Usage for Crop {cropName}</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={irrigationData}
          margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
          key={cropId} // Unique key for each crop instance
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#2d6a4f" />
          <YAxis stroke="#2d6a4f" />
          <Tooltip formatter={(value) => [`${value} liters`, "Water Usage"]} />
          <Bar dataKey="waterUsage" fill="#4CAF50" name="Water Usage" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default WaterUsageGraph;
