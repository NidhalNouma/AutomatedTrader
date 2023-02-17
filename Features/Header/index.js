import { useState, Fragment } from "react";

import { Dropdown, Button, Drawer, Indicator } from "react-daisyui";
import { ButtonP } from "../../Components/Button";

import Link from "next/link";
import { BellIcon } from "@heroicons/react/outline";
import SearchHeader from "./SearchHeader";
import { LeftMenu } from "./LeftMenu";

import { Modal1 } from "../../Components/Modal";
import ManageWebhook from "../ManageWebhook";
import OpenTrade from "../tradesManual/Open";
import UpgradeMsg from "../UpgradeMsg";

import { SignOut } from "../../hooks/SignHook";

import { GetUserContext, GetFullUserContext } from "../../hooks/UserHook";

function Index() {
  const [open, setOpen] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);

  const { user } = GetUserContext();
  const { fullUser } = GetFullUserContext();

  return (
    <Fragment>
      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <OpenTrade close={() => setOpen(false)} />
      </Modal1>
      <UpgradeMsg open={openUpg} close={() => setOpenUpg(false)}></UpgradeMsg>

      <div
        className="px-4 md:px-6 py-2 md:py-3 bg-bg w-full sticky top-0 z-50 border-b2 border-b-bga"
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <LeftMenu />
            <ButtonP
              className="!bg-transparent !border-bga !border-[2px] !text-text-h hover:!text-text-h hiddeni md:flex" // !bg-transparent !px-1 !rounded !border-b-[4px] border-primary "
              onClick={() => {
                const sub = fullUser.subObj;
                if (sub && sub.manualTrade) setOpen(true);
                else setOpenUpg(true);
              }}
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-4 h-4"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z"
                  />
                </svg>
              }
            >
              Open Trade
            </ButtonP>
            {/* <ButtonP className="ml-6" onClick={() => setOpen(true)}>
                <span className="text-xs">+ New</span>
              </ButtonP> */}
          </div>
          {user ? (
            <div className="flex items-center ml-auto">
              <SearchHeader />
              <Indicator
                vertical="top"
                horizontal=""
                // item={<Badge size="xs" color="accent" />}
                className="relative ml-3"
              >
                <div className="right-0 top-0 !absolute w-3 h-3 rounded-full bg-accent"></div>
                <span className="cursor-pointer text-text-p">
                  <BellIcon className="h-7 w-7" />
                </span>
              </Indicator>
              <div className="ml-3">
                <Dropdown vertical="end">
                  <Button color="ghost" className="avatar" shape="circle">
                    <div className="w-10 rounded-full">
                      <img
                        className=""
                        src={user?.photoURL || "/Images/profile.png"}
                      />
                    </div>
                  </Button>
                  <Dropdown.Menu className="w-52 menu-compact bg-bga">
                    <li>
                      <Link className="justify-between" href="/profile">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link className="justify-between" href="/settings">
                        Settings
                      </Link>
                    </li>
                    <Dropdown.Item onClick={() => SignOut()}>
                      Logout
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          ) : (
            <div>
              <Link href="/signin">
                <span className="cursor-pointer mr-4 py-1 px-6 rounded-lg border-2 text-text-h bg-transparent border-primary">
                  Login
                </span>
              </Link>
              <Link href="/signup">
                <span className="cursor-pointer py-1 px-4 rounded-lg text-text-h bg-primary border-2 border-primary">
                  Sign up
                </span>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Fragment>
  );
}

export default Index;

function DD() {
  const [visible, setVisible] = useState(false);

  const toggleVisible = () => {
    setVisible(!visible);
  };

  return (
    <Drawer open={visible} onClickOverlay={toggleVisible}>
      <div className="flex h-56 items-center justify-center">
        <Button color="primary" onClick={toggleVisible}>
          Open drawer
        </Button>
      </div>
    </Drawer>
  );
}
