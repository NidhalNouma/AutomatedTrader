import React from "react";
import { Input, Swap } from "react-daisyui";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { SearchByDisplayName } from "../../hooks/UserHook";
import { H5 } from "../../Components/H";
import Link from "next/link";

function SearchHeader() {
  const { users, displayName, setDisplayName } = SearchByDisplayName();
  const [focused, setFocused] = React.useState(false);

  return (
    <div className="w-6/12 flex item-center relative">
      <div className="flex justify-cente item-center md:hidden">
        <Swap
          className="mr-4 "
          rotate={true}
          offElement={<MenuIcon className="h-7 w-7" />}
          onElement={<XIcon className="h-7 w-7 " />}
        />
      </div>
      <Input
        className="w-11/12 rounded-2xl bg-accent border-bgai border-4 placeholder:text-text-p placeholder:opacity-100 focus:outline-0"
        // bordered
        type="text"
        placeholder="Search for webhooks, profiles and more ..."
        value={displayName}
        onChange={(e) => setDisplayName(e.target.value)}
        onFocus={() => setFocused(true)}
      />

      {focused && users?.length > 0 && (
        <div className="w-11/12 absolute top-full left-0 right-0 min-h-6 p-2 bg-bgai mt-3 rounded-xl">
          {users.map((user) => (
            <Link
              key={user.id}
              href={{
                pathname: "/profile/" + user.id,
                // query: { linkUser: JSON.stringify(user) },
              }}
            >
              <div
                onClick={() => setFocused(false)}
                className="px-2 py-1 my-1 flex justify-start items-center cursor-pointer"
              >
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
    </div>
  );
}

export default SearchHeader;
