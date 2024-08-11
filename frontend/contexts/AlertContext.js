import { createContext, useContext, useEffect, useState } from "react";
import { listenToAlerts } from "../lib/alerts";
import { useUser } from "./UserContext";

const AlertContext = createContext();

export function AlertProvider({ children }) {
  const { user } = useUser();

  const [alerts, setAlerts] = useState([]);
  const [oldAlertsLength, setOldAlertsLength] = useState(-1);
  const [newAlert, setNewAlert] = useState(undefined);

  async function getAllAlerts() {
    listenToAlerts(
      user.uid,
      setAlerts,
      oldAlertsLength === -1 ? setOldAlertsLength : null
    );
  }

  useEffect(() => {
    const userAlertSett = user?.alertSettings;
    if (
      // newAlerts === null &&
      oldAlertsLength < alerts?.length &&
      oldAlertsLength > -1
    ) {
      if (user?.alertSettings?.showPopUp) setNewAlert(alerts[0]);
      if (user?.alertSettings?.popUpSound) {
        var mp3_url = "/sounds/Message-tone.mp3";
        new Audio(mp3_url).play();
      }
      setOldAlertsLength(alerts.length);
    }
    // if (newAlerts === undefined) setNewAlert(null);

    // console.log("new alerts: ", newAlerts, alertsHook.length, oldAlertsLength);
  }, [alerts]);

  useEffect(() => {
    if (user) {
      getAllAlerts();
    }
  }, [user]);

  return (
    <AlertContext.Provider value={{ alerts, newAlert }}>
      {children}
    </AlertContext.Provider>
  );
}

export function useAlert() {
  return useContext(AlertContext);
}
