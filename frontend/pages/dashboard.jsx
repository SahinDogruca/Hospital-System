import React, { useEffect, useState } from "react";
import Link from "next/link";
import Appointments from "@/components/dashboard/Appointments";
import EditUser from "@/components/dashboard/EditUser";
import { logout } from "@/utils/doctorApi";
import { useUser } from "@/context/UserContext";

const Dashboard = () => {
  const { user, setUser, setIsLogged } = useUser();
  const [showAppointments, setShowAppointments] = useState(true);

  useEffect(() => {
    if (!user) {
      router.push("/");
    }
  }, []);

  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-wrapper">
        <div className="row">
          <div className="col-md-3 col sidebar">
            <div className="sidebar-header">
              <h3>Dashboard</h3>
            </div>
            <div className="sidebar-menu">
              <ul className="sidebar-list">
                <li className="sidebar-list__item">
                  <Link href="/">Home</Link>
                </li>

                <li onClick={() => setShowAppointments(true)}>Appointments</li>
                <li onClick={() => setShowAppointments(false)}>Edit Profile</li>
                <li
                  onClick={() => {
                    logout();
                    setUser({});
                    setIsLogged(false);
                  }}
                >
                  <Link href="/">Logout</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-9 col mainbar p-5">
            <div className="profile">
              <div className="row">
                <div className="col-md-4">
                  <div className="profile-image">
                    <img src="https://i.pravatar.cc/250" alt="profile" />
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="profile-details">
                    <h3>Name: {user.name}</h3>
                    <p>tc: {user.tc}</p>
                    {user.specialty && <p>specialty: {user.specialty}</p>}

                    <p>password: {user.password}</p>
                  </div>
                </div>
              </div>
              <div className="content mt-2">
                {showAppointments ? <Appointments /> : <EditUser />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
