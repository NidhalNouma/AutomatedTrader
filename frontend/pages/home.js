import { Fragment } from "react";

import { withAuth } from "../contexts/UserContext";
import { MainLayout } from "../components/layout/MainLayout";
import { SubTitle2, SubTitle3, Title } from "../components/ui/Text";

import { useUser } from "../contexts/UserContext";

import { AlertsData } from "../hooksp/AlertHook";
import { TradesData } from "../hooksp/TradeHook";

import { IoTrendingDown } from "react-icons/io5";
import { MdOutlineTrendingDown } from "react-icons/md";
import { GiFallDown } from "react-icons/gi";
import { ImArrowDown } from "react-icons/im";
import { ImArrowUp } from "react-icons/im";

function Home() {
  // const { user } = GetUserContext();
  const { fullUser } = useUser();
  const { alertsData } = AlertsData();
  const { tradesData } = TradesData();

  return (
    <Fragment>
      <MainLayout page="home">
        <div className="">
          <SubTitle2>
            <span className="">Welcome back</span> {fullUser.displayName}
          </SubTitle2>
          <SubTitle3 className="!text-sm mt-2 text-text/80">
            This is your performance of the month
          </SubTitle3>
          <section className="mt-1 block gap-3">
            <div className="outline-accent/20 bg-accent/10 outline-dashed outline-1 rounded p-2 inline-block mr-3">
              <span className="text-text text-base block font-medium">
                Today alerts: 10
              </span>
              <span className=" text-sm block mt-1 text-loss">
                <ImArrowDown className="fill-current h-5 mr-0.5 aspect-auto inline stroke-0" />
                10% from last week
              </span>
            </div>
            <div className="outline-accent/20 bg-accent/10 outline-dashed outline-1 rounded p-2 inline-block mr-3">
              <span className="text-text text-base block font-medium">
                Yesterday alerts: 5
              </span>
              <span className=" text-sm block mt-1 text-profit">
                <ImArrowUp className="fill-current h-5 mr-0.5 aspect-auto inline stroke-0" />
                10% from last week
              </span>
            </div>
            <div className="outline-accent/20 bg-accent/10 outline-dashed outline-1 rounded p-2 inline-block mr-3 mt-2">
              <span className="text-text text-base block font-medium">
                This month alerts: 5
              </span>
              <span className=" text-sm block mt-1 text-profit">
                <ImArrowUp className="fill-current h-5 mr-0.5 aspect-auto inline stroke-0" />
                10% from last month
              </span>
            </div>

            <span className="text-text/60 text-sm my-auto inline-flex items-center">
              View more &rarr;
            </span>
          </section>
          <section className="mt-3 block gap-3">
            <div className="outline-accent/20 bg-accent/10 outline-dashed outline-1 rounded p-2 inline-block mr-3">
              <span className="text-text text-base block font-medium">
                Today trades: 10
              </span>
              <span className=" text-sm block mt-1 text-loss">
                <ImArrowDown className="fill-current h-5 mr-0.5 aspect-auto inline stroke-0" />
                10% from last week
              </span>
            </div>
            <div className="outline-accent/20 bg-accent/10 outline-dashed outline-1 rounded p-2 inline-block mr-3">
              <span className="text-text text-base block font-medium">
                Yesterday trades: 5
              </span>
              <span className=" text-sm block mt-1 text-profit">
                <ImArrowUp className="fill-current h-5 mr-0.5 aspect-auto inline stroke-0" />
                10% from last week
              </span>
            </div>
            <div className="outline-accent/20 bg-accent/10 outline-dashed outline-1 rounded p-2 inline-block mr-3 mt-2">
              <span className="text-text text-base block font-medium">
                This month trades: 5
              </span>
              <span className=" text-sm block mt-1 text-profit">
                <ImArrowUp className="fill-current h-5 mr-0.5 aspect-auto inline stroke-0" />
                10% from last month
              </span>
            </div>

            <span className="text-text/60 text-sm text-end inline-flex items-center">
              View more &rarr;
            </span>
          </section>
        </div>
        {/* <MegaSale /> */}
      </MainLayout>
    </Fragment>
  );
}

export default withAuth(Home);
