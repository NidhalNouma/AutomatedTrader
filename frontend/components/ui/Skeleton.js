import { Fragment } from "react";

export function RectangleSkeleton({ className }) {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className={`rounded-lg bg-accent/10 h-52 w-full ${className}`}></div>
    </div>
  );
}

export function TextSkeleton({ className }) {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="h-2 bg-accent/10 rounded"></div>
    </div>
  );
}
