import { useState } from "react";
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
// import "chartjs-plugin-style";
import { H5, H4 } from "../../Components/H";
import { Select1 } from "../../Components/Input";

import {
  getDataFromAccountPerPeriod,
  getDaysFromTimeTillNow,
  cleanData,
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
  // ChartStyle
);

const options = {
  responsive: true,

  elements: {
    point: {
      radius: 0,
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

  const pdata = [];
  const allData = mtAccounts.map((account) =>
    cleanData(
      getDataFromAccountPerPeriod(
        account,
        // getDaysFromTimeTillNow(moment().startOf("year").toString(), 1),
        getDaysFromTimeTillNow(new Date(webhook.created_at.seconds * 1000), 1),
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

  const totalp = Object.values(pdata).reduce((p, v) => p + v, 0);

  const values = Object.values(pdata);
  const keys = Object.keys(pdata);

  const [data, setDate] = useState({
    labels: keys.map(
      (v) =>
        new Date(v).getDate() +
        " " +
        new Date(v).toLocaleString("default", { month: "long" }).substring(0, 3)
    ),
    datasets: [
      {
        // pointColor: webhook.color,
        // pointStrokeColor: webhook.color,
        borderColor: webhook.color,
        // pointBackgroundColor: webhook.color,
        lineTension: 0.25,
        fill: true,
        // data: Object.values(pdata),
        data: values,
        // shadowOffsetX: 5,
        // shadowOffsetY: 5,
        // shadowBlur: 5,
        // shadowColor: "rgba(0, 255, 59, 1)",

        // hoverInnerGlowWidth: 20,
        // hoverInnerGlowColor: "rgb(255, 255, 0)",
        // hoverOuterGlowWidth: 20,
        // hoverOuterGlowWidth: "rgb(255, 255, 0)",
      },
    ],
  });

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
        <Line
          options={options}
          data={data}
          className="max-w-full"
          redraw={true}
        />
      </div>
    </div>
  );
}

export default LineChart;
