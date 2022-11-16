import React from "react";

import { H2, H4, Hi5 } from "../../Components/H";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie, Doughnut } from "react-chartjs-2";

function HalfDoughChart({ total }) {
  const clrs = [
    "rgba(50, 124, 255, 1)",
    "rgba(184, 211, 255, 1)",
    // "rgba(255, 206, 86, 1)",
    // "rgba(75, 192, 192, 1)",
    // "rgba(153, 102, 255, 1)",
    // "rgba(255, 159, 64, 1)",
  ];

  const data = {
    // labels: Object.keys(adata),
    labels: ["profit", "loss"],
    datasets: [
      {
        label: "# of Votes",
        data: [total.profitCnt, total.lossCnt],
        // data: Object.values(adata),
        backgroundColor: clrs,
        borderColor: clrs,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    cutout: 50,
    responsive: true,

    rotation: -90,
    circumference: 180,
    maintainAspectRatio: false,

    fillStyle: "#000",

    layout: {
      padding: -30,
    },

    plugins: {
      legend: {
        display: false,
        position: "bottom",
      },

      tooltips: {
        enabled: false,
      },
      title: {
        display: false,
        //   text: "Chart.js Line Chart",
      },
      bezierCurve: true,
    },
  };

  console.log(total);

  return (
    <div className="flex flex-col items-center justify-center">
      <H2 className="mr-auto">Profitability</H2>
      <div className="relative my-auto mt-3">
        <Doughnut
          className="flex justify-center items-cente"
          // className="relative mt-auto"
          data={data}
          options={options}
          borderWidth={6}
          //   height="150"
          //   width="150"
        ></Doughnut>
        <div
          style={{ backgroundColor: clrs[0] }}
          className="w-24 h-24 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-accent flex justify-center items-center"
        >
          <div className="text-center">
            <H4>
              {(
                (total.profitCnt / (total.profitCnt + total.lossCnt)) *
                100
              ).toFixed(1)}
              %
            </H4>
          </div>
        </div>
      </div>

      <div className="mt-14"></div>
    </div>
  );
}

export default HalfDoughChart;
