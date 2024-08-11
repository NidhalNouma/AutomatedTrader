import React from "react";
import { H5, Hi6, H6 } from "../../components/H";
import moment from "moment";
import Link from "next/link";

function ticketCard({ ticket }) {
  const lastMsg = ticket.messages[ticket.messages.length - 1];
  return (
    <Link href={"/support/" + ticket.id}>
      <div className=" p-2 my-3 border-2 border-bga rounded-lg bg-bga cursor-pointer">
        <div className="flex items-center justify-between mb-2">
          <H5 className="font-bold ">{ticket.subject}</H5>
          <Hi6>{moment(ticket.created_at.toDate()).fromNow()}</Hi6>
        </div>

        <H6 className="">{lastMsg.message}</H6>
      </div>
    </Link>
  );
}

export default ticketCard;
