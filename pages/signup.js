import React from "react";
import SignUp from "../Features/SignForm/SignUp";
import { Button } from "react-daisyui";
import Link from "next/link";

function Signup() {
  return (
    <div className="text-black bg-bgl w-full h-screen flex justify-center items-center">
      <div className="w-11/12 max-w-xs border-2 rounded-xl relative">
        <div className="absolute right-4 top-4">
          <Link className="" href="/">
            <span className="cursor-pointer px-2 py-1 rounded-full bg-bgai">
              X
            </span>
          </Link>
        </div>
        <SignUp />
      </div>
      <img
        className="object-cover object-center w-1/2 g327 hidden sm:inline"
        alt="Placeholder Image"
        src="/Logo/dark-logo.png"
      ></img>
    </div>
  );
}

export default Signup;
