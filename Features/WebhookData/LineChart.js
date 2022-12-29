import { useState, useEffect } from "react";
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
import { H5, H4 } from "../../Components/H";
import { Select1 } from "../../Components/Input";
import moment from "moment";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
} from "../../hooks/MTAccounts";
import { addAlpha } from "../../utils/functions";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
  // ChartStyle
);

const options = {
  responsive: true,

  elements: {
    point: {
      // radius: 1,
    },
    line: {
      borderJoinStyle: "round",
      borderWidth: 2,
      tension: 0.23,
    },
  },

  scales: {
    x: {
      ticks: {
        display: true, //this will remove only the label
      },
      display: true, //this will remove all the x-axis grid lines
    },

    y: {
      ticks: {
        display: false, //this will remove only the label
      },
      display: false, //this will remove all the y-axis grid lines
    },
  },
  hover: {
    mode: "index",
    intersect: false,
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
    tooltip: {
      // enabled: false,
      mode: "index",
      intersect: false,
      // backgroundColor: "rgba(0, 120, 30, 0.8)",
      titleFontSize: 14,
      titleFontColor: "#0066ff",
      bodyFontColor: "#000",
      bodyFontSize: 12,
      displayColors: false,
      displayY: false,
      // formatter: (v) => v.toFixed(2),

      // callbacks: {
      //   footer: (tooltipItems) => {
      //     let sum = 0;

      //     tooltipItems.forEach(function (tooltipItem) {
      //       sum += tooltipItem.parsed.y;
      //     });
      //     return "Sum: " + sum.toFixed(2);
      //   },
      // },
    },
  },
};

function LineChart({ webhook, mtAccounts }) {
  const period = ["Week", "Month", "Year", "All"];
  const [speriod, setSperiod] = useState(period[3]);
  const [data, setData] = useState({});
  const [totalp, setTotalp] = useState(0);

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

    setData({
      labels: keys.map(
        (v) =>
          new Date(v).getDate() +
          " " +
          new Date(v)
            .toLocaleString("default", { month: "long" })
            .substring(0, 3)
      ),
      datasets: [
        {
          pointBackgroundColor: webhook.color,
          pointColor: webhook.color,
          pointStrokeColor: webhook.color,
          borderColor: addAlpha(webhook.color, 1),
          // pointBackgroundColor: webhook.color,
          // lineTension: 0,
          fill: false,
          data: values,

          pointHoverBackgroundColor: webhook.color,
          pointHoverBorderColor: webhook.color,
          pointHoverRadius: 3,

          pointRadius: values.map((v, i) => (i === values.length - 1 ? 3 : 0)),

          // shadowOffsetX: 5,
          // shadowOffsetY: 5,
          // shadowBlur: 5,
          // shadowColor: webhook.color,
          // shadowColor: "rgba(210, 255, 59, 1)",

          // hoverInnerGlowWidth: 20,
          // hoverInnerGlowColor: "rgb(255, 255, 0)",
          // hoverOuterGlowWidth: 20,
          // hoverOuterGlowWidth: "rgb(255, 255, 0)",
        },
      ],
    });
  }, [speriod]);

  const ShadowPlugin = {
    beforeDraw: (chart, args, options) => {
      const { ctx } = chart;
      // ctx.shadowColor = "rgba(0, 255, 255, 0.5)";
      // console.log(options, args);
      const color = options.color || webhook.color;
      ctx.shadowColor = addAlpha(color, 1);
      ctx.shadowBlur = 23;
      ctx.shadowOffsetX = 0;
      ctx.shadowOffsetY = 10;
    },
  };

  return (
    <div>
      <div className="flex justify-between items-end">
        <div className="">
          <H4 className="font-bold">Overall</H4>
          <H5 className="font-bold">{totalp.toFixed(2)}%</H5>
        </div>

        <div className="">
          <Select1
            className="!m-0 !p-0 !w-16 !outline-none !focus:outline-none !border-bg !focus:border-bg !bg-bg"
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
        {data?.datasets && (
          <Line
            options={options}
            data={data}
            className="max-w-full"
            redraw={true}
            plugins={[ShadowPlugin]}
          />
        )}
      </div>
    </div>
  );
}

export default LineChart;
