import React, { useState } from "react";
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
import { H2 } from "../../Components/H";
import { Select1 } from "../../Components/Input";

import { getDataPerAccountMonths, monthNamesI } from "../../hooks/MTAccounts";

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
      display: false,
      position: "bottom",
    },
    title: {
      display: false,
      //   text: "Chart.js Line Chart",
    },
  },
};

export default function BarAndLineChart({ accounts }) {
  const [account, setAccount] = useState(accounts[0]);
  const d = getDataPerAccountMonths(accounts[0]).total;

  const data = {
    labels: monthNamesI,
    datasets: [
      {
        type: "line",
        label: "Drawdown",
        borderColor: "rgb(153, 102, 255)",
        borderWidth: 2,
        fill: false,
        data: Object.values(getDataPerAccountMonths(account).loss),

        lineTension: 0.3,
      },
      {
        type: "bar",
        label: "Gain",
        backgroundColor: "rgb(53, 162, 235)",
        data: Object.values(getDataPerAccountMonths(account).total),
        barPercentage: 0.35,
        categoryPercentage: 1,
        borderRadius: 25,

        // barThickness: 8,
        // maxBarThickness: 3,
      },

      //   {
      //     type: "bar",
      //     label: "Loss",
      //     backgroundColor: "rgb(255, 99, 132)",
      //     data: Object.values(lArr()),
      //     barPercentage: 0.35,
      //     categoryPercentage: 1,
      //     borderRadius: 25,

      //     barThickness: 5,
      //     // maxBarThickness: 3,
      //   },
    ],
  };

  return (
    <div className="">
      <div className="mb-2 flex justify-between items-center">
        <H2>Gains</H2>

        <Select1
          className="!outline-none !focus:outline-none !border-bga !focus:border-bga"
          name=""
          helper=""
          options={accounts.map((account) => account.accountName)}
          value={account}
          setValue={(i) => setAccount(accounts[i])}
        />
      </div>
      <Chart
        className="bg-bg rounded-xl p-2"
        type="bar"
        data={data}
        options={options}
      />
    </div>
  );
}
