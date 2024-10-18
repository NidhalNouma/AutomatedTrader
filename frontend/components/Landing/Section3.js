import React from "react";
// import Link from "next/link";
// import { ArrowSmRightIcon } from "@heroicons/react/outline";

function Section3() {
  return (
    <section className="flex-col items-center justify-center bg-bgt pt-1">
      <div className="max-w-[90%] mt-[16vh] pb-32 mx-auto">
        <h1 className="md:text-7xl text-5xl text-center font-bold text-title mb-6">
          How it works
        </h1>
        <h2 className="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-text text-center">
          It’s Never Been This Easy to Automate Tradingview
        </h2>
        <div className="flex flex-col md:flex-row items-start justify-between w-full">
          <Part bgColor="from-accent/20 to-accent" title="Find Alert" num="1">
            Find a Tradingview alert strategy or indicator
          </Part>
          <Part
            bgColor="from-secondary/20 to-secondary"
            title="Create Webhook"
            num="2"
          >
            Choose your entry position size, risk % and other perimeters
          </Part>
          <Part
            bgColor="from-primary/20 to-primary/60"
            title="Select Account"
            num="3"
          >
            Easily connects to Metatrader so works with any broker
          </Part>
          <Part
            bgColor="from-primary/20 to-primary"
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
        <span className="font-bold text-5xl text-title">{num}</span>
      </div>
      <h1 className="font-extrabold text-2xl text-title mt-12 text-center">
        {title}
      </h1>
      <p className="text-text/60 font-semibold mt-2 text-center max-w-xs">
        {children}
      </p>
    </div>
  );
}
