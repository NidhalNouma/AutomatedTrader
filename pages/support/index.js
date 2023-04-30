import { useState } from "react";
import Sidenav from "../../Features/SideNav";
import MainWithHeader from "../../Features/mainLayout/MainWithHeader";
import { useRouter } from "next/router";

import { GetUserContext, GetFullUserContext } from "../../hooks/UserHook";

import { H1, Hi3, Hi4, H4 } from "../../Components/H";
import { ButtonP } from "../../Components/Button";

import NewTicket from "../../Features/SupportTicket/NewTicket";
import TicketCard from "../../Features/SupportTicket/ticketCard";

import { BsTicket } from "react-icons/bs";

import { GetSupportTickets } from "../../hooks/SupportTicket";

export default function Support() {
  // const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();
  const router = useRouter();
  const [openNew, setOpenNew] = useState(false);
  const { openTickets, getTickets } = GetSupportTickets(fullUser.id);

  return (
    <>
      <Sidenav cpath="support" />
      <MainWithHeader withBanners={true}>
        <div className="flex justify-between items-center">
          {/* <div className="flex items-start"> */}
          <H1>Support</H1>

          <ButtonP
            className="" // !bg-transparent !px-1 !rounded !border-b-[4px] border-primary "
            onClick={() => {
              //   const sub = fullUser.subObj;
              //   if (sub && sub.manualTrade) setOpen(true);
              //   else setOpenUpg(true);
              setOpenNew(true);
            }}
            icon={<BsTicket className="h-4 w-4 text-text-h " />}
          >
            New Ticket
          </ButtonP>
        </div>

        <div className="mt-8 w-full justify-around flex">
          {/* <H4 className="font-bold mx-2 hover:!text-text-h cursor-pointer">
            Open tickets
          </H4>
          <H4 className="mx-2 font-bold !text-text-p hover:!text-text-h cursor-pointer">
            Closed tickets
          </H4> */}
        </div>

        <div className="mt-4 w-full">
          {openTickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} />
          ))}
        </div>
      </MainWithHeader>

      <NewTicket
        open={openNew}
        close={() => setOpenNew(false)}
        userId={fullUser.id}
        getTickets={async () => await getTickets()}
      />
    </>
  );
}
