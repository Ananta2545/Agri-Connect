import React, { useRef, useEffect,useState } from 'react';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import newRequest from '../../utils/newRequest';

Chart.register(ArcElement, Tooltip, Legend);

const TaskCompletionChart = () => {
  const chartRef = useRef(null);
  const canvasRef = useRef(null);
  const [completed, setCompleted] = useState(0);
  const [total, setTotal] = useState(0);
  const remainingTasks = total - completed;
  const completionPercentage = total ? ((completed / total) * 100).toFixed(1) : 0;

  useEffect(()=>{
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    const month = String(currentDate.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed, so add 1
    const fetchData = async()=>{
      try{
        const response = await fetch(`http://localhost:8000/api/tasks/monthly?year=${year}&month=${month}`);  
        const data = await response.json();
        setCompleted(data.completedTasks || 0);
        setTotal(data.totalTasks || 0);
      
      }catch(err){
        console.error('Failed to fetch task data:', err);
      }
    }

    fetchData();

  },[])

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
      <h3>Monthly Task Progress</h3>
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
