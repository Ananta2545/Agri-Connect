import React, { useRef, useEffect, useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend, DoughnutController } from 'chart.js'; // Import DoughnutController
import newRequest from '../../utils/newRequest.js';

Chart.register(ArcElement, Tooltip, Legend, DoughnutController); // Register DoughnutController

const TaskCompletionChart = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const remainingTasks = total - completed;
  const completionPercentage = total ? ((completed / total) * 100).toFixed(1) : 0;

  useEffect(() => {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0');
    
    const fetchData = async () => {
      try {
        const response = await newRequest.get(`/api/tasks/monthly?year=${year}&month=${month}`);
        const data = response.data;
        setCompleted(data.completedTasks || 0);
        setTotal(data.totalTasks || 0);
      } catch (err) {
        console.error('Failed to fetch task data:', err);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // If chartRef.current exists, destroy the old chart before creating a new one
    if (chartRef.current) {
      chartRef.current.destroy(); // Destroy the previous chart instance
    }

    // Only create the chart if the canvasRef is available
    if (canvasRef.current) {
      const data = {
        labels: ['Completed', 'Remaining'],
        datasets: [
          {
            data: [completed, remainingTasks],
            backgroundColor: ['#4CAF50', '#D3D3D3'],
            hoverBackgroundColor: ['#388E3C', '#A9A9A9'],
          },
        ],
      };

      // Initialize the new Chart
      chartRef.current = new Chart(canvasRef.current, {
        type: 'doughnut',
        data,
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { position: 'bottom' },
            tooltip: {
              callbacks: {
                label: (tooltipItem) => `${tooltipItem.label}: ${tooltipItem.raw} tasks`,
              },
            },
          },
        },
      });
    }

    // Cleanup function to destroy the chart when the component unmounts
    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup chart instance
      }
    };
  }, [completed, remainingTasks]); // Re-render chart when data changes

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h3>Monthly Task Progress</h3>
      <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>{completionPercentage}% completed</div>
      <div style={{ fontSize: '1em', color: '#666', marginBottom: '20px' }}>
        <span>Completed: {completed} tasks</span> | <span>Remaining: {remainingTasks} tasks</span>
      </div>
      <div style={{ width: '100%', height: '300px', marginBottom: '20px' }}>
        <canvas ref={canvasRef}></canvas>
      </div>
    </div>
  );
};

export default TaskCompletionChart;
