import React, { useState } from "react";
import { useRouter } from "next/router";
import { ButtonGroup, Button } from "react-daisyui";
import { ButtonP } from "../../Components/Button";
import { pricingList } from "../../utils/pricing";

import { CheckCircleIcon } from "@heroicons/react/solid";

function PricingSection() {
  const [ty, setTy] = useState(2);
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-5xl mt-[25vh] mb-20 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-text-h mb-6">
          Honest and thoughtful pricing
        </h1>
        {/* <h2 className="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-text-p text-center">
          Use our innovative dashboard to stay up to date, track, compare and
          analyze your trading activity like never before. Control your risk per
          trade like a PRO!
        </h2> */}
        <div className="w-full flex justify-center mt-20">
          <ButtonGroup>
            <Button
              animation={false}
              className="bg-bgt rounded-xl capitalize px-6"
              size="lg"
              active={ty === 1}
              onClick={() => setTy(1)}
            >
              Monthly
              <span className="ml-1 hidden md:block">Pricing</span>
            </Button>
            <Button
              animation={false}
              size="lg"
              className="bg-bgt rounded-xl capitalize px-6 "
              active={ty === 2}
              onClick={() => setTy(2)}
            >
              Annual
              <span className="ml-1 hidden md:block">Pricing</span>
            </Button>
            <Button
              animation={false}
              size="lg"
              className="bg-bgt rounded-xl capitalize px-6"
              active={ty === 3}
              onClick={() => setTy(3)}
            >
              Lifetime
              <span className="ml-1 hidden md:block">Membership</span>
            </Button>
          </ButtonGroup>
        </div>
      </div>
      {ty === 1 ? (
        <section className="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
          {Object.keys(pricingList.monthly).map((key, i) => (
            <Pricing
              key={key}
              title={key}
              value={pricingList.monthly[key]}
              t="mo"
              i={i}
              // setSuccess={setSuccess}
            />
          ))}
        </section>
      ) : ty === 2 ? (
        <section className="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
          {Object.keys(pricingList.annual).map((key, i) => (
            <Pricing
              key={key}
              title={key}
              value={pricingList.annual[key]}
              t="yearly"
              i={i}
              // setSuccess={setSuccess}
            />
          ))}
        </section>
      ) : ty === 3 ? (
        <section className="flex flex-wrap justify-center w-full">
          {Object.keys(pricingList.lifetime).map((key, i) => (
            <div key={key} className="lg:w-1/3 md:w-1/2 w-full">
              <Pricing
                key={key}
                title={key}
                value={pricingList.lifetime[key]}
                t="lifetime"
                i={i}
                //   setSuccess={setSuccess}
              />
            </div>
          ))}
        </section>
      ) : (
        <></>
      )}
    </section>
  );
}

export default PricingSection;

function Pricing({ title, value, t, i }) {
  const router = useRouter();
  function btnText() {
    let r = "Select";
    return r;
  }

  return (
    <div
      className={`w-full px-2 h-full ${
        value?.standout && "bg-primary rounded-xl"
      }`}
    >
      <div className="p-8 rounded-xl h-full flex flex-col">
        <div className="flex w-full justify-center">
          <h4 className="bg-text-h rounded-3xl text-bg px-4 py-1 !text-base !font-bold uppercase">
            {title}
          </h4>
        </div>
        <h5 className="text-5xl my-3 font-bold pb-0 pt-4 text-accent text-center">
          ${value.price}
          <small className="text-2xl">/{t}</small>
        </h5>
        {value.save ? (
          <div className="text-center">
            <span className="text-red-500 text-lg font-semibold ">
              Save {value.save?.toFixed(0)}% was $
              {(value.price / (1 - value.save / 100)).toFixed(0)}
            </span>
          </div>
        ) : (
          <></>
        )}
        <hr className="mx-1 mt-2" />
        <div className="mt-8 mb-16 flex flex-col text-sm items-start justify-center font-semibold">
          <Ppricing>Automate Tradingview</Ppricing>
          <Ppricing>
            {value.accounts > 1
              ? `Up to ${value.accounts} accounts`
              : value.accounts === 1
              ? "1 account"
              : "N/A"}
          </Ppricing>
          <Ppricing>
            {value.webhooks > 1
              ? `Up to ${value.webhooks} webhooks`
              : value.webhooks === 1
              ? "1 webhook"
              : "N/A"}
          </Ppricing>
          <Ppricing>
            {value.alerts > 1
              ? `Up to ${value.alerts} Alerts per day`
              : value.alerts === 1
              ? "1 Alert per day"
              : "N/A"}
          </Ppricing>
          <Ppricing>MT4 & MT5 (coming soon) EA</Ppricing>
          {value.telegram && <Ppricing>Telegram Notifications</Ppricing>}
          {value.discord && (
            <Ppricing>Discord Notifications (Coming soon)</Ppricing>
          )}
          {value.manualTrade && <Ppricing>Manual automation</Ppricing>}
          <Ppricing>24/7 Support</Ppricing>
          {value.shareAlerts && <Ppricing>Share Alerts (Coming soon)</Ppricing>}
        </div>
        <ButtonP
          className="mx-auto w-full max-w-xs mt-auto text-xl !bg-transparent !border-bga !rounded-full"
          onClick={() => {
            router.push("/signup?subscription=" + value.chargeBeeId);
          }}
          size="md"
        >
          {btnText()}
        </ButtonP>
      </div>
    </div>
  );
}

function Ppricing({ children }) {
  return (
    <p className="flex justify-center items-center my-1 text-lg text-text-h">
      {/* <CheckCircleIcon className="h-3 w-3 mr-1 text-text-h" /> */}
      {children}
    </p>
  );
}
