import React, { useMemo, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import TooltipComponent from "./Tooltips";
import { getRandomHexColor } from "../../utils/functions";

const RechartDoughnut = ({ children, className, data, labels, colors }) => {
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
            innerRadius="90%" // To create the doughnut effect
            outerRadius="100%"
            dataKey="value"
            startAngle={0}
            endAngle={360}
            cornerRadius={10} // For rounded edges
          >
            {processedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={(colors && colors[index]) || getRandomHexColor()}
                stroke="none"
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div
        className="flex flex-col items-center justify-center w-1/2 aspect-square rounded-full"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default RechartDoughnut;
