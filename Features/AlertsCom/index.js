import { Fragment, useState } from "react";
import { H4, Hi6, H6 } from "../../Components/H";
import moment from "moment";
import { ButtonText } from "../../Components/Button";

import {
  typeToStr,
  getMessageData,
  GetWebhookContext,
} from "../../hooks/WebHook";

const Index = ({ alertsHook }) => {
  const [length, setLength] = useState(10);
  const { webhooks } = GetWebhookContext();

  return (
    alertsHook?.length > 0 && (
      <Fragment>
        {alertsHook.map((v, i) => {
          const msg = getMessageData(v.message);
          const wh = webhooks?.find((w) => w.id === v.webhookId);

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
                className="cursor-pointer collapse collapse-plus bg-bg py-3 px-2 mb-1 border-[2px] border-bgai rounded-xl"
              >
                <div className="flex items-center justify-between">
                  <H6>
                    {msg.test?.isTest && (
                      <span className=" text-bg rounded-xl px-2 py-0 bg-info mr-2">
                        test
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
                        {typeToStr(msg.type.toString())}
                      </span>
                    </span>

                    <span className="text-xs">
                      Position value:
                      <span className="ml-1 font-bold">
                        {msg.positionValue}
                        {msg.positionType === 0 ? "%" : ""}
                      </span>
                    </span>

                    <span></span>

                    <span className="text-xs">
                      Stop loss:
                      <span className="ml-1 font-bold">{msg.stopLoss}</span>
                    </span>

                    <span className="text-xs">
                      Take profit:
                      <span className="ml-1 font-bold">{msg.takeProfit}</span>
                    </span>
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
