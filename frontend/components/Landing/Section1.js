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

import Typewriter from "typewriter-effect";

import { HiCurrencyYen } from "react-icons/hi";

import { useTheme } from "../../contexts/ThemeContext";

function Section1() {
  const { theme } = useTheme();

  return (
    <section className="flex-col items-center justify-center max-h-[120vh] z-10">
      <div className="max-w-5xl mt-[16vh] pb-12 mx-auto px-3">
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="text-5xl md:text-8xl text-center font-bold text-title mb-2"
        >
          Automate your
          <h1 className="py-0 font-extrabold text-transparent bg-clip-text bg-gradient-to-tr from-primary to-accent">
            <Typewriter
              options={{
                strings: [
                  "Trades",
                  "Alerts",
                  "TradingView",
                  "Indicators",
                  "Strategies",
                ],
                autoStart: true,
                loop: true, // Set to true if you want the sequence to repeat
                deleteSpeed: 50,
                delay: 75, // Speed of typing (ms per character)
                pauseFor: 1000, // Time to wait before starting the next string
              }}
            />
          </h1>
        </h1>
        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="text-lg font-4 font-semibold pb-6 text-text text-center"
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
            <div className="mt-3 cursor-pointer text-light bg-gradient-to-r from-primary to-secondary/60 rounded-lg inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent px-7 text-lg backdrop-blur-xl relative">
              <div className="absolute inset-0 -z-10 w-full h-full rounded-lg  bg-gradient-to-tr from-primary to-secondary aspect-square  scale-110 blur-sm"></div>
              <div className="flex text-lg">
                <span className="flex justify-center items-center">
                  Get Started
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
        <div className="absolute top-[0%] left-[55%] rounded-full  bg-gradient-to-tr from-primary/60 to-secondary/50 w-[32%] aspect-square rotate-90 -z-10 scale-150 blur-[80px] "></div>
        <div className="absolute top-[0%] right-[55%] rounded-full  bg-gradient-to-tr from-primary/60 to-secondary/50 w-[32%] aspect-square rotate-90 -z-10 scale-150 blur-[80px]"></div>
        <img
          className="object-cover aspect-auto w-full mb-10 mt-12 2xl:mt-36 rounded-lg border-0 -z-[1] overflow-hiddeni"
          alt="Placeholder Image"
          src={
            theme === "light"
              ? "/Images/landing/profilepage.png"
              : "/Images/landing/profilepage_light.png"
          }
        />

        <FaBitcoin className="absolute w-14 h-14 right-[-5%] top-[-10%] text-primary opacity-20" />
        <FaEthereum className="absolute w-14 h-14 right-[10%] top-[-22%] text-primary opacity-20" />
        <AiFillAmazonCircle className="absolute w-14 h-14 right-[40%] top-[-24%] text-primary opacity-20" />
        <AiFillApple className="absolute w-14 h-14 right-[26%] top-[-22%] text-primary opacity-20" />

        <AiFillEuroCircle className="absolute w-14 h-14 left-[-4%] top-[-1%] text-primary opacity-20" />
        <AiFillDollarCircle className="absolute w-14 h-14 left-[33%] top-[-21%] text-primary opacity-20" />
        <AiFillPoundCircle className="absolute w-14 h-14 left-[23%] top-[-26%] text-primary opacity-20" />
        <HiCurrencyYen className="absolute w-14 h-14 left-[12%] top-[-22%] text-primary opacity-20" />
      </div>
    </section>
  );
}

export default Section1;
