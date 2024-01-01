import { useState, useEffect, useContext, createContext } from "react";
import { getAlertsByUserId, listenToAlerts } from "../db/alerts";

export function GetAlerts() {
  const [alertsHook, setAlertsHook] = useState([]);
  const [oldAlertsLength, setOldAlertsLength] = useState(-1);
  const [newAlerts, setNewAlert] = useState(undefined);
  const [user, setUser] = useState(null);

  async function getAllAlertsHook(cuser) {
    if (!cuser.id) return;
    setUser(cuser);
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    listenToAlerts(
      cuser.id,
      setAlertsHook,
      oldAlertsLength === -1 ? setOldAlertsLength : null
    );
  }

  useEffect(() => {
    const userAlertSett = user?.alertSettings;
    if (
      // newAlerts === null &&
      oldAlertsLength < alertsHook?.length &&
      oldAlertsLength > -1
    ) {
      if (user?.alertSettings?.showPopUp) setNewAlert(alertsHook[0]);
      if (user?.alertSettings?.popUpSound) {
        var mp3_url = "/sounds/Message-tone.mp3";
        new Audio(mp3_url).play();
      }
      setOldAlertsLength(alertsHook.length);
    }
    // if (newAlerts === undefined) setNewAlert(null);

    // console.log("new alerts: ", newAlerts, alertsHook.length, oldAlertsLength);
  }, [alertsHook]);

  return {
    alertsHook,
    setAlertsHook,
    getAllAlertsHook,
    newAlerts,
    setNewAlert,
  };
}

export const AlertsC = createContext(null);

export const AlertsCC = ({ children, value }) => {
  return <AlertsC.Provider value={value}>{children}</AlertsC.Provider>;
};

export const GetAlertsContext = () => useContext(AlertsC);
