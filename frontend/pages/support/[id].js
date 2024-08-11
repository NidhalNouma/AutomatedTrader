import { useState, useRef, useEffect } from "react";
import Sidenav from "../../Features/SideNav";
import MainWithHeader from "../../Features/mainLayout/MainWithHeader";
import { useRouter } from "next/router";

import { GetFullUserContext } from "../../hooks/UserHook";

import { H1, Hi3, Hi4, H4 } from "../../components/H";
import AnswerMessage from "../../Features/SupportTicket/AnswerMessage";
import TicketMessage from "../../Features/SupportTicket/TicketMessage";

import { Ticket } from "../../hooks/SupportTicket";

export default function Support() {
  const router = useRouter();
  const { id } = router.query;

  // const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();

  const { ticket, getTicket } = Ticket(id);

  const msgsDiv = useRef(null);

  const upDiv = useRef(null);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    msgsDiv.current?.scrollIntoView({ behavior: "smooth" });

    const dis = upDiv.current?.offsetTop - window.innerHeight;
    setDistance(Math.abs(dis));
  }, [ticket]);

  return (
    <>
      <Sidenav cpath="support" />
      <MainWithHeader withBanners={true} mainClassName="grow flex flex-col">
        <div ref={upDiv} className="flex justify-between items-center">
          {/* <div className="flex items-start"> */}
          <H1>Ticket</H1>
        </div>

        {ticket && (
          <div
            className="grow flex flex-col mt-5"
            style={{ maxHeight: `${distance}px` }}
          >
            <div className="grow overflow-y-scroll flex flex-col-reverse">
              {ticket.messages
                ?.map((message, i) => <TicketMessage msg={message} key={i} />)
                .reverse()}
            </div>
            <div ref={msgsDiv} />
            <div className="mt-auto">
              <AnswerMessage id={id} getTicket={getTicket} />
            </div>
          </div>
        )}
      </MainWithHeader>
    </>
  );
}
