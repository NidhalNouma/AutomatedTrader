import React from "react";
import Link from "next/link";
import Image from "next/image";

export default function Header() {
  const [navbarOpen, setNavbarOpen] = React.useState(false);

  return (
    <header className="fixed top-0 w-full clearNav z-50 bg-bgl">
      <div className="max-w-5xl mx-auto flex flex-wrap px-5 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between p-3 md:p-1">
          <a
            // href="/"
            className="flex text-3xl text-white font-medium mb-4 md:mb-0 w-52 p-5"
          >
            <img
              src="/Logo/dark-logo.png"
              alt=""
              width="2x"
              height="1x"
              className="w-full h-full"
              layout="fixed"
            />
          </a>
          <button
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
          </button>
        </div>
        <div
          className={
            "md:flex flex-grow items-center" +
            (navbarOpen ? " flex" : " hidden")
          }
        >
          <div className="md:ml-auto md:mr-auto font-4 pt-1 flex flex-wrap items-center md:text-base text-1xl md:justify-center justify-items-start">
            <a className="mr-12 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Features
            </a>
            <a className="mr-12 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Pricing
            </a>
            <a className="mr-0 pr-2 cursor-pointer text-gray-300 hover:text-white font-semibold tr04">
              Testimonials
            </a>
          </div>
          <Link href="/signin">
            <span className="cursor-pointer mr-4 py-1 px-4 rounded-full text-text-h bg-primaryi border-2 border-primaryi">
              Sign in
            </span>
          </Link>
          <Link href="/signup">
            <span className="cursor-pointer py-1 px-4 rounded-full border-2 text-text-h border-primaryi">
              Sign up
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
}
