import React, { Fragment, useMemo } from "react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  ComposedChart,
} from "recharts";
import PropTypes from "prop-types";
import { useTheme } from "../../contexts/ThemeContext";
import TooltipComponent from "./Tooltips";

import { addAlpha } from "../../utils/functions";

const RechartJSLineBar = ({ data, className }) => {
  const { theme } = useTheme();

  // Calculate max and min for Y-axis
  const maxAbsValue = Math.max(
    ...data.flatMap((dataset) =>
      dataset.data.map((value) => (value ? Math.abs(value) : 0))
    )
  );
  const margin = maxAbsValue * 0.1;
  const yAxisMax = maxAbsValue + margin;
  const yAxisMin = -maxAbsValue - margin;

  const processedData = useMemo(() => {
    return data[0].labels.map((label, index) => {
      const dataPoint = { name: label };
      data.forEach((dataset) => {
        dataPoint[dataset.label] = dataset.data[index] || 0;
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

  return (
    <Fragment>
      {theme && (
        <Fragment>
          <svg style={{ position: "absolute", width: 0, height: 0 }}>
            <defs>
              <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                <feMerge>
                  <feMergeNode in="coloredBlur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>
          </svg>

          <ResponsiveContainer className={`w-full h-full ${className}`}>
            <ComposedChart data={processedData}>
              <XAxis
                axisLine={false}
                dataKey="name"
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
                      {payload.value}
                    </text>
                  );
                }}
              />
              <YAxis hide={true} domain={[yAxisMin, yAxisMax]} />
              <Tooltip
                content={<CustomTooltip />}
                cursor={{
                  stroke: addAlpha(
                    getComputedStyle(document.documentElement).getPropertyValue(
                      "--chart-text-color"
                    ),
                    0.3
                  ),
                  strokeWidth: 2,
                  strokeDasharray: "5 5",
                }}
              />
              <Bar
                dataKey={data[1].label}
                fill={addAlpha(data[1].color, 0.2)}
                stroke={addAlpha(data[1].color, 0.2)}
                strokeWidth={2}
                barSize={10}
                radius={[10, 10, 0, 0]}
                // filter="url(#glow)" // Apply the glow effect
              />
              <Line
                type="monotone"
                dataKey={data[0].label}
                stroke={data[0].color}
                strokeWidth={3.5}
                strokeLinecap="round"
                dot={(d) =>
                  d.index === data[0]?.data?.length - 1 ? (
                    <circle
                      cx={d.cx}
                      cy={d.cy}
                      r={3.5}
                      stroke={d.stroke}
                      fill={d.stroke}
                    />
                  ) : (
                    false
                  )
                }
                activeDot={{ stroke: data[0].color, strokeWidth: 0 }}
                filter="url(#glow)" // Apply the glow effect
              />
            </ComposedChart>
          </ResponsiveContainer>
        </Fragment>
      )}
    </Fragment>
  );
};

RechartJSLineBar.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      labels: PropTypes.arrayOf(PropTypes.string).isRequired,
      color: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      data: PropTypes.arrayOf(PropTypes.number).isRequired,
    })
  ).isRequired,
};

export default RechartJSLineBar;
