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
import { H2 } from "../../Components/H";
import { Select1 } from "../../Components/Input";
import { ButtonGroup, Button } from "react-daisyui";

import {
  getDataFromAccountPerPeriod,
  getLastWeek,
  getLastMonth,
  getLastYear,
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

export default function App({ accounts }) {
  const period = ["Week", "Month", "Year"];
  const [speriod, setSperiod] = useState(period[0]);
  const [sum, setSum] = useState(0.0);
  const [type, setType] = useState(0);

  const [data, setData] = useState({ labels: [], datasets: [] });

  useEffect(() => {
    let per = getLastWeek();
    if (speriod === period[1]) per = getLastMonth();
    else if (speriod === period[2]) per = getLastYear();

    const labels = [];
    const datasets = accounts?.map((account) => {
      const di = getDataFromAccountPerPeriod(account, per);

      let d = di.total;
      if (type === 1) d = di.profit;
      if (type === 2) d = di.loss;

      labels = Object.keys(d)?.map(
        (v) => new Date(v).getMonth() + 1 + "/" + new Date(v).getDate()
      );

      const s = Object.values(d).reduce((p, v) => p + v, 0);
      setSum(s);

      return {
        data: Object.values(d),
        borderColor: account.color || "rgb(52, 54, 59)",
        backgroundColor: account.color
          ? addAlpha(account.color, 0.3)
          : "rgba(52, 54, 59, 0.3)",
        lineTension: 0.25,
        fill: true,
        label: account.accountName,
      };
    });

    const idata = {
      labels: labels,
      datasets,
    };

    setData(idata);
  }, [speriod, type]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-end mb-2">
        <div className="ml-3">
          <H2>Overall</H2>
          <H2>$ {sum.toFixed(2)}</H2>
        </div>

        <div className="flex items-center">
          <ButtonGroup>
            <Button
              size="sm"
              className={`capitalize !text-xs rounded bg-accent ${
                type === 0 && "text-primary"
              }`}
              onClick={() => setType(0)}
            >
              Total
            </Button>
            <Button
              size="sm"
              className={`capitalize !text-xs bg-accent ${
                type === 1 && "text-primary"
              }`}
              onClick={() => setType(1)}
            >
              Profit
            </Button>
            <Button
              size="sm"
              className={`capitalize !text-xs rounded bg-accent ${
                type === 2 && "text-primary"
              }`}
              onClick={() => setType(2)}
            >
              Drawdown
            </Button>
          </ButtonGroup>

          <div className="">
            <Select1
              className="!outline-none !focus:outline-none !border-bga !focus:border-bga bg-bg"
              name=""
              helper=""
              options={period}
              value={speriod}
              setValue={(i) => setSperiod(period[i])}
            />
          </div>
        </div>
      </div>
      <Line options={options} data={data} redraw={true} />
    </div>
  );
}

function addAlpha(color, opacity) {
  //   // coerce values so ti is between 0 and 1.
  //   var _opacity = Math.round(Math.min(Math.max(opacity || 1, 0), 1) * 255);
  //   return color + _opacity.toString(16).toUpperCase();

  const r = color.replace(/[\d\.]+\)$/g, opacity);
  return r;
}
