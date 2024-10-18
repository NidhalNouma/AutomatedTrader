import React from "react";
import Image from "next/image";
// import Link from "next/link";
// import { ArrowSmRightIcon } from "@heroicons/react/outline";

function Section4() {
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-[90%] mt-[16vh] pb-32 mx-auto">
        <h1 className="text-4xl text-center font-bold text-title mb-2">
          Compatible With Your Favorite
        </h1>
        <h1 className="md:text-7xl text-5xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-accent mb-6">
          Brokers And Prop Firms
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-0 mt-16 items-start justify-between w-full">
          <Part
            bgColor="from-accent/10 to-accent/30"
            title="Quick Simple Setup"
            src="/Images/landing/section4/trading-graph.webp"
          />
          <Part
            bgColor="from-accent/20 to-accent/40"
            title="Automatic Execution on your Metatrader"
            src="/Images/landing/section4/Metatrader4.webp"
          />
          <Part
            bgColor="from-secondary/10 to-secondary/30"
            title="Works With Any Trading Broker"
            src="/Images/landing/section4/trading-up-chart.webp"
          />
          <Part
            bgColor="from-secondary/10 to-secondary/20"
            title="Risk Management Tools"
            src="/Images/landing/section4/growth-day.webp"
          />
          <Part
            bgColor="from-primary/20 to-primary/30"
            title="Automated Take Profits, Trailing Stops & Stops Losses"
            src="/Images/landing/section4/take-profit.webp"
          />
          <Part
            bgColor="from-primary/20 to-primary/40"
            title="Follow Top Traders"
            src="/Images/landing/section4/diamond.webp"
          />
        </div>
      </div>
    </section>
  );
}

export default Section4;

function Part({ src, title, bgColor }) {
  return (
    <div className="p-4 flex flex-col items-center ">
      <div className="rounded-xl relative w-full">
        <div
          className={`${bgColor} bg-gradient-to-tr w-full aspect-video rounded-t-xl flex items-center justify-center`}
        >
          <Image
            className=""
            src={src}
            width={110}
            height={110}
            alt="Picture of the author"
          />
        </div>
        <div className="bg-bg rounded-b-xl w-full min-h-[8rem] flex items-center justify-center">
          <h1 className="font-extrabold text-xl text-title/80 py-6 px-4 text-center">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
