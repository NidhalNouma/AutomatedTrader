import { Indicator } from "react-daisyui";
import { BellIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import Link from "next/link";

import { useNotification } from "../../contexts/NotificationContext";
import { useUser } from "../../contexts/UserContext";

import NotItem from "../../Features/notifications/NotificationItem";
import NotificationModal from "../../Features/notifications/NotificationModal";

import { Dropdown } from "../ui/Dropdown";
import { RoundedButton } from "../ui/Button";

function NotificationHeader() {
  const { notifications, unreadNotifications } = useNotification();
  const { user } = useUser();

  const [show, setShow] = useState(null);

  const click = (not) => {
    setShow(not);
    const findRead = not.isReadBy?.find((v) => v === user.uid);
    if (!findRead) MarkAsRead(not.id, user.uid);
  };

  return (
    <Fragment>
      <Dropdown
        content={
          <div className="w-72 menu-compact bg-bg max-h-[38vh] p-2 rounded-md">
            {notifications?.length > 0 ? (
              <Fragment>
                <div className="p-0.5 max-h-[80%] overflow-hidden">
                  {notifications.map((not, i) => (
                    <NotItem
                      key={i}
                      not={not}
                      setShow={() => click(not)}
                      read={not.isReadBy?.find((v) => v === user.uid)}
                    />
                  ))}
                </div>
                <div className="">
                  <Link href="/notifications">
                    <span className="text-xs text-primary mt-2 text-center cursor-pointer">
                      View all
                    </span>
                  </Link>
                </div>
              </Fragment>
            ) : (
              <div className="py-4 px-2">
                <p className="text-sm font-semibold">
                  No available notifications!
                </p>
              </div>
            )}
          </div>
        }
      >
        <Indicator vertical="top" horizontal="" className="relative">
          {unreadNotifications > 0 && (
            <div className="right-0 top-0 p-2 !absolute w-3 h-3 flex items-center justify-center rounded-full bg-accent">
              <span className="text-bg text-xs">{unreadNotifications}</span>
            </div>
          )}
          <RoundedButton className="hover:bg-text/10">
            <BellIcon className="h-6 aspect-square" />
          </RoundedButton>
        </Indicator>
      </Dropdown>

      <NotificationModal show={show} setShow={setShow} />
    </Fragment>
  );
}

export default NotificationHeader;
