import { useState, useEffect, useContext, createContext } from "react";
import { listenToNotifications, markAsRead } from "../db/notifications";

export function GetNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);
  const [userId, setUserId] = useState(null);

  async function getAllNotifications(_userId) {
    if (!_userId) return;
    if (!userId) setUserId(_userId);
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    listenToNotifications(userId, setNotifications);
  }

  useEffect(() => {
    if (notifications.length > 0) {
      let cnt = 0;
      for (let i = 0; i < notifications.length; i++) {
        const notification = notifications[i];
        if (!notification.isReadBy?.find((v) => v === userId)) cnt++;
      }

      setUnreadNotifications(cnt);
    }
  }, [notifications, userId]);

  return {
    notifications,
    setNotifications,
    getAllNotifications,
    unreadNotifications,
  };
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
