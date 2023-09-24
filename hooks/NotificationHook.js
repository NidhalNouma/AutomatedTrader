import { useState, useEffect, useContext, createContext } from "react";
import { listenToNotifications, markAsRead } from "../db/notifications";

export function GetNotifications() {
  const [notifications, setNotifications] = useState([]);

  async function getAllNotifications(userId) {
    if (!userId) return;
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    listenToNotifications(userId, setNotifications);
  }

  return { notifications, setNotifications, getAllNotifications };
}

export const NotificationC = createContext(null);

export const NotificationCC = ({ children, value }) => {
  return (
    <NotificationC.Provider value={value}>{children}</NotificationC.Provider>
  );
};

export const GetNotificationContext = () => useContext(NotificationC);

export async function MarkAsRead(notId, userId) {
  await markAsRead(notId, userId);
}
