import Dashboard from "@/components/Dashboard";
import SetAppointment from "@/components/dashboard/SetAppointment";
import { getAll } from "@/utils/db";
import React from "react";

const set_appointment = ({ doctors, times }) => {
  return (
    <Dashboard>
      <SetAppointment doctors={doctors} times={times} />
    </Dashboard>
  );
};

export async function getServerSideProps(context) {
  try {
    const doctors = await getAll("doctors");

    const times = await getAll("times");

    return {
      props: { doctors, times },
    };
  } catch (error) {
    console.log(error);
    return {
      props: { doctors: [], times: [] },
    };
  }
}

export default set_appointment;
