import { createContext, useState, useContext } from "react";

const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  const [contextAppointments, setContextAppointments] = useState([]);

  return (
    <DashboardContext.Provider
      value={{ contextAppointments, setContextAppointments }}
    >
      {children}
    </DashboardContext.Provider>
  );
};

export const useDashboard = () => {
  return useContext(DashboardContext);
};
