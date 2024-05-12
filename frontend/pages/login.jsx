import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { login } from "../utils/authApi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";

export default function App() {
  const router = useRouter();
  const { user, setUser, setIsLogged, userType, setUserType } = useUser();

  const validate = Yup.object({
    tc: Yup.string().required("TC required"),
    password: Yup.string()
      .min(4, "Password must be minimum 4 digits!")
      .required("Password Required!"),
  });

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={async (values) => {
          try {
            const loggedInUser = await login(
              values.tc,
              values.password,
              userType
            );

            if (loggedInUser && loggedInUser != {}) {
              localStorage.setItem("user", JSON.stringify(loggedInUser));
              setUser(loggedInUser);
              setIsLogged(true);
              setUserType(user.specialty ? "doctors" : "patients");
              router.push("/dashboard");
            } else {
              console.log("User not found!");
              alert("user not found");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
      >
        {(formik) => (
          <div>
            <h1 className="text-center">Signup</h1>

            <Form className="form p-3 login">
              <select
                className="form-select"
                name="userType"
                value={formik.values.userType}
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
                name="password"
                label="Password"
                placeholder="qwert@123"
              />

              <button className="btn btn-primary m-3" type="submit">
                Login
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
  password: "",
};
