import { Fragment, useState, useEffect } from "react";
import moment from "moment";
import { typeToStr, GetWebhookContext } from "../../hooks/WebHook";
import { Modal1 } from "../../components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";
import tailwindConfig from "../../tailwind.config.js";
import { txtColorFromBg } from "../../utils/functions";

function Table({ data, accounts }) {
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
          data={open}
          close={() => {
            setOpen(null);
          }}
        />
        {/* <OpenTrade close={() => setOpen(false)} /> */}
      </Modal1>

      <div className="relative rounded-md">
        <div className="overflow-x-auto w-full max-h-96 hideScrollbar rounded-md bg-bgt">
          <div className="flex justify-between items-end mb-1">
            <div className="flex flex-c">
              {/* <span className="text-sm text-text-p mr-2">Total</span> */}
              {/* <span className="text-sm text-text-p font-bold">
                {data?.length} trade total
              </span> */}
            </div>
          </div>

          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-bgt">
              <tr>
                <th className="text-text-h text-md px-2 sm:px-0">Webhook</th>
                <th className="text-text-h text-md py-3 px-2 sm:px-0">
                  Symbol
                </th>
                <th className="text-text-h text-md px-2 sm:px-0">Type</th>
                <th className="text-text-h text-md px-2 sm:px-0">Lot</th>
                {/* <th className="text-text-h text-md px-2 sm:px-0">Pips</th> */}
                <th className="text-text-h text-md px-2 sm:px-0">Profit</th>
                <th className="text-text-h text-md px-2 sm:px-0 truncate">
                  Open Price
                </th>
                <th className="text-text-h text-md px-2 sm:px-0 truncate">
                  Close Price
                </th>
                {/* <th className="text-text-h text-xs">Open Time</th> */}
                <th className="text-text-h text-md px-2 sm:px-0 truncate">
                  Close Time
                </th>
              </tr>
            </thead>
            <tbody className="">
              {data
                ?.slice(0)
                .reverse()
                ?.map((v, i) => {
                  const type = typeToStr(v.type?.toString());
                  const { webhooks } = GetWebhookContext();
                  const id = v.clientId ? v.clientId.split("_")[2] : null;
                  const wh = webhooks.find((w) => w.id === id?.toString());
                  const colors = tailwindConfig.theme.colors;

                  const txtColor = txtColorFromBg(
                    wh?.color,
                    // colors["text-p"],
                    colors["bgt"],
                    colors["text-h"]
                  );

                  return (
                    <Fragment key={i}>
                      <tr
                        onClick={() => setOpen(v)}
                        className="border-spacing-[7px] border-b-[0px] border-gray-900 cursor-pointer hover:bg-bga"
                      >
                        <td className="text-xs text-center rounded-l-md">
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
                        <td className="text-xs text-center">
                          {Number(v.lot)?.toFixed(2)}
                        </td>
                        {/* <td className={`text-xs text-center `}>{v.pips}</td> */}
                        <td
                          className={`text-xs text-center font-bold ${
                            v.profit > 0
                              ? "text-green-300"
                              : v.profit < 0
                              ? "text-red-400"
                              : ""
                          } `}
                        >
                          ${Number(v.profit).toFixed(2)}
                        </td>
                        <td className="text-xs text-center">{v.open}</td>
                        <td className="text-xs text-center">{v.close}</td>
                        {/* <td className="text-xs text-center py-3">
                      {v.openTimeGMT
                        ? moment.utc(v.openTimeGMT).format()
                        : moment(v.openTime).format()}
                    </td> */}
                        <td className="text-xs text-center py-3 rounded-r-md">
                          {v.closeTimeGMT
                            ? moment
                                .utc(v.closeTimeGMT, "YYYY.MM.DD HH:mm:ss")
                                .format("yyyy MM DD HH:mm:ss")
                            : moment(v.closeTime).format("yyyy MM DD HH:mm:ss")}
                        </td>
                      </tr>
                      {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                    </Fragment>
                  );
                })}
            </tbody>
          </table>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-bgt opacity-30 rounded-b-md z-10"></div>
      </div>
    </Fragment>
  );
}

export default Table;

export function TradeDetails({ data, close }) {
  const { webhooks } = GetWebhookContext();
  const id = data?.clientId ? data.clientId.split("_")[2] : null;
  const wh = webhooks.find((w) => w.id === id?.toString());
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
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Account</span>
          <div>
            <span
              className="text-sm text-text-h border-b-4"
              style={{ borderColor: data?.accountColor }}
            >
              {data?.accountDisplayName}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
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
        </div>
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
      </div>
    </div>
  );
}
