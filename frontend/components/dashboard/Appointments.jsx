import React from "react";

const Appointments = ({ appointments, type }) => {
  return (
    <div>
      <h3 className="content__title">Appointments</h3>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              {type === "doctors" ? "Patient Name" : "Doctor Name"}
            </th>
            <th scope="col">Date</th>
            <th scope="col">Time</th>
          </tr>
        </thead>
        <tbody>
          {appointments.map((appointment) => (
            <tr key={appointment.id}>
              <th scope="row">{appointment.id}</th>
              <td>
                {type === "patients"
                  ? appointment.time.doctor.name
                  : appointment.patient.name}
              </td>
              <td>
                {new Date(appointment.time.time).toLocaleDateString("tr-TR", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td>
                {new Date(appointment.time.time).toLocaleTimeString("tr-TR", {
                  hour12: false,
                })}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Appointments;
