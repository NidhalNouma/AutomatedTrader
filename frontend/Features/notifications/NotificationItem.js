import { Fragment, useState } from "react";
import moment from "moment";

export default function NotItem({ not, setShow, read }) {
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
