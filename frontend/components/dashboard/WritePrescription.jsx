import React from "react";
import { useUser } from "@/context/UserContext";

const WritePrescription = ({ patients }) => {
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const drugs = e.target.drugs.value;

    if (!drugs) {
      alert("Please enter drugs");
      return;
    }
    const drugsList = drugs.split(",");
    const doctorId = user.id;

    const patient = patients.find(
      (patient) => patient.tc === e.target.patient.value
    );

    if (!patient) {
      alert("Patient not found");
      return;
    }

    console.log({
      doctorId,
      patientId: patient.id,
      drugNames: drugsList,
    });

    const res = await fetch("http://localhost:8080/prescriptions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        doctorId,
        patientId: patient.id,
        drugNames: drugsList,
      }),
    }).catch((err) => alert(err.message));

    if (res.ok) {
      alert("Prescription written successfully");
    } else {
      alert("Error writing prescription");
    }
  };
  return (
    <div>
      <h3>Write Prescription</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="patient">Patient TC</label>
          <input type="text" className="form-control" id="patient" />
        </div>
        <div className="form-group">
          <label htmlFor="drugs">Drugs</label>
          <input type="text" className="form-control" id="drugs" />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WritePrescription;
