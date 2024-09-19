import { Fragment, useState, useEffect } from "react";
import { ModalWithHeader } from "../ui/Modal.js";
import moment from "moment";
import { ButtonText } from "../ui/Button.js";

import { addAlpha } from "../../utils/functions.js";

import tailwindConfig from "../../tailwind.config.js";

import { TradeDetails } from "./TradeDetails.js";

import { MdNavigateNext, MdNavigateBefore } from "react-icons/md";

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
              {data?.slice(0)?.map((v, i) => {
                const type = v.type;
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
                        <tr
                          className={`${
                            v.type == "buy"
                              ? "hover:bg-long/10"
                              : v.type == "sell"
                              ? "hover:bg-short/10"
                              : ""
                          }  border-spacing-[7px] border-b-[0px] cursor-pointer text-sm text-center text-text/60`}
                        >
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
                                v.type == "buy"
                                  ? "bg-long/10 text-long"
                                  : v.type == "sell"
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
                            {moment(v.closeTime).format("yyyy MM DD HH:mm:ss")}
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

export function LiveTradeTable({ data, className }) {
  return (
    <Fragment>
      <div className="relative rounded-md max-w-full overflow-hidden">
        <div
          className={`overflow-x-auto w-full max-w-full hideScrollbar rounded-md bg-bgt ${className}`}
        >
          <table className="table-auto w-full border-spacing-x-1 border-separate">
            <thead className="sticky top-0 bg-bgt text-title/60 text-sm">
              <tr>
                <th className="px-2 sm:px-2">Trade By</th>
                <th className="px-2 sm:px-2">App</th>
                <th className="py-3 px-2 sm:px-0">Symbol</th>
                <th className="px-2 sm:px-0">Type</th>
                <th className="px-2 sm:px-0">Lot</th>
                <th className="px-2 sm:px-0 truncate">Open Price</th>
                <th className="px-2 sm:px-0 truncate">Current Price</th>
                <th className="px-2 sm:px-0 truncate">Time</th>
                <th className="px-2 sm:px-0">Profit</th>
              </tr>
            </thead>
            <tbody className="">
              {data
                ?.slice(0)
                .reverse()
                ?.map((v, i) => {
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
                          <tr
                            className={`${
                              v.type == "buy"
                                ? "hover:bg-long/10"
                                : v.type == "sell"
                                ? "hover:bg-short/10"
                                : ""
                            }  cursor-pointer text-sm py-1.5 text-center text-text/60`}
                          >
                            <td className=" font-bold mr-auto capitalize truncate">
                              {v.webhook ? (
                                <p
                                  className="px-1 py-0.5 rounded truncate "
                                  style={{
                                    backgroundColor: addAlpha(
                                      v.webhook.color,
                                      0.2
                                    ),
                                  }}
                                >
                                  {v.webhook.name}
                                </p>
                              ) : (
                                "Manual"
                              )}
                            </td>
                            <td className=" font-bold mr-auto capitalize">
                              {v.src}
                            </td>
                            <td className=" font-bold  py-1.5 mr-auto">
                              {v.symbol}
                            </td>
                            <td className={` `}>
                              <span
                                className={`px-2 rounded font-bold capitalize ${
                                  v.type == "buy"
                                    ? "bg-long/10 text-long"
                                    : v.type == "sell"
                                    ? "bg-short/10 text-short"
                                    : ""
                                }`}
                              >
                                {v.type}
                              </span>
                            </td>
                            <td className="">{Number(v.volume)?.toFixed(2)}</td>
                            {/* <td className={`text-xs text-center `}>{v.pips}</td> */}
                            <td className="">{v.openPrice}</td>
                            <td className="">{v.currentPrice}</td>
                            <td className="truncate px-1 ">
                              {moment(v.openTime).format("yyyy MM DD HH:mm:ss")}
                            </td>
                            <td
                              className={`font-bold pl-1 ${
                                v.profit > 0
                                  ? "text-profit"
                                  : v.profit < 0
                                  ? "text-loss"
                                  : ""
                              } `}
                            >
                              ${Number(v.profit).toFixed(2)}
                            </td>
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
      </div>
    </Fragment>
  );
}
export function HistoryTradeTable({ data: entryData, className }) {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 15;

  // console.log(entryData);

  // Calculate the current page data
  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentData = entryData.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(entryData.length / rowsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  return (
    <Fragment>
      <div className="relative rounded-md max-w-full overflow-hidden">
        <div
          className={`overflow-x-auto w-full max-w-full hideScrollbar rounded-md bg-bgt ${className}`}
        >
          <table className="table-auto w-full border-spacing-x-1 border-separate">
            <thead className="sticky top-0 bg-bgt text-title/60 text-sm">
              <tr>
                <th className="px-2 sm:px-2">Trade By</th>
                <th className="px-2 sm:px-2">App</th>
                <th className="py-3 px-2 sm:px-0">Symbol</th>
                <th className="px-2 sm:px-0">Type</th>
                <th className="px-2 sm:px-0">Lot</th>
                <th className="px-2 sm:px-0">Profit</th>
                <th className="px-2 sm:px-0 truncate">Open Price</th>
                <th className="px-2 sm:px-0 truncate">Close Price</th>
                <th className="px-2 sm:px-0 truncate">Open Time</th>
                <th className="px-2 sm:px-0 truncate">Close Time</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((v, i) => (
                <Fragment key={i}>
                  <ModalWithHeader
                    title="Trade"
                    className=""
                    trigger={
                      <tr
                        className={`${
                          v.type == "buy"
                            ? "hover:bg-long/10"
                            : v.type == "sell"
                            ? "hover:bg-short/10"
                            : ""
                        }  cursor-pointer text-sm py-1.5 text-center text-text/60`}
                      >
                        <td className=" font-bold mr-auto capitalize">
                          {v.webhook ? (
                            <p
                              className=" py-0.5 rounded truncate"
                              style={{
                                backgroundColor: addAlpha(v.webhook.color, 0.2),
                              }}
                            >
                              {v.webhook.name}
                            </p>
                          ) : (
                            "Manual"
                          )}
                        </td>
                        <td className=" font-bold mr-auto capitalize">
                          {v.src}
                        </td>
                        <td className=" font-bold  py-1.5 mr-auto">
                          {v.symbol}
                        </td>
                        <td className={` `}>
                          <span
                            className={`px-2 rounded font-bold capitalize ${
                              v.type == "buy"
                                ? "bg-long/10 text-long"
                                : v.type == "sell"
                                ? "bg-short/10 text-short"
                                : ""
                            }`}
                          >
                            {v.type}
                          </span>
                        </td>
                        <td className="">
                          {Number(v.volume || v.lot)?.toFixed(2)}
                        </td>
                        <td
                          className={`font-bold pl-1 ${
                            v.profit > 0
                              ? "text-profit"
                              : v.profit < 0
                              ? "text-loss"
                              : ""
                          } `}
                        >
                          ${Number(v.profit).toFixed(2)}
                        </td>
                        <td className="">{v.openPrice || v.open}</td>
                        <td className="">{v.closePrice || v.close}</td>
                        <td className="truncate px-1 ">
                          {/* {v.openTime} */}
                          {moment(v.openTime).format("yyyy MM DD HH:mm:ss")}
                        </td>
                        <td className="truncate px-1 ">
                          {moment(v.closeTime).format("yyyy MM DD HH:mm:ss")}
                        </td>
                      </tr>
                    }
                  >
                    <TradeDetails data={v} />
                  </ModalWithHeader>
                </Fragment>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between items-center mt-3 max-w-md mx-auto">
          <ButtonText
            startIcon={<MdNavigateBefore />}
            onClick={handlePreviousPage}
            disabled={currentPage === 1}
            className="px-3 py-1 text-text/60"
          >
            Previous
          </ButtonText>
          <span className="text-text/40 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <ButtonText
            icon={<MdNavigateNext />}
            onClick={handleNextPage}
            disabled={currentPage === totalPages}
            className="px-3 py-1 text-text/60"
          >
            Next
          </ButtonText>
        </div>
      </div>
    </Fragment>
  );
}
