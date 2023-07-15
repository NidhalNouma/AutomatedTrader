import React, { useState, useEffect } from "react";
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
import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

export default function App({ accounts }) {
  const period = ["Week", "Month", "Year"];
  const [speriod, setSperiod] = useState(period[0]);
  const [sum, setSum] = useState(0.0);
  const [type, setType] = useState(0);

  const [data, setData] = useState({ name: [], data: [] });
  const [options, setOptions] = useState({});

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
        color: account.color,
        name: account.accountDisplayName,
        data: Object.values(d),
      };
    });

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
        logarithmic: true,
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
        colors: undefined,
        opacity: 0.1,
        strokeWidth: 1,

        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors: ["#000", "#000", "#000"],
          inverseColors: false,
          opacityFrom: 0.9,
          opacityTo: 0.7,
          stops: [0, 90],
          colorStops: [],
        },
      },

      plotOptions: {
        area: {
          fillTo: "origin",
        },
      },
      colors: Object.values(datasets).map((v) => v.color),
    });

    setData(datasets);
  }, [speriod, type, accounts]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between items-end mb-2">
        <div className="ml-3">
          <H2>Overall</H2>
          <H2>$ {sum.toFixed(2)}</H2>
        </div>

        <div className="flex items-center">
          <div className="hidden sm:block">
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
          </div>

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
      {typeof window !== "undefined" && (
        <ReactApexChart
          className="h-full"
          options={options}
          series={data}
          type="area"
          // height={350}
        />
      )}
    </div>
  );
}
