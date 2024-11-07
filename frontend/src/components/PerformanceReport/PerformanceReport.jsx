import React, { useEffect, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './PerformanceReport.scss';

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Performance = () => {
  const chartRef = useRef(null); // Use ref to reference the chart

  // Dummy data for performance metrics
  const performanceData = {
    expertStats: {
      successfulAppointments: 120,
      farmersHelped: 85,
      experience: 5,
      rating: 4.8,
    },
    appointmentStats: {
      totalAppointments: 200,
      satisfactionRating: 4.5,
      adviceAreas: {
        cropManagement: 60,
        pestControl: 45,
        irrigation: 30
      }
    },
    blogEngagement: {
      views: 5000,
      comments: 150,
      likes: 300
    }
  };

  // Data for the charts
  const adviceAreaData = {
    labels: Object.keys(performanceData.appointmentStats.adviceAreas),
    datasets: [
      {
        label: 'Advice Areas',
        data: Object.values(performanceData.appointmentStats.adviceAreas),
        backgroundColor: ['#4caf50', '#81c784', '#a5d6a7']
      }
    ]
  };

  const blogEngagementData = {
    labels: ['Views', 'Comments', 'Likes'],
    datasets: [
      {
        data: [
          (performanceData.blogEngagement.views / (performanceData.blogEngagement.views + performanceData.blogEngagement.comments + performanceData.blogEngagement.likes)) * 100,
          (performanceData.blogEngagement.comments / (performanceData.blogEngagement.views + performanceData.blogEngagement.comments + performanceData.blogEngagement.likes)) * 100,
          (performanceData.blogEngagement.likes / (performanceData.blogEngagement.views + performanceData.blogEngagement.comments + performanceData.blogEngagement.likes)) * 100
        ],
        backgroundColor: ['#66bb6a', '#81c784', '#a5d6a7'] // Green shades for the Pie chart
      }
    ]
  };
  

  // Cleanup chart instance before rerendering
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chartInstance?.destroy(); // Destroy the previous chart instance
    }
  }, [performanceData]); // Depend on performance data to clean up charts

  return (
    <div className="performance">
      <h2>Expert Performance Overview</h2>

      <section className="stats">
        <div className="stat-item">
          <h3>Successful Appointments</h3>
          <p>{performanceData.expertStats.successfulAppointments}</p>
        </div>
        <div className="stat-item">
          <h3>Farmers Helped</h3>
          <p>{performanceData.expertStats.farmersHelped}</p>
        </div>
        <div className="stat-item">
          <h3>Experience</h3>
          <p>{performanceData.expertStats.experience} years</p>
        </div>
        <div className="stat-item">
          <h3>Rating</h3>
          <p>{performanceData.expertStats.rating} / 5</p>
        </div>
      </section>

      <section className="charts">
        <div className="chart">
          <h3>Advice Areas</h3>
          <Bar data={adviceAreaData} ref={chartRef} />
        </div>
        <div className="chart">
          <h3>Blog Engagement</h3>
          <Pie data={blogEngagementData} ref={chartRef} />
        </div>
      </section>
    </div>
  );
};

export default Performance;
