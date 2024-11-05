import React, { useEffect, useState } from "react";
import newRequest from "../../utils/newRequest";
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer } from "recharts";
import "./GrowthProgressTracker.scss";

const GrowthProgressTracker = () => {
  const [crops, setCrops] = useState([]);
  const [historicalYieldData, setHistoricalYieldData] = useState([]);

  useEffect(() => {
    const fetchCropData = async () => {
      try {
        const response = await newRequest.get("/crops");
        const cropsData = response.data;
        console.log(cropsData)
        setCrops(cropsData);

        const months = [
          "Jan", "Feb", "Mar", "Apr", "May", "Jun", 
          "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
        ];

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

        const yieldDataArray = Object.values(yieldDataMap);
        setHistoricalYieldData(yieldDataArray);
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
          {crops.map((crop) => (
            <Line
              key={crop.name}
              type="monotone"
              dataKey={crop.name} // Unique dataKey for each crop
              stroke="#66BB6A"
              dot={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default GrowthProgressTracker;
