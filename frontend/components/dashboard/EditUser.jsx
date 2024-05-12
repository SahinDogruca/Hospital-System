import React, { useEffect, useState } from "react";
import { Formik, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import TextField from "../TextField";
import { useUser } from "../../context/UserContext";
import { update } from "../../utils/authApi";

const EditUser = () => {
  const { user, setUser, userType, setUserType } = useUser();
  const [initialValues, setInitialValues] = useState({
    userType: "patients",
    tc: "",
    name: "",
    specialty: "",
    password: "",
    confirmPassword: "",
  });

  const validate = Yup.object({
    tc: Yup.string().required("TC required"),
    name: Yup.string().required("Name required"),
    specialty: Yup.string().when("userType", {
      is: "doctors",
      then: Yup.string().required("Specialty required"),
    }),
    password: Yup.string()
      .min(4, "Password must be minimum 4 characters")
      .required("Password required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  useEffect(() => {
    setUserType(user.specialty ? "doctors" : "patients");

    // Initialize the initial values object based on user data
    setInitialValues({
      userType: user.specialty ? "doctors" : "patients",
      tc: user.tc || "",
      name: user.name || "",
      specialty: user.specialty || "",
      password: user.password || "",
      confirmPassword: user.password || "",
    });
  }, [user]);

  return (
    <div>
      <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={validate}
        onSubmit={async (values) => {
          let updatedUser = {
            name: values.name,
            tc: values.tc,
            specialty: values.specialty,
            password: values.password,
          };

          const newUser = await update(user.id, updatedUser, userType);
          setUser(newUser);
        }}
      >
        {(formik) => (
          <div>
            <h1 className="text-center content__title">Edit Profile</h1>
            <Form className="form p-3">
              <TextField type="text" label="TC" name="tc" />
              <TextField type="text" label="Name" name="name" />
              {formik.values.userType === "doctors" && (
                <TextField type="text" label="Specialty" name="specialty" />
              )}
              <TextField
                type="password"
                label="Password"
                name="password"
                initialvalue={user.password}
              />
              <TextField
                type="password"
                label="Confirm Password"
                name="confirmPassword"
                initialvalue={user.password}
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="error"
              />

              <button className="btn btn-primary m-3" type="submit">
                Save
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
};

export default EditUser;
