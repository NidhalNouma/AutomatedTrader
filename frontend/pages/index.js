import { useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { withAuth } from "../contexts/UserContext";
import Header from "../components/Landing/Header";
// import Main from "../Features/Landing/Main";
import HeroSection from "../components/Landing/HeroSection";
import LiveProfitsSection from "../components/Landing/LiveProfitsSection";
import WebhookStatsSection from "../components/Landing/WebhookStatsSection";
import LeaderboardSection from "../components/Landing/LeaderboardSection";
import TestimonialsSection from "../components/Landing/TestimonialsSection";
import FeaturesSection from "../components/Landing/FeaturesSection";
import PricingSectionB from "../components/Landing/PricingSectionB";
import FaqSection from "../components/Landing/FaqSection";
import FinalCTA from "../components/Landing/FinalCTA";

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

const liveStats = [
  {
    id: 1,
    trader: "Chrisp Trading",
    avatar:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=80&h=80",
    profit: 1250.5,
    symbol: "EURUSD",
    type: "buy",
    time: "2 minutes ago",
  },
  {
    id: 2,
    trader: "Pro Signals",
    avatar:
      "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=80&h=80",
    profit: 3450.75,
    symbol: "XAUUSD",
    type: "sell",
    time: "5 minutes ago",
  },
  {
    id: 3,
    trader: "Master Trader",
    avatar:
      "https://images.unsplash.com/photo-1566492031773-4f4e44671857?auto=format&fit=crop&w=80&h=80",
    profit: 890.25,
    symbol: "BTCUSD",
    type: "buy",
    time: "8 minutes ago",
  },
];

const testimonials = [
  {
    id: 1,
    name: "Michael Chen",
    role: "Professional Trader",
    image:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&h=150",
    content:
      "AutomatedTrader transformed my trading strategy. The webhook integration is flawless, and I've seen a 45% increase in my win rate since using it.",
    stats: {
      profit: "+62.5%",
      trades: "1,234",
      period: "3 months",
    },
  },
  {
    id: 2,
    name: "Sarah Williams",
    role: "Crypto Analyst",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150",
    content:
      "The risk management features are outstanding. I can trade with confidence knowing my positions are protected by advanced automation.",
    stats: {
      profit: "+89.3%",
      trades: "2,156",
      period: "6 months",
    },
  },
  {
    id: 3,
    name: "David Park",
    role: "Fund Manager",
    image:
      "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=150&h=150",
    content:
      "As a fund manager, reliability is crucial. AutomatedTrader's 99.9% uptime and lightning-fast execution give me peace of mind.",
    stats: {
      profit: "+127.8%",
      trades: "5,678",
      period: "12 months",
    },
  },
];

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
      <HeroSection />
      <LiveProfitsSection stats={liveStats} />
      <WebhookStatsSection />
      <LeaderboardSection />
      <TestimonialsSection testimonials={testimonials} />
      <FeaturesSection />
      <PricingSectionB />
      <FaqSection />
      <FinalCTA />
      {/* <Section1 />
      <Section3 />
      <Section4 />
      <Section5 />
      <Section6 />
      <PricingSection />
      <div className="flex justify-center items-center mt-0 h-screen">
        <div className="text-center relative mx-auto">
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
      </div> */}
    </div>
  );
}

export default withAuth(Index, true);
