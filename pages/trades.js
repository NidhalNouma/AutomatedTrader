import { useState, useEffect, Fragment } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";
import { GetMTAccountsContext, CalculateData } from "../hooks/MTAccounts";
import { GetUserContext, GetFullUserContext } from "../hooks/UserHook";
import { GetWebhookContext } from "../hooks/WebHook";

import { MdWaterfallChart, MdOutlineCandlestickChart } from "react-icons/md";
import { H1 } from "../Components/H";
// import { PlusIcon, PlayIcon } from "@heroicons/react/outline";

import { ButtonP } from "../Components/Button";
import Table from "../Features/DataAndCharts/Table";
import BestWorseTrades from "../Features/DataAndCharts/BestWorseTrades";
import CalendarTrades from "../Features/DataAndCharts/Calander";
import { Modal1 } from "../Components/Modal";
import { Select1 } from "../Components/Input";
import OpenTrade from "../Features/tradesManual/Open";
import UpgradeMsg from "../Features/UpgradeMsg";

import TradesWelcome from "../Features/WelcomeSection/Trades";
import { PlayVideoPopup } from "../Components/Video";
import { videosUrls } from "../utils/constant";

export default function TradesPage() {
  const { mt4Accounts, getData } = GetMTAccountsContext();
  const data = getData();
  const { fullUser } = GetFullUserContext();

  const [open, setOpen] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);

  const { webhooks } = GetWebhookContext();
  const [filtredData, setFilteredData] = useState([]);

  const options = [
    "All",
    ...mt4Accounts.map((account) => account.accountDisplayName),
  ];
  const optionsWh = ["All", ...webhooks.map((wh) => wh.name)];
  const [account, setAccount] = useState(options[0]);
  const [wh, setWh] = useState(optionsWh[0]);

  useEffect(() => {
    // console.log(account, datai);
    if (account === "All" && wh === "All") setFilteredData(data);
    else {
      let fdata = data;
      if (account !== "All")
        fdata = fdata.filter((v) => v.accountDisplayName === account);
      if (wh !== "All")
        fdata = fdata.filter(
          (v) => v.ID === webhooks[optionsWh.indexOf(wh) - 1]?.id
        );
      setFilteredData(fdata);
    }
  }, [account, wh, mt4Accounts]);

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
          {/* <div className="flex items-start"> */}
          <div className="flex items-center">
            <H1>Trades</H1>

            {data?.length > 0 && (
              <PlayVideoPopup
                className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
                src={videosUrls.tradePage}
              />
            )}
          </div>

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

        {filtredData?.length > 0 ? (
          <Fragment>
            <div className="flex mt-4 w-full items-center justify-start">
              <div className="flex flex-col ">
                <span className="text-sm text-text-p pl-1">Webhook</span>

                <Select1
                  className="!m-0 !outline-none !focus:outline-none !border-bga !focus:border-bga"
                  name=""
                  helper=""
                  size="sm"
                  options={optionsWh}
                  value={wh}
                  setValue={(i) => setWh(optionsWh[i])}
                />
              </div>
              <div className="flex flex-col ml-4">
                <span className="text-sm text-text-p pl-1">Account</span>

                <Select1
                  className="!m-0 !outline-none !focus:outline-none !border-bga !focus:border-bga"
                  name=""
                  helper=""
                  size="sm"
                  options={options}
                  value={account}
                  setValue={(i) => setAccount(options[i])}
                />
              </div>
            </div>

            <div className="mt-4">
              <BestWorseTrades data={filtredData} />
            </div>
            <div className="mt-6">
              <CalendarTrades data={filtredData} />
            </div>
            <div className="mt-6">
              <Table data={filtredData} accounts={mt4Accounts} />
            </div>
          </Fragment>
        ) : (
          <div className="mt-6 w-full">
            <TradesWelcome />
          </div>
        )}
      </MainWithHeader>
    </>
  );
}
