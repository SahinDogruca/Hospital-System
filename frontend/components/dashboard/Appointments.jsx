import React from "react";
import { useUser } from "@/context/UserContext";

const Appointments = ({ appointments }) => {
  const { userType, user } = useUser();
  return (
    <div>
      <h3 className="content__title">Appointments</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              {userType === "patients" ? "Doctor Name" : "Patient Name"}
            </th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments ? (
            appointments
              .filter((appointment) => {
                return (
                  new Date(appointment.time.time).getTime() >=
                    new Date().getTime() &&
                  (userType === "patients"
                    ? appointment.patient.id
                    : appointment.time.doctor.id) === user.id
                );
              })
              .map((appointment) => (
                <tr key={appointment.id}>
                  <th scope="row">{appointment.id}</th>
                  <td>
                    {userType === "patients"
                      ? appointment.time.doctor.name
                      : appointment.patient.name}
                  </td>
                  <td>
                    {new Date(appointment.time.time).toLocaleDateString(
                      "tr-TR",
                      {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      }
                    )}
                  </td>
                  <td>
                    {new Date(appointment.time.time).toLocaleTimeString(
                      "tr-TR",
                      {
                        hour12: false,
                      }
                    )}
                  </td>
                </tr>
              ))
          ) : (
            <p>Appointments not found</p>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
