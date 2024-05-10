import React, { useState, useEffect } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { register } from "../utils/doctorApi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const [type, setType] = useState("patients");

  const validate = Yup.object({
    tc: Yup.string().required("tc required"),
    name: Yup.string().required("name Required!"),
    specialty: Yup.string().required("specialty required"),
    password: Yup.string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password must match!")
      .required("Confirm password is reqired!"),
  });

  const { user, setUser, isLogged, setIsLogged } = useUser();

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={(values) => {
          let user = {
            name: values.name,
            tc: values.tc,
            specialty: values.specialty,
            password: values.password,
          };
          register(user, values.type);

          setUser(user);
          setIsLogged(true);

          router.push("/dashboard");
        }}
      >
        {(formik) => (
          <div>
            <h1 className="text-center">Signup</h1>
            <Form className="form p-3">
              <select
                className="form-select"
                name="colors"
                defaultValue={formik.values.type}
                onChange={(e) => {
                  setType(e.target.value);
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
  type: "patients",
  tc: "",
  name: "",
  specialty: "",
  password: "",
  confirmPassword: "",
};
