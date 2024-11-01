import React, { useRef, useEffect } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const TaskCompletionChart = ({ completed, total }) => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const remainingTasks = total - completed;
  const completionPercentage = ((completed / total) * 100).toFixed(1);

  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.destroy();  // Destroy previous chart instance if it exists
    }

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

    chartRef.current = new Chart(canvasRef.current, {
      type: 'doughnut',
      data,
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
          },
          tooltip: {
            callbacks: {
              label: (tooltipItem) => {
                const label = tooltipItem.label;
                const value = tooltipItem.raw;
                return `${label}: ${value} tasks`;
              },
            },
          },
        },
      },
    });

    return () => {
      if (chartRef.current) {
        chartRef.current.destroy(); // Cleanup on component unmount
      }
    };
  }, [completed, total]);

  return (
    <div style={{ width: '100%', maxWidth: '400px', margin: '0 auto', textAlign: 'center' }}>
      <h3>Daily Task Progress</h3>
      <div style={{ fontSize: '1.2em', marginBottom: '10px' }}>
        {completionPercentage}% completed
      </div>
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
