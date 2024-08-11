import { Fragment, useState, useEffect } from "react";
import { ModalWithHeader } from "../ui/Modal.js";
import moment from "moment";

import tailwindConfig from "../../tailwind.config.js";

import { TradeDetails } from "./TradeDetails.js";

function Table({ data }) {
  return (
    <Fragment>
      <div className="relative rounded-md">
        <div className="overflow-x-auto w-full max-h-96 hideScrollbar rounded-md bg-bgt">
          <div className="flex justify-between items-end mb-1">
            <div className="flex flex-c"></div>
          </div>

          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-bgt text-title/60 text-sm">
              <tr>
                {/* <th className="px-2 sm:px-0">Webhook</th> */}
                <th className="py-3 px-2 sm:px-0">Symbol</th>
                <th className="px-2 sm:px-0">Type</th>
                <th className="px-2 sm:px-0">Lot</th>
                {/* <th className="px-2 sm:px-0">Pips</th> */}
                <th className="px-2 sm:px-0">Profit</th>
                <th className="px-2 sm:px-0 truncate">Open Price</th>
                <th className="px-2 sm:px-0 truncate">Close Price</th>
                {/* <th className="px-2 sm:px-0 truncat">Open Time</th> */}
                <th className="px-2 sm:px-0 truncate">Close Time</th>
              </tr>
            </thead>
            <tbody className="">
              {data
                ?.slice(0)
                .reverse()
                ?.map((v, i) => {
                  const type = v.type == 0 ? "Buy" : "Sell"; //typeToStr(v.type?.toString());
                  // const { webhooks } = GetWebhookContext();
                  // const id = v.clientId ? v.clientId.split("_")[2] : null;
                  const wh = false; //webhooks.find((w) => w.id === id?.toString());
                  const colors = tailwindConfig.theme.colors;

                  // const txtColor = txtColorFromBg(
                  //   wh?.color,
                  //   // colors["text-p"],
                  //   colors["bgt"],
                  //   colors["text-h"]
                  // );

                  return (
                    <Fragment key={i}>
                      <ModalWithHeader
                        title="Trade"
                        className=""
                        trigger={
                          <tr className="border-spacing-[7px] border-b-[0px] cursor-pointer text-sm text-center text-text/60">
                            {/* <td className="text-xs text-center rounded-l-md">
                          {v.test === "true" ? (
                            <span className="px-2 py-0 rounded-full bg-info text-bg">
                              Test
                            </span>
                          ) : v.manual === "true" ? (
                            <span className="px-2 py-0 rounded-full bg-accent text-bg">
                              Manual
                            </span>
                          ) : wh ? (
                            <span
                              className="px-2 py-0 rounded-full font-bold bg-accent text-bg"
                              style={{
                                backgroundColor: wh.color,
                                // color: txtColor,
                              }}
                            >
                              Webhook
                            </span>
                          ) : (
                            <span className="px-2 py-0 text-text-i font-bold">
                              N/A
                            </span>
                          )}
                        </td> */}
                            <td className=" font-bold py-1.5">{v.symbol}</td>
                            <td className={` `}>
                              <span
                                className={`px-2 py-[0.15rem] rounded font-bold ${
                                  v.type == 0
                                    ? "bg-long/10 text-long"
                                    : v.type == 1
                                    ? "bg-short/10 text-short"
                                    : ""
                                }`}
                              >
                                {type}
                              </span>
                            </td>
                            <td className="">{Number(v.lot)?.toFixed(2)}</td>
                            {/* <td className={`text-xs text-center `}>{v.pips}</td> */}
                            <td
                              className={`font-bold ${
                                v.profit > 0
                                  ? "text-profit"
                                  : v.profit < 0
                                  ? "text-loss"
                                  : ""
                              } `}
                            >
                              ${Number(v.profit).toFixed(2)}
                            </td>
                            <td className="">{v.open}</td>
                            <td className="">{v.close}</td>
                            {/* <td className="text-xs text-center py-3">
                      {v.openTimeGMT
                        ? moment.utc(v.openTimeGMT).format()
                        : moment(v.openTime).format()}
                    </td> */}
                            <td className=" ">
                              {moment(v.closeTime).format(
                                "yyyy MM DD HH:mm:ss"
                              )}
                            </td>
                            {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                          </tr>
                        }
                      >
                        <TradeDetails data={v} />
                      </ModalWithHeader>
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
        {/* <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-bgt opacity-30 rounded-b-md z-10"></div> */}
      </div>
    </Fragment>
  );
}

export default Table;
