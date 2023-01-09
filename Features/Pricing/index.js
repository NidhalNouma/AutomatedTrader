import React from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ButtonP } from "../../Components/Button";

import { GetUserContext } from "../../hooks/UserHook";

function Index({ title }) {
  const { user } = GetUserContext();

  return (
    <div className="lg:w-1/4 md:w-1/2 w-full px-4 ">
      <div className="p-8 rounded-xl">
        <div className="flex w-full justify-center">
          <h4 className="bg-text-h rounded-xl text-bg px-4 py-1 !text-xs !font-semibold">
            {title} PLAN
          </h4>
        </div>
        <h5 className="text-3xl font-bold pb-2 pt-4 text-accent text-center">
          $9.99<small className="text-lg">/mo</small>
        </h5>
        <hr className="mx-1" />
        <div className="mt-2 mb-3 flex flex-col text-sm items-start justify-center">
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Automate Tradingview
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />1 Account
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />1 Webhook
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            MT4 & MT5 EA
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            Telegram Notifications
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1" />
            24/7 Support
          </p>
        </div>
        <ButtonP
          className="w-full max-w-xs"
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
