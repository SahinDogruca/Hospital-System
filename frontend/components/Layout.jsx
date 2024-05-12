import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useUser } from "../context/UserContext";
import { useEffect } from "react";

const Layout = ({ children }) => {
  const { user, setUser, isLogged, setIsLogged } = useUser();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      try {
        console.log(user);
        setUser(JSON.parse(user));
        setIsLogged(true);
      } catch (error) {
        console.error("Error parsing user data:", error);
        // Handle the error gracefully, such as resetting user data
      }
    }
  }, []);

  return (
    <div>
      <Head>
        <title>Hospital</title>
      </Head>
      <header>
        <Navbar />
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
