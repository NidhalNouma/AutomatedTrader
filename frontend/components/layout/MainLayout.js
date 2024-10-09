import React, { Fragment } from "react";
import SideNav from "../common/SideNav";
import Navbar from "../common/NavBar";
import { Title } from "../ui/Text";

import Header from "../Landing/Header";

import { useUser } from "../../contexts/UserContext";

import { BinanceBanner, TSBanner, FlippingBanners } from "../ui/Banners";

export function MainLayout({ children, page }) {
  const { user } = useUser();
  // let user = false;

  return (
    <div className="flex w-full mx-auto h-auto max-w-full">
      {user && <SideNav page={page} />}
      <div className="flex-1 flex flex-col max-w-full px-1 sm:px-3">
        {user ? (
          <Navbar page={page} className="px-2 ">
            {page != "membership" && (
              <FlippingBanners className="mt-0 -mb-0 !ml-5 xl:block hidden min-w-fit grow ">
                {/* <BinanceBanner className=" " />
                <TSBanner className="" /> */}
              </FlippingBanners>
            )}
          </Navbar>
        ) : (
          <Header className="!max-w-full !px-2" />
        )}

        <main className="grow min-h-[80vh] mt-1 px-2  mb-10 flex flex-col relative">
          {children}
        </main>
      </div>
    </div>
  );
}

export function MainLayoutWithHeader({
  children,
  page,
  title,
  nextTitle,
  rightSection,
}) {
  return (
    <MainLayout page={page}>
      <section className="flex items-center justify-between">
        <div className="inline-flex items-center">
          <Title>{title}</Title>
          {nextTitle}
        </div>
        {rightSection}
      </section>
      <Fragment>
        {/* <FlippingBanners className="mt-2 -mb-0 ">
          <TSBanner className="ml-auto" />
          <BinanceBanner className="ml-auto" />
        </FlippingBanners> */}
        {children}
      </Fragment>
    </MainLayout>
  );
}
