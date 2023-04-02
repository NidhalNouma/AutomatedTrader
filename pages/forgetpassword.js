import React from "react";

import ForgetPassword from "../Features/SignForm/Forgetpassword";
import Link from "next/link";
import { XIcon } from "@heroicons/react/solid";

import { landingUrl } from "../utils/constant";

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

function Forgetpassword() {
  return (
    <div
      className="relative text-black bg-bgt w-full h-screen flex justify-center items-center  bg-gradient-to-tr from-bgt via-bg  to-bga "
      // style={{ backgroundImage: "url(/Images/bg-landing.png" }}
    >
      <FaBitcoin className="absolute w-16 h-16 right-[20%] top-[20%] text-bga" />
      <FaEthereum className="absolute w-16 h-16 right-[30%] top-[30%] text-bga" />
      <AiFillAmazonCircle className="absolute w-16 h-16 right-[40%] top-[25%] text-bga" />
      <AiFillApple className="absolute w-16 h-16 right-[50%] top-[32%] text-bga" />

      <AiFillEuroCircle className="absolute w-16 h-16 right-[20%] bottom-[30%] text-bga" />
      <AiFillDollarCircle className="absolute w-16 h-16 right-[40%] bottom-[35%] text-bga" />
      <AiFillPoundCircle className="absolute w-16 h-16 right-[50%] bottom-[25%] text-bga" />
      <HiCurrencyYen className="absolute w-16 h-16 right-[30%] bottom-[22%] text-bga" />

      <div className="w-11/12 max-w-xs md:mr-8 flex flex-col items-center">
        <img
          className="object-cover object-center w-1/1 mb-8 inline sm:hidden"
          alt="Placeholder Image"
          src="/Logo/dark-logo.png"
        />

        <div className="w-full border-2 rounded-xl relative bg-bg">
          <div className="absolute right-4 top-4">
            <Link className="" href={landingUrl}>
              <span className="cursor-pointer">
                <XIcon className="h-6 w-6 rounded-full p-1 bg-bgai" />
              </span>
            </Link>
          </div>
          <ForgetPassword />
        </div>
      </div>
      <img
        className="object-cover object-center w-1/2 g327 hidden sm:inline z-10"
        alt="Placeholder Image"
        src="/Logo/dark-logo.png"
      ></img>
    </div>
  );
}

export default Forgetpassword;
