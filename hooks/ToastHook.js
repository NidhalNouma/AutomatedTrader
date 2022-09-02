import { useState, createContext, useContext } from "react";

export const ToastHook = () => {
  const [alerts, setAlerts] = useState([]);

  function newAlert(text, status) {
    setAlerts((alerts) => [
      ...alerts,
      {
        text,
        status,
      },
    ]);
  }

  return { alerts, setAlerts, newAlert };
};

export const ToastC = createContext(null);

export const ToastCC = ({ children, value }) => {
  return <ToastC.Provider value={value}>{children}</ToastC.Provider>;
};

export const GetToastContext = () => useContext(ToastC);
