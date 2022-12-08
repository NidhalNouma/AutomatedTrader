import React, { useState, useEffect } from "react";
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
import "chartjs-plugin-style";
import { H5, H6 } from "../../Components/H";
import moment from "moment";

import { txtColorFromBg } from "../../utils/functions";
import tailwindConfig from "../../tailwind.config.js";

import {
  GetMTAccountsContext,
  getDataFromAccountPerPeriod,
  getFullYearMonths,
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
  // ChartStyle
);

const options = {
  responsive: true,

  elements: {
    point: {
      radius: 0,
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

function WebhookLineChart({ webhook }) {
  const { mtAccounts } = GetMTAccountsContext();

  const pdata = [];

  const allData = mtAccounts.map(
    (account) =>
      getDataFromAccountPerPeriod(account, getFullYearMonths(), webhook.id)
        .tPerc
  );

  const dayData = mtAccounts.map(
    (account) =>
      getDataFromAccountPerPeriod(account, [
        moment().startOf("day").toString(),
        moment().endOf("day").toString(),
        // new Date().setDate(new Date().getDate() - 1),
        // new Date().setDate(new Date().getDate()),
      ]).tPerc
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
  while (values[values.length - 1] === 0) {
    // While the last element is a 0,
    // console.log(values[values.length - 1]);
    keys.pop(); // Remove that last element
    values.pop();
  }

  // const ddata = allData

  // console.log(allData, webhook, pdata, Object.values(pdata), values);

  const totalp = Object.values(pdata).reduce((p, v) => p + v, 0);

  const [data, setDate] = useState({
    labels: keys.map((v) =>
      new Date(v).toLocaleString("default", { month: "long" }).substring(0, 3)
    ),
    datasets: [
      {
        // pointColor: webhook.color,
        // pointStrokeColor: webhook.color,
        borderColor: webhook.color,
        // pointBackgroundColor: webhook.color,
        lineTension: 0.25,
        fill: true,
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

  return (
    <div className="p-0 w-full">
      {/* WebhookLineChart */}
      <H5 className="font-bold">%{totalp.toFixed(1)}</H5>
      <Line
        options={options}
        data={data}
        className="max-w-full"
        redraw={true}
      />
      <div
        className="mt-1 p-2 rounded-xl"
        style={{ backgroundColor: webhook.color }}
      >
        <H5 style={{ color: txtColor }}>{webhook.name}</H5>
        <div className="flex justify-between items-center mt-1">
          <div className="">
            <H6>Total</H6>
            <H5 className="font-bold" style={{ color: txtColor }}>
              %{totalp.toFixed(1)}
            </H5>
          </div>

          <div className="">
            <H6>Today</H6>
            <H5 className="font-bold" style={{ color: txtColor }}>
              %{totald.toFixed(1)}
            </H5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebhookLineChart;
