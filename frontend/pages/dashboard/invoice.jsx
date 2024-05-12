import Dashboard from "@/components/Dashboard";

import { getAll, getById } from "@/utils/db";
import React, { useState } from "react";

const invoice = ({ invoices }) => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);

  return (
    <Dashboard>
      <>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Doctor Name</th>
              <th scope="col">Price</th>
              <th scope="col">Due Date</th>
              <th scope="col">Pay</th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>{invoice.prescription.doctor.name}</td>
                <td>{invoice.amount}</td>
                <td>{invoice.dueDate}</td>

                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      let text = "drugs : \n";
                      invoice.prescription.drugs.forEach((drug) => {
                        text += `${drug.name} : ${drug.price} \n`;
                      });

                      alert(text);
                    }}
                  >
                    Pay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </>
    </Dashboard>
  );
};

export async function getServerSideProps(context) {
  const { query } = context;
  const userId = parseInt(query.user);

  const invoicesData = await getAll("invoices");

  const invoicesUser = invoicesData.filter(
    (invoice) => invoice.patientId === userId
  );

  const presInvoices = await Promise.all(
    invoicesUser.map(async (invoice) => {
      const prescription = await getById(
        "prescriptions",
        invoice.prescriptionId
      );
      return { ...invoice, prescription };
    })
  );

  return {
    props: { invoices: presInvoices },
  };
}

export default invoice;
