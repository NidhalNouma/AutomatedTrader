import React from "react";
import { H4, Hi3 } from "../../components/H";

function IncomeSteps() {
  return (
    <React.Fragment>
      <Hi3 className="font-semibold">
        There are 4 ways to make passive income using Automated Trader, with
        more ways coming soon!
      </Hi3>
      <div className="mt-6 grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        <Cardi no={1} title="Make your own bots">
          <p className="text-sm text-text-p font-semibold mb-2">
            with amazing built in features to help you turn your Tradingview
            Alerts into profitable trades. Highly configurable and easy to
            manage. Works with all indicators and most prop firms, also tracks
            all account data so you can win more trades!
          </p>
          <span
            className="text-sm text-accent mt-auto font-semibold cursor-pointer"
            onClick={() => router.push("/webhook")}
          >
            Start now
          </span>
        </Cardi>
        <Cardi no={2} title="Share your bots">
          <p className="text-sm text-text-p font-semibold mb-2">
            Once you find a profitable system you can make it public and it will
            show on your profile for others to follow. You can also automate
            your tradingview alerts into telegram & discord & become a Signal
            provider just start looking for the perfect alerts!
          </p>
          <span className="text-sm text-accent mt-auto font-semibold">
            Coming soon
          </span>
        </Cardi>
        <Cardi no={3} title="Copy other traders">
          <p className="text-sm text-text-p font-semibold mb-2">
            Don&apos;t worry if you are new to trading with Automated Trader you
            can connect to traders around the world. Passive investing
            handsfree, just find a profitable trading solution that works for
            you. We show you all the users public data so you can know exactly
            what to expect when following a signal provider!
          </p>
          <span className="text-sm text-accent mt-auto font-semibold">
            Coming soon
          </span>
        </Cardi>
        <Cardi no={4} title="Top of the line affiliate program">
          <p className="text-sm text-text-p font-semibold mb-2">
            Competitive commission rates, which can add up quickly if you have a
            large and engaged audience. With every sale made through your
            affiliate link, you&apos;ll earn a percentage of the revenue, which
            can be a powerful way to monetize your website or social media
            presence.
          </p>
          <span className="text-sm text-accent mt-auto font-semibold">
            Coming soon
          </span>
        </Cardi>
      </div>
    </React.Fragment>
  );
}

export default IncomeSteps;

function Cardi({ no, title, children }) {
  return (
    <div className="bg-bg p-4 rounded-lg flex flex-col items-start">
      <H4 className="font-semibold uppercase">
        <span className="mr-2 px-1 bg-primary text-bg rounded">{no}</span>
        {title}
      </H4>
      <div className="text-text-p mt-2"></div>
      {children}
    </div>
  );
}
