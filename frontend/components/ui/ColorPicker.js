import { Fragment, useState } from "react";
import { SketchPicker, ChromePicker } from "react-color";

export function ColorPicker({ color, setColor, className }) {
  return (
    <div className={`w-full mx-auto ${className}`}>
      <ChromePicker
        color={color}
        onChange={(clr) => setColor(clr.hex)}
        className="!bg-transparent !w-full !rounded-lg !shadow-none !text-text outline-dashed outline-1 outline-offset-2 outline-text/20"
      />
    </div>
  );
}
