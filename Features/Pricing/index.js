import React, { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/solid";
import { ButtonP } from "../../Components/Button";
// import { Button } from "react-daisyui";

// import { XIcon } from "@heroicons/react/solid";
// import { H3 } from "../../Components/H";

import {
  GetFullUserContext,
  UpdateUserSubscription,
} from "../../hooks/UserHook";
// import PaymentMethod from "../chargeBee/PaymentMethod";

// import { Modal1 } from "../../Components/Modal";
import { OpenCheckout, GetChargeBeeContext } from "../../hooks/ChargeBee";

function Index({ title, value, t, setSuccess, i }) {
  const { fullUser, setFullUser } = GetFullUserContext();
  // const [openPM, setOpenPm] = useState(false);
  // const { openCheckout } = GetChargeBeeContext();

  function btnText() {
    let r = "Select";
    if (fullUser?.subObj) {
      const sub = fullUser.subObj;
      if (sub.no === i && sub.time === t) r = "Current";
      else if (sub.no === i && sub.time !== t) {
        if (t == "mo") r = "Downgrade";
        else r = "Upgrade";
      }
      // if (sub.no === i) r = "Current";
      else if (sub.no < i) r = "Upgrade";
      else if (sub.no > i) r = "Downgrade";
    }
    return r;
  }

  const onSuccess = async (r) => {
    if (r.subscription && r.customer) {
      const nu = await UpdateUserSubscription(
        fullUser.id,
        r.subscription.id,
        r.customer.id,
        r.subscription
      );

      setFullUser(nu);
    }
    setSuccess(true);
  };

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
            <CheckCircleIcon className="h-3 w-3 mr-1 " />
            Automate Tradingview
          </p>
          <p className="flex justify-center items-center my-1">
            <CheckCircleIcon className="h-3 w-3 mr-1 " />
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
        {btnText() !== "Current" ? (
          <ButtonP
            className="w-full max-w-xs mt-auto !bg-transparent !border-bga"
            onClick={() => {
              OpenCheckout(value.chargeBeeId, onSuccess);
              // setOpenPm(true);
              // console.log(Number(process.env.NEXT_PUBLIC_PADDLE_VENDOR));
              // Paddle.Checkout.open({
              //   product: value.paddleId,
              //   email: user?.email,
              // });
            }}
          >
            {btnText()}
          </ButtonP>
        ) : (
          <span className="mt-auto w-full text-text-h font-bold text-center">
            Current
          </span>
        )}
      </div>
      {/* <Modal1
        open={openPM}
        close={() => {
          setOpenPm(false);
        }}
      >
        <div className="">
          <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
            <H3 className="flex">Payment Method</H3>
            <Button
              size="sm"
              shape="circle"
              className=" bg-accenti"
              onClick={() => {
                setOpenPm(false);
              }}
            >
              <XIcon className="h-4 w-4" />
            </Button>
          </div>
          <div className="px-12 py-8">
            <PaymentMethod />
          </div>
        </div>
      </Modal1> */}
    </div>
  );
}

export default Index;
