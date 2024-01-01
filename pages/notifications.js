import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { H1, Hi6, H4 } from "../Components/H";
import { useState } from "react";

import { GetNotificationContext, MarkAsRead } from "../hooks/NotificationHook";
import { GetFullUserContext } from "../hooks/UserHook";
import NotificationItem from "../Features/notifications/NotificationItem";
import NotificationModal from "../Features/notifications/NotificationModal";

export default function NotificationsPage() {
  const { notifications, unreadNotifications } = GetNotificationContext();
  const { fullUser } = GetFullUserContext();

  const [show, setShow] = useState(null);

  const click = (not) => {
    setShow(not);
    const findRead = not.isReadBy?.find((v) => v === fullUser.id);
    if (!findRead) MarkAsRead(not.id, fullUser.id);
  };

  return (
    <>
      <Sidenav cpath="" />
      <MainWithHeader>
        <div className="flex items-center">
          <H1>Notifications</H1>
        </div>

        {notifications?.length > 0 ? (
          <div className="w-full lg:w-1/2 mt-4">
            {notifications.map((not, i) => (
              <NotificationItem
                key={i}
                not={not}
                setShow={() => click(not)}
                read={not.isReadBy?.find((v) => v === fullUser.id)}
              />
            ))}
          </div>
        ) : (
          <div className="mt-6 w-full"></div>
        )}

        <NotificationModal show={show} setShow={setShow} />
      </MainWithHeader>
    </>
  );
}
