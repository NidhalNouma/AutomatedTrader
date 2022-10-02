import React from "react";
import Link from "next/link";
import Image from "next/image";

import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { Dropdown, Button } from "react-daisyui";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full clearNav z-50 bg-bgl py-4">
      <div className="max-w-5xl mx-auto flex flex-wrap sm:px-5 px-0 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between p-3 md:p-1 w-full">
          <div>
            <a
              // href="/"
              className="flex text-3xl text-white font-medium mb-0 md:mb-0 w-52"
            >
              <div className="w-full h-full">
                <Image
                  src="/Logo/dark-logo.png"
                  alt=""
                  width="8w"
                  height="1h"
                  // className="w-full h-full py-auto"
                  layout="responsive"
                />
              </div>
            </a>
            <p className="text-xs text-right">Say goodbye to Manuel Trading!</p>
          </div>
          {/* <button
            className="text-white pb-4 cursor-pointer leading-none px-3 py-1 md:hidden outline-none focus:outline-none content-end ml-auto"
            type="button"
            aria-label="button"
            onClick={() => setNavbarOpen(!navbarOpen)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="feather feather-menu"
            >
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button> */}
          {/* </div> */}
          {/* <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        > */}
          {/* <div className="md:ml-auto md:mr-auto font-4 pt-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
            <a className="mr-12 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Features
            </a>
            <a className="mr-12 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Pricing
            </a>
            <a className="mr-0 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Testimonials
            </a>
          </div> */}
          <div className="sm:block hidden">
            <Link href="/signup">
              <span className="cursor-pointer mr-4 py-1 px-4 rounded-lg text-text-h bg-primary border-2 border-primary">
                Sign up
              </span>
            </Link>
            <Link href="/signin">
              <span className="cursor-pointer py-1 px-6 rounded-lg border-2 text-text-h bg-primary border-primary">
                Login
              </span>
            </Link>
          </div>

          <div className="sm:hidden block">
            <Dropdown vertical="end">
              <Button color="ghost" className="avatar" shape="circle">
                <span className="cursor-pointer text-text-h flex justify-center item-center">
                  <MenuIcon className="h-7 w-7" />
                </span>
              </Button>
              <Dropdown.Menu className="w-52 menu-compact bg-accent">
                <li>
                  <Link className="justify-between " href="/signup">
                    <span className="text-text-h text-lg font-bold">
                      Sign up
                    </span>
                  </Link>
                </li>
                <li>
                  <Link className="justify-between text-text-h" href="/signin">
                    <span className="text-text-h text-lg font-bold">Login</span>
                  </Link>
                </li>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>
      </div>
    </header>
  );
}
