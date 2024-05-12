import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { register } from "../utils/authApi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const [setUser, setUserType, setIsLogged] = useUser();

  const validate = Yup.object({
    tc: Yup.string().required("TC required"),
    name: Yup.string().required("Name Required!"),
    specialty: Yup.string().when("type", {
      is: "doctors",
      then: Yup.string().required("Specialty Required!"),
    }),
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
        onSubmit={(values) => {
          let newUser = {
            name: values.name,
            tc: values.tc,
            specialty: values.specialty,
            password: values.password,
          };
          register(newUser, values.type);

          setUser(newUser);
          setIsLogged(true);
          setUserType(values.type);

          localStorage.setItem("user", JSON.stringify(newUser));

          router.push("/dashboard");
        }}
      >
        {(formik) => (
          <div>
            <h1 className="text-center">Signup</h1>
            <Form className="form p-3 register">
              <select
                className="form-select"
                name="userType"
                defaultValue={formik.values.type}
                onChange={(e) => {
                  setUserType(e.target.value);
                  formik.handleChange(e);
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
                placeholder="21773214838"
              />

              <TextField
                type="text"
                name="name"
                label="Name"
                placeholder="Şahin"
              />
              {formik.values.userType === "doctors" && (
                <TextField
                  type="text"
                  name="specialty"
                  label="Specialty"
                  placeholder="Kulak"
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
                  placeholder="Confirm password..."
                  {...formik.getFieldProps("confirmPassword")}
                />
                <ErrorMessage
                  component="div"
                  name="confirmPassword"
                  className="error"
                />
              </div>

              <button className="btn btn-primary m-3" type="submit">
                Register
              </button>
              <button className="btn btn-dark m-3" type="reset">
                Reset
              </button>
            </Form>
          </div>
        )}
      </Formik>
    </div>
  );
}

const initialValues = {
  userType: "patients",
  tc: "",
  name: "",
  specialty: "",
  password: "",
  confirmPassword: "",
};
