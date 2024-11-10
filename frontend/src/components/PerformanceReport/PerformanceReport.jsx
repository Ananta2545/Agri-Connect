import React, { useEffect, useState, useRef } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import './PerformanceReport.scss';
import newRequest from '../../utils/newRequest'; // Assuming you have this utility for API calls

// Register necessary chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const Performance = () => {
  const [performanceData, setPerformanceData] = useState(null); // To store fetched data
  const [userData, setUserData] = useState(null); // To store user data (userId, username, etc.)
  const [loading, setLoading] = useState(true); // To track loading state
  const [error, setError] = useState(null); // To track any errors
  const chartRef = useRef(null); // Reference for the chart instance

  // Fetch current user data (userId, name) from the backend
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await newRequest.get('/api/expert-details/user/profile', {
          withCredentials: true, // Include credentials if needed
        });
        setUserData(response.data); // Store the user data in the state
      } catch (error) {
        setError('An error occurred while fetching user data');
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    if (userData) {
      const fetchPerformanceData = async () => {
        try {
          const response = await newRequest.get(`/api/expert-details/${userData._id}`, {
            withCredentials: true, // Include credentials if needed
          });
          setPerformanceData(response.data); // Store the fetched data in the state
        } catch (error) {
          setError('An error occurred while fetching performance data');
        } finally {
          setLoading(false);
        }
      };

      fetchPerformanceData();
    }
  }, [userData]); // Only fetch performance data once userData is available

  // Data for the charts
  const adviceAreaData = performanceData ? {
    labels: Object.keys(performanceData.appointmentStats.adviceAreas),
    datasets: [
      {
        label: 'Advice Areas',
        data: Object.values(performanceData.appointmentStats.adviceAreas),
        backgroundColor: ['#4caf50', '#81c784', '#a5d6a7'],
      }
    ]
  } : {};

  const blogEngagementData = performanceData ? {
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
  } : {};

  // Cleanup chart instance before rerendering
  useEffect(() => {
    if (chartRef.current) {
      chartRef.current.chartInstance?.destroy(); // Destroy the previous chart instance
    }
  }, [performanceData]);

  if (loading) return <p>Loading performance data...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="performance">
      <h2>Expert Performance Overview</h2>

      {/* Display User Greeting */}
      

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
