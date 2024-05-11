import React from "react";

const Invoice = ({ invoice, type }) => {
  const getPrice = (drugs) => {
    let price = 0;
    drugs?.forEach((drug) => {
      price += drug.price;
    });
    return price;
  };
  return (
    <>
      <table class="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">
              {type === "patients" ? "Doctor Name" : "Patient Name"}
            </th>
            <th scope="col">Price</th>
            {type === "patients" && <th scope="col">Pay</th>}
          </tr>
        </thead>
        <tbody>
          {invoice?.map((item, index) => {
            return (
              <>
                <tr key={index}>
                  <th scope="row">{item.id}</th>
                  <td>
                    {type === "patients" ? item.doctor.name : item.patient.name}
                  </td>
                  <td>{getPrice(item.drugs)}</td>
                  {type === "patients" && (
                    <td>
                      <button className="btn btn-primary">Pay</button>
                    </td>
                  )}
                </tr>
              </>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default Invoice;
