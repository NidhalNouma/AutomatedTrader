import { Fragment } from "react";

export function Div({ children, className, style }) {
  return (
    <div className={`p-4 ${className}`} style={style}>
      {children}
    </div>
  );
}
