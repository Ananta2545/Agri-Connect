// src/pages/FarmerHome.jsx

import React from "react";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget.jsx";
import "./FarmerHome.scss";

const blogPosts = [
  {
    title: "Understanding Crop Rotation",
    excerpt: " Discover best practices of crop rotation...",
  },
  {
    title: "Pest Management Strategies",
    excerpt: "Learn how to manage pests effectively ...",
  },
  {
    title: "Sustainable Farming Practices",
    excerpt: "Explore ways to reduce costs while caring for the environment...",
  },
  {
    title: "Maximizing Your Harvest",
    excerpt: "Tips and techniques to ensure a bountiful harvest season...",
  },
];

const Home = () => {
  return (
    <div className="home">
      <>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgetsSection">
            <h2 className="widgetsHeading">What Experts Have to Say today </h2>
            <div className="widgetsContainer">
              {blogPosts.map((post, index) => (
                <Widget key={index} title={post.title} excerpt={post.excerpt} />
              ))}
            </div>
          </div>
        </div>
      </>
    </div>
  );
};

export default Home;
