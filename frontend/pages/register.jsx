import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { register } from "../utils/doctorApi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function App() {
  const router = useRouter();
  const { user, setUser, isLogged, setIsLogged } = useUser();
  const [type, setType] = useState("patients");

  const validate = Yup.object({
    tc: Yup.string().required("TC required"),
    name: Yup.string().required("Name Required!"),
    specialty:
      type === "doctors"
        ? Yup.string().required("Specialty required")
        : Yup.string(),
    password: Yup.string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match!")
      .required("Confirm password is required!"),
  });

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={async (values) => {
          try {
            const user = {
              name: values.name,
              tc: values.tc,
              specialty: values.specialty,
              password: values.password,
            };
            console.log(type);
            const res = await register(user, type); // Pass the type to the register function

            if (res) {
              await setUser(user);
              await setIsLogged(true);

              router.push("/dashboard");
            }
          } catch (error) {
            alert("User cannot be registered!");
          }
        }}
      >
        {(formik) => (
          <div>
            <h1 className="text-center">Signup</h1>
            <Form className="form p-3 register">
              <select
                className="form-select"
                name="colors"
                defaultValue={formik.values.type}
                onChange={(e) => {
                  setType(e.target.value);
                  formik.values.type = e.target.value;
                }}
                onBlur={formik.handleBlur}
                style={{ display: "block" }}
              >
                <option value="patients" label="Kullanıcı" />
                <option value="doctors" label="Doktor" />
              </select>
              <TextField
                type="text"
                label="TC"
                name="tc"
                placeholder="123456789"
              />

              <TextField
                type="text"
                name="name"
                label="Name"
                placeholder="John Doe"
              />
              {type === "doctors" && (
                <TextField
                  type="text"
                  name="specialty"
                  label="Specialty"
                  placeholder="kulak"
                />
              )}

              <TextField
                type="text"
                name="password"
                label="Password"
                placeholder="qwert@123"
              />

              <div className="mb-2">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  id="confirmPassword"
                  className={`form-control shadow-none ${
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword &&
                    "is-invalid"
                  }`}
                  type="text"
                  name="confirmPassword"
                  placeholder="confirm password..."
                  {...formik.getFieldProps("confirmPassword")}
                />
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                  className="error"
                />
              </div>

              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-primary m-3" type="submit">
                  Register
                </button>

                <button className="btn btn-dark m-3" type="reset">
                  Reset
                </button>

                <button type="button" className="btn btn-warning">
                  <Link
                    href="/login"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Go to Login
                  </Link>
                </button>
              </div>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

const initialValues = {
  type: "patients",
  tc: "",
  name: "",
  specialty: "",
  password: "",
  confirmPassword: "",
};
