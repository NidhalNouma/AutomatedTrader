import { useState, createContext, useContext } from "react";

export const ToastHook = () => {
  const [alerts, setAlerts] = useState([]);

  function newAlert(text, status) {
    let i = alerts.length;
    setAlerts((alerts) => [
      ...alerts,
      {
        i,
        text,
        status,
      },
    ]);
  }

  //   setTimeout(() => {
  //     setAlerts((a) => a.filter((v) => v.i !== alerts.length));
  //   }, 3000);

  return { alerts, setAlerts, newAlert };
};

export const ToastC = createContext(null);

export const ToastCC = ({ children, value }) => {
  return <ToastC.Provider value={value}>{children}</ToastC.Provider>;
};

export const GetToastContext = () => useContext(ToastC);
