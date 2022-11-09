import React from "react";
import {
  Chart as ChartJS,
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  LinearScale,
  CategoryScale,
  BarElement,
  PointElement,
  LineElement,
  Legend,
  Tooltip,
  LineController,
  BarController
);

const options = {
  responsive: true,

  scales: {
    xAxis: [
      {
        // barThickness: 10,
        // categoryPercentage: 1,
        // barPercentage: 10,
      },
    ],
  },
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: false,
      //   text: "Chart.js Line Chart",
    },
  },
};
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const weekDay = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

export default function BarAndLineChart({ profit, loss }) {
  const pArr = () => {
    const r = {};
    const year = new Date().getFullYear();

    if (profit[year] !== undefined) {
      monthNames.forEach((v, i) => {
        if (profit[year][i] !== undefined) {
          r[v] = profit[year][i].profit;
        } else r[v] = 0;
      });
    }
    return r;
  };

  const lArr = () => {
    const r = {};
    const year = new Date().getFullYear();

    if (loss[year] !== undefined) {
      monthNames.forEach((v, i) => {
        if (loss[year][i] !== undefined) {
          r[v] = loss[year][i].profit;
        } else r[v] = 0;
      });
    }
    return r;
  };

  const tArr = () => {
    const p = pArr();
    const l = lArr();
    const r = {};

    monthNames.forEach((v, i) => {
      r[v] = p[v] + l[v];
    });
    return r;
  };

  const data = {
    labels: monthNames,
    datasets: [
      {
        type: "line",
        label: "Total",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 2,
        fill: false,
        data: Object.values(tArr()),

        lineTension: 0.3,
      },
      {
        type: "bar",
        label: "Profit",
        backgroundColor: "rgb(53, 162, 235)",
        data: Object.values(pArr()),
        barPercentage: 0.35,
        categoryPercentage: 1,
        borderRadius: 25,

        // barThickness: 8,
        // maxBarThickness: 3,
      },

      {
        type: "bar",
        label: "Loss",
        backgroundColor: "rgb(255, 99, 132)",
        data: Object.values(lArr()),
        barPercentage: 0.35,
        categoryPercentage: 1,
        borderRadius: 25,

        barThickness: 5,
        // maxBarThickness: 3,
      },
    ],
  };

  return <Chart type="bar" data={data} options={options} />;
}
