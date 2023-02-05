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
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";

import { addAlpha } from "../../utils/functions";
import moment from "moment";

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
      // radius: 0,
    },
  },

  scales: {
    x: {
      ticks: {
        font: {
          size: 12,
        },
      },
    },

    y: {
      display: false, //this will remove all the x-axis grid lines
    },
  },

  hover: {
    mode: "index",
    intersect: false,
  },

  plugins: {
    tooltip: {
      // enabled: false,
      // mode: "index",
      intersect: false,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleFontSize: 14,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 12,
      displayColors: false,
      displayY: false,

      callbacks: {
        // footer: (tooltipItems) => {
        //   let sum = 0;
        //   tooltipItems.forEach(function (tooltipItem) {
        //     sum += tooltipItem.parsed.y;
        //   });
        //   return "Sum: " + sum.toFixed(2);
        // },
      },
    },
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
    setSum(0);

    let per = getDaysFromTimeTillNow(moment().subtract(7, "d"));
    if (speriod === period[1])
      per = getDaysFromTimeTillNow(moment().subtract(30, "d"));
    else if (speriod === period[2])
      per = getDaysFromTimeTillNow(moment().subtract(365, "d"));

    const labels = [];
    const datasets = accounts?.map((account) => {
      const di = getDataFromAccountPerPeriod(account, per);

      const sep = 16;
      let d = cleanData(di.total, sep);
      if (type === 1) d = cleanData(di.profit, sep);
      if (type === 2) d = cleanData(di.loss, sep);

      labels = Object.keys(d)?.map(
        (v) => new Date(v).getMonth() + 1 + "/" + new Date(v).getDate()
      );

      const s = Object.values(d).reduce((p, v) => p + v, 0);
      setSum((ps) => s + ps);

      return {
        data: Object.values(d),
        borderColor: account.color || "rgb(52, 54, 59)",
        // backgroundColor: account.color
        //   ? addAlpha(account.color, 0.3)
        //   : "rgba(52, 54, 59, 0.3)",
        lineTension: 0.25,
        fill: true,
        label: account.accountDisplayName,

        shadowOffsetX: 3,

        shadowOffsetY: 3,

        shadowBlur: 10,

        shadowColor: account.color,

        pointRadius: 0,
        pointHoverBackgroundColor: account.color,
        pointHoverBorderColor: account.color,
        pointHoverRadius: 3,

        // datalabels: {
        //   align: function (context) {
        //     return context.active ? "start" : "center";
        //   },
        // },
      };
    });

    const idata = {
      labels: labels,
      datasets,
    };

    setData(idata);
  }, [speriod, type]);

  const ShadowPlugin = {
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      // ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
      // console.log(options, args, chart, chart._options.color);
      const color = options.color || chart._options.color;
      // ctx.shadowColor = addAlpha(color, 1);
      ctx.shadowColor = color;
      ctx.shadowBlur = 16;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 5;
    },
    defaults: {
      // color: accounts[0].color,
      color: "rgba(255, 255, 255, 0.2)",
    },
  };

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
              className={`capitalize !text-xs rounded bg-bgt ${
                type === 0 && "text-primary"
              }`}
              onClick={() => setType(0)}
            >
              Total
            </Button>
            <Button
              size="sm"
              className={`capitalize !text-xs bg-bgt ${
                type === 1 && "text-primary"
              }`}
              onClick={() => setType(1)}
            >
              Profit
            </Button>
            <Button
              size="sm"
              className={`capitalize !text-xs rounded bg-bgt ${
                type === 2 && "text-primary"
              }`}
              onClick={() => setType(2)}
            >
              Loss
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
      <Line
        options={options}
        data={data}
        redraw={true}
        plugins={[ShadowPlugin]}
      />
    </div>
  );
}
