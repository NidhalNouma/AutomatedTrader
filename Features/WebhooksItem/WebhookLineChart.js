import React, { useState, useEffect } from "react";
import Link from "next/link";
import { H5, H6, H4, H3 } from "../../Components/H";
import moment from "moment";

import { txtColorFromBg, addAlpha } from "../../utils/functions";
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

function WebhookLineChart({ webhook, mtAccounts, messages }) {
  const pdata = [];

  const uniquePairs = new Set();
  const uniqueMessages = messages.filter((v) => {
    if (uniquePairs.has(v.data.pair)) {
      return false; // Duplicate pair, exclude from uniqueMessages
    } else {
      uniquePairs.add(v.data.pair);
      return true; // Unique pair, include in uniqueMessages
    }
  });

  const allData = mtAccounts.map((account) =>
    cleanData(
      getDataFromAccountPerPeriod(
        account,
        // getDaysFromTimeTillNow(moment().startOf("year").toString(), 1),
        getDaysFromTimeTillNow(new Date(webhook.created_at.seconds * 1000), 1),
        webhook.id
      ).tPerc,
      9
    )
  );

  const dayData = mtAccounts.map(
    (account) =>
      getDataFromAccountPerPeriod(
        account,
        [
          moment().startOf("day").toString(),
          moment().endOf("day").toString(),
          // new Date().setDate(new Date().getDate() - 1),
          // new Date().setDate(new Date().getDate()),
        ],
        webhook.id
      ).tPerc
  );

  let totald = 0;
  dayData.forEach((dv) => {
    const r = Object.values(dv).reduce((p, v) => p + v, 0);
    totald += r;
  });

  allData.forEach((d, i) => {
    // console.log(d, i);
    Object.keys(d).forEach((k) => {
      if (pdata[k] !== undefined) pdata[k] += d[k];
      else pdata[k] = d[k];
    });
  });

  const values = Object.values(pdata);
  const keys = Object.keys(pdata);

  const totalp = Object.values(pdata).reduce((p, v) => p + v, 0);

  const colors = tailwindConfig.theme.colors;

  const txtColor = txtColorFromBg(
    webhook.color,
    colors["bgt"],
    colors["text-h"]
  );

  const data = [
    {
      name: "",
      data: values,
    },
  ];

  const maxArr = Math.max(...values);
  const minArr = Math.min(...values);

  let max = maxArr > -minArr ? maxArr : -minArr;
  let min = -maxArr > minArr ? minArr : -maxArr;

  if (maxArr === 0 && minArr === 0) {
    max = 100;
    min = -100;
  }

  const options = {
    chart: {
      type: "area",
      height: 80,
      sparkline: {
        enabled: true,
      },

      animations: {
        enabled: false,
      },
    },
    stroke: {
      // curve: "straight",
    },
    fill: {
      opacity: 0,
      type: "gradient",
      gradient: {
        shade: "dark",
        type: "vertical",
        shadeIntensity: 1,
        gradientToColors: ["#070707"],
        inverseColors: false,
        opacityFrom: 1,
        opacityTo: 0.2,
        stops: [0, 100],
        colorStops: [],
      },
    },
    yaxis: {
      max: max,
      min: min,
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

    markers: {
      discrete: [
        {
          seriesIndex: 0,
          dataPointIndex: values.length - 1,
          fillColor: addAlpha(webhook.color, 1),
          strokeColor: addAlpha(webhook.color, 1),
          size: 4,
          shape: "circle", // "circle" | "square" | "rect"
        },
      ],
    },
    colors: [addAlpha(webhook.color, 1)],
  };

  return (
    <div className="p-0 w-full">
      {/* WebhookLineChart */}
      <H5 className="font-bold">{numToFixed(totalp)}%</H5>
      {typeof window !== "undefined" && values?.length > 0 && (
        <ReactApexChart
          className="h-full"
          options={options}
          series={data}
          type="area"
          width={"100%"}
          // height={"100%"}
        />
      )}
      {/* <Link href={"/webhook/" + webhook.id}> */}
      <div
        className="mt-1 p-2 rounded-xl cursor-pointer"
        style={{ backgroundColor: webhook.color }}
      >
        <H4 className="font-bold truncate" style={{ color: txtColor }}>
          {webhook.name}
        </H4>
        <div className="flex justify-between items-center mt-1">
          <div className="">
            <H6 style={{ color: txtColor }}>Total</H6>
            <H4 className="font-bold" style={{ color: txtColor }}>
              {numToFixed(totalp)}%
            </H4>
          </div>

          <div className="">
            <H6 style={{ color: txtColor }}>Today</H6>
            <H4 className="font-bold" style={{ color: txtColor }}>
              {numToFixed(totald)}%
            </H4>
          </div>
        </div>

        <div className="mt-0">
          {uniqueMessages?.map(
            (v, i) =>
              i < 3 && (
                <span
                  key={i}
                  className="text-xs bg-bg text-text-h px-2 py-1 rounded-xl mx-1"
                >
                  {v.data.pair}
                </span>
              )
          )}
        </div>
      </div>
      {/* </Link> */}
    </div>
  );
}

export default WebhookLineChart;
