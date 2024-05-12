import { getAll } from "@/utils/db";
import React from "react";

const Personals = ({ doctors }) => {
  return (
    <section className="personals">
      <div className="container">
        <div className="personals-wrapper">
          <h1 className="personals-title">Our Personals</h1>
          <div className="personals-list">
            {doctors.map((doctor) => (
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{doctor.name}</h5>
                  <h6 className="card-subtitle mb-2">{doctor.specialty}</h6>
                  <p className="card-text">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Pariatur excepturi eum obcaecati maiores, doloribus nisi
                    nihil possimus blanditiis assumenda illo.
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Personals;

export const getServerSideProps = async (context) => {
  try {
    const doctors = await getAll("doctors");

    return {
      props: {
        doctors,
      },
    };
  } catch (error) {
    console.error("Error fetching doctors data:", error);
    return {
      props: {
        doctors: [],
      },
    };
  }
};
