import React, { useState } from "react";
import { Button } from "../ui/Button";

import { UpdateUserSubscription } from "../../hooksp/UserHook";
import { OpenCheckout } from "../../hooksp/ChargeBee";

import { useUser } from "../../contexts/UserContext";

import { GiRobotLeg, GiChart } from "react-icons/gi";
import { GiLevelTwo } from "react-icons/gi";
import { AiOutlineFundProjectionScreen, AiOutlineAlert } from "react-icons/ai";
import { RiExternalLinkFill } from "react-icons/ri";
import {
  TbBrandTelegram,
  TbBrandDiscord,
  TbManualGearbox,
} from "react-icons/tb";
import { GrManual } from "react-icons/gr";
import { MdOutlineScreenShare } from "react-icons/md";
import { BiSupport } from "react-icons/bi";

function Index({ title, value, t, setSuccess, i }) {
  const { fullUser } = useUser();
  const { updateSubscription } = UpdateUserSubscription();
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
      } else if (sub.time !== "lifetime") {
        if (sub.no < i) r = "Upgrade";
        else if (sub.no > i) r = "Downgrade";
        if (t === "lifetime") r = "Upgrade";
      }
      // if (sub.no === i) r = "Current";

      if (sub.time == "lifetime" && sub.time !== t) r = "Downgrade";
    }
    return r;
  }

  const onSuccess = async (r) => {
    if (r.subscription && r.customer) {
      const nu = await updateSubscription(r.subscription, r.customer.id);
    }
    setSuccess(true);
  };

  const [expend, setExpend] = useState(true);

  return (
    <div
      className={`w-full px-2 h-full bg-bg  rounded-lg ${
        value?.standout
          ? " bg-gradient-to-b from-primary/40 from-10% via-bg via-80% to-bgt to-90% "
          : " bg-gradient-to-b from-primary/10 from-10% via-bg via-50% to-bgt to-90% "
      }`}
    >
      <div className="p-8 rounded-xl h-full flex flex-col">
        <div className="flex w-full justify-center">
          <h4 className="bg-transparent rounded-lg text-title outline outline-dashed outline-accent px-4 py-1 text-base font-bold uppercase">
            {title}
          </h4>
        </div>
        <h5 className="text-7xl font-extrabold pb-0 pt-4 text-secondary text-center">
          ${value.price}
          <small className="text-lg">/{t}</small>
        </h5>
        {value.save ? (
          <div className="text-center">
            <span className="text-success text-sm ">
              Save {value.save?.toFixed(0)}% was $
              {(value.price / (1 - value.save / 100)).toFixed(0)}
            </span>
          </div>
        ) : (
          <></>
        )}{" "}
        {fullUser && btnText() !== "Current" ? (
          <Button
            className="w-full max-w-xs mt-8  mx-auto"
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
          </Button>
        ) : fullUser ? (
          <span className="mt-8 w-full py-1 text-text font-bold text-center">
            Current Membership
          </span>
        ) : (
          <span className="mt-8 w-full text-text font-bold text-center">
            One sec
          </span>
        )}
        <div className="mx-0 my-4 bg-bga pt-1 rounded-full" />
        {expend && (
          <div className="mb-6 flex flex-col text-sm items-start justify-center">
            <Ppricing>
              <GiRobotLeg
                className="h-4 w-4 mr-1 text-accent"
                strokeWidth="10"
              />
              Automate Tradingview
            </Ppricing>
            {value.advancedWebhook && (
              <Ppricing>
                <GiLevelTwo
                  className="h-4 w-4 mr-1 text-accent"
                  strokeWidth="10"
                />
                Advanced webhook
              </Ppricing>
            )}
            <Ppricing>
              <AiOutlineFundProjectionScreen
                className="h-4 w-4 mr-2 text-accent"
                strokeWidth="10"
              />
              {value.accounts > 1
                ? `Up to ${value.accounts} accounts`
                : value.accounts === 1
                ? "1 account"
                : "N/A"}
            </Ppricing>
            <Ppricing>
              <RiExternalLinkFill
                className="h-4 w-4 mr-2 text-accent"
                strokeWidth="0"
              />
              {value.webhooks > 1
                ? `Up to ${value.webhooks} webhooks`
                : value.webhooks === 1
                ? "1 webhook"
                : "N/A"}
            </Ppricing>
            <Ppricing>
              <AiOutlineAlert
                className="h-4 w-4 mr-2 text-accent"
                strokeWidth="10"
              />
              {value.alerts > 1
                ? `Up to ${value.alerts} Alerts per day`
                : value.alerts === 1
                ? "1 Alert per day"
                : "N/A"}
            </Ppricing>
            <Ppricing>
              <GiChart className="h-4 w-4 mr-2 text-accent" strokeWidth="20" />
              MT4 & MT5 EA
            </Ppricing>

            {value.telegram && (
              <Ppricing>
                {" "}
                <TbBrandTelegram
                  className="h-4 w-4 mr-2 text-accent"
                  strokeWidth="3"
                />
                Telegram Notifications
              </Ppricing>
            )}
            {value.discord && (
              <Ppricing>
                <TbBrandDiscord
                  className="h-4 w-4 mr-2 text-accent"
                  strokeWidth="5"
                />
                Discord Notifications (Coming soon)
              </Ppricing>
            )}
            {value.manualTrade && (
              <Ppricing>
                <TbManualGearbox
                  className="h-4 w-4 mr-2 text-accent"
                  strokeWidth="3"
                />
                Manual automation
              </Ppricing>
            )}
            <Ppricing>
              <BiSupport className="h-4 w-4 mr-2 text-accent" strokeWidth="1" />
              24/7 Support
            </Ppricing>
            {value.shareAlerts && (
              <Ppricing>
                <MdOutlineScreenShare
                  className="h-4 w-4 mr-2 text-accent"
                  strokeWidth="0"
                />
                Share Alerts (Coming soon)
              </Ppricing>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default Index;

function Ppricing({ children }) {
  return (
    <p className="flex justify-center items-center my-2 text-md text-text/80 font-semibold">
      {children}
    </p>
  );
}
