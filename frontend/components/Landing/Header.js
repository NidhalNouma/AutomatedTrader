import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { useTheme } from "../../contexts/ThemeContext";

import { MenuIcon, XIcon, ArrowSmRightIcon } from "@heroicons/react/outline";
import { Dropdown, Button } from "react-daisyui";
import { BsYoutube, BsDiscord } from "react-icons/bs";

export default function Header({ className }) {
  const { theme, toggleTheme } = useTheme();
  return (
    <header
      className={`sticky top-0 w-full clearNav z-50 bg-bg/5 py-2.5 md:py-4 backdrop-blur-xl mx-auto max-w-7xl sm:px-5 px-4 ${className}`}
    >
      <div className=" mx-auto w-full flex flex-wrap items-center md:flex-row">
        <div className="flex flex-row items-center justify-between p-0 md:p-1 w-full">
          <Link href="/">
            <div className="h-full w-44 cursor-pointer opacity-80 hover:opacity-100 transition-all">
              <Image
                src={
                  theme === "light"
                    ? "/Logo/dark-logo.png"
                    : "/Logo/light-logo.png"
                }
                alt=""
                width="8w"
                height="1h"
                // className="w-full h-full py-auto"
                layout="responsive"
              />
            </div>
          </Link>
          <div className="sm:flex hidden flex-1 items-center justify-end">
            <div className="ml-auto mr-10">
              <DarkModeButton />
            </div>
            <a
              href="https://www.youtube.com/channel/UC6fpw9ACFKDfyqK0aNSAW-Q"
              target="_blank"
              rel="noreferrer"
              className=" mr-10"
            >
              <span className="text-text/80">
                <BsYoutube className="h-6 w-6" />
              </span>
            </a>
            <a
              href="https://discord.com/invite/RU5t7ErGEE"
              target="_blank"
              rel="noreferrer"
              className="mr-10"
            >
              <span className="text-text/80">
                <BsDiscord className="h-6 w-6" />
              </span>
            </a>
            <Link href="/signin">
              <span className="flex items-center cursor-pointer mr-5 py-1 px-0 rounded-lg font-semibold border-0 text-primary bg-transparent border-primary">
                Sign in
                <ArrowSmRightIcon className="ml-[0.1rem] h-5 w-5" />
              </span>
            </Link>
            <Link href="/signup">
              <span className="flex items-center cursor-pointer py-0.5 px-4 font-semibold rounded-lg text-light bg-primary border-2 border-primary">
                Sign up
              </span>
            </Link>
          </div>

          <div className="sm:hidden block">
            <Dropdown vertical="end">
              <Button color="ghost" className="avatar" shape="circle">
                <span className="cursor-pointer text-text/60 flex justify-center item-center">
                  <MenuIcon className="h-7 w-7" />
                </span>
              </Button>
              <Dropdown.Menu className="w-52 menu-compact bg-bg/30 backdrop-blur-xl">
                <li>
                  <Link className="justify-between " href="/signup">
                    <span className="text-text text-lg font-bold">Sign up</span>
                  </Link>
                </li>
                <li>
                  <Link className="justify-between text-light" href="/signin">
                    <span className="text-text text-lg font-bold">Login</span>
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

function DarkModeButton({}) {
  const { theme, toggleTheme } = useTheme();
  return (
    <div classNamee="flex flex-col justify-center">
      <input
        type="checkbox"
        name="light-switch"
        className="light-switch sr-only"
      />
      <label
        className="relative cursor-pointer p-0"
        htmlFor="light-switch"
        onClick={toggleTheme}
      >
        {theme === "light" ? (
          <svg className="h-4 aspect-square" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-text/80"
              d="M7 0h2v2H7zM12.88 1.637l1.414 1.415-1.415 1.413-1.413-1.414zM14 7h2v2h-2zM12.95 14.433l-1.414-1.413 1.413-1.415 1.415 1.414zM7 14h2v2H7zM2.98 14.364l-1.413-1.415 1.414-1.414 1.414 1.415zM0 7h2v2H0zM3.05 1.706 4.463 3.12 3.05 4.535 1.636 3.12z"
            />
            <path
              className="fill-text/80"
              d="M8 4C5.8 4 4 5.8 4 8s1.8 4 4 4 4-1.8 4-4-1.8-4-4-4Z"
            />
          </svg>
        ) : (
          <svg className="h-4 aspect-square" xmlns="http://www.w3.org/2000/svg">
            <path
              className="fill-text/80"
              d="M6.2 1C3.2 1.8 1 4.6 1 7.9 1 11.8 4.2 15 8.1 15c3.3 0 6-2.2 6.9-5.2C9.7 11.2 4.8 6.3 6.2 1Z"
            />
            <path
              className="fill-text/80"
              d="M12.5 5a.625.625 0 0 1-.625-.625 1.252 1.252 0 0 0-1.25-1.25.625.625 0 1 1 0-1.25 1.252 1.252 0 0 0 1.25-1.25.625.625 0 1 1 1.25 0c.001.69.56 1.249 1.25 1.25a.625.625 0 1 1 0 1.25c-.69.001-1.249.56-1.25 1.25A.625.625 0 0 1 12.5 5Z"
            />
          </svg>
        )}

        <span className="sr-only">Switch to light / dark version</span>
      </label>
    </div>
  );
}
