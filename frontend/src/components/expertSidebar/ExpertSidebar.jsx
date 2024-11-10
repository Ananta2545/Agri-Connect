import React from "react";
import BlogIcon from "@mui/icons-material/EditOutlined";
import ViewBlogsIcon from "@mui/icons-material/ViewListOutlined";
import RequestIcon from "@mui/icons-material/EventNoteOutlined";
import HistoryIcon from "@mui/icons-material/HistoryOutlined";
import ProfileIcon from "@mui/icons-material/AccountCircleOutlined";
import LogoutIcon from "@mui/icons-material/ExitToAppOutlined";
import "./ExpertSidebar.scss";
import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/logo.png';
import newRequest from "../../utils/newRequest";

const ExpertSidebar = ({ setUserRole }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/api/auth/signout");
      localStorage.removeItem("userRole");
      setUserRole(null);
      navigate('/');
    } catch (err) {
      console.error("Error logging out", err);
    }
  };

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
          <Link to="/createPost" style={{ textDecoration: "none" }}>
            <div className="card">
              <BlogIcon className="icon" />
              <span>Create New Blog</span>
            </div>
          </Link>
          <Link to="/viewMyBlogs" style={{ textDecoration: "none" }}>
            <div className="card">
              <ViewBlogsIcon className="icon" />
              <span>View Your Blogs</span>
            </div>
          </Link>
          <Link to="/appointment_requests" style={{ textDecoration: "none" }}>
            <div className="card">
              <RequestIcon className="icon" />
              <span>Appointment Requests</span>
            </div>
          </Link>
        </div>

        <div className="profile-actions">
          <Link to="/expert-profile" style={{ textDecoration: "none" }}>
            <div className="action">
              <ProfileIcon className="icon" />
              <span>Profile</span>
            </div>
          </Link>
          <div onClick={handleLogout} className="action">
            <LogoutIcon className="icon" />
            <span>Logout</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExpertSidebar;
