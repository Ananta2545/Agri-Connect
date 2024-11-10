import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GrowthProgressTracker.scss";

const colors = ["#66BB6A", "#FF7043", "#42A5F5", "#AB47BC", "#FFCA28"]; // Add more colors as needed

const GrowthProgressTracker = () => {
  const [crops, setCrops] = useState([]);
  const [historicalYieldData, setHistoricalYieldData] = useState([]);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await newRequest.get("/api/crops");
        const cropsData = response.data;
        console.log(cropsData);
        setCrops(cropsData);

        const months = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];

        const yieldDataMap = months.reduce((acc, month) => {
          acc[month] = { month };
          return acc;
        }, {});

        cropsData.forEach((crop) => {
          crop.yieldData.forEach(({ month, yield: cropYield }) => {
            if (yieldDataMap[month]) {
              yieldDataMap[month][crop.name] = cropYield;
            }
          });
        });

        setHistoricalYieldData(Object.values(yieldDataMap));
      } catch (error) {
        console.error("Error fetching crop data:", error);
      }
    };

    fetchCropData();
  }, []);

  return (
    <div className="growthProgressTracker">
      <h3 className="chartTitle">Growth Progress of Crops</h3>
      <div className="progressBars">
        {crops.map((crop) => (
          <div key={crop.name} className="progressBar">
            <span className="cropLabel">{crop.name}</span>
            <div className="progress">
              <div
                className="progressFill"
                style={{ width: `${crop.growthProgress}%` }}
              ></div>
            </div>
            <span className="progressPercentage">{crop.growthProgress}%</span>
          </div>
        ))}
      </div>

      <h3 className="chartTitle">Historical Yield Data</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={historicalYieldData}>
          <XAxis dataKey="month" stroke="#4CAF50" />
          <YAxis stroke="#4CAF50" />
          <Tooltip />
          <Legend />
          {crops.map((crop, index) => (
            <Line
              key={crop._id}
              type="monotone"
              dataKey={crop.name} // Ensure this matches exactly with historicalYieldData keys
              stroke={colors[index % colors.length]} // Rotate through colors
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthProgressTracker;
