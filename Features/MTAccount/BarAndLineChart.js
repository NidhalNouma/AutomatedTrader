import React, { useState, useEffect } from "react";
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
import ChartDataLabels from "chartjs-plugin-datalabels";
import { H3, H2 } from "../../Components/H";
import { Select1 } from "../../Components/Input";
import moment from "moment";
import tailwindConfig from "../../tailwind.config.js";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";

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
    x: {
      ticks: {
        font: {
          size: 10,
        },
      },
    },

    y: {
      display: false, //this will remove all the x-axis grid lines
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

    datalabels: {
      display: false,
      formatter: (v) => v.toFixed(1),
      anchor: "end",
      offset: -18,
      align: "start",

      font: {
        size: 10,
      },
    },
  },
};

export default function BarAndLineChart({ accounts }) {
  const period = ["Week", "Month", "Year"];
  const [speriod, setSperiod] = useState(period[2]);
  const [account, setAccount] = useState(accounts[0]);
  const [data, setData] = useState({});

  const d = getDataFromAccountPerPeriod(
    account,
    getDaysFromTimeTillNow(moment().startOf("year"))
  );
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

  const total = Object.values(d.tPerc).reduce((p, v) => p + v, 0);
  const totalm = Object.values(dm.tPerc).reduce((p, v) => p + v, 0);
  const totalw = Object.values(dw.tPerc).reduce((p, v) => p + v, 0);
  const totald = Object.values(dd.tPerc).reduce((p, v) => p + v, 0);

  const colors = tailwindConfig.theme.colors;

  useEffect(() => {
    const sep = 12;
    // let sepTime = moment().startOf("week");
    let sepTime = moment().subtract(7, "d");
    if (speriod === period[1]) sepTime = moment().startOf("month");
    if (speriod === period[2]) sepTime = moment().startOf("year");

    const di = getDataFromAccountPerPeriod(
      account,
      getDaysFromTimeTillNow(sepTime)
    );

    const datai = {
      labels: Object.keys(cleanData(di.tPerc, sep)).map(
        (v) =>
          new Date(v).getDate() +
          " " +
          new Date(v)
            .toLocaleString("default", { month: "long" })
            .substring(0, 3)
      ),
      datasets: [
        {
          type: "line",
          label: "Drawdown",
          borderColor: "rgb(60, 168, 162)",
          borderWidth: 2,
          // fill: false,
          data: Object.values(cleanData(di.tPerc, sep)),
          lineTension: 0.3,
          fill: true,
          backgroundColor: "rgba(60, 168, 162,0.2)",
          datalabels: {
            display: false,
            color: colors["text-p"],
          },
        },
        {
          type: "bar",
          label: "Gain",
          borderColor: "rgb(53, 162, 235)",
          borderWidth: 1,
          backgroundColor: "rgb(53, 162, 235)",
          data: Object.values(cleanData(di.pPerc, sep)),
          barPercentage: 0.35,
          categoryPercentage: 1,
          borderRadius: 25,
          datalabels: {
            color: colors["text-p"],
          },
        },
      ],
    };

    setData(datai);
  }, [speriod, account]);

  return (
    <div className="">
      <div className="mb-2">
        <div className="flex items-center justify-start">
          <H3>Gains</H3>
          <div className="ml-2">
            <Select1
              className="!ml-0 !outline-none !focus:outline-none !border-bga !focus:border-bga"
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
          <H2>{total.toFixed(1) + "%"}</H2>
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
                {totald.toFixed(1) + "%"}
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
                {totalw.toFixed(1) + "%"}
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
                {totalm.toFixed(1) + "%"}
              </span>
            </div>
            <div className="flex flex-col items-center">
              <span className="text-xs text-text-h">year</span>
              <span
                className={`text-xs ${
                  total > 0 ? "text-blue-500" : total < 0 ? "text-red-500" : ""
                }`}
              >
                {total.toFixed(1) + "%"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-bg rounded-xl p-2">
        <div className="flex justify-between items-center">
          <span className="text-text-h text-xs">Percentage analytics</span>

          <div className="">
            <Select1
              className="!m-0 !p-0 !w-16 !outline-none !focus:outline-none !border-bg !focus:border-bg !bg-bg"
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
        {data.datasets && (
          <Chart
            className=""
            type="bar"
            data={data}
            options={options}
            plugins={[ChartDataLabels]}
          />
        )}
      </div>
    </div>
  );
}
