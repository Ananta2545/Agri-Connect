import React, { useState, useEffect } from 'react';
import './FarmerHome.css';
// import { fetchWeather, fetchIrrigationRecommendations, fetchAppointments } from './apiServices';

const FarmerHome = () => {
  const [weather, setWeather] = useState(null);
  const [recommendations, setRecommendations] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  
  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      setWeather(await fetchWeather());
      setRecommendations(await fetchIrrigationRecommendations());
      setAppointments(await fetchAppointments());
      // Sample notifications
      setNotifications([
        { id: 1, message: "Weather alert: Rain expected tomorrow." },
        { id: 2, message: "Irrigation schedule updated for this week." }
      ]);
    };
    fetchData();
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="sidebar-item">
          <h3>Weather Report</h3>
          {weather ? <p>{weather.description}, {weather.temp}°C</p> : <p>Loading...</p>}
        </div>
        <div className="sidebar-item">
          <h3>Crop Recommendations</h3>
          <ul>
            {recommendations.map((rec, index) => (
              <li key={index}>{rec}</li>
            ))}
          </ul>
        </div>
        <div className="sidebar-item">
          <h3>Task Scheduler</h3>
          <p>Plan and organize your farming tasks</p>
        </div>
        <div className="sidebar-item">
          <h3>Book Appointment</h3>
          <p>Connect with agriculture experts</p>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Scrolling news/blog section */}
        <div className="scrolling-news">
          <h2>Farming News & Blogs</h2>
          <div className="news-marquee">
            <p>Latest farming practices... | Sustainable crop rotation... | Weather adaptation tips...</p>
          </div>
        </div>

        {/* Notifications and Appointments */}
        <div className="notifications-appointments">
          <section className="notifications">
            <h2>Notifications</h2>
            <ul>
              {notifications.map((notification) => (
                <li key={notification.id}>{notification.message}</li>
              ))}
            </ul>
          </section>
          <section className="appointments">
            <h2>Upcoming Appointments</h2>
            <ul>
              {appointments.map((appointment, index) => (
                <li key={index}>{appointment.date} - {appointment.expertName}</li>
              ))}
            </ul>
          </section>
        </div>
      </main>

      {/* Profile */}
      <div className="profile-section">
        <div className="profile-icon">
          <img src="profile-placeholder.jpg" alt="Profile" />
        </div>
      </div>
    </div>
  );
};

export default FarmerHome;


