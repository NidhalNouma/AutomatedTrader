import { useState, useEffect, Fragment } from "react";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";

export default function TradesPage() {
  // const { mtAPIAccounts, getMTAPIData } = GetMTAPIAccountsContext();
  // const data = getMTAPIData();
  // const { fullUser } = GetFullUserContext();

  // const [open, setOpen] = useState(false);
  // const [openUpg, setOpenUpg] = useState(false);

  // const { webhooks } = GetWebhookContext();
  // const [filtredData, setFilteredData] = useState([]);

  // const options = [
  //   "All",
  //   ...mtAPIAccounts.map((account) => account.accountDisplayName),
  // ];
  // const optionsWh = ["All", ...webhooks.map((wh) => wh.name)];
  // const [account, setAccount] = useState(options[0]);
  // const [wh, setWh] = useState(optionsWh[0]);

  // useEffect(() => {
  //   // console.log(account, datai);
  //   if (account === "All" && wh === "All") setFilteredData(data);
  //   else {
  //     let fdata = data;
  //     // console.log(account, fdata);
  //     if (account !== "All")
  //       fdata = fdata.filter((v) => v.accountDisplayName === account);
  //     if (wh !== "All")
  //       fdata = fdata.filter(
  //         (v) =>
  //           v.clientId?.indexOf(webhooks[optionsWh.indexOf(wh) - 1]?.id) >= 0
  //       );
  //     // fdata = fdata.filter(
  //     //   (v) => v.ID === webhooks[optionsWh.indexOf(wh) - 1]?.id
  //     // );
  //     setFilteredData(fdata);
  //   }
  // }, [account, wh, mtAPIAccounts]);

  return (
    <Fragment>
      <MainLayoutWithHeader page="trades" title="Trades"></MainLayoutWithHeader>

      {/* <div>
        <div className="flex justify-between items-center">
        </div>

        {mtAPIAccounts.length > 0 ? (
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
              <Table data={filtredData} accounts={mtAPIAccounts} />
            </div>
          </Fragment>
        ) : (
          <div className="mt-6 w-full">
            <TradesWelcome />
          </div>
        )}
      </div> */}
    </Fragment>
  );
}
