import { register } from "@/utils/authApi";
import React, { useState } from "react";
import { useUser } from "@/context/UserContext";
import { useRouter } from "next/router";

const Register = () => {
  const router = useRouter();
  const { user, setUser, setIsLogged, userType, setUserType } = useUser();
  const [type, setType] = useState("patients");
  const [tc, setTc] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [specialty, setSpecialty] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    let user = {
      tc,
      password,
      name,
    };

    if (type === "doctors") {
      user.specialty = specialty;
    }

    const resBody = await register(user, type);

    console.log(resBody);

    if (resBody) {
      setUser(resBody);
      setIsLogged(true);
      setUserType(user.specialty ? "doctors" : "patients");
      router.push("/dashboard");
    }
  };

  const handleReset = () => {
    setTc("");
    setPassword("");
    setName("");
    setSpecialty("");
  };

  return (
    <div className="container my-5">
      <h1 className="text-center">Register</h1>
      <form className="w-50 m-auto" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleFormControlSelect1">Type</label>
          <select
            className="form-control"
            id="exampleFormControlSelect1"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="patients">Patients</option>
            <option value="doctors">Doctors</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">TC</label>
          <input
            type="text"
            onChange={(e) => setTc(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Name</label>
          <input
            type="text"
            onChange={(e) => setName(e.target.value)}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
        </div>

        {type === "doctors" && (
          <div className="form-group">
            <label htmlFor="exampleInputName1">Specialty</label>
            <input
              onChange={(e) => setSpecialty(e.target.value)}
              type="text"
              className="form-control"
              id="exampleInputName1"
            />
          </div>
        )}
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            className="form-control"
            id="exampleInputPassword1"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-3">
          Register
        </button>
        <button
          type="button"
          className="ms-3 btn btn-danger mt-3"
          onClick={handleReset}
        >
          Reset
        </button>
      </form>
    </div>
  );
};

export default Register;
