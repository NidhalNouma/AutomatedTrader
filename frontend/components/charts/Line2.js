import dynamic from "next/dynamic";
import { Transition } from "react-transition-group";
import { addAlpha } from "../../utils/functions";

// Dynamically import the ResponsiveLine component from Nivo
const ResponsiveLine = dynamic(
  () => import("@nivo/line").then((mod) => mod.ResponsiveLine),
  {
    ssr: false,
  }
);

const tooltipStyles = {
  entering: { opacity: 0, transform: "scale(0.9)" },
  entered: { opacity: 1, transform: "scale(1)" },
  exiting: { opacity: 1, transform: "scale(1)" },
  exited: { opacity: 0, transform: "scale(0.9)" },
};

const CustomTooltip = ({ point, className }) => (
  <Transition in appear timeout={150}>
    {(state) => (
      <div
        className={
          "p-2 shadow-md rounded-lg max-w-xs text-text/60 bg-bg/60 backdrop-blur-xl " +
          className
        }
        style={{
          transition: "opacity 150ms ease-in-out, transform 150ms ease-in-out",
          ...tooltipStyles[state],
        }}
      >
        <strong>{point.serieId}</strong>
        <br />
        <span>{`x: ${point.data.xFormatted || point.data.x}`}</span>
        <br />
        <span>{`y: ${point.data.yFormatted || point.data.y}`}</span>
      </div>
    )}
  </Transition>
);

const data = [
  {
    id: "japan",
    color: "hsl(178, 70%, 50%)",
    data: [
      { x: "plane", y: 105 },
      { x: "helicopter", y: 217 },
      { x: "boat", y: 1 },
      { x: "train", y: 54 },
      { x: "subway", y: 84 },
      { x: "bus", y: -208 },
      { x: "car", y: -178 },
      { x: "moto", y: 241 },
      { x: "bicycle", y: 38 },
      { x: "horse", y: 73 },
      { x: "skateboard", y: 155 },
      { x: "others", y: 89 },
    ],
  },
  {
    id: "france",
    color: "hsl(220, 70%, 50%)",
    data: [
      { x: "plane", y: 145 },
      { x: "helicopter", y: 90 },
      { x: "boat", y: 30 },
      { x: "train", y: -100 },
      { x: "subway", y: 75 },
      { x: "bus", y: 50 },
      { x: "car", y: 200 },
      { x: "moto", y: 80 },
      { x: "bicycle", y: 60 },
      { x: "horse", y: 40 },
      { x: "skateboard", y: 95 },
      { x: "others", y: 110 },
    ],
  },
];

const MyResponsiveLine = () => {
  // Identify the last points in each series
  const lastPoints = data.map((series) => series.data[series.data.length - 1]);
  const firstPoints = data.map((series) => series.data[0]);

  const gradientDefs = data.map((series) => ({
    id: `gradient-${series.id}`,
    type: "linearGradient",
    colors: [
      { offset: 0, color: addAlpha(series.color, 0.5) },
      { offset: 20, color: addAlpha(series.color, 0.2) },
      { offset: 50, color: addAlpha(series.color, 0) },
      { offset: 100, color: addAlpha(series.color, 0) },
    ],
  }));

  const fillRules = data.map((series) => ({
    match: { id: series.id },
    id: `gradient-${series.id}`,
  }));

  return (
    <ResponsiveLine
      data={data}
      margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: true,
        reverse: false,
      }}
      curve="natural"
      axisTop={null}
      axisRight={null}
      axisBottom={{
        tickSize: 5,
        tickPadding: 10,
        tickRotation: 0,
        legend: "transportation",
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: "every 1", // Adjust based on your needs
        format: (value) => value, // Customize the format as needed
      }}
      axisLeft={null}
      enableGridX={false}
      enableGridY={false}
      colors={{ scheme: "paired" }}
      lineWidth={5}
      pointSize={10}
      pointColor={{ from: "color", modifiers: [] }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      enableArea={true}
      areaOpacity={1}
      areaBlendMode="normal"
      defs={gradientDefs}
      fill={fillRules}
      enableTouchCrosshair={true}
      useMesh={true}
      // Custom point rendering to show only the last points
      pointSymbol={(props) => {
        const { datum, color } = props;
        const isLastPoint = lastPoints.some(
          (point) => point.x === datum.x && point.y === datum.y
        );
        const isFirst = firstPoints.some(
          (point) => point.x === datum.x && point.y === datum.y
        );
        return isLastPoint ? (
          <circle
            r={5}
            fill={color}
            style={{
              filter: "url(#glow)",
            }}
          />
        ) : isFirst ? (
          <circle
            r={2}
            fill={color}
            style={{
              filter: "url(#glow)",
            }}
          />
        ) : null;
      }}
      tooltip={({ point }) => <CustomTooltip point={point} />}
      theme={{
        crosshair: {
          line: {
            className: "custom-crosshair-line", // Add custom class name
            stroke: "rgba(100, 100, 100, 0.4)",
            strokeWidth: 2,
            strokeDasharray: "6 6",
          },
        },
        axis: {
          ticks: {
            line: {
              stroke: "hsl(var(--text-color)", // Custom color for ticks
              strokeWidth: 1,
              opacity: 0.4,
            },
            text: {
              fill: "hsl(var(--text-color)", // Custom color for tick labels
              opacity: 0.4,
            },
          },
          legend: {
            text: {
              fill: "transparent",
            },
          },
        },
      }}
    />
  );
};

export default MyResponsiveLine;
