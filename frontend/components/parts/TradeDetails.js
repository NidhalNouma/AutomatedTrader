import { SubTitle } from "chart.js";
import { Fragment } from "react";
import moment from "moment";
import { addAlpha } from "../../utils/functions";

export function TradeDetails({ data }) {
  const type = data.type == 0 ? "Buy" : "Sell";

  return (
    <div className="">
      <div className="grid grid-cols-2 gap-y-4 w-full px-10 mt-2 mb-4">
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Account</span>
          <div>
            <span
              className="text-sm text-title border-b-4"
              style={{ borderColor: data?.accountColor }}
            >
              {data?.accountDisplayName}
            </span>
          </div>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">WebHook</span>
          {data.webhook ? (
            <div>
              <span
                className="text-sm text-title rounded px-2"
                style={{ backgroundColor: addAlpha(data?.webhook?.color, 0.2) }}
              >
                {data.webhook ? data.webhook.name : "NA"}
              </span>
            </div>
          ) : (
            <span className="text-sm text-title/80">N/A</span>
          )}
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Symbol</span>
          <span className="text-sm text-title">{data?.symbol}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Type</span>
          <div>
            <span
              className={`px-2 py-[0.15rem] rounded font-bold text-sm ${
                type?.search("Buy") >= 0
                  ? "bg-long/10 text-long"
                  : type?.search("Sell") >= 0
                  ? "bg-short/10 text-short"
                  : ""
              }`}
            >
              {type}
            </span>
          </div>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text/60">Entry</span>
          <span className="text-sm text-title">
            {data?.open || data.openPrice || "-"}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-sm text-text/60">Exit</span>
          <span className="text-sm text-title">
            {data?.close || data.currentPrice || "-"}
          </span>
        </div>

        <div className="flex flex-col">
          <span className="text-sm text-text/60">Stoploss</span>
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
            {moment(data?.closeTime).format("yyyy MM DD HH:mm:ss")}
          </span>
        </div>

        <div className="flex flex-col">
          {/* <span className="text-sm text-text/60">Pips</span>
            <span className="text-sm text-title">{data?.pips}</span> */}
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
