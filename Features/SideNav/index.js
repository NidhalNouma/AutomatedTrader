import Image from "next/image";
import { Collapse, Toggle } from "react-daisyui";

import { H5 } from "../../Components/H";
import Linksn from "./Linksn";
import { HomeIcon, LightBulbIcon } from "@heroicons/react/outline";
import {
  CogIcon,
  InformationCircleIcon,
  PlusIcon,
  MoonIcon,
  UserGroupIcon,
} from "@heroicons/react/solid";

function index({ cpath }) {
  return (
    <div className="sidenav md:flex hidden">
      <Image
        src="/Logo/dark-logo.png"
        alt=""
        width="3w"
        height="1h"
        className=""
        layout="responsive"
      />
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

      <Collapse
        className="rounded-box text-text-p px-4"
        icon="arrow"
        checkbox={true}
      >
        <Collapse.Title className="flex items-center">
          <span
            className="mr-2 bg-bgai p-1 rounded-md"
            onClick={() => {
              return;
            }}
          >
            <PlusIcon className="h-4 w-4 text-text-h" />
          </span>
          <span className="text-base font-semibold">Apps</span>
        </Collapse.Title>
        <Collapse.Content>List of apps will be here</Collapse.Content>
      </Collapse>

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
    </div>
  );
}

export default index;
