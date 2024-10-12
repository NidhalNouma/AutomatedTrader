import { Fragment } from "react";
import moment from "moment";
import Link from "next/link";

import { withAuth } from "../contexts/UserContext";
import { MainLayout } from "../components/layout/MainLayout";
import { Label, SubTitle2, SubTitle3, Title } from "../components/ui/Text";
import WebhookChart from "../components/parts/WebhookChart";
import LineChart from "../components/charts/Line2";
import BarChart from "../components/charts/Bar";

import { useUser } from "../contexts/UserContext";
import { useWebhook } from "../contexts/WebhookContext";
import { useAlert } from "../contexts/AlertContext";

import { AlertsData } from "../hooksp/AlertHook";
import { TradesData } from "../hooksp/TradeHook";

import { processAlerts } from "../hooksp/AlertHook";

import { IoTrendingDown } from "react-icons/io5";
import { MdOutlineTrendingDown } from "react-icons/md";
import { GiFallDown } from "react-icons/gi";
import { ImArrowDown } from "react-icons/im";
import { ImArrowUp } from "react-icons/im";

import {
  LinesBarsChartData,
  LinesBarsChartDataDaysOfWeek,
} from "../utils/chartsData";

function Home() {
  // const { user } = GetUserContext();
  const { fullUser } = useUser();
  const { alertsData } = AlertsData();
  const { tradesData } = TradesData();
  const { webhooks } = useWebhook();

  const topWebhook = webhooks
    ?.sort((a, b) => b.trades?.length - a.trades?.length)
    .slice(0, 4);

  let todayAlerts = alertsData?.days.find(
    (day) => day.day === moment().format("YYYY-MM-DD")
  );
  let yesterdayAlerts = alertsData?.days.find(
    (day) => day.day === moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  let todayTrades = tradesData?.days.find(
    (day) => day.time === moment().format("YYYY-MM-DD")
  );
  let yesterdayTrades = tradesData?.days.find(
    (day) => day.time === moment().subtract(1, "days").format("YYYY-MM-DD")
  );

  return (
    <Fragment>
      <MainLayout page="home">
        <div className="">
          <SubTitle2>
            <span className="">Welcome back</span> {fullUser?.displayName}
          </SubTitle2>

          <SubTitle3 className="!text-base mt-2 text-text/80">
            My Alerts{" "}
            <Link href="/alerts">
              <span className="text-text/80 text-xs rounded bg-text/10 px-1 cursor-pointer">
                View all &rarr;
              </span>
            </Link>
          </SubTitle3>

          <div className="mt-2">
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
              {todayAlerts?.numberOfAlerts || 0} Alerts today
            </h6>
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
              {yesterdayAlerts?.numberOfAlerts || 0} Alerts yesterday
            </h6>
          </div>

          <section className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-2">
            <LineChart
              title={<Label className="!text-text/60">Alerts per days</Label>}
              className="h-44"
              data={LinesBarsChartData(
                ["Total alerts", "Market Order"],
                [
                  alertsData?.days?.map((day) => day.numberOfAlerts),
                  alertsData?.days?.map((day) => day.ntype[0]),
                ],
                alertsData?.days?.map((day) => day.day),
                [
                  `${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--primary-color")}`,
                ]
              )}
              chartId="alertsDays"
              minYAxis={0}
            />

            <BarChart
              title={<Label className="!text-text/60">Alerts per week</Label>}
              className="h-44"
              data={LinesBarsChartDataDaysOfWeek(
                ["Total alerts", "Market order", "Close order", "Modify order"],
                [
                  alertsData?.dayOfTheWeek,
                  alertsData?.dayOfTheWeek,
                  alertsData?.dayOfTheWeek,
                  alertsData?.dayOfTheWeek,
                ],
                [
                  `${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--primary-color")}`,
                ],
                [null, "filter:type:0", "filter:type:2", "filter:type:3"]
              )}
              minYAxis={0}
            />
          </section>

          <SubTitle3 className="!text-base mt-4 text-text/80">
            My Trades{" "}
            <Link href="/trades">
              <span className="text-text/80 text-xs rounded bg-text/10 px-1 cursor-pointer">
                View all &rarr;
              </span>
            </Link>
          </SubTitle3>

          <div className="mt-2">
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
              {todayTrades?.numberOfAlerts || 0} Trades today
            </h6>
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
              {yesterdayTrades?.numberOfAlerts || 0} Trades yesterday
            </h6>
          </div>

          <section className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-2">
            <LineChart
              title={<Label className="!text-text/60">Trades per days</Label>}
              className="h-44"
              data={LinesBarsChartData(
                ["Profit Trades", "Loss Trades", "Total trades"],
                [
                  tradesData?.days?.map((day) => day.profit.length),
                  tradesData?.days?.map((day) => day.loss.length),
                  tradesData?.days?.map((day) => day.Trades.length),
                ],
                tradesData?.days?.map((day) => day.time),
                [
                  `hsl(${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--profit-color")})`,
                  `hsl(${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--loss-color")})`,

                  `${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--primary-color")}`,
                  ,
                ]
              )}
              chartId="alertsDays"
              minYAxis={0}
            />

            <BarChart
              title={<Label className="!text-text/60">Trades per week</Label>}
              className="h-44"
              data={LinesBarsChartDataDaysOfWeek(
                [
                  "Total trades",
                  "Long trades",
                  "Short trades",
                  "Profit trades",
                  "Loss trades",
                ],
                [
                  tradesData?.dayOfTheWeek,
                  tradesData?.dayOfTheWeek,
                  tradesData?.dayOfTheWeek,
                  tradesData?.dayOfTheWeek,
                  tradesData?.dayOfTheWeek,
                ],
                [
                  `${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--primary-color")}`,

                  `hsl(${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--long-color")})`,
                  `hsl(${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--short-color")})`,
                  `hsl(${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--profit-color")})`,
                  `hsl(${getComputedStyle(
                    document.documentElement
                  ).getPropertyValue("--loss-color")})`,
                ],
                [
                  null,
                  "filter:type:buy",
                  "filter:type:sell",
                  "filter:profit:>=|0",
                  "filter:profit:<|0",
                ]
              )}
              minYAxis={0}
            />
          </section>

          <SubTitle3 className="!text-base mt-4 text-text/80">
            My top webhooks{" "}
            <Link href="/webhook">
              <span className="text-text/80 text-xs rounded bg-text/10 px-1 cursor-pointer">
                View all &rarr;
              </span>
            </Link>
          </SubTitle3>
          <section className="mt-1 block gap-3">
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-4 3xl:grid-cols-5 gap-4">
              {topWebhook?.map((webhook, i) => (
                <Fragment key={webhook.id}>
                  <WebhookChart webhook={webhook} />
                </Fragment>
              ))}
            </div>
          </section>
        </div>
        {/* <MegaSale /> */}
      </MainLayout>
    </Fragment>
  );
}

export default withAuth(Home);
