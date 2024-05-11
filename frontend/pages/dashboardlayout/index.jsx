import Appointments from "@/components/dashboard/Appointments";
import React from "react";

const DashboardLayout = () => {
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

                <li onClick={() => setPageType("Appointments")}>
                  Appointments
                </li>

                {type == "patients" && (
                  <>
                    <li onClick={() => setPageType("Invoice")}>Invoice</li>
                    <li onClick={() => setPageType("SetAppointment")}>
                      Set Appointment
                    </li>
                  </>
                )}
                {type == "doctors" && (
                  <li onClick={() => setPageType("WritePrescription")}>
                    Write Prescription
                  </li>
                )}

                <li onClick={() => setPageType("EditProfile")}>Edit Profile</li>

                <li
                  onClick={() => {
                    logout();
                    setUser({});
                    setIsLogged(false);
                    router.push("/");
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
                <Appointments />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DashboardLayout;
