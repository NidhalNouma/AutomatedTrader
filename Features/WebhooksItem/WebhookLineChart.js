import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { H5, H6 } from "../../Components/H";
import moment from "moment";

import { txtColorFromBg, addAlpha } from "../../utils/functions";
import tailwindConfig from "../../tailwind.config.js";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

const options = {
  responsive: true,

  elements: {
    point: {
      radius: 0,
    },
    line: {
      borderJoinStyle: "round",
      borderWidth: 2,
      tension: 0.23,
    },
  },

  scales: {
    x: {
      ticks: {
        display: false, //this will remove only the label
      },
      display: false, //this will remove all the x-axis grid lines
    },

    y: {
      ticks: {
        display: false, //this will remove only the label
      },
      display: false, //this will remove all the y-axis grid lines
    },
  },

  hover: {
    mode: "index",
    intersect: false,
  },
  plugins: {
    legend: {
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
      //   text: "Chart.js Line Chart",
    },
    tooltip: {
      // enabled: false,
      mode: "index",
      intersect: false,
      // backgroundColor: "rgba(0, 120, 30, 0.8)",
      titleFontSize: 14,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 12,
      displayColors: false,
      displayY: false,
      // formatter: (v) => v.toFixed(2),

      // callbacks: {
      //   footer: (tooltipItems) => {
      //     let sum = 0;

      //     tooltipItems.forEach(function (tooltipItem) {
      //       sum += tooltipItem.parsed.y;
      //     });
      //     return "Sum: " + sum.toFixed(2);
      //   },
      // },
    },
  },
};

function WebhookLineChart({ webhook, mtAccounts }) {
  const pdata = [];

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

  const [data, setDate] = useState({
    labels: keys.map(
      (v) =>
        new Date(v).getDate() +
        " " +
        new Date(v).toLocaleString("default", { month: "long" }).substring(0, 3)
    ),
    datasets: [
      {
        pointBackgroundColor: webhook.color,
        pointColor: webhook.color,
        pointStrokeColor: webhook.color,
        pointRadius: values.map((v, i) => (i === values.length - 1 ? 3 : 0)),
        borderColor: addAlpha(webhook.color, 1),

        // pointRadius: 0,
        pointHoverBackgroundColor: webhook.color,
        pointHoverBorderColor: webhook.color,
        pointHoverRadius: 3,

        // pointBackgroundColor: webhook.color,
        lineTension: 0.25,
        fill: false,
        // data: Object.values(pdata),
        data: values,

        // shadowOffsetX: 5,
        // shadowOffsetY: 5,
        // shadowBlur: 5,
        // shadowColor: "rgba(0, 255, 59, 1)",

        // hoverInnerGlowWidth: 20,
        // hoverInnerGlowColor: "rgb(255, 255, 0)",
        // hoverOuterGlowWidth: 20,
        // hoverOuterGlowWidth: "rgb(255, 255, 0)",
      },
    ],
  });

  const colors = tailwindConfig.theme.colors;

  const txtColor = txtColorFromBg(
    webhook.color,
    colors["text-p"],
    colors["text-h"]
  );

  const ShadowPlugin = {
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      // ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
      // console.log(options, args);
      const color = options.color || webhook.color;
      ctx.shadowColor = addAlpha(color, 1);
      ctx.shadowBlur = 18;
      ctx.shadowOffsetX = -2;
      ctx.shadowOffsetY = 15;
      ctx.shadowSpread = -4;
    },
  };

  return (
    <div className="p-0 w-full">
      {/* WebhookLineChart */}
      <H5 className="font-bold">{totalp.toFixed(1)}%</H5>
      <Line
        options={options}
        data={data}
        className="max-w-full"
        redraw={true}
        plugins={[ShadowPlugin]}
      />
      <Link href={"/webhook/" + webhook.id}>
        <div
          className="mt-1 p-2 rounded-xl cursor-pointer"
          style={{ backgroundColor: webhook.color }}
        >
          <H5 style={{ color: txtColor }}>{webhook.name}</H5>
          <div className="flex justify-between items-center mt-1">
            <div className="">
              <H6 style={{ color: txtColor }}>Total</H6>
              <H5 className="font-bold" style={{ color: txtColor }}>
                {totalp.toFixed(1)}%
              </H5>
            </div>

            <div className="">
              <H6 style={{ color: txtColor }}>Today</H6>
              <H5 className="font-bold" style={{ color: txtColor }}>
                {totald.toFixed(1)}%
              </H5>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default WebhookLineChart;
