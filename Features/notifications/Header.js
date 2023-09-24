import { Dropdown, Indicator } from "react-daisyui";
import { BellIcon } from "@heroicons/react/outline";
import { Fragment, useState } from "react";

import { Modal1 } from "../../Components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../Components/H";

import {
  GetNotificationContext,
  MarkAsRead,
} from "../../hooks/NotificationHook";
import { GetFullUserContext } from "../../hooks/UserHook";

function NotificationHeader() {
  const { notifications } = GetNotificationContext();
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
          <div className="right-0 top-0 !absolute w-3 h-3 rounded-full bg-accent"></div>
          <span className="cursor-pointer text-text-p">
            <BellIcon className="h-7 w-7" />
          </span>
        </Indicator>

        <Dropdown.Menu className="w-72 menu-compact bg-bg">
          {notifications?.length > 0 ? (
            <div className="p-0.5">
              {notifications.map((not, i) => (
                <NotItem
                  key={i}
                  not={not}
                  setShow={() => click(not)}
                  read={not.isReadBy?.find((v) => v === fullUser.id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-4 px-2">
              <p className="text-sm font-semibold">
                No available notifications!
              </p>
            </div>
          )}
        </Dropdown.Menu>
      </Dropdown>

      <Modal1
        open={show}
        close={() => {
          setShow(null);
        }}
      >
        <div className="">
          <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
            <H3 className="flex">{show?.title}</H3>
            <Button
              size="sm"
              shape="circle"
              className=" bg-accenti"
              onClick={() => {
                setShow(null);
              }}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>

          <div className="flex flex-col justify-center items-center w-full mt-0">
            <div className="px-7 pb-7">
              <p className="text-sm text-text-p">{show?.message}</p>
            </div>
          </div>
        </div>
      </Modal1>
    </Fragment>
  );
}

export default NotificationHeader;

function NotItem({ not, setShow, read }) {
  return (
    <Fragment>
      <div
        onClick={() => setShow()}
        className={`px-2 py-1.5 rounded cursor-pointer hover:bg-bga my-2 ${
          read ? "" : "bg-bga"
        }`}
      >
        <p className="text-xs line-clamp-2 text-text-p">{not.message}</p>
      </div>
    </Fragment>
  );
}
