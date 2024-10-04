import { useState, useEffect, Fragment } from "react";
import { withAuth } from "../contexts/UserContext";

import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import { SubTitle3 } from "../components/ui/Text";

import {
  LiveTradeTable,
  HistoryTradeTable,
} from "../components/parts/TradesTable";
import TradeCalander from "../components/parts/TradesCalander";
import LineChart from "../components/charts/Line2";
import DoughnutChart from "../components/charts/Doughnut";
import { RectangleSkeleton } from "../components/ui/Skeleton";

import { TradesData } from "../hooksp/TradeHook";

function TradesPage() {
  const {
    trades,
    liveTrades,
    liveTradesData,
    tradesDay,
    nbTrades,
    nbProfits,
    nbLosses,
    nbLots,
    totalProfit,
    totalPositiveProfit,
    totalNegativeProfit,
  } = TradesData();
  // console.log(liveTradesData, tradesDay, nbTrades);

  return (
    <Fragment>
      <MainLayoutWithHeader page="trades" title="Trades">
        {liveTrades?.length > 0 && (
          <section className="mt-2 max-w-full">
            <SubTitle3 className="">Live trades</SubTitle3>
            <div className="flex mb-2 mt-1 gap-2">
              <h6 className="text-text text-sm rounded px-1.5 outline outline-1 outline-dashed outline-primary/60">
                {liveTrades.length} Trades
              </h6>
              <h6 className="text-long text-sm rounded px-1.5 outline outline-1 outline-dashed outline-long/60">
                {liveTrades.reduce((v, t) => (t.type == "buy" ? v + 1 : v), 0)}{" "}
                Buy
              </h6>
              <h6 className="text-short text-sm rounded px-1.5 outline outline-1 outline-dashed outline-short/60">
                {liveTrades.reduce((v, t) => (t.type == "sell" ? v + 1 : v), 0)}{" "}
                Sell
              </h6>
            </div>
            <div className="w-full flex flex-col md:flex-row ">
              <div className="w-full sm:w-9/12 ">
                <LiveTradeTable data={liveTrades} className="max-h-56" />
              </div>

              <div className=" flex flex-col items-center p-2 mx-auto mt-2">
                <DoughnutChart
                  className=""
                  labels={liveTradesData.labels}
                  data={liveTradesData.data.map((v) => Math.abs(v))}
                  colors={liveTradesData.colors}
                >
                  <div className=" bg-bgt aspect-square rounded-full flex flex-col items-center justify-center">
                    <div className="text-sm text-text">Profit</div>
                    <span className="text-xl font-semibold text-profit">
                      {Number(
                        liveTradesData.data.reduce((p, v) => p + v, 0)
                      ).toFixed(2) || 0}
                    </span>
                  </div>
                </DoughnutChart>
                <div className="grid grid-cols-3 gap-2 mt-4">
                  {liveTradesData.data?.map((pair, i) => (
                    <div
                      key={i}
                      className="text-text text-xs font-semibold flex items-center"
                    >
                      <div
                        className="h-2 aspect-square rounded-full mr-1"
                        style={{
                          backgroundColor: liveTradesData.colors[i],
                        }}
                      ></div>{" "}
                      {liveTradesData.labels[i]}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        <section className="w-full mt-6">
          {trades?.length > 0 ? (
            <Fragment>
              <SubTitle3 className="mt-6">History Performance</SubTitle3>
              <section className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                {nbTrades?.length > 0 && (
                  <div className="bg-primary/[0.05] p-2 rounded-lg">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Trades{" "}
                        <span className="text-primary text-sm">
                          {nbTrades[0].data.reduce((v, p) => v + p, 0)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long  text-sm">
                            {nbTrades[2].data.reduce((v, p) => v + p, 0)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short  text-sm">
                            {nbTrades[1].data.reduce((v, p) => v + p, 0)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div>
                      <LineChart
                        className=" h-36"
                        data={nbTrades}
                        chartId="nb"
                        minYAxis={0}
                      />
                    </div>
                  </div>
                )}
                {nbProfits?.length > 0 && (
                  <div className="border-primary/30 rounded-lg border-none p-2 bg-profit/[0.05]">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Trades won{" "}
                        <span className="text-profit text-sm">
                          {nbProfits[0].data.reduce((v, p) => v + p, 0)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long text-sm">
                            {nbProfits[2].data.reduce((v, p) => v + p, 0)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short text-sm">
                            {nbProfits[1].data.reduce((v, p) => v + p, 0)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="">
                      <LineChart
                        className=" h-36"
                        data={nbProfits}
                        chartId="nbProfit"
                        minYAxis={0}
                      />
                    </div>
                  </div>
                )}
                {nbLosses?.length > 0 && (
                  <div className=" rounded-lg  p-2 bg-loss/[0.05]">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Trades loss{" "}
                        <span className="text-loss text-sm">
                          {nbLosses[0].data.reduce((v, p) => v + p, 0)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long text-sm">
                            {nbLosses[2].data.reduce((v, p) => v + p, 0)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short text-sm">
                            {nbLosses[1].data.reduce((v, p) => v + p, 0)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="">
                      <LineChart
                        className=" h-36"
                        data={nbLosses}
                        chartId="nbProfit"
                        minYAxis={0}
                      />
                    </div>
                  </div>
                )}

                {nbLots?.length > 0 && (
                  <div className="bg-primary/[0.05] p-2 rounded-lg">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Volume{" "}
                        <span className="text-primary text-sm">
                          {Number(
                            nbLots[0].data.reduce((v, p) => v + p, 0)
                          ).toFixed(2)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long text-sm">
                            {Number(
                              nbLots[2].data.reduce((v, p) => v + p, 0)
                            ).toFixed(2)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short text-sm">
                            {Number(
                              nbLots[1].data.reduce((v, p) => v + p, 0)
                            ).toFixed(2)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div>
                      <LineChart
                        className=" h-36"
                        data={nbLots}
                        chartId="nbLots"
                        minYAxis={0}
                      />
                    </div>
                  </div>
                )}

                {totalProfit?.length > 0 && (
                  <div className="bg-primary/[0.05] p-2 rounded-lg">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Total profit{" "}
                        <span className="text-primary text-sm">
                          {Number(
                            totalProfit[0].data.reduce((v, p) => v + p, 0)
                          ).toFixed(2)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long text-sm">
                            {Number(
                              totalProfit[2].data.reduce((v, p) => v + p, 0)
                            ).toFixed(2)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short text-sm">
                            {Number(
                              totalProfit[1].data.reduce((v, p) => v + p, 0)
                            ).toFixed(2)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div>
                      <LineChart
                        className=" h-36"
                        data={totalProfit}
                        chartId="totalProfit"
                      />
                    </div>
                  </div>
                )}

                {totalPositiveProfit?.length > 0 && (
                  <div className="border-primary/30 rounded-lg border-none p-2 bg-profit/[0.05]">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Profit trades{" "}
                        <span className="text-profit text-sm">
                          {Number(
                            totalPositiveProfit[0].data.reduce(
                              (v, p) => v + p,
                              0
                            )
                          ).toFixed(2)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long text-sm">
                            {Number(
                              totalPositiveProfit[2].data.reduce(
                                (v, p) => v + p,
                                0
                              )
                            ).toFixed(2)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short text-sm">
                            {Number(
                              totalPositiveProfit[1].data.reduce(
                                (v, p) => v + p,
                                0
                              )
                            ).toFixed(2)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="">
                      <LineChart
                        className=" h-36"
                        data={totalPositiveProfit}
                        chartId="profitProfit"
                      />
                    </div>
                  </div>
                )}
                {totalNegativeProfit?.length > 0 && (
                  <div className=" rounded-lg  p-2 bg-loss/[0.05]">
                    <div className="text-xs text-text/80">
                      <h6 className="font-semibold text-text">
                        Loss trades{" "}
                        <span className="text-loss text-sm">
                          {Number(
                            totalNegativeProfit[0].data.reduce(
                              (v, p) => v + p,
                              0
                            )
                          ).toFixed(2)}
                        </span>
                      </h6>
                      <div className="flex items-center">
                        <h6 className=" mr-2">
                          Long{" "}
                          <span className="text-long text-sm">
                            {Number(
                              totalNegativeProfit[2].data.reduce(
                                (v, p) => v + p,
                                0
                              )
                            ).toFixed(2)}
                          </span>
                        </h6>
                        <h6 className="">
                          Short{" "}
                          <span className="text-short text-sm">
                            {Number(
                              totalNegativeProfit[1].data.reduce(
                                (v, p) => v + p,
                                0
                              )
                            ).toFixed(2)}
                          </span>
                        </h6>
                      </div>
                    </div>
                    <div className="">
                      <LineChart
                        className=" h-36"
                        data={totalNegativeProfit}
                        chartId="lossProfit"
                      />
                    </div>
                  </div>
                )}
              </section>

              <SubTitle3 className="mt-4">History calendar</SubTitle3>
              <section className="mt-2">
                <TradeCalander data={tradesDay} className="w-7/12i" />
              </section>

              <SubTitle3 className="mt-4">History trades</SubTitle3>
              <section className="mt-2">
                <HistoryTradeTable data={trades} className="imax-h-64" />
              </section>
            </Fragment>
          ) : trades === null ? (
            <Fragment>
              <RectangleSkeleton className="" />
              <RectangleSkeleton className="mt-4" />
              <RectangleSkeleton className="mt-4" />
            </Fragment>
          ) : (
            <Fragment></Fragment>
          )}
        </section>
      </MainLayoutWithHeader>
    </Fragment>
  );
}

export default withAuth(TradesPage);
