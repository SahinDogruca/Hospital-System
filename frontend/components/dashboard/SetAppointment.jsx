import { Form, Formik } from "formik";
import React, { useEffect } from "react";
import TextField from "../TextField";

const SetAppointment = ({ appointments, doctors, patients, times }) => {
  const getSpecialties = () => {
    const specialties = [];
    doctors.map((doctor) => {
      if (!specialties.includes(doctor.specialty)) {
        specialties.push(doctor.specialty);
      }
    });
    return specialties.map((specialty) => (
      <option value={specialty} label={specialty} />
    ));
  };

  const getDates = () => {
    const dates = [];
    times.map((time) => {
      if (!dates.includes(new Date(time.time).toLocaleDateString())) {
        dates.push(new Date(time.time).toLocaleDateString());
      }
    });
    const future = dates.filter((date) => new Date(date) >= new Date());

    return future.map((date) => <option value={date} label={date} />);
  };

  const handleSubmit = async ({ doctor, specialty, date }) => {
    let nDoctors = [];
    let nTimes = [];

    if (specialty === "") {
      nDoctors = doctors;
    } else {
      nDoctors = doctors.filter((doctor) => doctor.specialty === specialty);
    }

    if (doctor !== "") {
      nDoctors = [doctors.find((d) => d.name === doctor)];
    }

    let doctorTimesList = [];
    await nDoctors.map(async (doctor) => {
      const doctorTimesData = await fetch(
        "http://localhost:8080/times/doctorId/" + doctor.id
      );
      const doctorTimes = await doctorTimesData.json();
      doctorTimesList.push(doctorTimes);
    });

    if (date !== "") {
      nTimes = doctorTimesList.filter(
        (time) =>
          new Date(time.time).toLocaleDateString() ===
          new Date(date).toLocaleDateString()
      );
    }

    console.log(nTimes);
  };

  return (
    <div>
      <h3 className="content__title">Set Appointment</h3>
      <div className="row">
        <div className="col-md-3 col">
          <div className="filters">
            <h4 className="text-center">Filters</h4>
            <Formik
              initialValues={{
                doctor: "",
                specialty: "",
                date: "",
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {(formik) => (
                <Form className="form p-3">
                  <select
                    className="form-select my-2"
                    name="specialty"
                    defaultValue={formik.values.specialty}
                    value={formik.values.specialty}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.values.specialty = e.target.value;
                      console.log(formik.values.specialty);
                    }}
                    onBlur={formik.handleBlur}
                    style={{ display: "block" }}
                  >
                    <option value="" label="All"></option>
                    {getSpecialties()}
                  </select>
                  <select
                    className="form-select my-2"
                    name="doctor"
                    defaultValue={formik.values.doctor}
                    value={formik.values.doctor}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.values.doctor = e.target.value;
                      console.log(formik.values.doctor);
                    }}
                    onBlur={formik.handleBlur}
                    style={{ display: "block" }}
                  >
                    <option value="" label="All"></option>
                    {doctors
                      .filter(
                        (doctor) =>
                          doctor.specialty === formik.values.specialty ||
                          formik.values.specialty === ""
                      )
                      .map((doctor) => (
                        <option value={doctor.name} label={doctor.name} />
                      ))}
                  </select>
                  <select
                    className="form-select my-2"
                    name="date"
                    defaultValue={formik.values.date}
                    value={formik.values.date}
                    onChange={(e) => {
                      formik.handleChange(e);
                      formik.values.date = e.target.value;
                      console.log(formik.values.date);
                    }}
                    onBlur={formik.handleBlur}
                    style={{ display: "block" }}
                  >
                    <option value="" label="All"></option>
                    {getDates()}
                  </select>

                  <button className="btn btn-primary m-3" type="submit">
                    Set Appointment
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <div className="col-md-9 col">
          <div className="appointments">
            <h4>Appointments</h4>
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Doctor Name</th>
                  <th scope="col">Date</th>
                  <th scope="col">Time</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Dr. John Doe</td>
                  <td>12.05.2021</td>
                  <td>10:00</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Dr. Jane Doe</td>
                  <td>12.05.2021</td>
                  <td>11:00</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Dr. John Doe</td>
                  <td>12.05.2021</td>
                  <td>12:00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
