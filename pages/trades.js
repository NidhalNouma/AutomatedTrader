import { useState } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import { GetMTAccountsContext, CalculateData } from "../hooks/MTAccounts";
import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";

import { H1 } from "../Components/H";
// import { PlusIcon, PlayIcon } from "@heroicons/react/outline";

import { ButtonP } from "../Components/Button";
import Table from "../Features/DataAndCharts/Table";
import { Modal1 } from "../Components/Modal";
import OpenTrade from "../Features/tradesManual/Open";
import UpgradeMsg from "../Features/UpgradeMsg";

export default function TradesPage() {
  const { mtAccounts, getData } = GetMTAccountsContext();
  const data = getData();
  const { fullUser } = GetFullUserContext();

  const [open, setOpen] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);

  return (
    <>
      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <OpenTrade close={() => setOpen(false)} />
      </Modal1>
      <UpgradeMsg open={openUpg} close={() => setOpenUpg(false)}></UpgradeMsg>

      <Sidenav cpath="trades" />
      <MainWithHeader>
        <div className="flex justify-between items-center">
          <H1>Trades</H1>
          <ButtonP
            className="" // !bg-transparent !px-1 !rounded !border-b-[4px] border-primary "
            onClick={() => {
              const sub = fullUser.subObj;
              if (sub && sub.manualTrade) setOpen(true);
              else setOpenUpg(true);
            }}
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-4 h-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                />
              </svg>
            }
          >
            Open Trade
          </ButtonP>
        </div>

        {data?.length > 0 ? (
          <div className="mt-12">
            <Table data={data} accounts={mtAccounts} />
          </div>
        ) : (
          <div className="mt-6">
            <p>
              No available trades yet, click Open Trade to place a new trade.
            </p>
          </div>
        )}
      </MainWithHeader>
    </>
  );
}
