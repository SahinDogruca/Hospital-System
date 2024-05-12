import React from "react";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import { logout } from "@/utils/authApi";
import { useRouter } from "next/router";
const Sidebar = () => {
  const { user, userType, setUser, setUserType, setIsLogged } = useUser();
  const router = useRouter();
  return (
    <div className="col-lg-3 col-md-4 col sidebar">
      <div className="sidebar-header">
        <h3>Dashboard</h3>
      </div>
      <div className="sidebar-menu">
        <ul className="sidebar-list">
          <li className="sidebar-list__item">
            <Link href="/">Home</Link>
          </li>
          <li>
            {" "}
            <Link href="/dashboard">Appointments</Link>{" "}
          </li>

          {userType === "patients" ? (
            <>
              <li>
                {" "}
                <Link href={`/dashboard/invoice/?user=${user.id}`}>
                  Invoice
                </Link>
              </li>
              <li>
                {" "}
                <Link href="/dashboard/set_appointment">
                  Set Appointment
                </Link>{" "}
              </li>
            </>
          ) : (
            <li>
              {" "}
              <Link href="/dashboard/write_prescription">
                Write Prescription
              </Link>
            </li>
          )}

          <li>
            {" "}
            <Link href="/dashboard/edit_profile">Edit Profile</Link>
          </li>
          <li
            onClick={() => {
              logout();
              setUser({});
              setIsLogged(false);
              setUserType("patients");
              router.push("/");
            }}
          >
            <Link href="/">Logout</Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
