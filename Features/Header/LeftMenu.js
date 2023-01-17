import { Fragment, useRef, useEffect, useState } from "react";
import { Swap } from "react-daisyui";
import { MenuIcon } from "@heroicons/react/outline";
import Drawer from "../Drawer";
import SideNav from "../SideNav";

export function LeftMenu() {
  const [openMenu, setOpenMenu] = useState(false);

  return (
    <Fragment>
      <Drawer isOpen={openMenu} setIsOpen={() => setOpenMenu((v) => !v)}>
        <SideNav fixed={false} />
      </Drawer>
      <div
        onClick={() => setOpenMenu(true)}
        className="flex justify-center item-center md:hidden"
      >
        <Swap
          className="mr-4 "
          rotate={true}
          offElement={<MenuIcon className="h-7 w-7" />}
          onElement={<MenuIcon className="h-7 w-7 " />}
        />
      </div>
    </Fragment>
  );
}
