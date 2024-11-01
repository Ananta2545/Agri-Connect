// src/components/RevenueChart/RevenueChart.jsx
import React from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from "recharts";
import "./chart.scss";

const RevenueChart = () => {
  // Dummy data for revenue estimates
  const data = [
    { month: "Jan", revenue: 500 },
    { month: "Feb", revenue: 750 },
    { month: "Mar", revenue: 900 },
    { month: "Apr", revenue: 600 },
    { month: "May", revenue: 800 },
    { month: "Jun", revenue: 950 },
    { month: "Jul", revenue: 1200 },
    { month: "Aug", revenue: 1100 },
    { month: "Sep", revenue: 850 },
    { month: "Oct", revenue: 950 },
    { month: "Nov", revenue: 700 },
    { month: "Dec", revenue: 800 },
  ];

  return (
    <div className="revenueChart">
      <h3 className="chartTitle">Monthly Revenue Estimation</h3>
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
