import React from "react";
import Image from "next/image";
// import Link from "next/link";
// import { ArrowSmRightIcon } from "@heroicons/react/outline";

function Section4() {
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-[90%] mt-[16vh] pb-32 mx-auto">
        <h1 className="text-4xl text-center font-bold text-text-h mb-0">
          Compatible With Your Favorite
        </h1>
        <h1 className="text-80 text-center font-bold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-accent mb-6">
          Brokers And Prop Firms
        </h1>
        <div className="grid md:grid-cols-3 grid-cols-1 md:gap-8 gap-0 mt-16 items-start justify-between w-full">
          <Part
            bgColor="from-accent/40 to-accent/60"
            title="Quick Simple Setup"
            src="/Images/landing/section4/trading-graph.webp"
          />
          <Part
            bgColor="from-accent/70 to-accent"
            title="Automatic Execution on your Metatrader"
            src="/Images/landing/section4/Metatrader4.webp"
          />
          <Part
            bgColor="from-secondary/40 to-secondary/60"
            title="Works With Any Trading Broker"
            src="/Images/landing/section4/trading-up-chart.webp"
          />
          <Part
            bgColor="from-secondary/60 to-secondary"
            title="Risk Management Tools"
            src="/Images/landing/section4/growth-day.webp"
          />
          <Part
            bgColor="from-primary/40 to-primary/60"
            title="Automated Take Profits, Trailing Stops & Stops Losses"
            src="/Images/landing/section4/take-profit.webp"
          />
          <Part
            bgColor="from-primary/60 to-primary"
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
        <div className="bg-bga rounded-b-xl w-full min-h-[8rem] flex items-center justify-center">
          <h1 className="font-extrabold text-xl text-text-h py-6 px-4 text-center">
            {title}
          </h1>
        </div>
      </div>
    </div>
  );
}
