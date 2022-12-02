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
import { H5, H6, Hi6 } from "../../Components/H";

import { txtColorFromBg } from "../../utils/functions";
import tailwindConfig from "../../tailwind.config.js";

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
  },
};

function WebhookLineChart({ webhook }) {
  const [data, setDate] = useState({
    labels: [1, 2, 3, 4, 5],
    datasets: [
      {
        pointColor: webhook.color,
        pointStrokeColor: webhook.color,
        borderColor: webhook.color,
        backgroundColor: "rgba(52, 54, 59, 0.1)",
        lineTension: 0.4,
        fill: true,
        data: [4, 3, 6, 2, 8],
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
      <H5 className="">%87</H5>
      <Line options={options} data={data} className="max-w-full" />
      <div
        className="mt-1 p-2 rounded-xl"
        style={{ backgroundColor: webhook.color }}
      >
        <H6 style={{ color: txtColor }}>{webhook.name}</H6>
        <div className="flex justify-between items-center">
          <div className="">
            <Hi6>Total</Hi6>
            <H5 style={{ color: txtColor }}>%80</H5>
          </div>

          <div className="">
            <Hi6>Today</Hi6>
            <H5 style={{ color: txtColor }}>%23</H5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WebhookLineChart;
