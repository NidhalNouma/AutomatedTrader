import { useState } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import { GetMTAccountsContext, CalculateData } from "../hooks/MTAccounts";
import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";

import { MdWaterfallChart, MdOutlineCandlestickChart } from "react-icons/md";
import { H1 } from "../Components/H";
// import { PlusIcon, PlayIcon } from "@heroicons/react/outline";

import { ButtonP } from "../Components/Button";
import Table from "../Features/DataAndCharts/Table";
import { Modal1 } from "../Components/Modal";
import OpenTrade from "../Features/tradesManual/Open";
import UpgradeMsg from "../Features/UpgradeMsg";

import TradesWelcome from "../Features/WelcomeSection/Trades";

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
            icon={<MdWaterfallChart className="h-4 w-4" />}
          >
            Open Trade
          </ButtonP>
        </div>

        {data?.length > 0 ? (
          <div className="mt-12">
            <Table data={data} accounts={mtAccounts} />
          </div>
        ) : (
          <div className="mt-6 w-full">
            <TradesWelcome />
          </div>
        )}
      </MainWithHeader>
    </>
  );
}
