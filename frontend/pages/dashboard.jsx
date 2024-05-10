import React, { useEffect, useState } from "react";
import Link from "next/link";
import Appointments from "@/components/dashboard/Appointments";
import EditUser from "@/components/dashboard/EditUser";
import { logout } from "@/utils/doctorApi";
import { useUser } from "@/context/UserContext";
import SetAppointment from "@/components/dashboard/SetAppointment";

const Dashboard = ({ appointments, doctors, patients, times }) => {
  const { user, setUser, setIsLogged } = useUser();
  const [pageType, setPageType] = useState("Appointments");
  const [type, setType] = useState(user?.specialty ? "doctors" : "patients");

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    setType(user.specialty ? "doctors" : "patients");
    console.log(type);
  }, [user]);

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
                  <li onClick={() => setPageType("SetAppointment")}>
                    Set Appointment
                  </li>
                )}
                <li onClick={() => setPageType("EditProfile")}>Edit Profile</li>

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
                {pageType == "Appointments" && <Appointments />}
                {pageType == "EditProfile" && <EditUser />}
                {pageType == "SetAppointment" && (
                  <SetAppointment
                    appointments={appointments}
                    doctors={doctors}
                    patients={patients}
                    times={times}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export async function getServerSideProps(context) {
  try {
    const dataAppointments = await fetch(
      "http://localhost:8080/appointments/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataDoctors = await fetch("http://localhost:8080/doctors/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataPatients = await fetch("http://localhost:8080/patients/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const dataTimes = await fetch("http://localhost:8080/times/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (
      !dataAppointments.ok ||
      !dataDoctors.ok ||
      !dataPatients.ok ||
      !dataTimes.ok
    ) {
      throw new Error("Failed to fetch appointments data");
    }
    const appointments = await dataAppointments.json();
    const doctors = await dataDoctors.json();
    const patients = await dataPatients.json();
    const times = await dataTimes.json();
    return {
      props: {
        appointments,
        doctors,
        patients,
        times,
      },
    };
  } catch (error) {
    console.error("Error fetching appointments data:", error);
    return {
      props: {
        appointments: [],
        doctors: [],
        patients: [],
        times: [],
      },
    };
  }
}

export default Dashboard;
