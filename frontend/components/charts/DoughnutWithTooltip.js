import React, { Fragment, useMemo, useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Sector,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { useTheme } from "../../contexts/ThemeContext";
import { getRandomHexColor } from "../../utils/functions";

const RechartDoughnut = ({ children, className, data, labels, colors }) => {
  const { theme } = useTheme();
  const [activeIndex, setActiveIndex] = useState(0);

  const processedData = useMemo(() => {
    return data.map((value, index) => ({
      value,
      name: labels[index],
    }));
  }, [data, labels]);

  const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
      cx,
      cy,
      midAngle,
      innerRadius,
      outerRadius,
      startAngle,
      endAngle,
      fill,
      payload,
      percent,
      value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return data.length > 1 ? (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          className="fill-text/80 text-base font-bold "
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
        <path
          d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
          stroke={fill}
          fill="none"
        />
        <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          textAnchor={textAnchor}
          className="fill-text font-semibold"
        >{`${value}`}</text>
        <text
          x={ex + (cos >= 0 ? 1 : -1) * 12}
          y={ey}
          dy={14}
          textAnchor={textAnchor}
          className="fill-text text-xs "
        >
          {`${(percent * 100).toFixed(2)}%`}
        </text>
      </g>
    ) : (
      <g>
        <text
          x={cx}
          y={cy}
          dy={8}
          textAnchor="middle"
          className="fill-text/80 text-base font-bold "
        >
          {payload.name}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    );
  };

  return (
    <Fragment>
      {theme && (
        <Fragment>
          <ResponsiveContainer className={`h-24 relative ${className}`}>
            <PieChart>
              <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={processedData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                // dataKey="value"
                cornerRadius={10}
                onMouseEnter={(_, index) => setActiveIndex(index)}
              >
                {processedData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={(colors && colors[index]) || getRandomHexColor()}
                    stroke="none"
                  />
                ))}
              </Pie>
              {/* <Pie
            data={processedData}
            innerRadius="90%" // To create the doughnut effect
            outerRadius="100%"
            dataKey="value"
            startAngle={0}
            endAngle={360}
            cornerRadius={10} // For rounded edges
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} stroke="none" />
            ))}
          </Pie> */}
            </PieChart>
          </ResponsiveContainer>
          {/* <div
        className="flex flex-col items-center justify-center w-1/2 aspect-square rounded-full"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </div> */}
        </Fragment>
      )}
    </Fragment>
  );
};

export default RechartDoughnut;
