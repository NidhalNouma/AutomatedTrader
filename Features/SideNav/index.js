import { useState, Fragment } from "react";
import Image from "next/image";
import { Collapse, Toggle } from "react-daisyui";

import { H5 } from "../../Components/H";
import Linksn from "./Linksn";
import { HomeIcon, LightBulbIcon } from "@heroicons/react/outline";
import {
  CogIcon,
  InformationCircleIcon,
  ChevronUpIcon,
  ChevronDownIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

function Index({ cpath, fixed = true }) {
  const [openApps, setOpenApps] = useState(true);

  return (
    <Content fixed={fixed}>
      {/* {fixed && ( */}
      <div className="p-5 m-3">
        <Image
          src="/Logo/dark-logo.png"
          alt=""
          width="6w"
          height="1h"
          className=""
          layout="responsive"
        />
      </div>
      {/* )} */}
      {/* <div className="pl-4">
        <H5>YOUR WEBHOOKS</H5>
        <div className="h-24 bg-bgai my-2 mr-4 rounded-xl"></div>
      </div> */}
      <div className="pl-4">
        <Linksn
          href="/profile"
          icon={<HomeIcon className="h-5 w-5" />}
          isActive={cpath === "profile"}
        >
          <span className="capitalize ml-2 text-base">Profile</span>
        </Linksn>
        <Linksn
          href="/actions"
          isActive={cpath === "actions"}
          icon={<LightBulbIcon className="h-5 w-5" />}
        >
          <span className="capitalize ml-2 text-base">Actions</span>
        </Linksn>
      </div>

      <div className="my-1 px-4">
        <div className="border-t-2 border-bgai"></div>
      </div>

      <div className="text-text-p pl-4 my-4">
        <div
          className="flex items-center pl-4 mr-3 cursor-pointer"
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
          {openApps ? (
            <ChevronDownIcon className="h-4 w-4 ml-auto" />
          ) : (
            <ChevronUpIcon className="h-4 w-4 ml-auto" />
          )}
        </div>
        {openApps && (
          <div className="pr-0 pb-0">
            <Linksn
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
              href="/apps/telegram"
              isActive={cpath === "telegram"}
              // className="my-0"
              icon={
                <div className="w-5 h-5 ml-1">
                  <Image
                    className=""
                    src="/Images/telegram-icon.png"
                    alt=""
                    width="1w"
                    height="1h"
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

      <div className="my-1 px-4 /mt-auto">
        <div className="border-t-2 border-bgai"></div>
      </div>

      <div className="pl-4">
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
          href="/help"
          isActive={cpath === "help"}
        >
          <span className="capitalize ml-2 text-base">Help & FAQ</span>
        </Linksn>

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
    </Content>
  );
}

export default Index;

function Content({ children, fixed }) {
  return (
    <Fragment>
      {fixed ? (
        <div className="sidenav md:flex hidden bg-accent z-50 sticky top-0 left-0">
          {children}
        </div>
      ) : (
        <div className="">{children}</div>
      )}
    </Fragment>
  );
}
