import { Fragment, useState } from "react";
import moment from "moment";
import { typeToStr, GetWebhookContext } from "../../hooks/WebHook";
import { Modal1 } from "../../components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";

function TableSm({ data, bgColor, profit, limit, pips }) {
  const [open, setOpen] = useState(null);

  return (
    <Fragment>
      <Modal1
        open={!!open}
        close={() => {
          setOpen(null);
        }}
      >
        <TradeDetails
          profit={profit}
          data={open}
          close={() => {
            setOpen(null);
          }}
        />
        {/* <OpenTrade close={() => setOpen(false)} /> */}
      </Modal1>

      <div className="relative rounded-md">
        <div
          className={`overflow-x-auto w-full max-h-80 h-full hideScrollbar rounded-md ${bgColor}`}
        >
          <table className="table-auto w-full">
            <thead className={`sticky top-0 ${bgColor}`}>
              <tr>
                <th className="text-text-h text-sm px-2 sm:px-0">Date/Time</th>
                <th className="text-text-h text-sm py-3 px-2 sm:px-0">
                  Symbol
                </th>
                <th className="text-text-h text-sm px-2 sm:px-0">Type</th>
                {/* <th className="text-text-h text-md">Lot</th> */}
                {/* <th className="text-text-h text-md">Profit</th> */}
                <th className="text-text-h text-sm px-2 truncate sm:px-0">
                  Open Price
                </th>
                <th className="text-text-h text-sm px-2 truncate sm:px-0">
                  Close Price
                </th>
                {/* <th className="text-text-h text-xs">Open Time</th> */}
                {/* <th className="text-text-h text-md">Close Time</th> */}
                {pips && (
                  <th className="text-text-h text-sm px-2 sm:px-0">Pips</th>
                )}
                {profit && (
                  <th className="text-text-h text-md px-2 sm:px-0">Profit</th>
                )}
              </tr>
            </thead>
            <tbody className="">
              {data
                ?.slice(0)
                .reverse()
                ?.map((v, i) => {
                  const type = typeToStr(v.type?.toString());
                  if (limit && i > limit) return;
                  // if (limit && i == limit)
                  //   return (
                  //     <tr className="border-spacing-[7px] border-b-[0px] border-gray-900 cursor-pointer hover:bg-bga">
                  //       <span className="mt-3">View all</span>
                  //     </tr>
                  //   );
                  //   console.log(v);
                  return (
                    <Fragment key={i}>
                      <tr
                        onClick={() => setOpen(v)}
                        className="border-spacing-[7px] border-b-[0px] border-gray-900 cursor-pointer hover:bg-bga"
                      >
                        <td className="text-xs text-center rounded-l-md">
                          {v.closeTimeGMT
                            ? moment
                                .utc(v?.closeTimeGMT) //, "YYYY.MM.DD HH:mm:ss")
                                .fromNow()
                            : moment(
                                v?.closeTime
                                //"YYYY.MM.DD HH:mm:ss"
                              ).fromNow()}
                        </td>
                        <td className="text-xs text-center font-bold">
                          {v.symbol}
                        </td>
                        <td className={`text-xs text-center `}>
                          <span
                            className={`px-2 py-[0.15rem] rounded-md font-bold ${
                              type?.search("BUY") >= 0
                                ? "bg-green-300 text-green-700"
                                : type?.search("SELL") >= 0
                                ? "bg-red-300 text-red-700"
                                : ""
                            }`}
                          >
                            {type}
                          </span>
                        </td>
                        {/* <td className="text-xs text-center">{v.lot}</td> */}
                        {/* <td className={`text-xs text-center `}>{v.pips}</td> */}
                        <td className="text-xs text-center">{v.open}</td>
                        <td className="text-xs text-center">{v.close}</td>
                        {/* <td className="text-xs text-center py-3">
                      {v.openTimeGMT
                        ? moment.utc(v.openTimeGMT).format()
                        : moment(v.openTime).format()}
                    </td> */}
                        {pips && (
                          <td
                            // className="text-xs text-center"
                            className={`text-xs text-center font-bold py-3 rounded-r-md ${
                              !profit && v.profit > 0
                                ? "text-green-300"
                                : !profit && v.profit < 0
                                ? "text-red-400"
                                : ""
                            } `}
                          >
                            {v.pips}
                          </td>
                        )}
                        {profit && (
                          <td
                            className={`text-xs text-center font-bold py-3 rounded-r-md ${
                              v.profit > 0
                                ? "text-green-300"
                                : v.profit < 0
                                ? "text-red-400"
                                : ""
                            } `}
                          >
                            ${Number(v.profit).toFixed(2)}
                          </td>
                        )}
                      </tr>
                      {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-7 bg-bgt opacity-30 rounded-b-md z-10"></div> */}
      </div>
    </Fragment>
  );
}

export default TableSm;

function TradeDetails({ data, close, profit }) {
  // const { webhooks } = GetWebhookContext();
  // const wh = webhooks.find((v) => v.id === data?.ID);
  // console.log(wh, data);
  const type = typeToStr(data?.type?.toString());

  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <div className="flex items-center">
          <H3 className="inline-block mr-2">Trade details</H3>
          {data?.test === "true" ? (
            <span className="px-2 py-0 rounded-full bg-info text-bg text-xs">
              Test
            </span>
          ) : data?.manual === "true" ? (
            <span className="px-2 py-0 rounded-full bg-accent text-bg text-xs">
              Manual
            </span>
          ) : (
            <></>
          )}
        </div>
        <Button
          size="sm"
          shape="circle"
          className=" bg-accenti"
          onClick={() => {
            close();
          }}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-y-4 w-full px-10 mt-2 mb-4">
        {/* <div className="flex flex-col">
          <span className="text-sm text-text-p">Account</span>
          <div>
            <span
              className="text-sm text-text-h border-b-4"
              style={{ borderColor: data?.accountColor }}
            >
              {data?.accountDisplayName}
            </span>
          </div>
        </div> */}
        {/* <div className="flex flex-col">
          <span className="text-sm text-text-p">WebHook</span>
          {wh ? (
            <div>
              <span
                className="text-sm text-text-h border-b-4"
                style={{ borderColor: wh?.color }}
              >
                {wh?.name}
              </span>
            </div>
          ) : (
            <span className="text-sm text-text-h">N/A</span>
          )}
        </div> */}
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Symbol</span>
          <span className="text-sm text-text-h">{data?.symbol}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Type</span>{" "}
          <div>
            <span
              className={`px-2 py-[0.15rem] rounded-md font-bold text-sm ${
                type?.search("BUY") >= 0
                  ? "bg-green-300 text-green-700"
                  : type?.search("SELL") >= 0
                  ? "bg-red-300 text-red-700"
                  : ""
              }`}
            >
              {type}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text-p">Entry</span>
          <span className="text-sm text-text-h">{data?.open}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Exit</span>
          <span className="text-sm text-text-h">{data?.close}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text-p">Open Time</span>
          <span className="text-sm text-text-h">
            {data?.openTimeGMT
              ? moment
                  .utc(data?.openTimeGMT, "YYYY.MM.DD HH:mm:ss")
                  .format("yyyy MM DD HH:mm:ss")
              : moment(data?.openTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Close Time</span>
          <span className="text-sm text-text-h">
            {data?.closeTimeGMT
              ? moment
                  .utc(data?.closeTimeGMT, "YYYY.MM.DD HH:mm:ss")
                  .format("yyyy MM DD HH:mm:ss")
              : moment(data?.closeTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>

        <div className="flex flex-col">
          {/* <span className="text-sm text-text-p">Pips</span>
          <span className="text-sm text-text-h">{data?.pips}</span> */}
        </div>
        {profit && (
          <div className="flex flex-col">
            <span className="text-sm text-text-p">Profit</span>
            <span
              className={`text-sm text-text-h ${
                data?.profit > 0
                  ? "text-green-300"
                  : data?.profit < 0
                  ? "text-red-400"
                  : ""
              }`}
            >
              ${data?.profit}
            </span>
          </div>
        )}
        {!profit && (
          <div className="flex flex-col">
            <span className="text-sm text-text-p">Comment</span>
            <span className="text-sm font-bold">
              {data?.profit > 0 ? (
                <span className="text-green-300">Win</span>
              ) : data?.profit < 0 ? (
                <span className="text-red-400">Lost</span>
              ) : (
                "BreakEven"
              )}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
