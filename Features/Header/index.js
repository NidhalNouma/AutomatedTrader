import { useState, Fragment } from "react";

import { ButtonP } from "../../Components/Button";
import { Input, Dropdown, Button, Indicator, Drawer } from "react-daisyui";

import Link from "next/link";
import { BellIcon } from "@heroicons/react/outline";
import SearchHeader from "./SearchHeader";

import { Modal1 } from "../../Components/Modal";
import ManageWebhook from "../ManageWebhook";

import { SignOut } from "../../hooks/SignHook";

import { GetUserContext } from "../../hooks/UserHook";

function Index() {
  const [open, setOpen] = useState(false);
  const { user } = GetUserContext();

  return (
    <Fragment>
      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <ManageWebhook close={() => setOpen(false)} />
      </Modal1>
      <div
        className="px-6 py-5 bg-accent w-full sticky top-0 z-50"
        style={{ zIndex: 100 }}
      >
        {/* <DD /> */}
        <div className="flex justify-between items-center">
          <SearchHeader />
          {user ? (
            <div className="flex items-center">
              <ButtonP className="ml-6" onClick={() => setOpen(true)}>
                <span className="text-xs">+ New</span>
              </ButtonP>
              <Indicator
                vertical="top"
                horizontal=""
                // item={<Badge size="xs" color="accent" />}
                className="relative"
              >
                <div className="right-0 top-0 !absolute w-3 h-3 rounded-full bg-accent"></div>
                <span className="ml-6 cursor-pointer text-text-p">
                  <BellIcon className="h-7 w-7" />
                </span>
              </Indicator>
              <div className="ml-6">
                <Dropdown vertical="end">
                  <Button color="ghost" className="avatar" shape="circle">
                    <div className="w-10 rounded-full">
                      <img
                        className=""
                        src={user?.photoURL || "Images/profile.png"}
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
