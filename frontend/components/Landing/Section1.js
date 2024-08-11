import React, { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

import { FaBitcoin, FaEthereum } from "react-icons/fa";
import {
  AiFillEuroCircle,
  AiFillDollarCircle,
  AiFillPoundCircle,
  AiFillAmazonCircle,
  AiFillSliders,
  AiFillApple,
} from "react-icons/ai";

import { HiCurrencyYen } from "react-icons/hi";

function Section1() {
  const [changeText, setChangeText] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setChangeText((v) => (v > 3 ? 0 : v + 1));
    }, 1500);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <section className="flex-col items-center justify-center max-h-[135vh] overflow-hidden">
      <div className="max-w-5xl mt-[20vh] pb-32 mx-auto">
        {/* <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="object-cover object-center w-3/4 mb-10 m-4"
            alt="Placeholder Image"
            src="/Logo/dark-logo.png"
          />
        </div> */}
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="text-8xl text-center font-bold text-text-h mb-6"
        >
          Automate your
          {changeText === 0 ? (
            <FlippingText text={"Trades"} />
          ) : changeText === 1 ? (
            <FlippingText text={"Alerts"} />
          ) : changeText === 2 ? (
            <FlippingText text={"TradingView"} />
          ) : changeText === 3 ? (
            <FlippingText text={"Indicators"} />
          ) : (
            <FlippingText text={"Strategies"} />
          )}
        </h1>
        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="text-xl font-4 font-semibold mt-2 pb-3 text-text-p text-center"
        >
          The easiest way to automate your ALL your trades even the manual ones!
        </h2>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="250"
          className="ml-6 text-center"
        >
          <Link href="/signup">
            <div className="cursor-pointer text-text-h border-4 bg-gradient-to-rx from-primary to-secondary border-primary rounded-full inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline">
              <div className="flex text-lg">
                <span className="flex justify-center items-center">
                  Get started
                  <ArrowSmRightIcon className="ml-[0.5rem] h-6 w-7" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="300"
        className="hidden sm:flex relative container flex-col mt-16 items-center justify-center mx-auto max-h-[40rem]"
      >
        <div className="absolute top-[0%] left-[55%] rounded-full  bg-gradient-to-tr from-primary to-secondary w-[32%] aspect-square rotate-90 scale-150 blur-[80px]"></div>
        <div className="absolute top-[0%] right-[55%] rounded-full  bg-gradient-to-tr from-primary to-secondary w-[32%] aspect-square rotate-90 scale-150 blur-[80px]"></div>
        <img
          className="object-cover object-center w-[85%] mb-10 rounded-xl border-0 z-0"
          alt="Placeholder Image"
          src="/Images/landing/profilepage.png"
        />

        <FaBitcoin className="absolute w-14 h-14 right-[0%] top-[-10%] text-primary opacity-40" />
        <FaEthereum className="absolute w-14 h-14 right-[10%] top-[-22%] text-primary opacity-40" />
        <AiFillAmazonCircle className="absolute w-14 h-14 right-[40%] top-[-24%] text-primary opacity-40" />
        <AiFillApple className="absolute w-14 h-14 right-[26%] top-[-22%] text-primary opacity-40" />

        <AiFillEuroCircle className="absolute w-14 h-14 left-[-0%] top-[-1%] text-primary opacity-40" />
        <AiFillDollarCircle className="absolute w-14 h-14 left-[33%] top-[-21%] text-primary opacity-40" />
        <AiFillPoundCircle className="absolute w-14 h-14 left-[23%] top-[-26%] text-primary opacity-40" />
        <HiCurrencyYen className="absolute w-14 h-14 left-[12%] top-[-22%] text-primary opacity-40" />
      </div>
    </section>
  );
}

export default Section1;

function FlippingText({ text }) {
  return (
    <h1 className="pt-0 pb-3 font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-accent">
      {text}
    </h1>
  );
}
