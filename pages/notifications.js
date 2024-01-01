import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { ButtonGroup, Button } from "react-daisyui";

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
  const [type, setType] = useState(0);

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

        <div className=" mt-4">
          {notifications?.length > 0 ? (
            <div className="w-full lg:w-1/2">
              <ButtonGroup>
                <Button
                  size="sm"
                  className={` font-medium capitalize !text-sm rounded-xl bg-bg mb-3  hover:!bg-bgt text-text-p hover:text-text-h ${
                    type === 0 && "text-text-h bg-primary hover:!bg-primary"
                  }`}
                  onClick={() => setType(0)}
                >
                  All
                </Button>
                <Button
                  size="sm"
                  className={` font-medium capitalize !text-sm rounded-xl bg-bg  hover:!bg-bgt text-text-p hover:text-text-h ${
                    type === 1 && "text-text-h bg-primary hover:!bg-primary"
                  }`}
                  onClick={() => setType(1)}
                >
                  Unread
                </Button>
                <Button
                  size="sm"
                  className={` font-medium capitalize !text-sm rounded-xl bg-bg  hover:!bg-bgt text-text-p hover:text-text-h ${
                    type === 2 && "text-text-h bg-primary hover:!bg-primary"
                  }`}
                  onClick={() => setType(2)}
                >
                  Read
                </Button>
              </ButtonGroup>

              {notifications.map((not, i) => {
                const read = not.isReadBy?.find((v) => v === fullUser.id);
                if (type === 0 || (type === 1 && !read) || (type === 2 && read))
                  return (
                    <NotificationItem
                      key={i}
                      not={not}
                      setShow={() => click(not)}
                      read={read}
                    />
                  );
              })}
            </div>
          ) : (
            <div className="mt-6 w-full"></div>
          )}
        </div>

        <NotificationModal show={show} setShow={setShow} />
      </MainWithHeader>
    </>
  );
}
