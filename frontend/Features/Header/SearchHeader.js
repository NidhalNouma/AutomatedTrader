import { Fragment, useRef, useEffect, useState } from "react";
import { Input, Swap } from "react-daisyui";
import { XIcon, SearchIcon } from "@heroicons/react/outline";
import { SearchByDisplayName } from "../../hooks/UserHook";
import { H5 } from "../../components/H";
import Link from "next/link";

import { Modalt } from "../../components/Modal";

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
          <div className="flex items-center border-b-2 border-bga px-2 py-0 w-full">
            <SearchIcon className="h-5 w-5" />
            <Input
              className="px-2 pb-0 grow bg-transparent border-none placeholder:text-text-p placeholder:opacity-100 focus:outline-0"
              // bordered
              type="text"
              placeholder="Search for webhooks, profiles and more ..."
              value={displayName}
              // onChange={(e) => setDisplayName(e.target.value)}
              onChange={(e) => setDisplayName("")}
              autoFocus={true}
              ref={inputRef}
            />
            <XIcon
              className="h-5 w-5 cursor-pointer"
              onClick={() => setOpen(false)}
            />
          </div>
          <Results users={users} />
          <H5 className="mt-6 font-semibold text-center">
            Coming soon! Lifetime users get first access ,{" "}
            <span className="underline cursor-pointer">
              <Link href="/membership">upgrade your membership today</Link>
            </span>
          </H5>
        </div>
      </Modalt>

      <div className="relative">
        <div
          onClick={() => setOpen(true)}
          className="flex items-center bg-bgt border-[2px] border-bga px-4 py-2 rounded-full cursor-pointer"
        >
          <SearchIcon className="h-5 w-5 text-text-p" />
          <span className="ml-1 text-sm truncate text-text-p hidden md:block">
            Search webhooks, profiles and more ...
          </span>
        </div>
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
