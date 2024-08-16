import React, { Fragment, useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts/ThemeContext";
import TooltipComponent from "./Tooltips";
import { addAlpha } from "../../utils/functions";
import { curveCardinal } from "d3-shape";

const RechartJSLine = ({ data, className, chartId, minYAxis = null }) => {
  const { theme } = useTheme();

  // Calculate max and min for Y-axis
  const maxAbsValue = Math.max(
    ...data.flatMap((dataset) =>
      dataset.data.map((value) => (value ? Math.abs(value) : 0))
    )
  );
  const margin = maxAbsValue * 0.1;
  const yAxisMax = maxAbsValue + margin;
  let yAxisMin = -maxAbsValue - margin;
  if (minYAxis !== null) yAxisMin = minYAxis;

  const processedData = useMemo(() => {
    return data[0].labels.map((label, index) => {
      const dataPoint = { label };
      data.forEach((dataset) => {
        dataPoint[dataset.label] = dataset.data[index];
      });
      return dataPoint;
    });
  }, [data]);

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <TooltipComponent
          visible={true}
          title={label}
          labels={payload.map((item) => ({
            text: `${item.name}: ${item.value}`,
            backgroundColor: item.fill,
            borderColor: item.stroke,
          }))}
        />
      );
    }

    return null;
  };

  let labels = data[0].labels;

  const cardinal = curveCardinal.tension(0.9);

  return (
    <Fragment>
      {theme && (
        <Fragment>
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              {data.map((dataset, index) => (
                <linearGradient
                  key={index}
                  id={`gradientStroke-${chartId}-${index}`} // Ensure unique ID
                  x1="0%"
                  y1="0%"
                  x2="100%"
                  y2="0%"
                >
                  <stop
                    offset="0%"
                    style={{
                      stopColor: addAlpha(
                        getComputedStyle(
                          document.documentElement
                        ).getPropertyValue("--chart-text-color"),
                        1
                      ),
                      stopOpacity: 1,
                    }}
                  />
                  <stop
                    offset="100%"
                    style={{ stopColor: dataset.color, stopOpacity: 1 }}
                  />
                </linearGradient>
              ))}
              <filter id="glow" x="-100%" y="-100%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <div className={className}>
            <ResponsiveContainer className={`w-full h-full `}>
              <LineChart data={processedData}>
                <XAxis
                  hide={true}
                  axisLine={false}
                  dataKey="label"
                  tickLine={false}
                  tick={(props) => {
                    const { x, y, payload } = props;
                    return (
                      <text
                        className="text-xs fill-text/60 text-center w-full"
                        x={x}
                        y={y}
                        dy={16}
                        textAnchor="end"
                      >
                        {new Date(payload.value).getMonth() +
                          1 +
                          "/" +
                          new Date(payload.value).getDate()}
                        {/* {payload.value} */}
                      </text>
                    );
                  }}
                />
                <YAxis hide={true} domain={[yAxisMin, yAxisMax]} />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{
                    stroke: addAlpha(
                      getComputedStyle(
                        document.documentElement
                      ).getPropertyValue("--chart-text-color"),
                      0.3
                    ),
                    strokeWidth: 2,
                    strokeDasharray: "5 5",
                  }}
                />
                {data.map((dataset, index) => (
                  <Line
                    key={dataset.label}
                    type={cardinal}
                    dataKey={dataset.label}
                    stroke={dataset.color} // Apply the unique gradient
                    strokeLinecap="round"
                    strokeWidth={2}
                    activeDot={{ stroke: dataset.color, strokeWidth: 0 }}
                    dot={false}
                    // filter="url(#glow)" // Apply the glow effect
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
          <div className="h-[0.02rem] rounded-full w-full bg-text/30"></div>
          <div className="w-full flex items-center justify-between mt-0.5">
            <span className="text-xs text-text/60">
              {new Date(labels[0]).getMonth() +
                1 +
                "/" +
                new Date(labels[0]).getDate()}
            </span>
            <span className="text-xs text-text/60">
              {new Date(labels[labels.length - 1]).getMonth() +
                1 +
                "/" +
                new Date(labels[labels.length - 1]).getDate()}
            </span>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

RechartJSLine.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      color: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
  // chartId: PropTypes.string.isRequired,
};

export default RechartJSLine;
