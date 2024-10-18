import { Fragment, useState } from "react";
import { SubTitle2 as Hi6, SubTitle3 as H6 } from "../../components/ui/Text";
import moment from "moment";
import AlertAccount from "./AlertAccount";

import {
  typeToStr,
  getMessageData,
  getMessageAdvancedData,
  GetWebhookContext,
} from "../../hooks/WebHook";

export default function Alert({ v, key }) {
  const [showDate, setShowDate] = useState(true);

  // const [accountData, setAccountData] = useState(null);

  const { webhooks } = GetWebhookContext();

  let msg = getMessageData(v.message);
  const wh = webhooks?.find((w) => w.id === v.webhookId);

  return (
    <div key={key} className={"p-1 mx-1" + (10 - 1 === key ? "" : "pb-0")}>
      {/* <div className="bg-bg py-3 px-2 mb-1 border-[2px] border-bgai rounded-xl flex items-center justify-between">
          <H6>
            {v.webhookName}
            <span className="font-extrabold text-text-p px-2 py-1">
              {msg.pair}
            </span>
          </H6>
          <Hi6>{moment(v.created_at.toDate()).fromNow()}</Hi6>
        </div> */}

      <div tabIndex={key} className=" py-2 pb-4 px-0">
        <div
          className="cursor-pointer flex items-center justify-between mb-6"
          // onClick={() => setShowDate(!showDate)}
        >
          <H6>
            {wh?.advanced && (
              <Fragment>
                <span className=" text-bg rounded-xl font-bold px-2 py-0 bg-accent mr-2">
                  advanced
                </span>
                {/* <span className=" text-bg rounded-xl font-bold px-2 py-0 bg-info mr-2">
                  {msg.alertType}
                </span> */}
              </Fragment>
            )}
            {msg.test?.isTest && (
              <span className=" text-bg rounded-xl px-2 py-0 bg-info mr-2">
                test
              </span>
            )}
            {msg.manual?.isManual && (
              <span className=" text-bg rounded-xl px-2 py-0 bg-accent mr-2">
                manual
              </span>
            )}
            <span
              className="rounded-sm"
              style={{ borderBottom: `4px solid ${wh?.color}` }}
            >
              {wh?.name || v.webhookName}
            </span>
            <span className="font-extrabold text-text-p px-2 py-1">
              {msg.pair}
            </span>
            {msg.msgType >= 0 && (
              <span className="font-extrabold text-bga rounded-xl bg-text-p px-2 py-0">
                {msg.msgType == 0
                  ? "Market order"
                  : msg.msgType == 1
                  ? "Pending order"
                  : msg.msgType == 2
                  ? "Close order"
                  : msg.msgType == 3
                  ? "Update order"
                  : ""}
              </span>
            )}
          </H6>
          <Hi6>{moment(v.created_at.toDate()).fromNow()}</Hi6>
        </div>
        {showDate && (
          <Fragment>
            {msg.msgType === 0 ? (
              <MarketOrder msg={msg} />
            ) : msg.msgType === 2 ? (
              <CloseOrder msg={msg} />
            ) : msg.msgType === 3 ? (
              <UpddateOrder msg={msg} />
            ) : (
              <Fragment />
            )}
          </Fragment>
        )}
        {v.accounts && (
          <div className="flex">
            {/* <Hi6 className="!text-xs !font-semibold mr-2 whitespace-nowrap">
                Sent to
              </Hi6> */}
            <div className="grid grid-cols-2 sm:grid-cols-4 items-center gap-2">
              {Object.keys(v.accounts).map((acc, i) => (
                <Fragment key={i}>
                  <AlertAccount
                    key={i}
                    accountId={acc}
                    data={v.accounts[acc]}
                    msg={v.message}
                  />
                </Fragment>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function UpddateOrder({ msg }) {
  return (
    <div className="mb-6 m-0 pt-0 px-2">
      <div className="grid grid-cols-3 gap-3 justify-between w-full">
        <span className="text-xs">
          Update for:
          <span className="ml-1 font-bold">
            {typeToStr(msg.type?.toString())}
          </span>
        </span>

        <span className="text-xs">
          {/* Position value:
            <span className="ml-1 font-bold">
              {msg.positionValue ||
                msg.positionValuePercentage ||
                msg.riskPercentage}
              {msg.positionType === 0 || msg.riskPercentage ? "%" : ""}
            </span> */}
        </span>

        <div></div>

        {msg.stopLoss && (
          <span className="text-xs">
            Stop loss:
            <span className="ml-1 font-bold">{msg.stopLoss}</span>
          </span>
        )}

        {msg.stopLossPrice && (
          <span className="text-xs">
            Stop loss @
            <span className="ml-1 font-bold">{msg.stopLossPrice}</span>
          </span>
        )}

        {msg.takeProfit && (
          <span className="text-xs">
            Take profit:
            <span className="ml-1 font-bold">{msg.takeProfit}</span>
          </span>
        )}

        {msg.takeProfitPrice && (
          <span className="text-xs">
            take Profit @
            <span className="ml-1 font-bold">{msg.takeProfitPrice}</span>
          </span>
        )}
      </div>
    </div>
  );
}

function MarketOrder({ msg }) {
  return (
    <div className="mb-6 m-0 pt-0 px-2">
      <div className="grid grid-cols-3 gap-3 justify-between w-full">
        <span className="text-xs">
          Order type:
          <span className="ml-1 font-bold">
            {typeToStr(msg.type?.toString())}
          </span>
        </span>

        <span className="text-xs">
          Position value:
          <span className="ml-1 font-bold">
            {msg.positionValue ||
              msg.positionValuePercentage ||
              msg.riskPercentage}
            {msg.positionType === 0 || msg.riskPercentage ? "%" : ""}
          </span>
        </span>

        <div></div>

        {msg.stopLoss && (
          <span className="text-xs">
            Stop loss:
            <span className="ml-1 font-bold">{msg.stopLoss}</span>
          </span>
        )}

        {msg.stopLossPrice && (
          <span className="text-xs">
            Stop loss @
            <span className="ml-1 font-bold">{msg.stopLossPrice}</span>
          </span>
        )}

        {msg.takeProfit && (
          <span className="text-xs">
            Take profit:
            <span className="ml-1 font-bold">{msg.takeProfit}</span>
          </span>
        )}

        {msg.takeProfitPrice && (
          <span className="text-xs">
            take Profit @
            <span className="ml-1 font-bold">{msg.takeProfitPrice}</span>
          </span>
        )}

        {msg.allTrades && (
          <span className="text-xs">
            <span className=" font-bold">Apply to all trades</span>
          </span>
        )}
      </div>
    </div>
  );
}

function CloseOrder({ msg }) {
  //   console.log(msg);
  return (
    <div className="mb-6 m-0 pt-0 px-2">
      <div className="grid grid-cols-3 gap-3 justify-between w-full">
        <span className="text-xs">
          Closing
          <span className="ml-1 font-bold">
            {typeToStr(msg.type?.toString())}
          </span>
        </span>

        {msg.positionType == 1 ? (
          <span className="text-xs">
            Partial close:
            <span className="ml-1 font-bold">{msg.positionValue}%</span>
          </span>
        ) : (
          <span></span>
        )}

        <div></div>

        {msg.moveToBE && (
          <span className="text-xs">
            <span className=" font-bold">With SL to BreakEven</span>
          </span>
        )}

        {msg.allTrades && (
          <span className="text-xs">
            <span className=" font-bold">Apply to all trades</span>
          </span>
        )}
      </div>
    </div>
  );
}
