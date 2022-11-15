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
import { H2 } from "../../Components/H";

import { getDataPerAccountLastWeek, lastWeek } from "../../hooks/MTAccounts";

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
      display: true,
      position: "bottom",
    },
    title: {
      display: false,
      //   text: "Chart.js Line Chart",
    },
  },
};

export default function App({ accounts }) {
  const data = {
    labels: lastWeek(),
    datasets: accounts.map((account) => ({
      fill: true,
      label: account.accountName,
      data: getDataPerAccountLastWeek(account).total,
      borderColor: account.color || "rgb(52, 54, 59)",
      backgroundColor: account.color
        ? addAlpha(account.color, 0.3)
        : "rgba(52, 54, 59, 0.3)",
      lineTension: 0.25,
    })),
  };

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-center">
        <H2>Overall</H2>
      </div>
      <Line options={options} data={data} />
    </div>
  );
}

function addAlpha(color, opacity) {
  // coerce values so ti is between 0 and 1.
  var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  return color + _opacity.toString(16).toUpperCase();
}
