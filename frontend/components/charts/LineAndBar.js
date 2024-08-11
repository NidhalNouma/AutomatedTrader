import { Line, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Fragment, useEffect, useRef, useState } from "react";
import { useTheme } from "../../contexts/ThemeContext";
import { addAlpha } from "../../utils/functions";
import TooltipComponent from "./Tooltips";
import PropTypes from "prop-types";

ChartJS.register(
  LineElement,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend,
  Filler
);

const ChartJSLineBar = ({ data, className }) => {
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

  // useEffect(() => {
  //   const chart = chartRef.current;
  //   if (chart) {
  //     chart.data.datasets.forEach((dataset) => {
  //       if (dataset.type === "line") {
  //         const gradient = chart.ctx.createLinearGradient(
  //           0,
  //           0,
  //           0,
  //           chart.height
  //         );
  //         gradient.addColorStop(0, addAlpha(dataset.borderColor, 0.5));
  //         gradient.addColorStop(0.1, addAlpha(dataset.borderColor, 0.2));
  //         gradient.addColorStop(0.2, addAlpha(dataset.borderColor, 0));
  //         dataset.backgroundColor = gradient;
  //       }
  //     });
  //     chart.update();
  //   }
  // }, [chartRef, tooltipInfo]);

  const chartData = {
    labels: data[0].labels,
    datasets: [
      {
        type: "line",
        label: data[0].label,
        data: data[0].data,
        borderColor: data[0].color,
        backgroundColor: addAlpha(data[0].color, 0.5),
        pointRadius: 3,
        pointBackgroundColor: data[0].color,
        pointHoverRadius: 2,
        // fill: true,
        pointRadius: data[0].data.map((point, index) => {
          if (index === data[0].data.length - 1) return 3;
          return 1;
        }),
        pointBackgroundColor: data[0].color,
        pointHoverRadius: data[0].data.map((point, index) => {
          return 2;
        }),
      },
      {
        type: "bar",
        label: data[1].label,
        data: data[1].data,
        fill: true,
        backgroundColor: addAlpha(data[1].color, 0.2),
        borderColor: addAlpha(data[1].color, 0.2),
        borderWidth: 2,
        hoverBackgroundColor: addAlpha(data[1].color, 0.7),
        hoverBorderColor: data[1].color,
        borderRadius: 10, // For rounded corners
        barPercentage: 0.2, // Make bars thinner
        categoryPercentage: 1, // Make bars thinner
      },
    ],
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
          display: false,
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

          // Check if the new tooltip info is different from the current state
          setTooltipInfo((prev) => {
            if (
              prev.visible !== newTooltipInfo.visible ||
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

const datasetLengthValidator = (props, propName, componentName) => {
  if (props[propName].length !== 2) {
    return new Error(
      `${componentName} expects the ${propName} array to have exactly 2 items.`
    );
  }
  return null;
};

ChartJSLineBar.propTypes = {
  data: (props, propName, componentName) => {
    const lengthError = datasetLengthValidator(props, propName, componentName);
    if (lengthError) {
      return lengthError;
    }

    return PropTypes.arrayOf(
      PropTypes.shape({
        labels: PropTypes.arrayOf(PropTypes.string).isRequired,
        color: PropTypes.string.isRequired,
        name: PropTypes.string.isRequired,
        data: PropTypes.arrayOf(PropTypes.number).isRequired,
      })
    ).isRequired(props, propName, componentName);
  },
};

export default ChartJSLineBar;
