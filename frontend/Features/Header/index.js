import { useState, Fragment } from "react";
import { useRouter } from "next/router";

import { Dropdown, Button, Drawer } from "react-daisyui";
import { Button as ButtonP } from "../../components/ui/Button";

import Link from "next/link";
import { MdWaterfallChart, MdOutlineCandlestickChart } from "react-icons/md";
import { GiUpgrade } from "react-icons/gi";
import SearchHeader from "./SearchHeader";
import { LeftMenu } from "./LeftMenu";

import { Modal1 } from "../../components/Modal";
import OpenTrade from "../tradesManual/Open";
import UpgradeMsg from "../UpgradeMsg";

import { SignOut } from "../../hooks/SignHook";

import { GetUserContext, GetFullUserContext } from "../../hooks/UserHook";
import { pricingList } from "../../utils/pricing";

import NotificationHeader from "../notifications/Header";
import Banners from "../Banners";

function Index() {
  const router = useRouter();
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
        className="px-4 md:px-6 py-2 md:py-3 bg-bgt w-full sticky top-0 z-50 border-b2 border-b-bga"
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center">
            <LeftMenu />
            <ButtonP
              className="!bg-primary !border-bga !border-[2px] !text-text-h hover:!text-text-h hiddeni md:flex"
              onClick={() => {
                const sub = fullUser.subObj;
                if (sub && sub.manualTrade) setOpen(true);
                else setOpenUpg(true);
              }}
              icon={<MdWaterfallChart className="h-4 w-4" />}
            >
              Open Trade
            </ButtonP>
            <div className="hidden sm:block ml-4">
              <Banners />
            </div>
            {/* <ButtonP className="ml-6" onClick={() => setOpen(true)}>
                <span className="text-xs">+ New</span>
              </ButtonP> */}
          </div>
          {user ? (
            <div className="flex items-center justify-center ml-auto">
              <SearchHeader />
              <NotificationHeader />

              {fullUser?.subObj?.chargeBeeId !==
                pricingList.lifetime["Lifetime access"].chargeBeeId && (
                <ButtonP
                  className="ml-2 !bg-accent !border-bga !border-[2px] !text-bgt hover:!text-bgt hidden md:flex" // !bg-transparent !px-1 !rounded !border-b-[4px] border-primary "
                  onClick={() => {
                    router.push(
                      "/membership?m=" +
                        pricingList.lifetime["Lifetime access"].chargeBeeId
                    );
                  }}
                  icon={<GiUpgrade className="h-4 w-4" />}
                  animation={false}
                >
                  <span className="hidden md:block">Upgrade</span>
                </ButtonP>
              )}
              <div className="ml-2">
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
                    <Dropdown.Item
                      onClick={async () => {
                        await SignOut();
                        router.push("/");
                      }}
                    >
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
