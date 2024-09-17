import { useState, Fragment, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { LeftDrawer, RightDrawerWithHeader } from "../ui/Drawer";
import { Button, RoundedButton } from "../ui/Button";
import { Dropdown, DropdownButton } from "../ui/Dropdown";
import { SearchModal } from "../ui/SearchInput";
import { ModalWithHeader, UpgradeModal } from "../ui/Modal";
import { Label, Par, SubTitle3 } from "../ui/Text";

import SideNav from "./SideNav";
import NotificationsSection from "./NotificationsSection";

import { Swap, Indicator } from "react-daisyui";
import { MenuIcon } from "@heroicons/react/outline";
import { BellIcon } from "@heroicons/react/outline";

import OpenTrade from "../Forms/OpenTrade";
import { useUser } from "../../contexts/UserContext";
import { useNotification } from "../../contexts/NotificationContext";
import { SignOut } from "../../hooksp/AuthHook";

import { SearchUsersByDisplayName } from "../../hooksp/UserHook";
import { SearchWebhooksByName } from "../../hooksp/WebhooksHook";

import { addAlpha } from "../../utils/functions";

export default function NavBar({ className, children, page }) {
  const router = useRouter();

  const { notifications, unreadNotifications } = useNotification();

  const [closeSearch, setCloseSearch] = useState(false);
  const [openUpg, setOpenUpg] = useState(false);

  const { users, username, setUsername } = SearchUsersByDisplayName();
  const { webhooks, setName } = SearchWebhooksByName();

  const [openSideNav, setSideNav] = useState(false);

  const toggleSideNav = useCallback(() => {
    setSideNav((v) => !v);
  }, []);

  const { user, fullUser } = useUser();
  const { signOut } = SignOut();

  return (
    <Fragment>
      <div
        className={` py-2 md:py-4 bg-transparent w-full sticky top-0 z-50 ${className}`}
        style={{ zIndex: 100 }}
      >
        <div className="flex justify-between items-center w-full">
          <div className="flex items-center grow">
            <Fragment>
              <LeftDrawer
                className="relative"
                open={openSideNav}
                onClickOverlay={toggleSideNav}
              >
                <SideNav fixed={false} page={page} />
              </LeftDrawer>
              <div className="flex items-center justify-center md:hidden">
                <Swap
                  className="mr-4 text-text "
                  rotate={true}
                  offElement={
                    <MenuIcon className="h-7 w-7" onClick={toggleSideNav} />
                  }
                  onElement={
                    <MenuIcon className="h-7 w-7 " onClick={toggleSideNav} />
                  }
                />
              </div>
            </Fragment>

            {fullUser?.hasAccessTo?.manualTrade ? (
              <ModalWithHeader
                title="Open Trade"
                trigger={
                  <Button
                    className=""
                    icon={
                      <svg
                        className="h-[1.2rem] aspect-auto"
                        viewBox="0 0 97 167"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M69.9671 0C70.5923 1.12484 71.0603 2.32299 71.667 3.36213C74.6623 8.49212 77.709 13.5631 80.7089 18.6878C83.3653 23.2257 85.9689 27.8241 88.6239 32.3635C90.9214 36.292 93.2611 40.1721 95.5755 44.0813C96.027 44.8439 96.4481 45.6421 97 46.6338C92.6122 46.6338 88.4063 46.6338 84.0934 46.6338C84.0934 67.1488 84.0934 87.5233 84.0934 108C74.1834 108 64.3808 108 54.4702 108C54.4702 87.6284 54.4702 67.2539 54.4702 46.7757C50.3386 46.7757 46.3134 46.7757 42 46.7757C51.1959 31.0624 60.2397 15.6087 69.2058 0.077548C69.3766 1.49012e-08 69.6252 0 69.9671 0Z"
                          className="fill-light"
                        />
                        <path
                          d="M27.0817 167C26.4281 165.833 25.9256 164.6 25.2973 163.51C22.1838 158.107 19.046 152.732 15.8992 147.368C13.5973 143.444 11.2513 139.571 8.95605 135.64C6.68834 131.755 4.46671 127.818 2.20952 123.922C1.5622 122.804 0.861655 121.748 0 120.366C4.23079 120.366 8.21834 120.366 12.2819 120.366C12.2819 99.8059 12.2819 79.4691 12.2819 59C22.1468 59 31.9342 59 41.8385 59C41.8385 79.3186 41.8385 99.6948 41.8385 120.241C46.2268 120.241 50.5011 120.241 55 120.241C45.8215 135.947 36.7934 151.396 27.8425 166.922C27.6715 167 27.4232 167 27.0817 167Z"
                          className=" fill-light/60"
                        />
                      </svg>
                    }
                  >
                    Open Trade
                  </Button>
                }
              >
                <OpenTrade />
              </ModalWithHeader>
            ) : (
              <UpgradeModal
                trigger={
                  <Button
                    className=""
                    icon={
                      <svg
                        className="h-[1.2rem] aspect-auto"
                        viewBox="0 0 97 167"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M69.9671 0C70.5923 1.12484 71.0603 2.32299 71.667 3.36213C74.6623 8.49212 77.709 13.5631 80.7089 18.6878C83.3653 23.2257 85.9689 27.8241 88.6239 32.3635C90.9214 36.292 93.2611 40.1721 95.5755 44.0813C96.027 44.8439 96.4481 45.6421 97 46.6338C92.6122 46.6338 88.4063 46.6338 84.0934 46.6338C84.0934 67.1488 84.0934 87.5233 84.0934 108C74.1834 108 64.3808 108 54.4702 108C54.4702 87.6284 54.4702 67.2539 54.4702 46.7757C50.3386 46.7757 46.3134 46.7757 42 46.7757C51.1959 31.0624 60.2397 15.6087 69.2058 0.077548C69.3766 1.49012e-08 69.6252 0 69.9671 0Z"
                          className="fill-light"
                        />
                        <path
                          d="M27.0817 167C26.4281 165.833 25.9256 164.6 25.2973 163.51C22.1838 158.107 19.046 152.732 15.8992 147.368C13.5973 143.444 11.2513 139.571 8.95605 135.64C6.68834 131.755 4.46671 127.818 2.20952 123.922C1.5622 122.804 0.861655 121.748 0 120.366C4.23079 120.366 8.21834 120.366 12.2819 120.366C12.2819 99.8059 12.2819 79.4691 12.2819 59C22.1468 59 31.9342 59 41.8385 59C41.8385 79.3186 41.8385 99.6948 41.8385 120.241C46.2268 120.241 50.5011 120.241 55 120.241C45.8215 135.947 36.7934 151.396 27.8425 166.922C27.6715 167 27.4232 167 27.0817 167Z"
                          className=" fill-light/60"
                        />
                      </svg>
                    }
                  >
                    Open Trade
                  </Button>
                }
              ></UpgradeModal>
            )}
            {children}
          </div>
          {user ? (
            <div className="flex items-center justify-center ml-auto">
              <SearchModal
                placeholder="Search for webhooks, profiles and more ..."
                value={username}
                setValue={(v) => {
                  setUsername(v);
                  setName(v);
                }}
                close={closeSearch}
              >
                {users.length > 0 && (
                  <div className="mt-4">
                    <SubTitle3 className="ml-2 !text-xs">Users</SubTitle3>
                    <UsersResults
                      users={users}
                      close={() => setCloseSearch(!closeSearch)}
                    />
                  </div>
                )}
                {webhooks.length > 0 && (
                  <div className="mt-4">
                    <SubTitle3 className="ml-2 !text-xs">Webhooks</SubTitle3>
                    <WebhooksResult
                      webhooks={webhooks}
                      close={() => setCloseSearch(!closeSearch)}
                    />
                  </div>
                )}
                {username?.length < 3 &&
                  users.length === 0 &&
                  webhooks.length === 0 && (
                    <Par className="mt-6 font-semibold text-center !text-sm">
                      Start typing to see the results ...
                    </Par>
                  )}
              </SearchModal>
              <div className="ml-4 flex items-center">
                <RightDrawerWithHeader
                  title="Notifications"
                  trigger={
                    <div className="cursor-pointer flex items-center justify-center">
                      <Indicator
                        vertical="top"
                        horizontal=""
                        className="relative"
                      >
                        {unreadNotifications > 0 && (
                          <div className="right-0 top-0 -translate-y-1/6 translate-x-1/4 p-2 !absolute h-5 w-5  flex items-center justify-center rounded-full border-[0.5px] border-accent bg-bgt">
                            <span className="text-accent text-xs">
                              {unreadNotifications}
                            </span>
                          </div>
                        )}
                        <RoundedButton className="hover:bg-text/10">
                          <BellIcon className="h-6 aspect-square stroke-text/80 hover:stroke-text stroke-1" />
                        </RoundedButton>
                      </Indicator>
                    </div>
                  }
                >
                  <NotificationsSection notifications={notifications} />
                </RightDrawerWithHeader>
              </div>

              <div className="ml-2">
                <Dropdown
                  content={
                    <Fragment>
                      <DropdownButton onClick={() => router.push("/profile")}>
                        Profile
                      </DropdownButton>
                      <DropdownButton onClick={() => router.push("/settings")}>
                        Settings
                      </DropdownButton>
                      <DropdownButton
                        onClick={async () => {
                          await signOut();
                          router.push("/");
                        }}
                      >
                        Logout
                      </DropdownButton>
                    </Fragment>
                  }
                >
                  <RoundedButton className=" hover:bg-text/10 ml-1.5">
                    <img
                      className=" aspect-square h-6 rounded-full"
                      src={user?.photoURL || "/Images/profile.png"}
                    />
                  </RoundedButton>
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

        <div className="absolute inset-0 w-full h-full bg-bg-bgt/30 backdrop-blur-xl -z-10"></div>
      </div>
    </Fragment>
  );
}

const UsersResults = ({ users, close }) => {
  const router = useRouter();
  return (
    <Fragment>
      {users?.length > 0 && (
        <Fragment>
          {users.map((user, i) => (
            <div
              key={i}
              onClick={() => {
                router.push("/u/" + user.userName);
              }}
              className=" min-h-6 px-2 py-2 my-1 rounded-lg hover:bg-accent/10 cursor-pointer"
            >
              <div className="flex justify-start items-center cursor-pointer">
                <div className="w-8 h-8 rounded-full">
                  <img
                    className="rounded-full  w-full h-full "
                    src={user?.photoURL || "/Images/profile.png"}
                  />
                </div>
                <div className="ml-3">
                  <Label>{user.displayName}</Label>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};

const WebhooksResult = ({ webhooks, close }) => {
  const router = useRouter();
  return (
    <Fragment>
      {webhooks?.length > 0 && (
        <Fragment>
          {webhooks.map((webhook, i) => (
            <div
              key={i}
              className={`px-2 py-2 my-1 rounded-lg`}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = addAlpha(
                  webhook.color,
                  0.1
                );
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
              }}
              onClick={() => {
                router.push("/webhook/" + webhook.publicId);
                close();
              }}
            >
              <div className="flex justify-start items-center cursor-pointer">
                {/* <div className="w-8 h-8 rounded-full">
                    <img
                      className="rounded-full  w-full h-full "
                      src={user?.photoURL || "/Images/profile.png"}
                    />
                  </div> */}
                <div className="iml-3">
                  <Label>{webhook.name}</Label>
                </div>
              </div>
            </div>
          ))}
        </Fragment>
      )}
    </Fragment>
  );
};
