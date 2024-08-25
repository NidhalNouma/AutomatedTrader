import React, { Fragment, useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import TooltipComponent from "./Tooltips";

const RechartHalfDoughnut = ({ children, className, data, labels, colors }) => {
  const [tooltipInfo, setTooltipInfo] = useState({
    visible: false,
    title: "",
    labels: [],
    position: { x: 0, y: 0 },
  });

  const processedData = useMemo(() => {
    return data.map((value, index) => ({
      value,
      name: labels[index],
    }));
  }, [data, labels]);

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const tooltipData = payload[0];
      const newTooltipInfo = {
        visible: true,
        title: tooltipData.name,
        labels: [
          {
            text: `${tooltipData.name}: ${tooltipData.value}`,
            backgroundColor: tooltipData.fill,
            borderColor: tooltipData.stroke,
          },
        ],
        position: { x: tooltipData.cx, y: tooltipData.cy },
      };

      setTooltipInfo((prev) => {
        if (
          prev.title !== newTooltipInfo.title ||
          prev.position.x !== newTooltipInfo.position.x ||
          prev.position.y !== newTooltipInfo.position.y ||
          JSON.stringify(prev.labels) !== JSON.stringify(newTooltipInfo.labels)
        ) {
          return newTooltipInfo;
        }
        return prev;
      });
    }

    return null;
  };

  return (
    <div className="relative w-full aspect-square">
      <ResponsiveContainer
        className={`w-full aspect-square relative ${className}`}
      >
        <PieChart>
          <Pie
            data={processedData}
            innerRadius="55%"
            outerRadius="100%"
            startAngle={180}
            endAngle={0}
            dataKey="value"
            cornerRadius={10}
          >
            {processedData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index]} stroke="none" />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      <div
        className="flex flex-col items-center justify-center w-2/4 bg-transparent aspect-square rounded-full"
        style={{
          position: "absolute",
          top: "32.5%",
          left: "50%",
          transform: "translate(-50%, -15%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RechartHalfDoughnut;
