import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

import { MenuIcon, XIcon, ArrowSmRightIcon } from "@heroicons/react/outline";
import { Dropdown, Button } from "react-daisyui";
import { BsYoutube, BsDiscord } from "react-icons/bs";

export default function Header() {
  const [show, setShow] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > window.innerHeight / 1.2) {
        // if scroll down hide the navbar
        setShow(true);
      } else {
        setShow(false);
        // if scroll up show the navbar
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <header
      className={`${
        show ? "fixed" : "hidden"
      }  top-0 w-full clearNav z-50 bg-bgt pt-6 pb-4`}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap sm:px-5 px-0 flex-col md:flex-row">
        <div className="flex flex-row items-center justify-between p-3 md:p-1 w-full">
          <div className="h-full w-3/12">
            <Image
              src="/Logo/dark-logo.png"
              alt=""
              width="16w"
              height="2h"
              // className="w-full h-full py-auto"
              layout="responsive"
            />
          </div>
          <div className="sm:flex hidden flex-1 items-center justify-end">
            <a
              href="https://www.youtube.com/channel/UC6fpw9ACFKDfyqK0aNSAW-Q"
              target="_blank"
              rel="noreferrer"
              className="ml-auto mr-10"
            >
              <span className="text-text-h">
                <BsYoutube className="h-6 w-6" />
              </span>
            </a>
            <a
              href="https://discord.com/invite/RU5t7ErGEE"
              target="_blank"
              rel="noreferrer"
              className="mr-10"
            >
              <span className="text-text-h">
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
              <span className="flex items-center cursor-pointer py-1 px-4 font-semibold rounded-full text-text-h bg-primary border-2 border-primary">
                Sign up
                {/* <ArrowSmRightIcon className="ml-[0.1rem] h-5 w-5" /> */}
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
