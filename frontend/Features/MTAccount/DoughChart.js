import React from "react";
import { H4, Hi5 } from "../../components/H";
import { CheckCircleIcon } from "@heroicons/react/solid";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function DoughChart({ adata, total }) {
  const clrs = [
    "rgba(237,	11,	232	, 1)",
    "rgba(17,	255,	174	, 1)",
    "rgba(67,	3,	236	, 1)",
    "rgba(75, 192, 192, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const data = Object.values(adata);

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
        donut: {
          size: "95%",
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
    labels: Object.keys(adata),
    fill: {
      type: "gradient",
      opacity: 1,
      // pattern: {
      //   enabled: true,
      //   style: ["verticalLines"],
      // },
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
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
    colors: clrs,
  };

  return (
    <div className="ml-5 flex flex-col items-center justify-center">
      <div className="relative my-auto">
        <ReactApexChart
          className="flex justify-center items-cente w-full"
          options={options}
          series={data.map((v) => Math.abs(v))}
          type="donut"
          // width={260}
        />
        <div className="w-28 h-28 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10 rounded-full bg-bgt flex justify-center items-center">
          <div className="text-center">
            <H4>${total.total.toFixed(2)}</H4>
            <Hi5>Total profit</Hi5>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 justify-center items-center mt-4">
        {Object.keys(adata).map(
          (v, i) =>
            i < 6 && (
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
            )
        )}
      </div>
    </div>
  );
}

export default DoughChart;
