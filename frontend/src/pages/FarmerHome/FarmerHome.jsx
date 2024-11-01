import React from "react";
import Chart from "../../components/chart/Chart.jsx";
import Featured from "../../components/featured/Featured.jsx";
import List from "../../components/list/List.jsx";
import Navbar from "../../components/navbar/Navbar.jsx";
import Sidebar from "../../components/sidebar/Sidebar";
import Widget from "../../components/widget/Widget.jsx"
import "./FarmerHome.scss";

const Home = () => {
  return (
    <div className="home">
      <>
        <Sidebar />
        <div className="homeContainer">
          <Navbar />
          <div className="widgets">
            <Widget type="customer" />
            <Widget type="order" />
            <Widget type="earnings" />
            <Widget type="balance" />
          </div>
          <div className="charts">
            <Featured />
            <Chart title="Last 6 months (Revenue)" aspect={2 / 1} />
          </div>
          {/* <div className="listContainer">
            <div className="listTitle">Latest Transactions</div>
            <List />
          </div> */}
        </div>
      </>
    </div>
  );
};

export default Home;
