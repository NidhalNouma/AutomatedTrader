import { createContext, useContext, useState, useEffect } from "react";

import {
  markNotificationAsRead,
  listenToNotifications,
} from "../lib/notifications";

import { useUser } from "./UserContext";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const { user } = useUser();

  const [notifications, setNotifications] = useState([]);
  const [unreadNotifications, setUnreadNotifications] = useState(0);

  async function getAllNotifications() {
    // const all = await getAlertsByUserId(user.uid);
    // setAlertsHook(all);

    listenToNotifications(user.uid, setNotifications);
  }

  async function MarkNotificationAsRead(notificationId) {
    await markNotificationAsRead(notificationId, user.uid);
  }

  useEffect(() => {
    if (user) getAllNotifications();
  }, [user]);

  useEffect(() => {
    if (user)
      if (notifications.length > 0) {
        let cnt = 0;
        for (let i = 0; i < notifications.length; i++) {
          const notification = notifications[i];
          if (!notification.isReadBy?.find((v) => v === user.uid)) cnt++;
        }

        setUnreadNotifications(cnt);
      }
  }, [notifications, user]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        setNotifications,
        getAllNotifications,
        unreadNotifications,
        MarkNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
