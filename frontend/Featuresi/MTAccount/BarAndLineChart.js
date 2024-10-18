import React, { useState, useEffect } from "react";
import { H3, H2 } from "../../components/H";
import { Select1 } from "../../components/Input";
import moment from "moment";
import tailwindConfig from "../../tailwind.config.js";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";
import { numToFixed } from "../../utils/functions";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function BarAndLineChart({ accounts }) {
  const period = ["Week", "Month", "Year"];
  const [speriod, setSperiod] = useState(period[2]);
  const [account, setAccount] = useState(accounts[0]);
  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  const firstTradeOpenTime =
    account.data?.length > 0
      ? // ? moment(account.data[0]?.openTime, "YYYY.MM.DD HH:mm:ss")
        account.data[0]?.openTime
      : new Date();
  // alert(firstTradeOpenTime);
  const ds = getDataFromAccountPerPeriod(
    account,
    // getDaysFromTimeTillNow(moment(account.created_at.seconds * 1000))
    getDaysFromTimeTillNow(firstTradeOpenTime)
  );
  // console.log(
  //   ds,
  //   account.data,
  //   new Date(account.data[0]?.openTime),
  //   getDaysFromTimeTillNow(new Date(account.data[0]?.openTime))
  // );
  const dy = getDataFromAccountPerPeriod(
    account,
    getDaysFromTimeTillNow(moment().startOf("year"))
  );
  // console.log(
  //   dy,
  //   firstTradeOpenTime,
  //   getDaysFromTimeTillNow(moment().startOf("year"))
  // );
  const dm = getDataFromAccountPerPeriod(
    account,
    getDaysFromTimeTillNow(moment().startOf("month"))
  );
  const dw = getDataFromAccountPerPeriod(
    account,
    getDaysFromTimeTillNow(moment().startOf("week"))
  );
  const dd = getDataFromAccountPerPeriod(account, [
    moment().startOf("day").toString(),
    moment().endOf("day").toString(),
    // new Date().setDate(new Date().getDate() - 1),
    // new Date().setDate(new Date().getDate()),
  ]);

  const total = Object.values(ds.tPerc).reduce((p, v) => p + v, 0);
  const totaly = Object.values(dy.tPerc).reduce((p, v) => p + v, 0);
  const totalm = Object.values(dm.tPerc).reduce((p, v) => p + v, 0);
  const totalw = Object.values(dw.tPerc).reduce((p, v) => p + v, 0);
  const totald = Object.values(dd.tPerc).reduce((p, v) => p + v, 0);

  const colors = tailwindConfig.theme.colors;

  // console.log(account);

  useEffect(() => {
    const sep = 11;
    // let sepTime = moment().startOf("week");
    let sepTime = moment().subtract(7, "d");
    if (speriod === period[1]) sepTime = moment().startOf("month");
    if (speriod === period[2]) sepTime = moment().startOf("year");

    const di = getDataFromAccountPerPeriod(
      account,
      getDaysFromTimeTillNow(sepTime)
    );

    // console.log(getDaysFromTimeTillNow(sepTime));

    const gain = cleanData(di.pPerc, sep);
    const drawDown = cleanData(di.tPerc, sep);

    // console.log(gain, drawDown);

    const labels = Object.keys(gain).map((v) => {
      const date = new Date(v);

      return (
        date.getDate() +
        " " +
        date.toLocaleString("default", { month: "short" }).substring(0, 3)
      );
    });
    const datai = [
      {
        type: "area",
        name: "Drawdown",
        data: Object.values(drawDown).map((v) => Number(numToFixed(v))),
      },
      {
        type: "column",
        name: "Gain",
        data: Object.values(gain).map((v) => Number(numToFixed(v))),
      },
    ];

    setData(datai);

    // console.log(labels, options);
    setOptions({
      chart: {
        parentHeightOffset: 5,

        type: "bar",
        // stacked: true,
        zoom: {
          enabled: false,
          type: "x",
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
        height: "auto",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 2,
      },

      xaxis: {
        labels: {
          show: true,
        },

        // type: "datetime",
        categories: labels,
        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        show: false,
        // logarithmic: true,
        // forceNiceScale: true,
      },

      tooltip: {
        style: {},
        x: {
          show: false,
          format: "dd/MM/yy HH:mm",
        },
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return value.toFixed(2);
          },
        },
      },

      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      fill: {
        colors: undefined,
        // opacity: 0.1,
        strokeWidth: 2,

        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors: ["#000", "#000"],
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.7,
          stops: [0, 90],
          colorStops: [],
        },
      },

      plotOptions: {
        bar: {
          borderRadius: 5,
          columnWidth: "35%",
        },
        area: {
          fillTo: "origin",
        },
      },
      colors: ["rgb(53, 162, 235)", "rgb(60, 168, 162)"],
    });
  }, [speriod, account?.data]);

  return (
    <div className="">
      <div className="mb-2">
        <div className="flex items-center justify-start">
          <H3>Gains</H3>
          <div className="ml-2">
            <Select1
              className="!ml-0 !outline-none !focus:outline-none !border-transparent !focus:border-bgt "
              name=""
              helper=""
              size="xs"
              options={accounts.map((account) => account.accountDisplayName)}
              value={account}
              setValue={(i) => setAccount(accounts[i])}
            />
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <H2>{Number(total).toFixed(1) + "%"}</H2>
          <div className="grid grid-cols-4 gap-2">
            <div className="flex flex-col items-center">
              <span className="text-xs text-text-h">Today</span>
              <span
                className={`text-xs ${
                  totald > 0
                    ? "text-blue-500"
                    : totald < 0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {numToFixed(totald) + "%"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-text-h">week</span>
              <span
                className={`text-xs ${
                  totalw > 0
                    ? "text-blue-500"
                    : totalw < 0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {numToFixed(totalw) + "%"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-text-h">month</span>
              <span
                className={`text-xs ${
                  totalm > 0
                    ? "text-blue-500"
                    : totalm < 0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {numToFixed(totalm) + "%"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-text-h">year</span>
              <span
                className={`text-xs ${
                  totaly > 0
                    ? "text-blue-500"
                    : totaly < 0
                    ? "text-red-500"
                    : ""
                }`}
              >
                {numToFixed(totaly) + "%"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bgt rounded-xl p-2">
        <div className="flex justify-between items-center">
          <span className="text-text-h text-xs">Percentage analytics</span>

          <div className="">
            <Select1
              className="!m-0 !p-0 !w-16 !outline-none !focus:outline-none !border-transparent !focus:border-bg !bg-transparent"
              name=""
              helper=""
              size="xs"
              options={period}
              value={speriod}
              setValue={(i) => setSperiod(period[i])}
              defaultValue={period.indexOf(speriod)}
            />
          </div>
        </div>

        {data?.length > 0 && options && typeof window !== "undefined" && (
          <ReactApexChart
            className="h-full"
            options={options}
            series={data}
            width={"100%"}
            // type="line"
            // height={350}
          />
        )}
      </div>
    </div>
  );
}
