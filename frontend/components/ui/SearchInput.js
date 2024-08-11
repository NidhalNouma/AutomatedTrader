import { Fragment, useRef, useEffect, useState } from "react";
import { Input, Swap } from "react-daisyui";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { SearchByDisplayName } from "../../hooks/UserHook";
import { H5 } from "../H";
import Link from "next/link";

import { TopModal } from "./Modal";

import { CloseButton } from "./Button";

export function SearchModal({ children, placeholder }) {
  const { users, displayName, setDisplayName } = SearchByDisplayName();
  const inputRef = useRef(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      inputRef.current.focus();
    }
  }, [open]);

  return (
    <Fragment>
      <TopModal open={open} backclose={() => setOpen(false)}>
        <div className="pb-12 px-4 ">
          <div className="flex items-center border-b-2 border-text/10 px-2 py-0 w-full">
            <SearchIcon className="h-5 w-5 text-text/60" />
            <Input
              className="px-2 pb-0 grow text-text bg-transparent border-none placeholder:text-text/60 placeholder:opacity-100 focus:outline-0"
              // bordered
              type="text"
              placeholder={placeholder}
              value={displayName}
              // onChange={(e) => setDisplayName(e.target.value)}
              onChange={(e) => setDisplayName("")}
              autoFocus={true}
              ref={inputRef}
            />

            <CloseButton onClick={() => setOpen(false)} />
          </div>
          {children}
        </div>
      </TopModal>

      <div className="relative">
        <div
          onClick={() => setOpen(true)}
          className="hover:bg-text/10 flex items-center p-2 md:px-4 md:py-2 rounded-full md:rounded-lg outline outline-offset-2 outline-dashed outline-text/20 cursor-pointer"
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

const Results = ({ users }) => {
  return (
    <Fragment>
      {users?.length > 0 && (
        <div className=" min-h-6 p-2 mt-3 rounded-xl">
          {users.map((user) => (
            <Link
              key={user.id}
              href={{
                pathname: "/profile/" + user.id,
                // query: { linkUser: JSON.stringify(user) },
              }}
            >
              <div className=" py-2 px-2 mb-2 rounded-2xl hover:bg-bga flex justify-start items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full">
                  <img
                    className="rounded-full  w-full h-full "
                    src={user?.photoURL || "/Images/profile.png"}
                  />
                </div>
                <div className="ml-3">
                  <H5>{user.displayName}</H5>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </Fragment>
  );
};
