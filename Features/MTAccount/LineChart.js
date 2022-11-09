import React from "react";
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

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "bottom",
    },
    title: {
      display: true,
      //   text: "Chart.js Line Chart",
    },
  },
};

const weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Last7Days() {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d);
  }

  return result;
}

function lastWeek() {
  const l7d = Last7Days();
  const r = [];
  l7d.forEach((v) => {
    const dow = new Date(v).getDay();
    r.push(weekDay[dow]);
  });

  return r.reverse();
}

export default function App({ profit, loss }) {
  console.log(profit, loss);
  console.log(Last7Days(), lastWeek());

  function lastWeekProfit() {
    const l7d = Last7Days();
    const r = [];
    l7d.forEach((v) => {
      const year = new Date(v).getFullYear();
      const month = new Date(v).getMonth();
      const day = new Date(v).getDate();

      if (profit[year] && profit[year][month] && profit[year][month][day]) {
        r.push(profit[year][month][day]?.profit);
      } else r.push(0);
    });

    return r.reverse();
  }

  function lastWeekLoss() {
    const l7d = Last7Days();
    const r = [];
    l7d.forEach((v) => {
      const year = new Date(v).getFullYear();
      const month = new Date(v).getMonth();
      const day = new Date(v).getDate();

      if (loss[year] && loss[year][month] && loss[year][month][day]) {
        r.push(loss[year][month][day]?.profit);
      } else r.push(0);
    });

    return r.reverse();
  }

  const data = {
    labels: lastWeek(),
    datasets: [
      {
        fill: true,
        label: "Loss",
        data: lastWeekLoss(),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.3)",

        lineTension: 0.25,
      },
      {
        fill: true,
        label: "Profit",
        data: lastWeekProfit(),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.3)",

        lineTension: 0.25,
      },
    ],
  };

  return <Line options={options} data={data} />;
}
