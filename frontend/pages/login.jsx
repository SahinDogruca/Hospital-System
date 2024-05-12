import React, { useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import TextField from "../components/TextField";
import * as Yup from "yup";
import { login } from "../utils/doctorApi";
import { useUser } from "../context/UserContext";
import { useRouter } from "next/router";
import Link from "next/link";

export default function App() {
  const router = useRouter();
  const { user, setUser, isLogged, setIsLogged } = useUser();
  const [type, setType] = useState("patients");
  const validate = Yup.object({
    tc: Yup.string().required("tc required"),
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
            console.log(type);
            const usern = await login(values.tc, values.password, type);

            await setUser(usern);
            await setIsLogged(true);

            if (usern) {
              localStorage.setItem("user", JSON.stringify(usern));
              router.push("/dashboard");
            } else {
              alert("User not found!");
            }
          } catch (error) {
            console.error("Error:", error);
          }
        }}
      >
        {(formik) => (
          <div>
            <h1 className="text-center">Log In</h1>

            <Form className="form p-3 login">
              <select
                className="form-select"
                name="colors"
                defaultValue={formik.values.type}
                value={formik.values.type}
                onChange={(e) => {
                  setType(e.target.value);
                  formik.handleChange(e);
                  formik.values.type = e.target.value;
                  console.log(formik.values.type);
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
              <div className="d-flex justify-content-center align-items-center">
                <button className="btn btn-primary m-3" type="submit">
                  Login
                </button>

                <button className="btn btn-dark m-3" type="reset">
                  Reset
                </button>
                <button type="button" className="btn btn-warning">
                  <Link
                    href="/register"
                    style={{ textDecoration: "none", color: "#fff" }}
                  >
                    Go to Register
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
  password: "",
};
