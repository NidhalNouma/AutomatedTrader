import { Fragment } from "react";
import { Par } from "./Text";

export function Info({ children, className }) {
  return (
    <div
      className={`w-full outline-1 outline-dashed outline-info/30 !p-0 bg-bgt/90 rounded-lg backdrop-blur-xl ${className}`}
    >
      <div className="p-2 bg-transparent">
        <Par className=" !text-sm !text-info">{children}</Par>
      </div>
    </div>
  );
}

export function Succes({ children, className }) {
  return (
    <div
      className={`w-full outline-1 outline-dashed outline-success/30 !p-0 bg-bgt/90 rounded-lg backdrop-blur-xl ${className}`}
    >
      <div className="p-2 bg-transparent">
        <Par className=" !text-sm !text-success">{children}</Par>
      </div>
    </div>
  );
}

export function Error({ children, className }) {
  return (
    <div
      className={`w-full outline-1 outline-dashed outline-error/30 !p-0 bg-bgt/90 rounded-lg backdrop-blur-xl ${className}`}
    >
      <div className="p-2 bg-transparent">
        <Par className=" !text-sm !text-error">{children}</Par>
      </div>
    </div>
  );
}
