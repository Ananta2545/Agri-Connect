import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

import "./chart.scss";

const data = [
  {
    name: "January",
    SB: 4000,
    TA: 2400,
    amt: 2400,
  },
  {
    name: "February",
    SB: 3000,
    TA: 1398,
    amt: 2210,
  },
  {
    name: "March",
    SB: 2000,
    TA: 9800,
    amt: 2290,
  },
  {
    name: "April",
    SB: 2780,
    TA: 3908,
    amt: 2000,
  },
  {
    name: "MAY",
    SB: 1890,
    TA: 4800,
    amt: 2181,
  },
  {
    name: "JUNE",
    SB: 2390,
    TA: 3800,
    amt: 2500,
  },
  {
    name: "JULY",
    SB: 3490,
    TA: 4300,
    amt: 2100,
  },
];
const Chart = ({ aspect, title }) => {
  return (
    <div className="chart">
      <div className="title">{title}</div>
      <ResponsiveContainer width="100%" aspect={aspect}>
        <BarChart
          width={730}
          height={250}
          margin={{ top: 0, right: 0, left: 0, bottom: 0 }}
          data={data}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="gray"
            className="chatGrid"
          />
          <XAxis dataKey="name" />

          <Tooltip />
          <Legend />
          <Bar dataKey="SB" fill="#8884d8" />
          <Bar dataKey="TA" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Chart;
