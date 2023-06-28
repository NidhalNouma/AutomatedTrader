import { Fragment, useState } from "react";
import { H4, Hi6, H6 } from "../../Components/H";
import moment from "moment";
import { ButtonText } from "../../Components/Button";

import {
  typeToStr,
  getMessageData,
  getMessageAdvancedData,
  GetWebhookContext,
} from "../../hooks/WebHook";

const Index = ({ alertsHook }) => {
  const [length, setLength] = useState(10);
  const { webhooks } = GetWebhookContext();

  return (
    alertsHook?.length > 0 && (
      <Fragment>
        {alertsHook.map((v, i) => {
          let msg = getMessageData(v.message);
          const wh = webhooks?.find((w) => w.id === v.webhookId);
          if (wh?.advanced) msg = getMessageAdvancedData(v.message, wh.pair);

          return i < length ? (
            <div key={i} className={"p-1 mx-1" + (10 - 1 === i ? "" : "pb-0")}>
              {/* <div className="bg-bg py-3 px-2 mb-1 border-[2px] border-bgai rounded-xl flex items-center justify-between">
                  <H6>
                    {v.webhookName}
                    <span className="font-extrabold text-text-p px-2 py-1">
                      {msg.pair}
                    </span>
                  </H6>
                  <Hi6>{moment(v.created_at.toDate()).fromNow()}</Hi6>
                </div> */}
              <div
                tabIndex={i}
                className="cursor-pointer collapse collapse-plus bg-bgt py-3 px-2 mb-1 border-[2px] border-bga rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <H6>
                    {msg?.advanced && (
                      <Fragment>
                        <span className=" text-bg rounded-xl font-bold px-2 py-0 bg-accent mr-2">
                          advanced
                        </span>
                        <span className=" text-bg rounded-xl font-bold px-2 py-0 bg-info mr-2">
                          {msg.alertType}
                        </span>
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
                  </H6>
                  <Hi6>{moment(v.created_at.toDate()).fromNow()}</Hi6>
                </div>
                <div className="collapse-content m-0 pt-4 px-2">
                  <div className="grid grid-cols-3 gap-3 justify-between w-full">
                    <span className="text-xs">
                      Position type:
                      <span className="ml-1 font-bold">
                        {typeToStr(msg.type?.toString())}
                      </span>
                    </span>

                    <span className="text-xs">
                      Position value:
                      <span className="ml-1 font-bold">
                        {msg.positionValue || msg.riskPercentage}
                        {msg.positionType === 0 || msg.riskPercentage
                          ? "%"
                          : ""}
                      </span>
                    </span>

                    <span></span>

                    <span className="text-xs">
                      Stop loss:
                      <span className="ml-1 font-bold">{msg.stopLoss}</span>
                    </span>

                    <span className="text-xs">
                      Take profit:
                      <span className="ml-1 font-bold">
                        {msg.takeProfit || msg.takeProfit3}
                      </span>
                    </span>
                    <span className="text-xs">
                      {/* Take profit:
                      <span className="ml-1 font-bold">
                        {msg.takeProfit || msg.takeProfit3}
                      </span> */}
                    </span>

                    {msg?.advanced && msg?.alertType === "ENTRY" && (
                      <Fragment>
                        <span className="text-xs">
                          Take profit 1:
                          <span className="ml-1 font-bold">
                            {msg.takeProfit1}
                          </span>
                        </span>
                        <span className="text-xs">
                          Take profit 2:
                          <span className="ml-1 font-bold">
                            {msg.takeProfit2}
                          </span>
                        </span>
                        <span className="text-xs">
                          Take profit 3:
                          <span className="ml-1 font-bold">
                            {msg.takeProfit3}
                          </span>
                        </span>
                        <span className="text-xs">
                          Parciel Close 1:
                          <span className="ml-1 font-bold">
                            {msg.parcielClose1}
                          </span>
                        </span>
                        <span className="text-xs">
                          Parciel Close 2:
                          <span className="ml-1 font-bold">
                            {msg.parcielClose2}
                          </span>
                        </span>
                        <span className="text-xs">
                          Parciel Close 3:
                          <span className="ml-1 font-bold">
                            {msg.parcielClose3}
                          </span>
                        </span>
                        <span className="text-xs">
                          Break Even Start:
                          <span className="ml-1 font-bold">
                            {msg.breakEvenStart}
                          </span>
                        </span>
                        <span className="text-xs">
                          Break Even Offset:
                          <span className="ml-1 font-bold">
                            {msg.breakEvenOffset}
                          </span>
                        </span>
                        <span className="text-xs">
                          Break Even Parciel Close:
                          <span className="ml-1 font-bold">
                            {msg.breakEvenPClose}
                          </span>
                        </span>
                      </Fragment>
                    )}
                  </div>
                  {/* <p>
                      tabIndex={i} attribute is necessary to make the div
                      focusable
                    </p> */}
                </div>
              </div>
            </div>
          ) : (
            <Fragment></Fragment>
          );
        })}
        {alertsHook.length > 10 && (
          <div className="flex w-full">
            <ButtonText
              className="mx-auto"
              onClick={() => setLength(length === 10 ? alertsHook.length : 10)}
            >
              {length === 10 ? "Show all" : "Hide"}
            </ButtonText>
          </div>
        )}
      </Fragment>
    )
  );
};

export default Index;
