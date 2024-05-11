import React, { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
const Invoice = ({ invoices }) => {
  if (!invoices) return <div>hata</div>;
  const { user } = useUser();
  const [presInvoices, setPresInvoices] = useState([]);
  useEffect(() => {
    invoices
      .filter((invoice) => {
        return invoice.patientId === user.id;
      })
      .map(async (invoice) => {
        const data = await fetch(
          `http://localhost:8080/prescriptions/${invoice.prescriptionId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const prescription = await data.json();
        setPresInvoices([...presInvoices, { ...invoice, prescription }]);
      });
  }, [invoices]);
  return (
    <>
      <table class="table">
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
          {presInvoices.map((invoice, index) => (
            <tr key={index}>
              <td scope="row">{index + 1}</td>
              <td>{invoice.prescription.doctor.name}</td>
              <td>{invoice.amount}</td>
              <td>{invoice.dueDate}</td>

              <td>
                <button type="button" className="btn btn-primary">
                  Pay
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default Invoice;
