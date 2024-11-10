import React, { useContext } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import FullscreenOutlinedIcon from "@mui/icons-material/FullscreenOutlined";
import NotificationsActiveOutlinedIcon from "@mui/icons-material/NotificationsActiveOutlined";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ListOutlinedIcon from "@mui/icons-material/ListOutlined";
// import Switch from "@mui/material/Switch";
import profileImg from '../../assets/profile.png';

import "./ExpertNavbar.scss";
import { Link } from "react-router-dom";


const ExpertNavbar = () => {
  return (
    <div className="navbar">
      <div className="navbarContainer">
        <div className="search">
          <input type="text" placeholder="search" />
          <SearchOutlinedIcon />
        </div>
        <div className="items">
          <Link to="/expert-profile" style={{ textDecoration: "none" }}>
            <div className="item profileImg">
              <img src={profileImg} alt="Profile" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ExpertNavbar;
