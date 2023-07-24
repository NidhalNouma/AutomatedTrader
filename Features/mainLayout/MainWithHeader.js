import React from "react";
import Main from "./Main";
import Header from "../Header";
import Banners from "../Banners";

function MainWithHeader({
  children,
  mainClassName,
  className,
  header = true,
  withBanners = true,
}) {
  return (
    <div className={`${className} w-full flex flex-col`}>
      {header && <Header />}
      {/* {withBanners && <Banners />} */}
      <Main className={mainClassName}>{children}</Main>
    </div>
  );
}

export default MainWithHeader;
