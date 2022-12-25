import React from "react";
import SignIn from "../Features/SignForm/SignIn";
import Link from "next/link";

import { XIcon } from "@heroicons/react/solid";
import { landingUrl } from "../utils/constant";

function Signin() {
  return (
    <div
      className="text-black bg-bg w-full h-screen flex justify-center items-center"
      // style={{ backgroundImage: "url(/Images/bg-landing.png" }}
    >
      <div className="w-11/12 max-w-xs border-2 rounded-xl relative md:mr-8">
        <div className="absolute right-4 top-4">
          <Link className="" href={landingUrl}>
            <span className="cursor-pointer">
              <XIcon className="h-6 w-6 rounded-full p-1 bg-bgai" />
            </span>
          </Link>
        </div>
        <SignIn />
      </div>
      <img
        className="object-cover object-center w-1/2 g327 hidden sm:inline"
        alt="Placeholder Image"
        src="/Logo/dark-logo.png"
      ></img>
    </div>
  );
}

export default Signin;
