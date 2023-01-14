import { Fragment, useState } from "react";
import moment from "moment";
import { typeToStr } from "../../hooks/WebHook";
import { Modal1 } from "../../Components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../Components/H";

function Table({ data }) {
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
        <div className="overflow-x-auto w-full max-h-96 hideScrollbar rounded-md ">
          <table className="table-auto w-full">
            <thead className="sticky top-0 bg-bgt">
              <tr>
                <th className="text-text-h text-md py-4"></th>
                <th className="text-text-h text-md ">Symbol</th>
                <th className="text-text-h text-md">Type</th>
                <th className="text-text-h text-md">Lot</th>
                <th className="text-text-h text-md">Pips</th>
                <th className="text-text-h text-md">Profit</th>
                <th className="text-text-h text-md">Open Price</th>
                <th className="text-text-h text-md">Close Price</th>
                {/* <th className="text-text-h text-xs">Open Time</th> */}
                <th className="text-text-h text-md">Close Time</th>
              </tr>
            </thead>
            <tbody className="">
              {data
                ?.slice(0)
                .reverse()
                ?.map((v, i) => {
                  const type = typeToStr(v.type?.toString());
                  return (
                    <Fragment key={i}>
                      <tr
                        onClick={() => setOpen(v)}
                        className="border-spacing-[7px] border-b-[0px] border-gray-900 cursor-pointer hover:bg-bga"
                      >
                        <td className="text-xs text-center rounded-l-md">
                          {v.test ? (
                            <span className="px-2 py-0 rounded-full bg-info text-bg">
                              Test
                            </span>
                          ) : v.manual ? (
                            <span className="px-2 py-0 rounded-full bg-accent text-bg">
                              Manual
                            </span>
                          ) : (
                            <></>
                          )}
                        </td>
                        <td className="text-xs text-center font-bold">
                          {v.symbol}
                        </td>
                        <td className={`text-xs text-center `}>
                          <span
                            className={`px-2 py-[0.15rem] rounded-md font-bold ${
                              type?.search("Buy") >= 0
                                ? "bg-green-300 text-green-700"
                                : type?.search("Sell") >= 0
                                ? "bg-red-300 text-red-700"
                                : ""
                            }`}
                          >
                            {type}
                          </span>
                        </td>
                        <td className="text-xs text-center">{v.lot}</td>
                        <td className={`text-xs text-center `}>{v.pips}</td>
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
                                .utc(v.closeTimeGMT)
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
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-bg opacity-30 rounded-b-md z-10"></div>
      </div>
    </Fragment>
  );
}

export default Table;

function TradeDetails({ data, close }) {
  const type = typeToStr(data?.type?.toString());

  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <H3 className="flex">Trade details</H3>
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
          <span className="text-sm text-text-p">Symbol</span>
          <span className="text-sm text-text-h">{data?.symbol}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Lot</span>{" "}
          <div>
            <span
              className={`px-2 py-[0.15rem] rounded-md font-bold text-sm ${
                type?.search("Buy") >= 0
                  ? "bg-green-300 text-green-700"
                  : type?.search("Sell") >= 0
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
          <span className="text-sm text-text-p">Pips</span>
          <span className="text-sm text-text-h">{data?.pips}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Profit</span>
          <span className="text-sm text-text-h">{data?.profit}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text-p">Open Time</span>
          <span className="text-sm text-text-h">
            {data?.openTimeGMT
              ? moment.utc(data?.openTimeGMT).format("yyyy MM DD HH:mm:ss")
              : moment(data?.openTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text-p">Close Time</span>
          <span className="text-sm text-text-h">
            {data?.closeTimeGMT
              ? moment.utc(data?.closeTimeGMT).format("yyyy MM DD HH:mm:ss")
              : moment(data?.closeTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>
      </div>
    </div>
  );
}
