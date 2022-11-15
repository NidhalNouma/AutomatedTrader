import Sidenav from "../../Features/SideNav";
import Header from "../../Features/Header";
import { H1, H3, H4, Hi5, H6 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";
import { GetUserContext } from "../../hooks/UserHook";
import { GetMTAccountsContext, CalculateData } from "../../hooks/MTAccounts";

import Mt4 from "../../Features/MTAccount/Mt4";
import DataTable from "../../Features/MTAccount/DataTable";
import LineChart from "../../Features/MTAccount/LineChart";
import ArcCircle from "../../Features/MTAccount/ArcCircle";
import DoughChart from "../../Features/MTAccount/DoughChart";
import BarAndLineChart from "../../Features/MTAccount/BarAndLineChart";

import { MT4EAPath } from "../../utils/constant";

export default function help() {
  const { user } = GetUserContext();
  const { mtAccounts, getData } = GetMTAccountsContext();
  const data = getData();

  const { totalProfit, profitPerPair, profitPerWebhook, profitPerTime } =
    CalculateData(data);
  const tp = totalProfit();
  console.log(totalProfit(), profitPerPair(), profitPerWebhook());
  return (
    <>
      <Sidenav cpath="mt4" />
      <div className="w-full overflow-hidden">
        <Header />
        <div className="px-10 py-8">
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
            <span className="">Your Id: {user?.uid}</span>
          </div>
          {/* <H4>Accounts</H4> */}
          {mtAccounts?.length > 0 && (
            <div className="flex items-start justify-between w-full">
              <div className="mt-3  w-4/12">
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

                <div className="mt-4 flex items-center">
                  <div className="py-5 px-3 bg-accent rounded-xl">
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

                  <div className="py-5 px-3 bg-accent rounded-xl ml-4">
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

              <div className="mt-3 w-8/12 pl-4">
                <div className="w-full">
                  <LineChart accounts={mtAccounts} />
                </div>

                <div className="flex w-full bg-accent p-2 rounded-xl mt-6">
                  <div className="w-3/5">
                    <H3 className="m-2">Last transaction</H3>
                    <div className="px-3">
                      <DataTable data={data} />
                    </div>
                  </div>
                  <div className="w-2/5 mt-8">
                    <DoughChart adata={profitPerPair()} total={tp} />
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
