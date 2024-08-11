import { useState, Fragment } from "react";
import Image from "next/image";

import Linksn from "./Linksn";
import {
  HomeIcon,
  LightBulbIcon,
  UserCircleIcon,
  UserIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import {
  CogIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";
import { BiSupport, BiNews } from "react-icons/bi";

import { GetFullUserContext, GetUserContext } from "../../hooks/UserHook";
import Link from "next/link";

function Index({ cpath, fixed = true }) {
  const [openApps, setOpenApps] = useState(true);
  // const { fullUser } = GetFullUserContext();
  const { user } = GetUserContext();

  return (
    <Content fixed={fixed}>
      {/* {fixed && ( */}
      <div className="py-4 px-4 m-2 sticky top-3 left-0 ">
        <div className="relative">
          {/* <Image
            src="/Logo/dark-logo.png"
            alt=""
            width="15w"
            height="2h"
            className=""
            layout="responsive"
          /> */}
          <img
            src="/Logo/dark-logo.png"
            alt=""
            className="w-full aspect-auto"
            layout="responsive"
          />
          <span className="truncate absolute top-full right-0 text-xs font-bold text-text-h px-1 rounded-full">
            Beta | Under development
          </span>
        </div>
      </div>
      {/* )} */}
      {/* <div className="pl-4">
        <H5>YOUR WEBHOOKS</H5>
        <div className="h-24 bg-bgai my-2 mr-4 rounded-xl"></div>
      </div> */}
      {user ? (
        <div className="p-4 pt-0">
          <div className="">
            <Linksn
              href="/home"
              icon={<HomeIcon className="h-5 w-5" />}
              isActive={cpath === "home"}
            >
              <span className="capitalize ml-2 text-base">Home</span>
            </Linksn>
            <Linksn
              href="/webhook"
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.5 16.875h3.375m0 0h3.375m-3.375 0V13.5m0 3.375v3.375M6 10.5h2.25a2.25 2.25 0 002.25-2.25V6a2.25 2.25 0 00-2.25-2.25H6A2.25 2.25 0 003.75 6v2.25A2.25 2.25 0 006 10.5zm0 9.75h2.25A2.25 2.25 0 0010.5 18v-2.25a2.25 2.25 0 00-2.25-2.25H6a2.25 2.25 0 00-2.25 2.25V18A2.25 2.25 0 006 20.25zm9.75-9.75H18a2.25 2.25 0 002.25-2.25V6A2.25 2.25 0 0018 3.75h-2.25A2.25 2.25 0 0013.5 6v2.25a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              }
              isActive={cpath === "webhook"}
            >
              <span className="capitalize ml-2 text-base">Webhooks</span>
            </Linksn>
            <Linksn
              href="/trades"
              isActive={cpath === "trades"}
              icon={<PaperAirplaneIcon className="h-5 w-5 rotate-[60deg]" />}
            >
              <span className="capitalize ml-2 text-base">Trades</span>
            </Linksn>
            <Linksn
              href="/alerts"
              isActive={cpath === "alerts"}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                  />
                </svg>
              }
            >
              <span className="capitalize ml-2 text-base">Alerts</span>
            </Linksn>
            {/* <Linksn
              href="/news"
              isActive={cpath === "news"}
              icon={
                <BiNews className="h-5 w-5" />
              }
            >
              <span className="capitalize ml-2 text-base">News</span>
            </Linksn> */}
          </div>

          <div className="my-1">
            <div className="border-t-2 border-bga"></div>
          </div>

          <div className="text-text-p pl-4 my-4">
            <div
              className="flex items-center mr-3 cursor-pointer my-2"
              onClick={() => setOpenApps(!openApps)}
            >
              <span
                className="bg-bgaii p-1 rounded-md mr-2"
                onClick={() => {
                  return;
                }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-5 h-5 text-text-p"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 6.878V6a2.25 2.25 0 012.25-2.25h7.5A2.25 2.25 0 0118 6v.878m-12 0c.235-.083.487-.128.75-.128h10.5c.263 0 .515.045.75.128m-12 0A2.25 2.25 0 004.5 9v.878m13.5-3A2.25 2.25 0 0119.5 9v.878m0 0a2.246 2.246 0 00-.75-.128H5.25c-.263 0-.515.045-.75.128m15 0A2.25 2.25 0 0121 12v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6c0-.98.626-1.813 1.5-2.122"
                  />
                </svg>
              </span>
              <span className="text-base font-semibold ">Apps</span>
              {!openApps ? (
                <ChevronDownIcon className="h-4 w-4 ml-auto" />
              ) : (
                <ChevronUpIcon className="h-4 w-4 ml-auto" />
              )}
            </div>
            {openApps && (
              <div className="pr-0 pb-0">
                {/* <Linksn
                  href="/apps/mt4"
                  isActive={cpath === "mt4"}
                  className="mt-2"
                  icon={
                    <div className="w-5 h-5 ml-1">
                      <Image
                        className=""
                        src="/Images/mt4-icon.png"
                        alt=""
                        width="1w"
                        height="1h"
                        layout="responsive"
                      />
                    </div>
                  }
                >
                  <span className="capitalize ml-2 text-base">MT4</span>
                </Linksn>
                <Linksn
                  href="/apps/mt5"
                  isActive={cpath === "mt5"}
                  className="mt-2"
                  icon={
                    <div className="w-5 h-5 ml-1">
                      <Image
                        className=""
                        src="/Images/mt5-icon.png"
                        alt=""
                        width="1w"
                        height="1h"
                        layout="responsive"
                      />
                    </div>
                  }
                >
                  <span className="capitalize ml-2 text-base">MT5</span>
                </Linksn> */}
                <Linksn
                  href="/apps/metatrader"
                  isActive={cpath === "metatrader"}
                  className="mt-2"
                  icon={
                    <div className="w-5 h-5 ml-1">
                      {/* <Image
                        className=""
                        src="/Images/mt5-icon.png"
                        alt=""
                        width="1w"
                        height="1h"
                        layout="responsive"
                      /> */}
                      <img
                        className="h-5 w-5"
                        src="/Images/mt5-icon.png"
                        alt=""
                        layout="responsive"
                      />
                    </div>
                  }
                >
                  <span className="capitalize ml-2 text-base">Metatrader</span>
                </Linksn>
                <Linksn
                  href="/apps/binance"
                  isActive={cpath === "binance"}
                  className="mt-2"
                  icon={
                    <div className="w-5 h-5 ml-1">
                      {/* <Image
                        className=""
                        src="/Images/Binance_Logo.png"
                        alt=""
                        width="1w"
                        height="1h"
                        layout="responsive"
                      /> */}
                      <img
                        className="h-5 w-5"
                        src="/Images/Binance_Logo.png"
                        alt=""
                        layout="responsive"
                      />
                    </div>
                  }
                >
                  <span className="capitalize ml-2 text-base">Binance</span>
                </Linksn>
                <Linksn
                  href="/apps/telegram"
                  isActive={cpath === "telegram"}
                  // className="my-0"
                  icon={
                    <div className="w-5 h-5 ml-1">
                      {/* <Image
                        className=""
                        src="/Images/telegram-icon.png"
                        alt=""
                        width="1w"
                        height="1h"
                        layout="responsive"
                      /> */}
                      <img
                        className="h-5 w-5"
                        src="/Images/telegram-icon.png"
                        alt=""
                        layout="responsive"
                      />
                    </div>
                  }
                >
                  <span className="capitalize ml-2 text-base">Telegram</span>
                </Linksn>
              </div>
            )}
          </div>

          <div className="my-1 /mt-auto">
            <div className="border-t-2 border-bga"></div>
          </div>

          <div className="">
            {/* <Linksn
              href="/profile"
              icon={<UserIcon className="h-5 w-5" />}
              isActive={cpath === "profile"}
            >
              <span className="capitalize ml-2 text-base">Profile</span>
            </Linksn> */}

            <Linksn
              icon={<UserGroupIcon className="h-5 w-5" />}
              href="/membership"
              isActive={cpath === "membership"}
            >
              <span className="capitalize ml-2 text-base">membership</span>
            </Linksn>

            <Linksn
              href="/settings"
              isActive={cpath === "settings"}
              icon={<CogIcon className="h-5 w-5" />}
            >
              <span className="capitalize ml-2 text-base">Settings</span>
            </Linksn>

            <Linksn
              icon={<InformationCircleIcon className="h-5 w-5" />}
              href="/docs/aboutus"
              isActive={cpath === "help"}
            >
              <span className="capitalize ml-2 text-base">Help & FAQ</span>
            </Linksn>
            <button
              onClick={() => {
                const theme =
                  document.documentElement.getAttribute("data-theme");
                // console.log(theme);
                if (document.documentElement.classList.contains("dark")) {
                  document.documentElement.classList.remove("dark");
                  localStorage.setItem("color-theme", "light");
                } else {
                  document.documentElement.classList.add("dark");
                  localStorage.setItem("color-theme", "dark");
                }
              }}
            >
              <span className="capitalize ml-2 text-base">Dark mode</span>
            </button>
            {/* <Linksn
              icon={<BiSupport className="h-5 w-5" />}
              href="/support"
              isActive={cpath === "support"}
            >
              <span className="capitalize ml-2 text-base">Support</span>
            </Linksn> */}

            {/* <div className="mx-4 flex items-center my-4">
          <MoonIcon className="h-5 w-5 text-text-p" />
          <span className="capitalize ml-2 text-base font-semibold text-text-p">
            Dark mode
          </span>
          <Toggle
            size="sm"
            className="ml-auto bg-text-h text-text-p border-text-p"
          />
        </div> */}
          </div>
        </div>
      ) : (
        <Fragment>
          <div className=" w-full flex items-center justify-center h-full ">
            <p className="text-sm">
              Click{" "}
              <span className="font-bold underline">
                <Link href="/signin">here</Link>
              </span>{" "}
              to sign in.
            </p>
          </div>
        </Fragment>
      )}
    </Content>
  );
}

export default Index;

function Content({ children, fixed }) {
  return (
    <Fragment>
      {fixed ? (
        <div className="sidenav md:flex hidden bg-bgt z-50 sticky top-0 left-0 overflow-y-scroll hideScrollbar">
          {children}
        </div>
      ) : (
        <div className="">{children}</div>
      )}
    </Fragment>
  );
}
