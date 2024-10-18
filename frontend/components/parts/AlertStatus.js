import { Fragment, useState } from "react";
import moment from "moment";

import { ModalWithHeader } from "../ui/Modal";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";

import { getMessageData } from "../../hooksp/WebhooksHook";
import { SubTitle3 } from "../ui/Text";

import { useWebhook } from "../../contexts/WebhookContext";
import { useMetatrader } from "../../contexts/MetatraderContext";
import { useBinance } from "../../contexts/BinanceContext";

import { addAlpha } from "../../utils/functions";

function findTrade(id, webhook) {
  let whTrade = null;

  if (id && webhook?.trades?.length > 0)
    whTrade = webhook.trades?.find((trade) => trade.tradeId === id);

  return whTrade;
}

export default function Alert({ alert }) {
  const { webhooks, webhooksWithTrades } = useWebhook();
  const { mtAccounts } = useMetatrader();
  const { binanceAccounts } = useBinance();
  const messageData = alert.messageData || getMessageData(alert.message);

  const webhook = webhooksWithTrades?.find((w) => w.id === alert.webhookId);

  const color = webhook?.color || "";

  const [viewMsg, setViewMsg] = useState(false);
  const [viewResponse, setViewResponse] = useState(true);

  const apps =
    alert.apps?.map((app) => {
      if (app.accountSrc === "metatrader") {
        const account = mtAccounts?.find((v) => v.id === app.accountId);
        return { ...app, account };
      }

      if (app.accountSrc === "binance") {
        const account = binanceAccounts?.find((v) => v.id === app.accountId);
        return { ...app, account };
      }

      return app;
    }) || [];

  let trades = [];
  alert.apps?.forEach((app) => {
    if (app.trades?.length > 0) {
      const tr = app.trades
        .map((trade) => findTrade(trade?.tradeId || trade?.orderId, webhook))
        .filter((tr) => tr != null);
      trades.push(...tr);
    } else {
      const tr = findTrade(app.tradeId || app.orderId, webhook);
      if (tr) trades.push(tr);
    }
  });

  const liveTrades = trades.filter((tr) => tr.live);
  const totalProfit = trades.reduce(
    (total, tr) => total + tr.trade?.profit || 0,
    0
  );

  return (
    <Fragment>
      <div
        style={{
          backgroundColor: addAlpha(color, 0.05),
          borderColor: addAlpha(color, 0),
        }}
        className=" mb-3 border-none rounded-lg pb-1"
      >
        <div
          style={{
            backgroundColor: addAlpha(color, 0.1),
          }}
          className="flex w-full items-center rounded-lg py-1.5 px-2"
        >
          <span
            className={`${
              alert.type == 2
                ? "bg-error/10"
                : alert.type == 3
                ? "bg-info/10"
                : "bg-primary/10"
            } text-title px-1 rounded font-semibold text-xs truncate`}
          >
            {alert.type == 0
              ? "Market Order"
              : alert.type == 1
              ? "Pending Order"
              : alert.type == 2
              ? "Closing Trade"
              : alert.type == 3
              ? "Modifing Trade"
              : "NA"}
          </span>
          <span
            className="text-text text-xs mx-1 border-b px-1 "
            style={{
              borderColor: addAlpha(color, 1),
            }}
          >
            {webhook?.name || "Webhook NA"}
          </span>
          {trades?.length > 0 && (
            <div className="  items-center ml-auto">
              {/* <span className="text-text text-sm mx-1  px-1 ">
                {trades?.length || "0"} Trades
              </span> */}
              <span className={`text-text text-sm mx-1  hidden md:inline `}>
                {liveTrades?.length > 0 ? "Progress Profit" : "Closed Profit:"}
                <span
                  className={`${
                    totalProfit >= 0
                      ? "text-profit bg-profit/10"
                      : "text-loss bg-loss/10"
                  } rounded text-sm mx-1  px-1 `}
                >
                  {totalProfit || "0"}
                </span>
              </span>
              {liveTrades?.length > 0 ? (
                <span className="text-sm mx-1  px-1  rounded bg-success/20 text-success">
                  Active
                </span>
              ) : (
                <span className="text-sm mx-1  px-1  rounded bg-bgt/80 text-text">
                  Closed
                </span>
              )}
            </div>
          )}

          <span className="text-text/80 text-xs ml-auto hidden sm:inline-block">
            {moment(alert.created_at.toDate()).format(
              "MMMM Do YYYY, h:mm:ss a"
            )}
          </span>
          <span className="text-text/80 text-xs ml-auto inline-block sm:hidden">
            {moment(alert.created_at.toDate()).format("h:mm:ss a")}
          </span>
        </div>

        <div className="px-2">
          {alert.type == 0 ? (
            <MatketOrderInfo messageData={messageData} className="mt-3" />
          ) : alert.type == 1 ? (
            <MatketOrderInfo messageData={messageData} className="mt-3" />
          ) : alert.type == 2 ? (
            <CloseOrderInfo messageData={messageData} className="mt-3" />
          ) : alert.type == 3 ? (
            <ModifyOrderInfo messageData={messageData} className="mt-3" />
          ) : (
            <MatketOrderInfo messageData={messageData} className="mt-3" />
          )}

          <div className="mt-3 mb-2">
            <h6
              className="text-title/60 text-sm uppercase flex items-center hover:text-text/80 cursor-pointer"
              onClick={() => setViewResponse(!viewResponse)}
            >
              Response
              {!viewResponse ? (
                <ChevronDownIcon className="h-5 aspect-square " />
              ) : (
                <ChevronUpIcon className="h-5 aspect-square" />
              )}
            </h6>
            {viewResponse && (
              <Fragment>
                {apps?.length > 0 ? (
                  <Apps apps={apps} webhook={webhook} />
                ) : (
                  <p className="text-text/80 text-xs">No apps available!</p>
                )}
              </Fragment>
            )}
          </div>

          <div className="">
            <span
              className="flex items-center text-text/60 text-xs font-semibold hover:text-text/80 cursor-pointer"
              onClick={() => setViewMsg(!viewMsg)}
            >
              message{" "}
              {!viewMsg ? (
                <ChevronDownIcon className="h-4 aspect-square " />
              ) : (
                <ChevronUpIcon className="h-4 aspect-square" />
              )}
            </span>

            {viewMsg && (
              <p className="text-text text-xs mt-2">{alert.message}</p>
            )}
          </div>
        </div>
      </div>
    </Fragment>
  );
}

