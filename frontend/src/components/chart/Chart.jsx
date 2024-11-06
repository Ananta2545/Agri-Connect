// src/components/RevenueChart/RevenueChart.jsx
import React, { useState, useEffect } from "react";
import axios from "../../utils/newRequest"; // Import the axios instance
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./chart.scss";
import newRequest from "../../utils/newRequest";

const RevenueChart = ({ year }) => {
  const [data, setData] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        // Fetch the revenue data from the backend
        const response = await newRequest.get(`/records/summary/${year}`,{
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // or wherever the token is stored
          },
        });
        // Assuming the backend response format is an array of monthly revenue objects
        // Example: [{ month: "Jan", revenue: 500 }, { month: "Feb", revenue: 750 }, ...]
        setData(response.data);
      } catch (error) {
        setError("Failed to load revenue data.");
        console.error("Error fetching revenue data:", error);
      }
    };

    fetchRevenueData();
  }, [year]); // Re-fetch data whenever the year changes

  return (
    <div className="revenueChart">
      <h3 className="chartTitle">Monthly Revenue Estimation for {year}</h3>
      {error && <p className="error">{error}</p>}
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" stroke="#2d6a4f" />
          <YAxis stroke="#2d6a4f" />
          <Tooltip />
          <Bar dataKey="revenue" fill="#95d5b2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RevenueChart;
