import React from "react";

import { H2, H4, Hi5 } from "../../components/H";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function HalfDoughChart({ total }) {
  const clrs = [
    "rgba(50, 124, 255, 1)",
    "rgba(184, 211, 255, 1)",
    // "rgba(255, 206, 86, 1)",
    // "rgba(75, 192, 192, 1)",
    // "rgba(153, 102, 255, 1)",
    // "rgba(255, 159, 64, 1)",
  ];

  const data = [total.profitCnt, total.lossCnt];
  const options = {
    chart: {
      type: "donut",
      dropShadow: {
        enabled: true,
        color: "#111",
        top: -1,
        left: 3,
        blur: 3,
        opacity: 0.2,
      },
      toolbar: {
        show: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      width: 0,
    },
    plotOptions: {
      pie: {
        startAngle: -90,
        endAngle: 90,
        offsetY: 10,
        donut: {
          size: "75%",
          name: {
            show: false,
          },
          labels: {
            show: false,
            total: {
              showAlways: false,
              show: true,
            },
            value: {
              show: false,
            },
          },
        },
      },
    },
    labels: ["profit", "loss"],
    fill: {
      type: "gradient",
      opacity: 1,
      // pattern: {
      //   enabled: true,
      //   style: ["verticalLines"],
      // },
    },
    grid: {
      padding: {
        bottom: -120,
      },
    },
    states: {
      hover: {
        filter: "none",
      },
    },
    // theme: {
    //   palette: "palette1",
    // },
    legend: {
      show: false,
    },
    colors: clrs,
  };

  // console.log(total);

  return (
    <div className="flex flex-col items-center justify-center">
      <H2 className="mr-auto">Profitability</H2>
      <div className="relative my-auto mt-3">
        <ReactApexChart
          className="flex justify-center items-cente w-full"
          options={options}
          series={data}
          type="donut"
          // width={400}
        />
        <div
          style={{ backgroundColor: clrs[0] }}
          className="w-20 h-20 absolute top-full left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-accent flex justify-center items-center"
        >
          <div className="text-center">
            <H4 className="!text-sm">
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
