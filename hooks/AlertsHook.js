import { useState, useEffect, useContext, createContext } from "react";
import { getAlertsByUserId, listenToAlerts } from "../db/alerts";

export function GetAlerts() {
  const [alertsHook, setAlertsHook] = useState([]);

  async function getAllAlertsHook(userId) {
    if (!userId) return;
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    listenToAlerts(userId, setAlertsHook);
  }

  return { alertsHook, setAlertsHook, getAllAlertsHook };
}

export const AlertsC = createContext(null);

export const AlertsCC = ({ children, value }) => {
  return <AlertsC.Provider value={value}>{children}</AlertsC.Provider>;
};

export const GetAlertsContext = () => useContext(AlertsC);
