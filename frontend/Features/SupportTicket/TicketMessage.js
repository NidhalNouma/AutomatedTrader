import React from "react";
import { Hi6 } from "../../components/H";
import moment from "moment";

function TicketMessage({ msg }) {
  return (
    <div className="px-2 py-3 mb-3 bg-bga rounded-lg w-1/2">
      <p className="text-text-h text-sm whitespace-pre-line">{msg.message}</p>

      <div className="flex items-center justify-between mt-3">
        <div className="">
          {msg.file && (
            <span
              className="text-sm text-accent font-bold cursor-pointer"
              onClick={() => window.open(msg.file, "_blank")}
            >
              View attachment
            </span>
          )}
        </div>

        <Hi6>{moment(msg.at.toDate()).fromNow()}</Hi6>
      </div>
    </div>
  );
}

export default TicketMessage;
