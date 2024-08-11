import { useState, useEffect } from "react";
import { H5, H4 } from "../../components/H";
import { Select1 } from "../../components/Input";
import moment from "moment";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";
import { addAlpha, numToFixed } from "../../utils/functions";

import dynamic from "next/dynamic";
const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

function LineChart({ webhook, mtAccounts }) {
  const period = ["Week", "Month", "Year", "All"];
  const [speriod, setSperiod] = useState(period[3]);
  const [data, setData] = useState({});
  const [totalp, setTotalp] = useState(0);

  const [options, setOptions] = useState(null);

  useEffect(() => {
    let per = null;

    if (speriod === period[0])
      per = getDaysFromTimeTillNow(moment().subtract(7, "d"));
    else if (speriod === period[1])
      per = getDaysFromTimeTillNow(moment().subtract(30, "d"));
    else if (speriod === period[2])
      per = getDaysFromTimeTillNow(moment().subtract(365, "d"));
    else if (speriod === period[3])
      per = getDaysFromTimeTillNow(
        new Date(webhook.created_at.seconds * 1000),
        1
      );

    const pdata = [];
    const allData = mtAccounts.map((account) =>
      cleanData(
        getDataFromAccountPerPeriod(
          account,
          // getDaysFromTimeTillNow(moment().startOf("year").toString(), 1),
          per,
          webhook.id
        ).tPerc,
        12
      )
    );

    allData.forEach((d, i) => {
      // console.log(d, i);
      Object.keys(d).forEach((k) => {
        if (pdata[k] !== undefined) pdata[k] += d[k];
        else pdata[k] = d[k];
      });
    });

    setTotalp(Object.values(pdata).reduce((p, v) => p + v, 0));

    const values = Object.values(pdata);
    const keys = Object.keys(pdata);

    const maxArr = Math.max(...values);
    const minArr = Math.min(...values);

    let max = maxArr > -minArr ? maxArr : -minArr;
    let min = -maxArr > minArr ? minArr : -maxArr;

    if (maxArr === 0 && minArr === 0) {
      max = 100;
      min = -100;
    }

    const labels = keys.map(
      (v) =>
        new Date(v).getDate() +
        " " +
        new Date(v).toLocaleString("default", { month: "long" }).substring(0, 3)
    );

    setData([
      {
        name: "",
        data: values,
      },
    ]);

    setOptions({
      chart: {
        type: "area",
        height: 80,
        sparkline: {
          enabled: true,
        },

        animations: {
          enabled: true,
        },
      },
      stroke: {
        // curve: "straight",
      },
      fill: {
        opacity: 0,
        type: "gradient",
        gradient: {
          shade: "dark",
          type: "vertical",
          shadeIntensity: 1,
          gradientToColors: ["#070707"],
          inverseColors: false,
          opacityFrom: 1,
          opacityTo: 0.2,
          stops: [0, 100],
          colorStops: [],
        },
      },
      yaxis: {
        max: max,
        min: min,
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

      markers: {
        discrete: [
          {
            seriesIndex: 0,
            dataPointIndex: values.length - 1,
            fillColor: addAlpha(webhook.color, 1),
            strokeColor: addAlpha(webhook.color, 1),
            size: 4,
            shape: "circle",
          },
        ],
      },
      colors: [addAlpha(webhook.color, 1)],
    });
  }, [speriod]);

  return (
    <div>
      <div className="flex justify-between items-end">
        <div className="">
          <H4 className="font-bold">Overall</H4>
          <H5 className="font-bold">{totalp.toFixed(2)}%</H5>
        </div>

        <div className="">
          <Select1
            className="!m-0 !p-0 !w-16 !outline-none !focus:outline-none !border-bgt !focus:border-bgt"
            name=""
            helper=""
            size="sm"
            options={period}
            value={speriod}
            setValue={(i) => setSperiod(period[i])}
            defaultValue={period.indexOf(speriod)}
          />
        </div>
      </div>
      <div className="">
        {typeof window !== "undefined" && data?.length > 0 && options && (
          <ReactApexChart
            className="h-full"
            options={options}
            series={data}
            type="area"
            width={"100%"}
            height={400}
          />
        )}
      </div>
    </div>
  );
}

export default LineChart;
