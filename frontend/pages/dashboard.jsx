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
import { useDashboard } from "@/context/DashboardContext";

const Dashboard = ({
  appointments,
  doctors,
  patients,
  times,
  invoices,
  prescriptions,
}) => {
  const router = useRouter();
  const { user, setUser, setIsLogged } = useUser();
  const [pageType, setPageType] = useState("Appointments");
  const [type, setType] = useState(user?.specialty ? "doctors" : "patients");
  const { contextAppointments, setContextAppointments } = useDashboard();

  useEffect(() => {
    if (!user) {
      router.push("/");
    }

    setType(user.specialty ? "doctors" : "patients");
    console.log(type);
  }, [user]);

  useEffect(() => {
    setContextAppointments(appointments);
  }, []);

  return (
    <section id="dashboard" className="dashboard">
      <div className="dashboard-wrapper">
        <div className="row">
          <div className="col-lg-3 col-md-4 col sidebar">
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
                    <li onClick={() => setPageType("SetAppointment")}>
                      Set Appointment
                    </li>
                    <li onClick={() => setPageType("Invoice")}>Invoice</li>
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
          <div className="col-lg-9 col-md-8 col mainbar p-5">
            <div className="profile mb-5">
              <div className="row">
                <div className="col-lg-4 col align-items-center">
                  <div className="profile-image">
                    <img
                      src="/assets/profile.png"
                      alt="profile"
                      width={250}
                      height={250}
                      className="rounded"
                    />
                  </div>
                </div>
                <div className="col-lg-8 col align-items-center">
                  <div className="profile-details">
                    <h3>Name: {user.name}</h3>
                    <p>tc: {user.tc}</p>
                    {user.specialty && <p>specialty: {user.specialty}</p>}
                  </div>
                </div>
              </div>
              <div className="content mt-2">
                {pageType == "Appointments" && (
                  <Appointments
                    appointments={contextAppointments.filter((appointment) => {
                      return type === "patients"
                        ? appointment.patient.id === user.id
                        : appointment.time.doctor.id === user.id;
                    })}
                    type={type}
                  />
                )}
                {pageType == "EditProfile" && <EditUser />}
                {pageType == "SetAppointment" && (
                  <SetAppointment doctors={doctors} times={times} />
                )}
                {pageType == "Invoice" && (
                  <Invoice
                    invoices={invoices.filter((invoice) => {
                      return (invoice.patientId = user.id);
                    })}
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
    const dataPrescriptions = await fetch(
      "http://localhost:8080/prescriptions/all",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const dataInvoices = await fetch("http://localhost:8080/invoices/all", {
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
      !dataInvoices.ok ||
      !dataPrescriptions.ok
    ) {
      throw new Error("Failed to fetch appointments data");
    }
    const appointments = await dataAppointments.json();
    const doctors = await dataDoctors.json();
    const patients = await dataPatients.json();
    const times = await dataTimes.json();
    const invoices = await dataInvoices.json();
    const prescriptions = await dataPrescriptions.json();
    return {
      props: {
        appointments,
        doctors,
        patients,
        times,
        invoices,
        prescriptions,
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
        prescriptions: [],
      },
    };
  }
}

export default Dashboard;
