import React from "react";
// import Link from "next/link";
// import { ArrowSmRightIcon } from "@heroicons/react/outline";

function Section3() {
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-[90%] mt-[16vh] pb-32 mx-auto">
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-text-h mb-6">
          How it works
        </h1>
        <h2 className="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-text-p text-center">
          It’s Never Been This Easy to Automate Tradingview
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          <Part bgColor="from-accent/50 to-accent" title="Find Alert" num="1">
            Find a Tradingview alert strategy or indicator
          </Part>
          <Part
            bgColor="from-secondary/50 to-secondary"
            title="Create Webhook"
            num="2"
          >
            Choose your entry position size, risk % and other perimeters
          </Part>
          <Part
            bgColor="from-primary/40 to-primary/60"
            title="Select Account"
            num="3"
          >
            Easily connects to Metatrader so works with any broker
          </Part>
          <Part
            bgColor="from-primary/60 to-primary"
            title="You're done"
            num="4"
            rightLine={false}
          >
            Watch the profits and trades execute automatically
          </Part>
        </div>
      </div>
    </section>
  );
}

export default Section3;

function Part({ children, num, title, bgColor, rightLine = true }) {
  return (
    <div className="mt-16 w-4/6 rounded-xl bg-transparent mx-auto flex flex-col items-center relative">
      {rightLine && (
        <div
          className={`md:block hidden absolute bg-gradient-to-r ${bgColor} h-1 rounded-xl top-[51px] left-[calc(50%+4.5rem)] w-[calc(100%-9rem)]`}
        ></div>
      )}
      <div
        className={`${bgColor} bg-gradient-to-tr w-24 h-24 rounded-full flex items-center justify-center`}
      >
        <span className="font-bold text-5xl text-text-h">{num}</span>
      </div>
      <h1 className="font-extrabold text-2xl text-text-h mt-12 text-center">
        {title}
      </h1>
      <p className="text-text-p font-semibold mt-2 text-center">{children}</p>
    </div>
  );
}
