import React, { useEffect, useRef, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import TooltipComponent from "./Tooltips";

ChartJS.register(ArcElement, Tooltip, Legend);

const HalfDoughnutChart = ({ children, className, data, labels, colors }) => {
  const chartRef = useRef(null);
  const [tooltipInfo, setTooltipInfo] = useState({
    visible: false,
    title: "",
    labels: [],
    position: { x: 0, y: 0 },
  });

  useEffect(() => {
    const chart = chartRef.current;
    if (chart) {
      chart.data.datasets.forEach((dataset, datasetIndex) => {
        const totalItems = dataset.data.length;

        // dataset.backgroundColor.forEach((color, index) => {
        //   const gradient = chart.ctx.createLinearGradient(
        //     0,
        //     0,
        //     0,
        //     chart.height
        //   );
        //   gradient.addColorStop(0, "rgba(77, 218, 11, 0.5)");
        //   gradient.addColorStop(0.5, "rgba(200, 100, 30, 0.5)");
        //   gradient.addColorStop(1, "rgba(255, 0, 0, 0.5)");
        //   dataset.backgroundColor[index] = gradient;
        // });

        dataset.borderRadius = dataset.data.map((value, index) => {
          if (index === 0) {
            return { outerStart: 10 }; // First item rounded on the left
          } else if (index === totalItems - 1) {
            return { outerEnd: 10 }; // Last item rounded on the right
          }
          return 0; // No rounding for other items
        });
      });
      chart.update();
    }
  }, [chartRef]);

  const options = {
    cutout: "0%",
    rotation: -90,
    circumference: 180,
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
  };

  const chartData = {
    labels: labels,
    datasets: [
      {
        data: data,
        backgroundColor: colors,
        borderColor: colors,
        borderWidth: 1,
        // borderRadius: 50, // Apply border radius to make the segments rounded
      },
    ],
  };

  return (
    <div
      className={className}
      style={{ position: "relative", width: "100%", height: "100%" }}
    >
      <Doughnut ref={chartRef} data={chartData} options={options} />
      <div
        className="flex flex-col items-center justify-center w-1/2 aspect-square rounded-full"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -15%)",
        }}
      >
        {children}
      </div>

      <TooltipComponent
        className="custom-tooltip"
        visible={tooltipInfo.visible}
        title={tooltipInfo.title}
        labels={tooltipInfo.labels}
        position={tooltipInfo.position}
      />
    </div>
  );
};

export default HalfDoughnutChart;
