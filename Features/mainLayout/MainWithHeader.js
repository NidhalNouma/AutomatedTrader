import React from "react";
import Main from "./Main";
import Header from "../Header";

function MainWithHeader({ children }) {
  return (
    <div className="w-full flex flex-col">
      <Header />
      <Main>{children}</Main>
    </div>
  );
}

export default MainWithHeader;
