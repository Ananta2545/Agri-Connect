import React, { useEffect, useState } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import ExpertSidebar from "../../components/expertSidebar/ExpertSidebar.jsx"
import "./ExpertHome.scss";
import Performance from "../../components/PerformanceReport/PerformanceReport.jsx";
import BlogRecommendation from "../../components/blogRecommendation/BlogRecommendation.jsx";
import ExpertNavbar from "../../components/expertNavbar/ExpertNavbar.jsx";
import RenderAllPosts from "../../components/RenderAllBlogs/RenderAllBlogs.jsx";

const ExpertHome = ({ setUserRole }) => {
  const [notifications, setNotifications] = useState([]);
  const [appointments, setAppointments] = useState([]);
  useEffect(() => {
    // Fetch dummy data for notifications and appointments
    setNotifications([
      { id: 1, message: "New update available for sustainable farming techniques." },
      { id: 2, message: "Check your messages for feedback " }    ]);

    setAppointments([
      { id: 1, date: "2024-11-07", expertName: "Farmer Ramesh" },
      { id: 2, date: "2024-11-14", expertName: "Farmer Sita" },
    ]);
  }, []);


  return (
    <div className="home">
      <ExpertSidebar setUserRole={setUserRole} />
      <div className="homeContainer">
        <ExpertNavbar/>

        <div className="blog-recommendation">
          <BlogRecommendation/>
        </div>
        
        {/* Welcome message with animation */}
        <div className="welcomeMessage">
          <h1>Welcome!</h1>
        </div>

        <div className="notifications-appointments2">
          <section className="notifications2">
            <h2>Notifications</h2>
            <ul>
              {notifications.length > 0 ? (
                notifications.map((notification) => (
                  <li key={notification.id}>{notification.message}</li>
                ))
              ) : (
                <li>No notifications available.</li>
              )}
            </ul>
          </section>

          <section className="appointments2">
            <h2>Upcoming Appointments</h2>
            <ul>
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <li key={appointment.id}>
                    {appointment.date} - {appointment.expertName}
                  </li>
                ))
              ) : (
                <li>No appointments scheduled.</li>
              )}
            </ul>
          </section>
        </div>
        <div className="performance">
          <Performance/>
        </div>
        <div className="render-all-posts">
          <RenderAllPosts/>
        </div>
      </div>
    </div>
  );
};

export default ExpertHome;

