import React from "react";

const TooltipComponent = ({ visible, title, labels, position, className }) => {
  if (!visible) return null;

  return (
    <div
      className={`${className} bg-bg/60 backdrop-blur-xl rounded-lg text-text `}
      style={{
        // position: "absolute",
        // left: position.x,
        // top: position.y,
        opacity: 1,
        pointerEvents: "none",
        transform: "translate(-50%, 0)",
        transition: "all .1s ease",
        padding: "8px",
        zIndex: 55,
      }}
    >
      {title && <span className="text-sm text-title/80">{title}</span>}
      {labels?.map((label, i) => (
        <div key={i} style={{ display: "flex", alignItems: "center" }}>
          <span
            className="rounded-full h-2 aspect-square"
            style={{
              backgroundColor: label.borderColor || label.backgroundColor,
              borderColor: label.borderColor,
              borderWidth: "0px",
              marginRight: "8px",
              display: "inline-block",
            }}
          ></span>
          <span className="text-sm font-semibold text-text/80">
            {label.text}
          </span>
        </div>
      ))}
    </div>
  );
};

export default TooltipComponent;
