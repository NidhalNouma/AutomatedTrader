import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
  plugins,
} from "chart.js";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { addAlpha } from "../../utils/functions";
import TooltipComponent from "./Tooltips";
import PropTypes from "prop-types";

ChartJS.register(
  ArcElement,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const ChartJSLine = ({ data, className }) => {
  const { theme } = useTheme();
  const chartRef = useRef(null);
  const [tooltipInfo, setTooltipInfo] = useState({
    visible: false,
    title: "",
    labels: [],
    position: { x: 0, y: 0 },
  });

  const maxAbsValue = Math.max(
    ...data.flatMap((dataset) =>
      dataset.data.map((value) => (value ? Math.abs(value) : 0))
    )
  );
  const margin = maxAbsValue * 0.1;
  const yAxisMax = maxAbsValue + margin;
  const yAxisMin = -maxAbsValue - margin;

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.datasets.forEach((dataset) => {
        const gradient = chart.ctx.createLinearGradient(0, 0, 0, chart.height);
        gradient.addColorStop(0, addAlpha(dataset.borderColor, 0.5));
        gradient.addColorStop(0.1, addAlpha(dataset.borderColor, 0.2));
        gradient.addColorStop(0.4, addAlpha(dataset.borderColor, 0));
        dataset.backgroundColor = gradient;
      });
      chart.update();
    }
  }, [chartRef, tooltipInfo]);

  const chartData = {
    labels: data[0].labels,
    datasets: data.map((dataset) => ({
      ...dataset,
      borderColor: dataset.color,
      pointRadius: 3,
      pointBackgroundColor: dataset.color,
      pointHoverRadius: 2,
      fill: true,
      pointRadius: dataset.data.map((point, index) => {
        if (index === dataset.data.length - 1) return 3;
        return 1;
      }),
      pointBackgroundColor: dataset.color,
      pointHoverRadius: dataset.data.map((point, index) => {
        return 2;
      }),
    })),
  };

  const crosshairPlugin = {
    id: "crosshairPlugin",
    afterDatasetsDraw: (chart) => {
      if (chart.tooltip?._active && chart.tooltip._active.length) {
        const ctx = chart.ctx;
        const activePoint = chart.tooltip._active[0];
        const { x } = activePoint.element;

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(x, chart.chartArea.top);
        ctx.lineTo(x, chart.chartArea.bottom);
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = addAlpha(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--chart-text-color"
          ),
          0.3
        );
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const horizontalLinePlugin = {
    id: "horizontalLinePlugin",
    afterDraw: (chart) => {
      const ctx = chart.ctx;
      const yScale = chart.scales.y;
      const yValue = 0;
      if (yScale?.getPixelForValue) {
        const yPixel = yScale.getPixelForValue(yValue);

        ctx.save();
        ctx.beginPath();
        ctx.moveTo(chart.chartArea.left, yPixel);
        ctx.lineTo(chart.chartArea.right, yPixel);
        ctx.lineWidth = 1;
        ctx.setLineDash([5, 5]);
        ctx.strokeStyle = addAlpha(
          getComputedStyle(document.documentElement).getPropertyValue(
            "--chart-text-color"
          ),
          0.1
        );
        ctx.stroke();
        ctx.restore();
      }
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--chart-text-color"
          ),
          padding: 0,
        },
        grid: {
          display: false,
        },
        border: {
          display: false,
        },
      },
      y: {
        min: yAxisMin,
        max: yAxisMax,
        display: false,
        ticks: {
          color: getComputedStyle(document.documentElement).getPropertyValue(
            "--chart-text-color"
          ),
          padding: 0,
        },
        grid: {
          //   display: false,
          callback: function (value) {
            return value === 0 ? "1" : "";
          },
        },
        border: {
          display: false,
        },
      },
    },
    interaction: {
      mode: "nearest",
      intersect: false,
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: "nearest",
        external: (context) => {
          const { chart, tooltip } = context;

          if (tooltip.opacity === 0) {
            setTooltipInfo((prev) => {
              if (prev.visible) {
                return {
                  visible: false,
                  title: "",
                  labels: [],
                  position: { x: 0, y: 0 },
                };
              }
              return prev;
            });
            return;
          }

          const title = tooltip.title.length ? tooltip.title[0] : "";
          const labels = tooltip.body.map((b, i) => ({
            text: b.lines[0],
            backgroundColor: tooltip.labelColors[i].backgroundColor,
            borderColor: tooltip.labelColors[i].borderColor,
          }));

          const { offsetLeft: positionX, offsetTop: positionY } = chart.canvas;

          const newTooltipInfo = {
            visible: true,
            title,
            labels,
            position: {
              x: positionX + tooltip.caretX,
              y: positionY + tooltip.caretY,
            },
          };

          setTooltipInfo((prev) => {
            if (
              prev.title !== newTooltipInfo.title ||
              prev.position.x !== newTooltipInfo.position.x ||
              prev.position.y !== newTooltipInfo.position.y ||
              JSON.stringify(prev.labels) !==
                JSON.stringify(newTooltipInfo.labels)
            ) {
              return newTooltipInfo;
            }
            return prev;
          });
        },
      },
    },
    elements: {
      line: {
        tension: 0.25,
        borderWidth: 4,
      },
      point: {
        borderWidth: 2,
        hoverBorderWidth: 2,
      },
    },
  };

  return (
    <Fragment>
      {theme && (
        <Line
          className={`w-full h-full ${className}`}
          ref={chartRef}
          data={chartData}
          options={options}
          plugins={[crosshairPlugin, horizontalLinePlugin]}
        />
      )}
      <TooltipComponent
        className="custom-tooltip"
        visible={tooltipInfo.visible}
        title={tooltipInfo.title}
        labels={tooltipInfo.labels}
        position={tooltipInfo.position}
      />
    </Fragment>
  );
};

ChartJSLine.propTypes = {
  dataset: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default ChartJSLine;
