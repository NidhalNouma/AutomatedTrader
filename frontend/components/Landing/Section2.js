import React from "react";
// import Link from "next/link";
// import { ArrowSmRightIcon } from "@heroicons/react/outline";

function Section2() {
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-5xl mt-[15vh] pb-32 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-text-h mb-6">
          Automate ALL your Trades... <br />
          Even the Manual Ones!
        </h1>
        <h2 className="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-text-p text-center">
          Use our innovative dashboard to stay up to date, track, compare and
          analyze your trading activity like never before. Control your risk per
          trade like a PRO!
        </h2>

        <Part1>
          Amazing built in features to help you turn your Tradingview Alerts
          into profitable trades. Highly configurable and easy to manage. Works
          with all indicators and most prop firms, also tracks all account data
          so you can win more trades!
        </Part1>
        <Part2>
          Once you find a profitable system you can make it public and it will
          show on your profile for others to follow. You can also automate your
          tradingview alerts into telegram & discord & become a Signal provider
          just start looking for the perfect alerts!
        </Part2>
        <Part3>
          Don&apos;t worry if you are new to trading with Automated Trader you
          can connect to traders around the world. Passive investing handsfree,
          just find a profitable trading solution that works for you. We show
          you all the users public data so you can know exactly what to expect
          when following a signal provider!
        </Part3>
      </div>
    </section>
  );
}

export default Section2;

function Part1({ children }) {
  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-delay="0"
      className="mt-40 p-8 rounded-xl bg-accent w-4/6"
    >
      <h1 className="font-extrabold text-4xl text-text-h">
        1. Make your own bots
      </h1>
      <p className="text-text-h font-bold mt-4">{children}</p>
    </div>
  );
}
function Part2({ children }) {
  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-delay="0"
      className="mt-40 p-8 rounded-xl bg-secondary w-4/6 ml-auto"
    >
      <h1 className="font-extrabold text-4xl text-text-h">
        2. Share your BOTS
      </h1>
      <p className="text-text-h font-bold mt-4">{children}</p>
    </div>
  );
}
function Part3({ children }) {
  return (
    <div
      data-aos="fade-left"
      data-aos-duration="1000"
      data-aos-delay="0"
      className="mt-40 p-8 rounded-xl bg-primary w-4/6"
    >
      <h1 className="font-extrabold text-4xl text-text-h">
        3. Copy Other Traders
      </h1>
      <p className="text-text-h font-bold mt-4">{children}</p>
    </div>
  );
}
