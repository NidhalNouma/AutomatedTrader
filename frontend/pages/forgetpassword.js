import { Fragment } from "react";
import Link from "next/link";
import { withAuth } from "../contexts/UserContext";

import { CloseButton } from "../components/ui/Button";
import { SubTitle } from "../components/ui/Text";

import { ForgetPassword } from "../components/Forms/Auth";

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

import { useTheme } from "../contexts/ThemeContext";

function Forgetpassword() {
  const { theme } = useTheme();

  return (
    <div
      className="relative text-black bg-bgt w-full h-screen flex justify-center items-center  bg-gradient-to-tr from-bgt via-bg  to-bga "
      // style={{ backgroundImage: "url(/Images/bg-landing.png" }}
    >
      <FaBitcoin className="absolute w-16 h-16 right-[20%] top-[20%] text-accent/10" />
      <FaEthereum className="absolute w-16 h-16 right-[30%] top-[30%] text-accent/10" />
      <AiFillAmazonCircle className="absolute w-16 h-16 right-[40%] top-[25%] text-accent/10" />
      <AiFillApple className="absolute w-16 h-16 right-[50%] top-[32%] text-accent/10" />

      <AiFillEuroCircle className="absolute w-16 h-16 right-[20%] bottom-[30%] text-accent/10" />
      <AiFillDollarCircle className="absolute w-16 h-16 right-[40%] bottom-[35%] text-accent/10" />
      <AiFillPoundCircle className="absolute w-16 h-16 right-[50%] bottom-[25%] text-accent/10" />
      <HiCurrencyYen className="absolute w-16 h-16 right-[30%] bottom-[22%] text-accent/10" />

      <div className="w-11/12 max-w-xs md:mr-8 flex flex-col items-center">
        <img
          className="object-cover object-center w-1/1 mb-8 inline sm:hidden opacity-50"
          alt="Placeholder Image"
          src={
            theme === "light" ? "/Logo/dark-logo.png" : "/Logo/light-logo.png"
          }
        />

        <div className="w-full border border-text/[0.05] rounded-xl relative bg-bg/20 backdrop-blur-xl">
          <section className="px-4 py-5 imax-w-sm w-full">
            <div className="w-full flex items-center justify-between">
              <SubTitle className="">Forget password?</SubTitle>

              <Link className="" href={landingUrl}>
                <CloseButton />
              </Link>
            </div>

            <div className="mt-6 px-0">
              <ForgetPassword />

              <div className="w-full mt-4">
                <span className="text-xs text-text/60">Back to</span>
                <Link href="/signin">
                  <span className="text-sm text-primary ml-1 cursor-pointer">
                    Sign in
                  </span>
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
      <img
        className="object-cover object-center w-1/2 g327 hidden sm:inline z-10 opacity-50"
        alt="Placeholder Image"
        src={theme === "light" ? "/Logo/dark-logo.png" : "/Logo/light-logo.png"}
      ></img>
    </div>
  );
}

export default withAuth(Forgetpassword, true);
