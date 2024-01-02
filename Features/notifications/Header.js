import { Dropdown, Indicator } from "react-daisyui";
import { BellIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";
import Link from "next/link";

import {
  GetNotificationContext,
  MarkAsRead,
} from "../../hooks/NotificationHook";
import { GetFullUserContext } from "../../hooks/UserHook";

import NotItem from "./NotificationItem";
import NotificationModal from "./NotificationModal";

function NotificationHeader() {
  const { notifications, unreadNotifications } = GetNotificationContext();
  const { fullUser } = GetFullUserContext();

  const [show, setShow] = useState(null);

  const click = (not) => {
    setShow(not);
    const findRead = not.isReadBy?.find((v) => v === fullUser.id);
    if (!findRead) MarkAsRead(not.id, fullUser.id);
  };

  return (
    <Fragment>
      <Dropdown vertical="end">
        <Indicator vertical="top" horizontal="" className="relative ml-2">
          {unreadNotifications > 0 && (
            <div className="right-0 top-0 p-2 !absolute w-3 h-3 flex items-center justify-center rounded-full bg-accent">
              <span className="text-bg text-xs">{unreadNotifications}</span>
            </div>
          )}
          <span className="cursor-pointer text-text-p">
            <BellIcon className="h-7 w-7" />
          </span>
        </Indicator>

        <Dropdown.Menu className="">
          <div className="w-72 menu-compact bg-bg max-h-[38vh] p-2 rounded-md">
            {notifications?.length > 0 ? (
              <Fragment>
                <div className="p-0.5 max-h-[80%] overflow-hidden">
                  {notifications.map((not, i) => (
                    <NotItem
                      key={i}
                      not={not}
                      setShow={() => click(not)}
                      read={not.isReadBy?.find((v) => v === fullUser.id)}
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
        </Dropdown.Menu>
      </Dropdown>

      <NotificationModal show={show} setShow={setShow} />
    </Fragment>
  );
}

export default NotificationHeader;
