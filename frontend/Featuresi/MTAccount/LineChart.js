import React, { useState, useEffect } from "react";
import { H2 } from "../../components/H";
import { Select1 } from "../../components/Input";
import { ButtonGroup, Button } from "react-daisyui";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";

import { addAlpha } from "../../utils/functions";
import moment from "moment";
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function App({ accounts }) {
  const period = ["Week", "Month", "Year"];
  const [speriod, setSperiod] = useState(period[2]);
  const [sum, setSum] = useState(0.0);
  const [type, setType] = useState(0);

  const [data, setData] = useState(null);
  const [options, setOptions] = useState(null);

  useEffect(() => {
    setSum(0);

    let per = getDaysFromTimeTillNow(moment().subtract(7, "d"));
    if (speriod === period[1])
      per = getDaysFromTimeTillNow(moment().subtract(30, "d"));
    else if (speriod === period[2])
      per = getDaysFromTimeTillNow(moment().subtract(365, "d"));

    let labels = [];
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
        name: account.accountDisplayName,
        data: Object.values(d).map((v, i) => Number(v.toFixed(2))),
        // data: [31, 40, 28, 51, 42, 109, 100],
      };
    });

    let fullArr = [];
    datasets.forEach((e) => {
      fullArr = [...fullArr, ...e.data];
    });

    const maxArr = Math.max(...fullArr);
    const minArr = Math.min(...fullArr);

    let max = maxArr > -minArr ? maxArr : -minArr;
    let min = -maxArr > minArr ? minArr : -maxArr;

    if (maxArr === 0 && minArr === 0) {
      max = 100;
      min = -100;
    }

    setOptions({
      chart: {
        parentHeightOffset: 5,

        // stacked: true,
        zoom: {
          enabled: false,
          type: "x",
          autoScaleYaxis: true,
        },
        toolbar: {
          show: false,
        },
        height: "auto",
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        curve: "smooth",
        width: 1.5,
        lineCap: "square",
      },

      xaxis: {
        labels: {
          show: true,
        },

        // type: "datetime",
        categories: labels,
        axisBorder: {
          show: false,
        },

        axisTicks: {
          show: false,
        },
      },

      yaxis: {
        show: false,
        max: max,
        min: min,

        // logarithmic: true,
        // forceNiceScale: true,
      },

      tooltip: {
        style: {},
        x: {
          show: false,
          format: "dd/MM/yy HH:mm",
        },
        y: {
          formatter: function (
            value,
            { series, seriesIndex, dataPointIndex, w }
          ) {
            return value.toFixed(2);
          },
        },
      },

      grid: {
        show: false,
      },
      legend: {
        show: false,
      },
      fill: {
        colors: accounts?.map((account) => account.color),
        opacity: 0.1,
        strokeWidth: 1,

        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 0.1,
          gradientToColors: accounts?.map((account) => "#070707"),
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0,
          stops: [0, 90],
          // colorStops: accounts?.map((account) => "#070707"),
        },
      },

      plotOptions: {
        area: {
          fillTo: "origin",
        },
      },
      colors: accounts?.map((account) => account.color),
    });

    setData(datasets);
  }, [speriod, type, accounts]);

  // useEffect(() => {
  //   console.log(options, data);
  // }, [data, options]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-end mb-2">
        <div className="ml-3">
          <H2>Overall</H2>
          <H2>$ {Number(sum).toFixed(2)}</H2>
        </div>

        <div className="flex items-center">
          <div className="hidden sm:block">
            <ButtonGroup>
              <Button
                size="sm"
                className={`capitalize !text-xs rounded bg-bgt !border-transparent ${
                  type === 0 && "text-primary"
                }`}
                onClick={() => setType(0)}
              >
                Total
              </Button>
              <Button
                size="sm"
                className={`capitalize !text-xs bg-bgt !border-transparent  ${
                  type === 1 && "text-primary"
                }`}
                onClick={() => setType(1)}
              >
                Profit
              </Button>
              <Button
                size="sm"
                className={`capitalize !text-xs rounded bg-bgt !border-transparent  ${
                  type === 2 && "text-primary"
                }`}
                onClick={() => setType(2)}
              >
                Loss
              </Button>
            </ButtonGroup>
          </div>

          <div className="">
            <Select1
              className="!outline-none !focus:outline-none !border-bgt !focus:border-bgt bg-bgt"
              name=""
              helper=""
              options={period}
              value={speriod}
              defaultValue={period.indexOf(speriod)}
              setValue={(i) => setSperiod(period[i])}
            />
          </div>
        </div>
      </div>
      {typeof window !== "undefined" && data?.length > 0 && options && (
        <ReactApexChart
          className="h-full"
          options={options}
          series={data}
          type="area"
          width={"100%"}
          // height={"100%"}
        />
      )}
    </div>
  );
}
