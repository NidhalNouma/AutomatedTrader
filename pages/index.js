import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import Header from "../Features/Landing/Header";
import Main from "../Features/Landing/Main";
import Section1 from "../Features/Landing/Section1";
import Section2 from "../Features/Landing/Section2";
import Section3 from "../Features/Landing/Section3";
import PricingSection from "../Features/Landing/PricingSection";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
// import Footer from "../Features/Landing/Footer";

import Aos from "aos";
import "aos/dist/aos.css";

export default function Home() {
  useEffect(function () {
    Aos.init();
  }, []);

  return (
    <div
      className="overflow-hidden text-black w-full min-h-screen bg-bgt px-6 sm:px-2"
      // style={{
      //   backgroundImage:
      //     "radial-gradient( farthest-corner at -150px -150px, rgb(10, 11, 10) 4%, black  35%);",
      // }}
    >
      <Header />
      <Section1 />
      <Section3 />
      <Section2 />
      <PricingSection />

      <div className="flex justify-center items-center mt-0 h-screen">
        <div className="text-center relative mx-auto">
          <div className="flex justify-center">
            <h5 className="bg-gray-700 px-5 mt-4 rounded-full text-lg font-bold text-text-h">
              Beta is now open
            </h5>
          </div>
          <div className="container flex flex-col items-center justify-center mx-auto">
            <img
              className="object-cover object-center w-4/6 b-8 m-4"
              alt="Placeholder Image"
              src="/Logo/dark-logo.png"
            ></img>
          </div>
          <h1 className=" text-primary text-2xl text-center font-4 lh-6 ld-04 font-bold text-white">
            TRADINGVIEW TO ANY BROKER, ANY INDICATOR, ANY ALERT, INSTANTLY ...
          </h1>

          <div className="text-center mt-16 ">
            <Link href="/signup">
              <div className="cursor-pointer !bg-primary text-text-h border-4 border-primary rounded-full inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline">
                <div className="flex text-lg">
                  <span className="flex justify-center items-center">
                    Join Today
                    <ArrowSmRightIcon className="ml-[0.5rem] h-6 w-7" />
                  </span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
