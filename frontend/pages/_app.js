import { useEffect } from "react";
import { UserProvider } from "@/context/UserContext.jsx";

import Layout from "@/components/Layout";

import "@/styles/styles.css";
import { DashboardProvider } from "@/context/DashboardContext.jsx";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <UserProvider>
      <DashboardProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </DashboardProvider>
    </UserProvider>
  );
}
