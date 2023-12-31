import { Fragment } from "react";

function CircleArc({ percentage, color = "green" }) {
  return (
    <Fragment>
      {/* <div className="w-24 aspect-square">
        <svg className="h-full w-full">
          <circle
            className="stroke-green-100"
            cx="50%"
            cy="50%"
            r="40"
            fill="none"
            strokeWidth="2"
          />
          <path
            className="stroke-green-400"
            d="M 50 10 A 40 40 0 0 1 90 50"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
          />
        </svg>
      </div> */}
      {/* <div className="relative w-16 aspect-square rounded-full border-2 border-green-100 overflow-hidden">
        <div className="absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] flex rounded-full justify-center items-center w-12 aspect-square bg-green-400"></div>
        <svg className="absolute top-[50%] right-[50%] translate-x-[50%] -translate-y-[50%] w-full aspect-square">
          <path
            d="M 50 10 A 40 40 0 0 1 90 50"
            fill="none"
            stroke="yellow"
            strokeWidth="5"
          />
        </svg>
      </div> */}
      <ProgressArc percentage={percentage} color={color} />
    </Fragment>
  );
}

export default CircleArc;
const ProgressArc = ({ percentage, color }) => {
  const radius = 38; // Radius of the outer circle
  const strokeWidth = 6; // Width of the progress arc

  // Calculate the progress arc's length
  const circumference = 2 * Math.PI * radius;
  const progressLength = (percentage / 100) * circumference;

  return (
    <svg width={2 * radius} height={2 * radius} className="">
      {/* Outer circle */}
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="none"
        className={`${color === "red" ? "stroke-red-100" : "stroke-green-100"}`}
        strokeWidth={2}
      />

      {/* Progress arc */}
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth / 2}
        fill="none"
        className={`${color === "red" ? "stroke-red-400" : "stroke-green-400"}`}
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progressLength}
        transform={`rotate(-90 ${radius} ${radius})`}
        strokeLinecap="round"
      />

      {/* Inner circle */}
      <circle
        cx={radius}
        cy={radius}
        r={radius - strokeWidth * 2}
        className={`fill-${color}-500`}
      />

      <text
        x={radius}
        y={radius}
        textAnchor="middle"
        dominantBaseline="middle"
        className="text-sm fill-text-h font-medium"
      >
        {percentage}%
      </text>
    </svg>
  );
};
