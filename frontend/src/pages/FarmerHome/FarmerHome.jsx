import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget.jsx";
import "./FarmerHome.scss";
import support from '../../assets/sustainable.png';
import RevenueChart from "../../components/chart/Chart.jsx";
import TaskCompletionChart from '../../components/taskCompletion/TaskCompletion.jsx';
import FarmingNews from "../../components/farmingNews/FarmingNews.jsx";
import GrowthProgressTracker from "../../components/growthProgressTracker/GrowthProgressTracker.jsx";
import WaterUsageGraph from "../../components/WaterUsageComponent/WaterUsageComponent.jsx";
import newRequest from "../../utils/newRequest.js";

const Home = ({setUserRole}) => {
  const [appointments, setAppointments] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [completedTasks, setCompletedTasks] = useState(5);
  const [totalTasks, setTotalTasks] = useState(10);
  const [crops, setCrops] = useState([]); // State for storing crop data

  useEffect(() => {
    const fetchData = async () => {
      // Fetch notifications and appointments
      setNotifications([
        { id: 1, message: "Weather alert: Rain expected tomorrow." },
        { id: 2, message: "Irrigation schedule updated for this week." },
      ]);
      setAppointments([
        { id: 1, date: "2024-11-05", expertName: "Dr. Ravi Patel" },
        { id: 2, date: "2024-11-12", expertName: "Dr. Anjali Sharma" },
      ]);

      // Fetch crop data
      try {
        const response = await newRequest.get("/crops"); // Adjust endpoint to match backend
        setCrops(response.data || []); // Ensure crops is set to an empty array if no crops are returned
        console.log(crops)
      } catch (error) {
        console.error("Error fetching crops data:", error);
        setCrops([]); // Set crops to an empty array if there is an error
      }
    };
    fetchData();
  }, []);

  const blogPosts = [
    { title: "Understanding Crop Rotation", excerpt: "Discover best practices of crop rotation..." },
    { title: "Pest Management Strategies", excerpt: "Learn how to manage pests effectively ..." },
    { title: "Sustainable Farming Practices", excerpt: "Explore sustainable ways to reduce costs..." },
    { title: "Maximizing Your Harvest", excerpt: "Tips to ensure a bountiful harvest season..." },
  ];

  return (
    <div className="home">
      <Sidebar setUserRole={setUserRole} />
      <div className="homeContainer">
        <Navbar />
        
        <div className="widgetsSection">
          <div className="heading">
            <img src={support} width={30} height={30} alt="" />
            <h2 className="widgetsHeading">What Experts Have to Say Today</h2>
          </div>
          <div className="widgetsContainer">
            {blogPosts.map((post, index) => (
              <Widget key={index} title={post.title} excerpt={post.excerpt} />
            ))}
          </div>
        </div>
        
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
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  {appointment.date} - {appointment.expertName}
                </li>
              ))}
            </ul>
          </section>
        </div>
        
        <div className="chartSection">
          <div className="revenue-chart">
            <input
              type="number"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year"
              min="2000"
              max="2100"
            />
            <RevenueChart year={year} />
          </div>
          <TaskCompletionChart completed={completedTasks} total={totalTasks} />
        </div>

        <div className="crop-stats">
          <GrowthProgressTracker/>
          
          {/* Ensure crops is an array before attempting to map */}
          {Array.isArray(crops) && crops.map((crop) => (
            <WaterUsageGraph key={crop._id} cropId={crop._id} cropName={crop.name} />
          ))}
        </div>

        <div className="news">
          <FarmingNews/>
        </div>
        
      </div>
    </div>
  );
};

export default Home;
