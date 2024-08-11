import React from "react";

import { Button } from "react-daisyui";

import moment from "moment";
import { H3, H6, H5 } from "../../components/H";
import { GetLiveTrades } from "../../hooks/MTAccountsApi";

function AccountDetails({ account, close }) {
  const { closeLiveTrade } = GetLiveTrades(account);
  const trades = account.positions;

  return (
    <div className="mb-8">
      <div className="sticky top-0 bg-accenti p-4 z-20 flex justify-between items-center">
        <H3 className="flex">{account.accountDisplayName}</H3>
        <Button
          size="sm"
          shape="circle"
          className=" bg-accenti"
          onClick={() => {
            close();
          }}
        >
          ✕
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-2">
        <div className="grid grid-cols-4 w-full text-center gap-y-4">
          <div className="r">
            <H6>Number</H6>
            <H5 className="font-bold">{account.accountNumber}</H5>
          </div>
          <div className="">
            <H6>Broker</H6>
            <H5 className="font-bold">{account.broker}</H5>
          </div>
          <div className="">
            <H6>Currency</H6>
            <H5 className="font-bold">{account.currency}</H5>
          </div>
          <div className="">
            <H6>Platform</H6>
            <H5 className="font-bold uppercase">{account.platform}</H5>
          </div>
          <div className="">
            <H6>Balance</H6>
            <H5 className="font-bold">{Number(account.balance).toFixed(2)}</H5>
          </div>
          <div className="">
            <H6>Equity</H6>
            <H5 className="font-bold">{Number(account.equity).toFixed(2)}</H5>
          </div>
          <div className="">
            <H6>Free margin</H6>
            <H5 className="font-bold">
              {Number(account.freeMargin).toFixed(2)}
            </H5>
          </div>
          <div className="">
            <H6>Leverage</H6>
            <H5 className="font-bold">{account.leverage}</H5>
          </div>
        </div>

        {trades?.length > 0 && (
          <div className="mt-6 w-full px-4">
            <DataTable data={trades} closeTrade={closeLiveTrade} />
          </div>
        )}
      </div>
    </div>
  );
}

export default AccountDetails;

function DataTable({ data, closeTrade }) {
  return (
    <div className="overflow-x-auto w-full max-h-72 hideScrollbar">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-bga sticky top-0">
            <th className="text-text-h text-xs py-2">Open Time</th>
            <th className="text-text-h text-xs">Type</th>
            <th className="text-text-h text-xs">Pair</th>
            <th className="text-text-h text-xs">Open Price</th>
            <th className="text-text-h text-xs">Lot</th>
            <th className="text-text-h text-xs">SL</th>
            <th className="text-text-h text-xs">TP</th>
            <th className="text-text-h text-xs">Profit</th>
            <th className="text-text-h text-xs"></th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(0)
            .reverse()
            ?.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <tr className="border-spacing-[7px] border-b-[1px] border-bga">
                    <td className="text-xs text-center py-3">
                      {moment(v.time).format("MMM DD YYYY - HH:mm:ss")}
                    </td>
                    <td className={"text-xs text-center "}>
                      <span
                        className={`px-2 py-[0.15rem] rounded-md font-semibold ${
                          v?.type?.search("BUY") >= 0
                            ? "bg-green-300 text-green-700"
                            : v.type?.search("SELL") >= 0
                            ? "bg-red-300 text-red-700"
                            : ""
                        }
                        `}
                      >
                        {v.type === "POSITION_TYPE_BUY" ? "BUY" : "SELL"}
                      </span>
                    </td>
                    <td className="text-xs text-center">{v.symbol}</td>
                    <td className="text-xs text-center">{v.openPrice}</td>
                    <td className="text-xs text-center">{v.volume}</td>
                    <td className="text-xs text-center">{v.stopLoss}</td>
                    <td className="text-xs text-center">{v.takeProfit}</td>
                    <td
                      className={`text-xs text-center ${
                        v.profit > 0
                          ? "text-green-300"
                          : v.profit < 0
                          ? "text-red-400"
                          : ""
                      } `}
                    >
                      ${Number(v.profit).toFixed(2)}
                    </td>
                    <td className="text-xs text-center  ">
                      <Button
                        size="sm"
                        shape="circle"
                        className=" bg-transparent text-xs font-thin hover:bg-bga"
                        onClick={() => closeTrade(v.id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                  {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
