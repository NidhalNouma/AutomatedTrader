import { useState } from "react";
import Sidenav from "../../Features/SideNav";
import { H1, H3, H4, Hi5, H6 } from "../../Components/H";
import { ButtonP } from "../../Components/Button";
import { GetUserContext } from "../../hooks/UserHook";
import { GetMTAccountsContext, CalculateData } from "../../hooks/MTAccounts";

import Mt4 from "../../Features/MTAccount/Mt4";
import DataTable from "../../Features/MTAccount/DataTable";
import TableSm from "../../Features/DataAndCharts/TableSm";
import LineChart from "../../Features/MTAccount/LineChart";
import DoughChart from "../../Features/MTAccount/DoughChart";
import HalfDoughChart from "../../Features/MTAccount/HalfDoughChart";
import BarAndLineChart from "../../Features/MTAccount/BarAndLineChart";
import MainWithHeader from "../../Features/mainLayout/MainWithHeader";

import { Dropdown } from "react-daisyui";
import { ArrowCircleDownIcon } from "@heroicons/react/outline";

import { MT4EAPath } from "../../utils/constant";
import { copyTextToClipboard } from "../../utils/functions";

import Mt4Welcome from "../../Features/WelcomeSection/Mt4";

import { PlayVideoPopup } from "../../Components/Video";
import { videosUrls } from "../../utils/constant";

export default function MT4() {
  const { user } = GetUserContext();
  const { mt4Accounts , getData } = GetMTAccountsContext();
  const data = getData();

  const { totalProfit, profitPerPair } = CalculateData(data);
  const tp = totalProfit();

  const [idcopy, setIdcopy] = useState("Click to copy your ID!");
  // console.log(totalProfit(), profitPerPair(), profitPerWebhook());

  return (
    <>
      <Sidenav cpath="mt4" />
      <MainWithHeader>
        <div className="flex justify-between">
          <div className="flex items-center">
            <H1 className="">
              <span className="hidden sm:block">Metatrader 4</span>
              <span className="sm:hidden">MT4</span>
            </H1>
            {mt4Accounts?.length > 0 && (
              <PlayVideoPopup
                className="aspect-video w-[100%] mx-auto rounded-xl border-0 border-text-p"
                src={videosUrls.metatraderAddWebhooks}
              />
            )}
          </div>
          <div className="">
            <Dropdown hover={true} horizontal="left" vertical="middle">
              <ButtonP
                onMouseLeave={() => setIdcopy("Click to copy your ID!")}
                className="mr-3 ml-1 !bg-transparent !border-bga"
                onClick={(e) => {
                  e.preventDefault();

                  copyTextToClipboard(
                    user?.uid,
                    () => {
                      setIdcopy("ID copied!");
                    },
                    () => {}
                  );
                }}
                // icon={<ArrowCircleDownIcon className="h-4 w-4" />}
              >
                Copy ID
              </ButtonP>
              <Dropdown.Menu className="w-24 !p-0 shadow bg-bga rounded-xl">
                <div className="p-2 text-center">
                  <H6>{idcopy}</H6>
                </div>
              </Dropdown.Menu>
            </Dropdown>
            <ButtonP
              onClick={(e) => {
                e.preventDefault();
                window.location = MT4EAPath;
              }}
              icon={<ArrowCircleDownIcon className="h-4 w-4" />}
            >
              download EA
            </ButtonP>
          </div>
        </div>
        <div className="my-4">
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
        {mt4Accounts?.length > 0 ? (
          <div className="md:flex items-start justify-between w-full">
            <div className="mt-3 w-full md:w-4/12">
              {mt4Accounts.map((v, i) => (
                <Mt4 key={v.id} account={v} userId={user?.uid} />
              ))}
              <div className="my-4">
                {/* <div className="flex"> */}
                <div className="w-full bg-bgt shadow-sm shadow-bga p-4 rounded-xl">
                  <BarAndLineChart accounts={mt4Accounts} />
                </div>
                {/* </div> */}
              </div>

              <div className="w-full mt-8">
                <div className="w-full bg-bgt shadow-sm shadow-bga p-4 rounded-xl">
                  <HalfDoughChart adata={profitPerPair()} total={tp} />
                </div>
              </div>
            </div>

            <div className="mt-3 w-full md:w-8/12 pl-4">
              <div className="w-full">
                <LineChart accounts={mt4Accounts} />
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
          <div className="mt-6 w-full">
            <Mt4Welcome />
          </div>
        )}
      </MainWithHeader>
    </>
  );
}
