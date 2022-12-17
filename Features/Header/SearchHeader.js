import { Fragment, useRef, useEffect, useState } from "react";
import { Input, Swap } from "react-daisyui";
import { MenuIcon, XIcon, SearchIcon } from "@heroicons/react/outline";
import { SearchByDisplayName } from "../../hooks/UserHook";
import { H5 } from "../../Components/H";
import Link from "next/link";

import { Modalt } from "../../Components/Modal";

function SearchHeader() {
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
      <Modalt open={open} backclose={() => setOpen(false)}>
        <div className="pb-12 px-4 ">
          <div className="flex items-center border-b-2 border-bgai px-2 py-0 w-full">
            <SearchIcon className="h-5 w-5" />
            <Input
              className="px-2 pb-0 grow bg-transparent border-none bg-accentplaceholder:text-text-p placeholder:opacity-100 focus:outline-0"
              // bordered
              type="text"
              placeholder="Search for webhooks, profiles and more ..."
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              autoFocus={true}
              ref={inputRef}
            />
            <XIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <Results users={users} />
        </div>
      </Modalt>
      <div className="w-6/12 flex item-center relative">
        <div className="flex justify-cente item-center md:hidden">
          <Swap
            className="mr-4 "
            rotate={true}
            offElement={<MenuIcon className="h-7 w-7" />}
            onElement={<XIcon className="h-7 w-7 " />}
          />
        </div>
        <div
          onClick={() => setOpen(true)}
          className="flex items-center bg-bgai px-4 py-2 rounded-2xl cursor-pointer"
        >
          <SearchIcon className="h-5 w-5" />
          <span className="ml-1 text-sm">
            Search for webhooks, profiles and more ...
          </span>
        </div>
        {/* <Input
        className="w-11/12 rounded-2xl bg-accent border-bgai border-4 placeholder:text-text-p placeholder:opacity-100 focus:outline-0"
        // bordered
        type="text"
        placeholder="Search for webhooks, profiles and more ..."
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        onFocus={() => setFocused(true)}
      /> */}
      </div>
    </Fragment>
  );
}

export default SearchHeader;

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
