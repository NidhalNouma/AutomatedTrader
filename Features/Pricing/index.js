import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ButtonP } from "../../Components/Button";

import { GetUserContext } from "../../hooks/UserHook";

function Index({ title, value, t }) {
  const { user } = GetUserContext();

  return (
    <div className="w-full px-4 h-full">
      <div className="p-8 rounded-xl h-full flex flex-col">
        <div className="flex w-full justify-center">
          <h4 className="bg-text-h rounded-xl text-bg px-4 py-1 !text-xs !font-semibold uppercase">
            {title}
          </h4>
        </div>
        <h5 className="text-3xl font-bold pb-0 pt-4 text-accent text-center">
          ${value.price}
          <small className="text-lg">/{t}</small>
        </h5>
        {value.save ? (
          <div className="text-center">
            <span className="text-red-500 text-sm ">
              Save {value.save}% was $
              {(value.price / (1 - value.save / 100)).toFixed(0)}
            </span>
          </div>
        ) : (
          <></>
        )}
        <hr className="mx-1 mt-2" />
        <div className="mt-2 mb-3 flex flex-col text-sm items-start justify-center">
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Automate Tradingview
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            {value.accounts > 1
              ? `Up to ${value.accounts} accounts`
              : value.accounts === 1
              ? "1 account"
              : "N/A"}
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            {value.webhooks > 1
              ? `Up to ${value.webhooks} webhooks`
              : value.webhooks === 1
              ? "1 webhook"
              : "N/A"}
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            MT4 & MT5 EA
          </p>
          {value.telegram && (
            <p className="flex justify-center items-center my-1">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Telegram Notifications
            </p>
          )}
          {value.discord && (
            <p className="flex justify-center items-center my-1">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Discord Notifications
            </p>
          )}
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            24/7 Support
          </p>
          {value.shareAlerts && (
            <p className="flex justify-center items-center my-1">
              <CheckCircleIcon className="h-3 w-3 mr-1" />
              Share Alerts
            </p>
          )}
        </div>
        <ButtonP
          className="w-full max-w-xs mt-auto"
          onClick={() => {
            // console.log(Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR));
            Paddle.Checkout.open({
              product: Number(process.env.NEXT_PUBLIC_PADDLE_PLAN_1),
              email: user?.email,
            });
          }}
        >
          Select
        </ButtonP>
      </div>
    </div>
  );
}

export default Index;
