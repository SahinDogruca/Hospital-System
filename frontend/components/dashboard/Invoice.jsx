import React from "react";

const Invoice = ({ invoices }) => {
  return (
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
          {invoices &&
            invoices.map((invoice, index) => (
              <tr key={index}>
                <td scope="row">{index + 1}</td>
                <td>
                  {invoice.prescription ? invoice.prescription.doctor.name : ""}
                </td>
                <td>{invoice.amount}</td>
                <td>{invoice.dueDate}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={() => {
                      if (invoice.prescription) {
                        let text = "drugs : \n";
                        invoice.prescription.drugs.forEach((drug) => {
                          text += `${drug.name} : ${drug.price} \n`;
                        });
                        alert(text);
                      } else {
                        alert("Prescription not available for this invoice.");
                      }
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
  );
};

export default Invoice;
