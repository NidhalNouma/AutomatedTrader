import { Fragment, useState } from "react";

import { Button as Button_, ButtonGroup } from "react-daisyui";
import moment from "moment";

function NotificationsSection({ notifications }) {
  const [notType, setNotType] = useState(0);
  return (
    <div className="w-full  p-2 ">
      <ButtonGroup className="mb-6 mx-auto rounded-none w-full grid grid-cols-3 items-center justify-between">
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-t rounded-b-none py-1 bg-transparent hover:bg-transparent text-text/80 hover:text-text border-2 !border-x-0 !border-t-0 border-text/20 w-full truncate ${
            notType === 0 &&
            "text-text border-text/80 hover:!border-text/80 hover:text-btn"
          }`}
          onClick={() => setNotType(0)}
        >
          Notifications
        </Button_>
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-t rounded-b-none py-1 bg-transparent hover:bg-transparent text-text/80 hover:text-text border-2 !border-x-0 !border-t-0 border-text/20 w-full truncate ${
            notType === 1 &&
            "text-text border-text/80 hover:!border-text/80 hover:text-btn"
          }`}
          onClick={() => setNotType(1)}
        >
          Announcement
        </Button_>
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-t rounded-b-none py-1 bg-transparent hover:bg-transparent text-text/80 hover:text-text border-2 !border-x-0 !border-t-0 border-text/20 w-full truncate ${
            notType === 2 &&
            "text-text border-text/80 hover:!border-text/80 hover:text-btn"
          }`}
          onClick={() => setNotType(2)}
        >
          What&apos;s new
        </Button_>
      </ButtonGroup>{" "}
      {notifications?.length > 0 ? (
        <Fragment>
          <div className="p-0.5 overflow-hidden">
            {notifications.map((not, i) => (
              <NotItem
                key={i}
                not={not}
                setShow={() => click(not)}
                read={not.isRead}
              />
            ))}
          </div>
        </Fragment>
      ) : (
        <div className="py-4 px-2">
          <p className="text-sm text-text/80 font-semibold">
            No available notifications!
          </p>
        </div>
      )}
    </div>
  );
}

export default NotificationsSection;

export function NotItem({ not, setShow, read }) {
  return (
    <Fragment>
      <div
        onClick={() => setShow()}
        className={`px-2 py-1.5 rounded cursor-pointer hover:bg-bg my-2 ${
          !read ? "" : "bg-bgt"
        }`}
      >
        <p className="text-xs line-clamp-2 text-text">{not.message}</p>
        <div className="">
          <span className="text-text text-xs font-light">
            {moment(not.created_at?.toDate()).fromNow()}
          </span>
        </div>
      </div>
    </Fragment>
  );
}