function Apps({ apps, webhook }) {
  return (
    <div className="">
      {apps.map((app, i) => {
        let whTrade = findTrade(app.tradeId, webhook);

        return (
          <div key={i} className="text-text text-xs my-1">
            <span className="text-text capitalize">
              {app.accountSrc} &rarr;{" "}
            </span>
            {!app.account ? (
              <span className="">Account NA</span>
            ) : (
              <span
                className="text-text border-b font-semibold"
                style={{ borderColor: addAlpha(app.account.color, 0.8) }}
              >
                {app.account.accountDisplayName || app.account.accountName}
              </span>
            )}{" "}
            &rarr;{" "}
            {app.errorMessage || app.trades?.errorMessage ? (
              <span className="text-error capitalize">
                {app.errorMessage || app.trades?.errorMessage}
              </span>
            ) : app.tradeId ? (
              <MessageWithTrade trade={whTrade}>
                {" "}
                Trade was placed successfully ID: {app.tradeId}{" "}
              </MessageWithTrade>
            ) : app.trades?.length > 0 ? (
              <ul className="text-text inline-block align-top">
                {app.trades.map((tr, i) => {
                  let trade = findTrade(tr?.tradeId || tr?.orderId, webhook);

                  return (
                    <li className="" key={i}>
                      {tr?.errorMessage ? (
                        <MessageWithTrade
                          trade={trade}
                          className="!text-error !border-error/50"
                        >
                          {tr.errorMessage} ID: {tr.tradeId || tr.orderId}{" "}
                        </MessageWithTrade>
                      ) : (
                        <MessageWithTrade trade={trade}>
                          {tr?.msg || tr?.message} ID:{" "}
                          {tr?.tradeId || tr?.orderId}{" "}
                        </MessageWithTrade>
                      )}
                    </li>
                  );
                })}
              </ul>
            ) : (
              <span className="text-text capitalize">No response</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

function MessageWithTrade({ trade, children, className }) {
  return (
    <span className={`text-success capitalize ${className}`}>
      {children}{" "}
      {trade?.trade && (
        <Fragment>
          <ModalWithHeader
            title={
              <Fragment>
                Trade{" "}
                {trade.live && (
                  <span className="text-text text-xs bg-text/20 rounded px-1">
                    Live
                  </span>
                )}
              </Fragment>
            }
            trigger={
              <button
                className={`text-success px-1 border-success/50 border rounded ${className}`}
              >
                View trade
              </button>
            }
          >
            <section className="">
              <TradeDetails data={trade?.trade} live={trade.live} />
            </section>
          </ModalWithHeader>
          {trade.live && (
            <Fragment>
              <span className="text-success bg-success/20 rounded ml-1 px-1.5 text-xs">
                Live
              </span>
            </Fragment>
          )}
          {trade.trade.profit && (
            <span
              className={` ${
                trade.trade.profit >= 0
                  ? "text-profit bg-profit/10"
                  : "text-loss bg-loss/10"
              }  rounded ml-1 px-1.5 text-xs`}
            >
              {trade.live ? "Progress Profit" : "Closed Profit"}:{" "}
              <span className="text-sm">{trade.trade.profit}</span>
            </span>
          )}
        </Fragment>
      )}
    </span>
  );
}

function TradeDetails({ data, live }) {
  return (
    <div className="">
      <div className="grid grid-cols-2 gap-y-4 w-full px-10 mt-2 mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Symbol</span>
          <span className="text-sm text-title">{data?.symbol}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Type</span>
          <div>
            <span
              className={`px-2 py-[0.15rem] rounded font-bold text-sm ${
                data?.type?.search("Buy") >= 0
                  ? "bg-long/10 text-long"
                  : data?.type?.search("Sell") >= 0
                  ? "bg-short/10 text-short"
                  : ""
              }`}
            >
              {data?.type}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text/60">Entry</span>
          <span className="text-sm text-title">{data?.open}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Exit</span>
          <span className="text-sm text-title">{live ? "-" : data?.close}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text/60">StopLoss</span>
          <span className="text-sm text-title">{data?.stopLoss || "-"}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">TakeProfit</span>
          <span className="text-sm text-title">{data?.takeProfit || "-"}</span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text/60">Open Time</span>
          <span className="text-sm text-title">
            {moment(data?.openTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Close Time</span>
          <span className="text-sm text-title">
            {live ? "-" : moment(data?.closeTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text/60">Volume</span>
          <span className="text-sm text-title">
            {data?.lot || data?.volume}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Profit</span>
          <span
            className={`text-sm font-semibold ${
              data?.profit > 0
                ? "text-profit"
                : data?.profit < 0
                ? "text-loss"
                : "text-title"
            }`}
          >
            ${data?.profit}
          </span>
        </div>
      </div>
    </div>
  );
}

function MatketOrderInfo({ messageData, className }) {
  // console.log(messageData);
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Symbol</span>
        <span className="text-text text-xs font-bold tracking-wider	">
          {messageData.pair}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Type</span>
        <span
          className={`px-0 py-0 rounded font-semibold text-xs uppercase ${
            messageData?.type?.search("buy") >= 0
              ? "text-long bg-long/10"
              : messageData.type?.search("sell") >= 0
              ? "text-short bg-short/10"
              : ""
          }`}
        >
          {messageData.type}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Volume</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.useFixedLotSize && messageData.positionValue
            ? messageData.positionValue
            : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Volume %</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.usePositionPercentage
            ? messageData.positionValuePercentage
            : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">StopLoss</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.useStopLoss ? messageData.stopLoss : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">StopLoss @</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.stopLossPrice ? messageData.stopLossPrice : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">TakeProfit</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.useTakeProfit ? messageData.takeProfit : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">
          TakeProfit @
        </span>
        <span className="text-text text-xs font-bold 	">
          {messageData.takeProfitPrice ? messageData.takeProfitPrice : "NA"}
        </span>
      </div>
    </div>
  );
}

function ModifyOrderInfo({ messageData, className }) {
  // console.log(messageData);
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Symbol</span>
        <span className="text-text text-xs font-bold tracking-wider	">
          {messageData.pair}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Type</span>
        <span
          className={`px-0 py-0 rounded font-semibold text-xs uppercase ${
            messageData?.type?.search("buy") >= 0
              ? "text-long bg-long/10"
              : messageData.type?.search("sell") >= 0
              ? "text-short bg-short/10"
              : ""
          }
                    `}
        >
          {messageData.type}
        </span>
      </div>

      <div></div>
      <div></div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">StopLoss</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.useStopLoss ? messageData.stopLoss : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">StopLoss @</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.stopLossPrice ? messageData.stopLossPrice : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">All trades</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.allTrades ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  );
}

function CloseOrderInfo({ messageData, className }) {
  // console.log(messageData);
  return (
    <div className={`grid grid-cols-4 gap-4 ${className}`}>
      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Symbol</span>
        <span className="text-text text-xs font-bold tracking-wider	">
          {messageData.pair}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">Type</span>
        <span
          className={`px-0 py-0 rounded font-semibold text-xs uppercase ${
            messageData?.type?.search("buy") >= 0
              ? "text-long bg-long/10"
              : messageData.type?.search("sell") >= 0
              ? "text-short bg-short/10"
              : ""
          }
                    `}
        >
          {messageData.type}
        </span>
      </div>

      <div></div>
      <div></div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">
          Partial close
        </span>
        <span className="text-text text-xs font-bold 	">
          {messageData.partialCloseValue
            ? messageData.partialCloseValue + "%"
            : "NA"}
        </span>
      </div>

      <div className="flex flex-col items-start">
        <span className="text-text text-[0.7rem] font-normal">All trades</span>
        <span className="text-text text-xs font-bold 	">
          {messageData.allTrades ? "Enabled" : "Disabled"}
        </span>
      </div>
    </div>
  );
}
