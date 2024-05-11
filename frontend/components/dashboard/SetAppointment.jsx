import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import TextField from "../TextField";
import MyPagination from "./MyPagination";
import { useUser } from "@/context/UserContext";

const SetAppointment = ({ appointments, doctors, patients, times }) => {
  const { user } = useUser();
  const [filteredTimes, setFilteredTimes] = useState(
    times.filter((time) => new Date(time.time) >= new Date())
  );
  const [currentPage, setCurrentPage] = useState(1);
  const timesPerPage = 10;
  const pageCount = Math.ceil(times.length / timesPerPage);
  const [currentTimes, setCurrentTimes] = useState(
    filteredTimes.slice(0, timesPerPage)
  );

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
      if (
        !dates.includes(
          new Date(time.time).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        )
      ) {
        dates.push(
          new Date(time.time).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          })
        );
      }
    });
    const future = dates.filter((date) => new Date(date) >= new Date());

    return future.map((date) => <option value={date} label={date} />);
  };

  const handleSubmit = (values) => {
    const nTimes = times.filter((time) => {
      return (
        (values.doctor === "" || time.doctor.name === values.doctor) &&
        (values.specialty === "" ||
          time.doctor.specialty === values.specialty) &&
        (values.date === "" ||
          new Date(time.time).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          }) === values.date) &&
        time.status === false
      );
    });

    setFilteredTimes(nTimes);
  };

  const handleSet = async (e, patientId, doctorId, timeId) => {
    e.preventDefault();
    const appointment = {
      patientId,
      doctorId,
      timeId,
    };

    const res = await fetch("http://localhost:8080/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(appointment),
    });

    if (res.status === 200) {
      alert("Appointment set successfully!");
    }
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
                  <th scope="col">Set</th>
                </tr>
              </thead>
              <tbody>
                {currentTimes.map((time) => (
                  <tr>
                    <th scope="row">{time.id}</th>
                    <td>{time.doctor.name}</td>
                    <td>
                      {new Date(time.time).toLocaleDateString("tr-TR", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                      })}
                    </td>
                    <td>{new Date(time.time).toLocaleTimeString()}</td>
                    <td>
                      <button
                        className="btn btn-primary"
                        onClick={(e) =>
                          handleSet(e, user.id, time.doctor.id, time.id)
                        }
                      >
                        Set
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <nav>
              <ul class="pagination">
                <li class="page-item">
                  <button
                    class="page-link"
                    onClick={() => {
                      if (currentPage > 1) {
                        setCurrentPage(currentPage - 1);
                      }

                      const indexOfLastTime = currentPage * timesPerPage;
                      const indexOfFirstTime = indexOfLastTime - timesPerPage;
                      setCurrentTimes(
                        filteredTimes.slice(indexOfFirstTime, indexOfLastTime)
                      );
                    }}
                  >
                    Previous
                  </button>
                </li>
                <li class="page-item active" aria-current="page">
                  <button class="page-link">{currentPage}</button>
                </li>
                <li class="page-item">
                  <button
                    class="page-link"
                    onClick={() => {
                      setCurrentPage(currentPage + 1);

                      const indexOfLastTime = currentPage * timesPerPage;
                      const indexOfFirstTime = indexOfLastTime - timesPerPage;
                      setCurrentTimes(
                        filteredTimes.slice(indexOfFirstTime, indexOfLastTime)
                      );
                    }}
                  >
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetAppointment;
