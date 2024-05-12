import Head from "next/head";
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { useEffect } from "react";
import { useUser } from "@/context/UserContext";

const Layout = ({ children }) => {
  const { setUser, setIsLogged, setUserType } = useUser();

  useEffect(() => {
    const fetchData = async () => {
      const localUser = localStorage.getItem("user");
      if (localUser) {
        try {
          const user = JSON.parse(localUser);
          await setUser(user);
          await setIsLogged(true);
          await setUserType(user.specialty ? "doctors" : "patients");
        } catch (error) {
          console.error("Error parsing user data:", error);
        }
      }
    };

    fetchData();
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
      <footer className="bg-primary text-white">
        <Footer />
      </footer>
    </div>
  );
};

export default Layout;
