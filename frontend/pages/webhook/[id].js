import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import moment from "moment";

import { MainLayout } from "../../components/layout/MainLayout";
import { Title, SubTitle3, SubTitle2, Label } from "../../components/ui/Text";

import { ViewWebhookPage } from "../../hooksp/WebhooksHook";
import { alertsChartDayData } from "../../hooksp/AlertHook";

import LineChart from "../../components/charts/Line2";
import DoughnutWithTooltip from "../../components/charts/DoughnutWithTooltip";
import Doughnut from "../../components/charts/Doughnut";

import { addAlpha, getRandomHexColor } from "../../utils/functions";

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
  const { error, webhook, alerts, alertsData } = ViewWebhookPage(id);

  return (
    <Fragment>
      {title && (
        <section className="flex items-center justify-between">
          <div className="inline-flex items-center">
            <Title>{webhook.name || "Loading ..."}</Title>
            {/* {nextTitle} */}
          </div>
          {/* {rightSection} */}
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
        <section className="">
          <SubTitle2 className="">Trades</SubTitle2>

          <div className="mt-2">
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
              {0} trades today
            </h6>
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
              {0} trades yesterday
            </h6>
          </div>

          <div className="mt-2">
            <LineChart
              className="h-56"
              data={[]}
              chartId="alertsDays"
              minYAxis={0}
            />
          </div>
        </section>
        <section className="">
          <SubTitle2 className="">Alerts</SubTitle2>

          <div className="mt-2">
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
              {webhook?.trades?.length} Alerts today
            </h6>
            <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
              {alerts?.length} Alerts yesterday
            </h6>
          </div>

          <div className="mt-2">
            <LineChart
              className="h-56"
              data={alertsChartDayData(alertsData?.days)}
              chartId="alertsDays"
              minYAxis={0}
            />
          </div>

          {alertsData?.nTypes && (
            <Fragment>
              <Label className="mt-4">Alerts type</Label>

              <div className="mt-2">
                <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                  {webhook?.trades?.length} Market order
                </h6>
                <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline mr-2">
                  {alerts?.length} Close order
                </h6>
                <h6 className="text-text/80 text-sm outline-1 outline-dashed outline-text/40 px-1.5 py-0.5 rounded inline ">
                  {alerts?.length} Modify order
                </h6>
              </div>

              <div className="mt-2 flex">
                <div className=" max-w-xs mx-auto w-full">
                  <DoughnutWithTooltip
                    className=" "
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
                <div className=" max-w-xs mx-auto w-full">
                  <DoughnutWithTooltip
                    className=" "
                    data={Object.values(alertsData.apps)}
                    labels={Object.keys(alertsData.apps)}
                    colors={Object.keys(alertsData.apps).map((v) =>
                      getRandomHexColor()
                    )}
                  />
                </div>
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
                      <span className="ml-2">{alert.symbol}</span>
                    </div>

                    <span className="text-text/80 text-xs ml-auto">
                      {moment(alert.created_at.toDate()).fromNow()}
                    </span>
                  </div>
                ))}
              </div>
            </Fragment>
          )}
        </section>
      </section>
    </Fragment>
  );
}
