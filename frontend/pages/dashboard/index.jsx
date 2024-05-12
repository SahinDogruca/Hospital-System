import React, { useEffect } from "react";
import Dashboard from "@/components/Dashboard";
import Appointments from "@/components/dashboard/Appointments";
import { getAll } from "@/utils/db";

const DashboardLayout = ({ appointments }) => {
  return (
    <Dashboard>
      <Appointments appointments={appointments} />
    </Dashboard>
  );
};

export async function getServerSideProps(context) {
  const appointments = await getAll("appointments");

  return appointments ? { props: { appointments } } : { props: {} };
}

export default DashboardLayout;
