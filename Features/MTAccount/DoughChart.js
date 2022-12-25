import React from "react";
import { H4, Hi5 } from "../../Components/H";
import { CheckCircleIcon } from "@heroicons/react/solid";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function DoughChart({ adata, total }) {
  const clrs = [
    "rgba(237,	11,	232	, 1)",
    "rgba(17,	255,	174	, 1)",
    "rgba(67,	3,	236	, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const data = {
    labels: Object.keys(adata),
    datasets: [
      {
        label: "# of Votes",
        data: Object.values(adata),
        backgroundColor: clrs,
        borderColor: clrs,
        borderWidth: 1,
      },
    ],
  };
  const ShadowPlugin = {
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      // ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
      console.log(options, args, chart, chart._options.color);
      const color = options.color || chart._options.color;
      // ctx.shadowColor = addAlpha(color, 1);
      ctx.shadowColor = color;
      ctx.shadowBlur = 20;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 0;
    },
    defaults: {
      // color: accounts[0].color,
      color: "rgba(120, 120, 120, 0.2)",
    },
  };

  const options = {
    cutout: 70,
    responsive: true,
    maintainAspectRatio: false,

    fillStyle: "#000",

    layout: {
      padding: {
        top: 0,
      },
    },

    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },

      tooltip: {
        enabled: false,
      },
      title: {
        display: false,
        //   text: "Chart.js Line Chart",
      },
      bezierCurve: true,
    },
  };

  return (
    <div className="ml-5 flex flex-col items-center justify-center">
      <div className="relative my-auto">
        <Doughnut
          className="flex justify-center items-cente"
          // className="relative mt-auto"
          data={data}
          options={options}
          plugins={[ShadowPlugin]}
          //   height="150"
          //   width="150"
        ></Doughnut>
        <div className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-accent flex justify-center items-center">
          <div className="text-center">
            <H4>${total.total.toFixed(2)}</H4>
            <Hi5>Total profit</Hi5>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center mt-4">
        {Object.keys(adata).map((v, i) => (
          <div className="mx-1 mt-1 flex items-center" key={i}>
            <CheckCircleIcon
              className="h-2 w-2 mr-2"
              color={clrs[i]}
            ></CheckCircleIcon>
            <span className="text-xs text-text-p">{v}</span>
            <span className="text-xs text-text-h ml-1">
              ${adata[v].toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoughChart;
