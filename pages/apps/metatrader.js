import { useState } from "react";
import Sidenav from "../../Features/SideNav";
import { H1, H3, H4, Hi5, H6 } from "../../Components/H";
import { ButtonP } from "../../Components/Button";
import { GetUserContext, GetFullUserContext } from "../../hooks/UserHook";
import { GetMTAccountsContext, CalculateData } from "../../hooks/MTAccounts";
import { GetMTAPIAccountsContext } from "../../hooks/MTAccountsApi";

import Mtstatus from "../../Features/MTAccount_API/MTstatus";

import DataTable from "../../Features/MTAccount/DataTable";
import TableSm from "../../Features/DataAndCharts/TableSm";
import LineChart from "../../Features/MTAccount/LineChart";
import DoughChart from "../../Features/MTAccount/DoughChart";
import HalfDoughChart from "../../Features/MTAccount/HalfDoughChart";
import BarAndLineChart from "../../Features/MTAccount/BarAndLineChart";
import MainWithHeader from "../../Features/mainLayout/MainWithHeader";

import { ArrowCircleDownIcon } from "@heroicons/react/outline";

import Mt4Welcome from "../../Features/WelcomeSection/Mt4";

import { PlayVideoPopup } from "../../Components/Video";
import { videosUrls, MT4EA } from "../../utils/constant";

import { Modal1 } from "../../Components/Modal";
import NewAccount from "../../Features/MT_API/NewAccount";

import UpgradeMsg, { UpgradeWaitlist } from "../../Features/UpgradeMsg";

export default function MT4() {
  const { user } = GetUserContext();

  const { fullUser } = GetFullUserContext();
  const sub = fullUser?.subObj;

  const { mtAPIAccounts, getMTAPIData } = GetMTAPIAccountsContext();
  const data = getMTAPIData();

  //   console.log(data);

  const { totalProfit, profitPerPair } = CalculateData(data);
  const tp = totalProfit();

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
        <NewAccount close={() => setOpen(false)} user={user} />
      </Modal1>

      <UpgradeMsg open={openUpg} close={() => setOpenUpg(false)}></UpgradeMsg>
      <UpgradeWaitlist
        sub={sub}
        open={openUpg}
        close={() => setOpenUpg(false)}
      ></UpgradeWaitlist>

      <Sidenav cpath="metatrader" />
      <MainWithHeader mainClassName="h-full">
        <div className="flex justify-between">
          <div className="flex items-center">
            <H1 className="">
              <span className="hidden sm:block">Metatrader</span>
              <span className="sm:hidden">MT</span>
            </H1>
            {mtAPIAccounts?.length > 0 && (
              <PlayVideoPopup
                className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
                src={videosUrls.metatraderAddWebhooks}
              />
            )}
          </div>
          <div className="">
            <ButtonP
              onClick={(e) => {
                // if (sub && sub.accounts > mtAPIAccounts.length) setOpen(true);
                // else setOpenUpg(true);
                setOpenUpg(true);
              }}
              icon={<ArrowCircleDownIcon className="h-4 w-4" />}
            >
              Add account
            </ButtonP>
          </div>
        </div>
        <div className="my-4 ">
          {/* <span className="">
            Your ID:{" "}
            <Dropdown hover={true} horizontal="right" vertical="middle">
              <span
                onMouseLeave={() => setIdcopy("Click to copy!")}
                className="bg-bg border-2 border-bga px-2 py-1 rounded-xl cursor-pointer text-sm"
                onClick={(e) =>
                  copyTextToClipboard(
                    user?.uid,
                    () => {
                      setIdcopy("Copied!");
                    },
                    () => {}
                  )
                }
              >
                {user?.uid}
              </span>
              <Dropdown.Menu className="w-24 !p-0 shadow bg-bga rounded-xl">
                <div className="p-2 text-center">
                  <H6>{idcopy}</H6>
                </div>
              </Dropdown.Menu>
            </Dropdown>
          </span> */}
        </div>
        {/* <H4>Accounts</H4> */}
        {mtAPIAccounts?.length > 0 ? (
          <div className="md:flex items-start justify-between w-full">
            <div className="mt-3 w-full md:w-4/12">
              {mtAPIAccounts.map((v, i) => (
                <Mtstatus
                  key={v.id}
                  account={v}
                  userId={user?.uid}
                  //   version={MT4EA.version}
                />
              ))}
              <div className="my-4">
                <div className="w-full bg-bgt shadow-sm shadow-bga p-4 rounded-xl">
                  <BarAndLineChart accounts={mtAPIAccounts} />
                </div>
              </div>

              <div className="w-full mt-8">
                <div className="w-full bg-bgt shadow-sm shadow-bga p-4 rounded-xl">
                  <HalfDoughChart adata={profitPerPair()} total={tp} />
                </div>
              </div>
            </div>

            <div className="mt-3 w-full md:w-8/12 pl-4">
              <div className="w-full">
                <LineChart accounts={mtAPIAccounts} />
              </div>

              <div className="md:flex w-full bg-bgt shadow-sm shadow-bga p-2 rounded-xl mt-6">
                <div className="w-full md:w-4/6">
                  <H3 className="m-2">Last transaction</H3>
                  <div className="px-3  h-72 overflow-y-hidden">
                    <TableSm
                      data={data}
                      bgColor="bg-bgt"
                      profit={true}
                      pips={false}
                      limit={9}
                    />
                  </div>
                </div>
                <div className="w-full md:w-2/6 mt-8">
                  <DoughChart adata={profitPerPair()} total={tp} />
                </div>
              </div>

              <div className="mt-4 flex items-center w-full">
                <div className="py-7 px-4 bg-bgt shadow-sm shadow-bga rounded-xl w-1/2">
                  <Hi5>Profits: </Hi5>
                  <div className="mt-1 flex items-center">
                    <H4>$ {tp.profit.toFixed(2)}</H4>
                    <H6 className="ml-2 text-blue-500">
                      {(
                        (tp.profitCnt / (tp.profitCnt + tp.lossCnt)) *
                        100
                      ).toFixed(1)}
                      % Wins
                    </H6>
                  </div>
                </div>

                <div className="py-7 px-4 bg-bgt shadow-sm shadow-bga rounded-xl ml-4 w-1/2">
                  <Hi5>Losses: </Hi5>
                  <div className="mt-1 flex items-center">
                    <H4>$ {tp.loss.toFixed(2)}</H4>
                    <H6 className="ml-2 text-red-500">
                      {(
                        (tp.lossCnt / (tp.profitCnt + tp.lossCnt)) *
                        100
                      ).toFixed(1)}
                      % Losing
                    </H6>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 w-full">{/* <Mt4Welcome /> */}</div>
        )}
      </MainWithHeader>
    </>
  );
}
