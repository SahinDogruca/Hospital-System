import React from "react";
import { useUser } from "@/context/UserContext";
import { create } from "@/utils/db";

const WritePrescription = ({ patients }) => {
  const { user } = useUser();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const drugs = e.target.drugs.value;
    const drugsList = drugs.split(",");
    const doctorId = user.id;

    const patient = patients.find(
      (patient) => patient.tc === e.target.patient.value
    );

    const prescription = {
      doctorId,
      patientId: patient.id,
      drugNames: drugsList,
    };

    const res = await create("prescriptions", prescription);

    console.log(res);
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
