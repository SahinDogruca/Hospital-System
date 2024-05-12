import Dashboard from "@/components/Dashboard";
import WritePrescription from "@/components/dashboard/WritePrescription";
import React from "react";
import { getAll } from "@/utils/db";

const write_prescription = ({ patients }) => {
  return (
    <Dashboard>
      <WritePrescription patients={patients} />
    </Dashboard>
  );
};

export async function getServerSideProps(context) {
  const patients = await getAll("patients");

  return patients ? { props: { patients } } : { props: {} };
}

export default write_prescription;
