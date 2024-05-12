import { useEffect } from "react";
import { UserProvider } from "@/context/UserContext.jsx";

import Layout from "@/components/Layout";

import "@/styles/styles.css";

export default function App({ Component, pageProps }) {
  useEffect(() => {
    require("../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);
  return (
    <UserProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserProvider>
  );
}
