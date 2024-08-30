import { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import moment from "moment";

import { MainLayout } from "../../components/layout/MainLayout";
import { Title, SubTitle3, SubTitle2, Label } from "../../components/ui/Text";

import { ViewWebhookPage } from "../../hooksp/WebhooksHook";

import LineChart from "../../components/charts/Line2";
import BarChart from "../../components/charts/Bar";
import DoughnutWithTooltip from "../../components/charts/DoughnutWithTooltip";
import Doughnut from "../../components/charts/Doughnut";
import HalfDoughnutChart from "../../components/charts/HalfDoughnut";

import { addAlpha, getRandomHexColor } from "../../utils/functions";
import {
  LinesBarsChartData,
  LinesBarsChartDataDaysOfWeek,
} from "../../utils/chartsData";

import { RectangleSkeleton, TextSkeleton } from "../../components/ui/Skeleton";

function Webhook({}) {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Fragment>
      <MainLayout page="wh">
        <WebhookPage id={id} />
      </MainLayout>
    </Fragment>
  );
}

export default Webhook;

export function WebhookPage({ id, title = true }) {
  const { error, whUser, webhook, trades, alerts, alertsData, tradesData } =
    ViewWebhookPage(id);

  function getHotDays(dayOfTheWeek) {
    if (!dayOfTheWeek) return [];
    const daysOfWeek = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let maxAlerts = 0;
    const hotDays = [];

    // Find the maximum number of alerts on any single day
    daysOfWeek.forEach((day) => {
      const alertCount = dayOfTheWeek[day] ? dayOfTheWeek[day].length : 0;
      if (alertCount > maxAlerts) {
        maxAlerts = alertCount;
      }
    });

    // Find all days that have the maximum number of alerts
    daysOfWeek.forEach((day) => {
      const alertCount = dayOfTheWeek[day] ? dayOfTheWeek[day].length : 0;
      if (alertCount === maxAlerts && maxAlerts > 0) {
        hotDays.push(day);
      }
    });

    return hotDays;
  }
  const hotDays = getHotDays(alertsData?.dayOfTheWeek);

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
      {title && (
        <section className="flex items-center justify-between">
          <div className="inline-flex items-center">
            <Title>
              {webhook?.name || "Loading ..."}{" "}
              {whUser && (
                <span className="text-xs text-title/80">
                  by{" "}
                  <span className="text-xs font-semibold hover:text-title transition-all">
                    <Link href={"/u/" + whUser.userName}>
                      {whUser.displayName}
                    </Link>
                  </span>
                </span>
              )}
            </Title>
          </div>
        </section>
      )}

      <div className="mt-2">
        <h6 className="text-success/80 text-sm outline-1 outline-dashed outline-success/40 px-1.5 py-0.5 rounded inline mr-2">
          {webhook?.trades?.length} Trades opened
        </h6>
        <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
          {alerts?.length} Alerts fired
        </h6>
      </div>

      <section className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-8">
        {trades === null ? (
          <section className="">
            <TextSkeleton className="w-full " />
            <RectangleSkeleton className="w-full !h-56 mt-4" />
            <br />
            <TextSkeleton className="w-full " />
            <RectangleSkeleton className="w-full !h-56 mt-4" />
          </section>
        ) : (
          <section className="">
            <SubTitle2 className="">Trades</SubTitle2>

            {trades?.length > 0 ? (
              <Fragment>
                <div className="mt-2">
                  <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                    {todayTrades?.Trades?.length || 0} trades today
                  </h6>
                  <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
                    {yesterdayTrades?.Trades?.length || 0} trades yesterday
                  </h6>
                </div>

                <div className="mt-2">
                  <LineChart
                    className="h-56"
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
                        webhook.color,
                      ]
                    )}
                    chartId="tradesDays"
                    minYAxis={0}
                  />
                </div>

                <Label className="mt-4">Days of the week</Label>

                <div className="mt-2">
                  {hotDays?.length > 0 ? (
                    <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                      {hotDays.map((v, i) => (
                        <span className="" key={i}>
                          {i === 0 ? "" : ", "}
                          {v}
                        </span>
                      ))}{" "}
                      {hotDays.length === 1 ? "is a hot day" : "are hot days"}
                    </h6>
                  ) : (
                    <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                      No available hot day
                    </h6>
                  )}
                </div>

                <div className="mt-2">
                  <BarChart
                    className="h-56"
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
                        webhook?.color,
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
                </div>

                {tradesData?.symbols && (
                  <Fragment>
                    <Label className="mt-4">Symbols</Label>

                    <div className="mt-2">
                      {Object.keys(tradesData.symbols).map((v, i) => (
                        <h6
                          key={i}
                          className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2"
                        >
                          {tradesData.symbols[v].length} {v}
                        </h6>
                      ))}
                    </div>

                    <div className="mt-2 flex flex-col sm:flex-row gap-2 items-center justify-center">
                      <div className="  mx-auto w-full ">
                        <DoughnutWithTooltip
                          className=" w-full aspect-video "
                          data={Object.keys(tradesData.symbols).map(
                            (v, i) => tradesData.symbols[v].length
                          )}
                          labels={Object.keys(tradesData.symbols)}
                        />
                      </div>
                    </div>
                  </Fragment>
                )}

                {tradesData && (
                  <Fragment>
                    <Label className="mt-4">Profitability</Label>

                    <div className="max-w-sm mx-auto mt-4">
                      <HalfDoughnutChart
                        className=""
                        labels={["profit", "loss"]}
                        data={[
                          tradesData.profit.length,
                          tradesData.loss.length,
                        ]}
                        colors={[
                          `hsl(${getComputedStyle(
                            document.documentElement
                          ).getPropertyValue("--profit-color")})`,
                          `hsl(${getComputedStyle(
                            document.documentElement
                          ).getPropertyValue("--loss-color")})`,
                        ]}
                      >
                        <div className=" aspect-square rounded-full flex flex-col items-center w-full justify-center">
                          <div className="text-lg font-bold text-text ">
                            Profit trades
                          </div>
                          <span className="text-xl font-semibold text-profit">
                            %{" "}
                            {Number(
                              (tradesData.profit.length /
                                (tradesData.loss.length +
                                  tradesData.profit.length)) *
                                100
                            ).toFixed(1)}
                          </span>
                        </div>
                      </HalfDoughnutChart>
                    </div>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <div className="mt-2">
                <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                  No closed trades available
                </h6>
              </div>
            )}
          </section>
        )}
        {alerts === null ? (
          <section className="">
            <TextSkeleton className="w-full " />
            <RectangleSkeleton className="w-full !h-56 mt-4" />
            <br />
            <TextSkeleton className="w-full " />
            <RectangleSkeleton className="w-full !h-56 mt-4" />
          </section>
        ) : (
          <section className="">
            <SubTitle2 className="">Alerts</SubTitle2>

            {alerts?.length > 0 ? (
              <Fragment>
                <div className="mt-2">
                  <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                    {todayAlerts?.numberOfAlerts || 0} Alerts today
                  </h6>
                  <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
                    {yesterdayAlerts?.numberOfAlerts || 0} Alerts yesterday
                  </h6>
                </div>

                <div className="mt-2">
                  <LineChart
                    className="h-56"
                    data={LinesBarsChartData(
                      ["Total alerts", "Market Order"],
                      [
                        alertsData?.days?.map((day) => day.numberOfAlerts),
                        alertsData?.days?.map((day) => day.ntype[0]),
                      ],
                      alertsData?.days?.map((day) => day.day),
                      [webhook.color]
                    )}
                    chartId="alertsDays"
                    minYAxis={0}
                  />
                </div>

                <Label className="mt-4">Days of the week</Label>

                <div className="mt-2">
                  {hotDays?.length > 0 ? (
                    <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                      {hotDays.map((v, i) => (
                        <span className="" key={i}>
                          {i === 0 ? "" : ", "}
                          {v}
                        </span>
                      ))}{" "}
                      {hotDays.length === 1 ? "is a hot day" : "are hot days"}
                    </h6>
                  ) : (
                    <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                      No available hot day
                    </h6>
                  )}
                </div>

                <div className="mt-2">
                  <BarChart
                    className="h-56"
                    data={LinesBarsChartDataDaysOfWeek(
                      [
                        "Total alerts",
                        "Market order",
                        "Close order",
                        "Modify order",
                      ],
                      [
                        alertsData?.dayOfTheWeek,
                        alertsData?.dayOfTheWeek,
                        alertsData?.dayOfTheWeek,
                        alertsData?.dayOfTheWeek,
                      ],
                      [webhook?.color],
                      [null, "filter:type:0", "filter:type:2", "filter:type:3"]
                    )}
                    minYAxis={0}
                  />
                </div>

                {alertsData?.nTypes && (
                  <Fragment>
                    <Label className="mt-4">Alerts type</Label>

                    <div className="mt-2">
                      <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                        {alertsData.nTypes["0"]} Market order
                      </h6>
                      <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                        {alertsData.nTypes["2"]} Close order
                      </h6>
                      <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
                        {alertsData.nTypes["3"]} Modify order
                      </h6>
                    </div>

                    <div className="mt-2 flex flex-col sm:flex-row gap-2 items-center justify-center">
                      <div className="  mx-auto w-full ">
                        <DoughnutWithTooltip
                          className="w-full aspect-video "
                          data={Object.values(alertsData.nTypes)}
                          labels={Object.keys(alertsData.nTypes).map((v) =>
                            v == 0
                              ? "market"
                              : v == 3
                              ? "modify"
                              : v == 2
                              ? "close"
                              : v
                          )}
                          colors={[
                            addAlpha(
                              getComputedStyle(
                                document.documentElement
                              ).getPropertyValue("--clr-primary"),
                              0.6
                            ),
                            addAlpha(
                              getComputedStyle(
                                document.documentElement
                              ).getPropertyValue("--clr-primary"),
                              1
                            ),
                            addAlpha(
                              getComputedStyle(
                                document.documentElement
                              ).getPropertyValue("--clr-secondary"),
                              1
                            ),
                            addAlpha(
                              getComputedStyle(
                                document.documentElement
                              ).getPropertyValue("--clr-accent"),
                              1
                            ),
                          ]}
                        />
                      </div>
                      {/* <div className=" mx-auto w-full">
                        <DoughnutWithTooltip
                          className=" "
                          data={Object.values(alertsData.apps)}
                          labels={Object.keys(alertsData.apps)}
                          colors={Object.keys(alertsData.apps).map((v) =>
                            getRandomHexColor()
                          )}
                        />
                      </div> */}
                    </div>
                  </Fragment>
                )}

                {/* {alertsData?.symbols && (
        <Fragment>
          <Label className="mt-0">Symbols</Label>

          <div className="mt-2 flex items-center justify-center">
            <div className=" max-w-[12rem] w-full">
              <Doughnut
                className=" "
                data={Object.values(alertsData.symbols)}
                labels={Object.keys(alertsData.symbols)}
              >
                <div className="">
                  <span className="text-text">
                    {Object.keys(alertsData.symbols).length} Symbols
                  </span>
                </div>
              </Doughnut>
            </div>

            <div className="grid grid-cols-3 gap-2 ml-3">
              {Object.keys(alertsData.symbols)?.map((pair, i) => (
                <div
                  key={i}
                  className="text-text text-xs font-semibold flex items-center"
                >
                  <div
                    className="h-2 aspect-square rounded-full mr-1 bg-title"
                    // style={{
                    //   backgroundColor: doughnutData.colors[i],
                    // }}
                  ></div>{" "}
                  {Object.values(alertsData.symbols)} {pair}
                </div>
              ))}
            </div>
          </div>
        </Fragment>
      )} */}

                {alerts?.length > 0 && (
                  <Fragment>
                    <Label className="mt-4">Recent alerts</Label>
                    <div className="mt-2 max-w-smi">
                      {alerts.slice(0, 10).map((alert, i) => (
                        <div
                          key={i}
                          style={{
                            backgroundColor: addAlpha(webhook.color, 0.05),
                          }}
                          className="w-full flex justify-start items-center my-1 py-1 px-0.5 rounded"
                        >
                          <div className="">
                            <span
                              className={`${
                                alert.type == 2
                                  ? "bg-error/10"
                                  : alert.type == 3
                                  ? "bg-info/10"
                                  : "bg-primary/10"
                              } text-title px-1 rounded font-semibold text-xs`}
                            >
                              {alert.type == 0
                                ? "Market Order"
                                : alert.type == 1
                                ? "Pending Order"
                                : alert.type == 2
                                ? "Closing Trade"
                                : alert.type == 3
                                ? "Modifing Trade"
                                : "NA"}
                            </span>
                            <span className="ml-2 text-text/80 text-sm">
                              {alert.symbol}
                            </span>
                          </div>

                          <span className="text-text/80 text-xs ml-auto">
                            {moment(alert.created_at.toDate()).fromNow()}
                          </span>
                        </div>
                      ))}
                    </div>
                  </Fragment>
                )}
              </Fragment>
            ) : (
              <div className="mt-2">
                <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                  No alert fired.
                </h6>
              </div>
            )}
          </section>
        )}
      </section>
    </Fragment>
  );
}
