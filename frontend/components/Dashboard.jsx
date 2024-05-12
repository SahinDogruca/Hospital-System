import React, { useEffect } from "react";
import Sidebar from "./dashboard/Sidebar";
import Profile from "./dashboard/Profile";

const Dashboard = ({ children }) => {
  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-wrapper">
        <div className="row">
          <Sidebar />
          <div className="col-lg-9 col-md-8 col mainbar p-5">
            <Profile />
            <div className="content mt-2">{children}</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
