import { Fragment } from "react";

export function RectangleSkeleton({ className }) {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className={`rounded-lg bg-accent/10 h-52 w-full ${className}`}></div>
    </div>
  );
}

export function RoundSkeleton({ className }) {
  return (
    <div className="animate-pulse flex space-x-4 rounded-full">
      <div
        className={`rounded-full aspect-square bg-accent/10 w-full ${className}`}
      ></div>
    </div>
  );
}

export function TextSkeleton({ className }) {
  return (
    <div className="animate-pulse flex space-x-4 h-4">
      <div className={`h-full bg-accent/10 rounded w-full ${className}`}></div>
    </div>
  );
}
