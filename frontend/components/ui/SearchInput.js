import { Fragment, useRef, useEffect, useState } from "react";
import { Input, Swap } from "react-daisyui";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { H5 } from "../H";
import Link from "next/link";

import { TopModal } from "./Modal";

import { CloseButton } from "./Button";

export function SearchModal({ children, placeholder, value, setValue, close }) {
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [close]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (
        (event.ctrlKey && event.key === "k") || // Ctrl + K on Windows/Linux
        (event.metaKey && event.key === "k") // Cmd + K on macOS
      ) {
        event.preventDefault();
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <Fragment>
      <TopModal open={open} backclose={() => setOpen(false)}>
        <div className="pb-4 ">
          <div className="flex items-center border-b-2 border-text/10 py-0 w-full sticky top-0 bg-bg/60 backdrop-blur-2xl rounded-t-lg px-6 ">
            <SearchIcon className="h-5 w-5 text-text/60" />
            <Input
              className="px-2 pb-0 grow text-text bg-transparent border-none placeholder:text-text/60 placeholder:opacity-100 focus:outline-0"
              // bordered
              type="text"
              placeholder={placeholder}
              value={value}
              // onChange={(e) => setDisplayName(e.target.value)}
              onChange={(e) => {
                setValue(e.target.value);
              }}
              autoFocus={true}
              ref={inputRef}
            />

            <CloseButton onClick={() => setOpen(false)} />
          </div>

          <div className="mx-4">{children}</div>
        </div>
      </TopModal>

      <div className="relative">
        <div
          onClick={() => setOpen(true)}
          className="hover:bg-text/10 flex items-center p-2 md:px-4 md:py-2 rounded-full md:rounded-lg outline outline-1 outline-offset-2 outline-dashed outline-text/20 cursor-pointer"
        >
          <SearchIcon className="h-5 aspect-square text-text/60" />
          <span className="ml-1 text-sm truncate text-text/60 hidden md:block">
            {placeholder}
          </span>
        </div>
      </div>
    </Fragment>
  );
}
