import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { withAuth } from "../contexts/UserContext";
import Header from "../components/Landing/Header";
// import Main from "../Features/Landing/Main";
import Section1 from "../components/Landing/Section1";
import Section2 from "../components/Landing/Section2";
import Section3 from "../components/Landing/Section3";
import Section4 from "../components/Landing/Section4";
import Section5 from "../components/Landing/Section5";
import Section6 from "../components/Landing/Section6";
import PricingSection from "../components/Landing/PricingSection";
import { ArrowSmRightIcon } from "@heroicons/react/outline";
// import Footer from "../Features/Landing/Footer";

import ComingSection from "../components/Landing/ComingBack";

import { useTheme } from "../contexts/ThemeContext";

import Aos from "aos";
import "aos/dist/aos.css";

function Index() {
  const { theme } = useTheme();

  useEffect(function () {
    Aos.init();
  }, []);

  return (
    <div
      className="text-black w-full min-h-screen bg-gradient-to-b from-bg/10 to-bgt/10"
      // style={{
      //   backgroundImage:
      //     "radial-gradient( farthest-corner at -150px -150px, rgb(10, 11, 10) 4%, black  35%);",
      // }}
    >
      <Header />
      <Section1 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <PricingSection />
      <div className="flex justify-center items-center mt-0 h-screen">
        <div className="text-center relative mx-auto">
          {/* <div className="flex justify-center">
            <h5 className="bg-gray-700 px-5 mt-4 rounded-full text-lg font-bold text-text-h">
              Beta is now open
            </h5>
          </div> */}
          <div className="container flex flex-col items-center justify-center mx-auto">
            <img
              className="object-cover object-center w-4/6 b-8 m-4"
              alt="Placeholder Image"
              src={
                theme === "light"
                  ? "/Logo/dark-logo.png"
                  : "/Logo/light-logo.png"
              }
            ></img>
          </div>
          <h1 className=" text-2xl text-center font-4 lh-6 ld-04 font-bold text-title">
            TRADINGVIEW TO ANY BROKER, ANY INDICATOR, ANY ALERT, INSTANTLY ...
          </h1>

          <div className="text-center mt-16 ">
            <Link href="/signup">
              <div className="mt-3 cursor-pointer text-light bg-gradient-to-r from-primary to-secondary/60 rounded-lg inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent px-7 text-lg backdrop-blur-xl relative">
                <div className="absolute inset-0 -z-10 w-full h-full rounded-lg  bg-gradient-to-tr from-primary to-secondary aspect-square  scale-110 blur-sm"></div>
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
      </div>{" "}
      *
    </div>
  );
}

export default withAuth(Index, true);
