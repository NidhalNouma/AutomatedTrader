import React from "react";
import Main from "./Main";
import Header from "../Header";
import Banners from "../Banners";

function MainWithHeader({ children }) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <Banners />
      <Main>{children}</Main>
    </div>
  );
}

export default MainWithHeader;
