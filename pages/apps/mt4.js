import { useState } from "react";
import Sidenav from "../../Features/SideNav";
import Header from "../../Features/Header";
import { H1, H3, H4, Hi5, H6 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";
import { GetUserContext } from "../../hooks/UserHook";
import { GetMTAccountsContext, CalculateData } from "../../hooks/MTAccounts";

import Mt4 from "../../Features/MTAccount/Mt4";
import DataTable from "../../Features/MTAccount/DataTable";
import LineChart from "../../Features/MTAccount/LineChart";
import DoughChart from "../../Features/MTAccount/DoughChart";
import HalfDoughChart from "../../Features/MTAccount/HalfDoughChart";
import BarAndLineChart from "../../Features/MTAccount/BarAndLineChart";

import { Dropdown } from "react-daisyui";

import { MT4EAPath } from "../../utils/constant";
import { copyTextToClipboard } from "../../utils/functions";
import Script from "next/script";

export default function MT4() {
  const { user } = GetUserContext();
  const { mtAccounts, getData } = GetMTAccountsContext();
  const data = getData();

  const { totalProfit, profitPerPair } = CalculateData(data);
  const tp = totalProfit();

  const [idcopy, setIdcopy] = useState("Click to copy!");
  // console.log(totalProfit(), profitPerPair(), profitPerWebhook());

  return (
    <>
      {/* <Script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-style@latest/dist/chartjs-plugin-style.min.js" />
      <Script src="https://unpkg.com/chartjs-plugin-style@latest/dist/chartjs-plugin-style.min.js" /> */}
      <Sidenav cpath="mt4" />
      <div className="w-full flex flex-col">
        <Header />
        <div className="px-5 md:px-10 py-6 overflow-hidden">
          <div className="flex justify-between">
            <H1>Metatrader 4</H1>
            <ButtonText
              onClick={(e) => {
                e.preventDefault();
                window.location = MT4EAPath;
              }}
            >
              download EA
            </ButtonText>
          </div>
          <div className="my-4">
            <span className="">
              Your Id:{" "}
              <Dropdown hover={true} horizontal="right" vertical="middle">
                <span
                  onMouseLeave={() => setIdcopy("Click to copy!")}
                  className="bg-accent px-2 py-1 rounded-xl cursor-pointer text-sm"
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
            </span>
          </div>
          {/* <H4>Accounts</H4> */}
          {mtAccounts?.length > 0 && (
            <div className="md:flex items-start justify-between w-full">
              <div className="mt-3 w-full md:w-4/12">
                {mtAccounts.map((v, i) => (
                  <Mt4 key={v.id} account={v} userId={user.uid} />
                ))}
                <div className="my-4">
                  {/* <div className="flex"> */}
                  <div className="w-full bg-accent p-4 rounded-xl">
                    <BarAndLineChart accounts={mtAccounts} />
                  </div>
                  {/* </div> */}
                </div>

                <div className="w-full mt-8">
                  <div className="w-full bg-accent p-4 rounded-xl">
                    <HalfDoughChart adata={profitPerPair()} total={tp} />
                  </div>
                </div>
              </div>

              <div className="mt-3 w-full md:w-8/12 pl-4">
                <div className="w-full">
                  <LineChart accounts={mtAccounts} />
                </div>

                <div className="md:flex w-full bg-accent p-2 rounded-xl mt-6">
                  <div className="w-full md:w-3/5">
                    <H3 className="m-2">Last transaction</H3>
                    <div className="px-3">
                      <DataTable data={data} />
                    </div>
                  </div>
                  <div className="w-full md:w-2/5 mt-8">
                    <DoughChart adata={profitPerPair()} total={tp} />
                  </div>
                </div>

                <div className="mt-4 flex items-center w-full">
                  <div className="py-7 px-4 bg-accent rounded-xl w-1/2">
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

                  <div className="py-7 px-4 bg-accent rounded-xl ml-4 w-1/2">
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
          )}
        </div>
      </div>
    </>
  );
}
