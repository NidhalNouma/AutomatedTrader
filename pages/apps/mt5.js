import { useState } from "react";
import Sidenav from "../../Features/SideNav";
import { H1 } from "../../Components/H";
import MainWithHeader from "../../Features/mainLayout/MainWithHeader";

export default function MT5() {
  return (
    <>
      <Sidenav cpath="mt5" />
      <MainWithHeader>
        <div className="flex justify-between">
          <div className="flex items-center">
            <H1 className="">
              <span className="hidden sm:block">Metatrader 5</span>
              <span className="sm:hidden">MT5</span>
            </H1>
          </div>
        </div>
        <div className="mt-16 w-full">
          <H1 className="font-extrabold text-center !text-secondary !text-5xl">
            COMING SOON ...
          </H1>
        </div>
      </MainWithHeader>
    </>
  );
}
