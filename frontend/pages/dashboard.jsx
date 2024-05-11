import React, { useEffect, useState } from "react";
import Link from "next/link";
import Appointments from "@/components/dashboard/Appointments";
import EditUser from "@/components/dashboard/EditUser";
import { logout } from "@/utils/doctorApi";
import { useUser } from "@/context/UserContext";
import SetAppointment from "@/components/dashboard/SetAppointment";
import Invoice from "@/components/dashboard/Invoice";
import { useRouter } from "next/router";
import WritePrescription from "@/components/dashboard/WritePrescription";

const Dashboard = ({ appointments, doctors, patients, times, invoice }) => {
  const router = useRouter();
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
                <li onClick={() => setPageType("Invoice")}>Invoice</li>
                {type == "patients" && (
                  <>
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
                {pageType == "Appointments" && (
                  <Appointments
                    appointments={appointments.filter((appointment) => {
                      return type === "patients"
                        ? appointment.patient.id === user.id
                        : appointment.time.doctor.id === user.id;
                    })}
                    type={type}
                  />
                )}
                {pageType == "EditProfile" && <EditUser />}
                {pageType == "SetAppointment" && (
                  <SetAppointment
                    doctors={doctors}
                    patients={patients}
                    times={times}
                  />
                )}
                {pageType == "Invoice" && (
                  <Invoice
                    invoice={invoice.filter((item) => {
                      return type === "patients"
                        ? item.patient.tc === user.tc
                        : item.doctor.tc === user.tc;
                    })}
                    type={type}
                  />
                )}
                {pageType == "WritePrescription" && (
                  <WritePrescription user={user} patients={patients} />
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
    const dataInvoice = await fetch("http://localhost:8080/prescriptions/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (
      !dataAppointments.ok ||
      !dataDoctors.ok ||
      !dataPatients.ok ||
      !dataTimes.ok ||
      !dataInvoice.ok
    ) {
      throw new Error("Failed to fetch appointments data");
    }
    const appointments = await dataAppointments.json();
    const doctors = await dataDoctors.json();
    const patients = await dataPatients.json();
    const times = await dataTimes.json();
    const invoice = await dataInvoice.json();
    return {
      props: {
        appointments,
        doctors,
        patients,
        times,
        invoice,
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
        invoice: [],
      },
    };
  }
}

export default Dashboard;
