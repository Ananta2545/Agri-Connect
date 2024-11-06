import React from "react";
import WeatherIcon from "@mui/icons-material/WbSunnyOutlined";
import FarmingIcon from "@mui/icons-material/AgricultureOutlined";
import TaskIcon from "@mui/icons-material/CalendarTodayOutlined";
import AppointmentIcon from "@mui/icons-material/PersonAddOutlined";
import RevenueIcon from "@mui/icons-material/AttachMoneyOutlined"; // Use an icon that fits the context
import CropIcon from "@mui/icons-material/LocalFloristOutlined"; // Use an icon that fits the context
import ProfileIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/ExitToAppOutlined";
import "./sidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import newRequest from "../../utils/newRequest";

const Sidebar = ({setUserRole}) => {

  const navigate = useNavigate();

  const handleLogout = async()=>{
    try{
      await newRequest.post("/auth/signout");
      localStorage.removeItem("currentUser");
      setUserRole(null);
      navigate('/');
    }catch(err){
      console.error("Error logging out", err);
    }
  }
  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src={logo} width={30} height={30} alt="" />
          <span className="logo">AgriConnect</span>
        </Link>
      </div>
      <hr />
      <div className="bottom">
        <div className="card-container">
          <Link to="/weather_report" style={{ textDecoration: "none" }}>
            <div className="card">
              <WeatherIcon className="icon" />
              <span>Weather Report</span>
            </div>
          </Link>
          <Link to="/farming_recommendations" style={{ textDecoration: "none" }}>
            <div className="card">
              <FarmingIcon className="icon" />
              <span>Farming Recommendations</span>
            </div>
          </Link>
          <Link to="/task_scheduling" style={{ textDecoration: "none" }}>
            <div className="card">
              <TaskIcon className="icon" />
              <span>Task Scheduling</span>
            </div>
          </Link>
          <Link to="/appointments" style={{ textDecoration: "none" }}>
            <div className="card">
              <AppointmentIcon className="icon" />
              <span>Book Appointments</span>
            </div>
          </Link>
          <Link to="/revenue_record" style={{ textDecoration: "none" }}>
            <div className="card">
              <RevenueIcon className="icon" />
              <span>Revenue Recording</span>
            </div>
          </Link>
          <Link to="/crop_details_management" style={{ textDecoration: "none" }}>
            <div className="card">
              <CropIcon className="icon" />
              <span>Crop Details Management</span>
            </div>
          </Link>
        </div>

        <div className="profile-actions">
          <Link to="/profile" style={{ textDecoration: "none" }}>
            <div className="action">
              <ProfileIcon className="icon" />
              <span>Profile</span>
            </div>
          </Link>
          {/* <Link to="/signout" style={{ textDecoration: "none" }}> */}
            <div onClick={handleLogout} className="action">
              <LogoutIcon className="icon" />
              <span>Logout</span>
            </div>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
