import { Fragment, useState } from "react";
import { SketchPicker, ChromePicker } from "react-color";

function Index({ color, setColor }) {
  return (
    <div className="w-full mx-auto p-10">
      <ChromePicker
        color={color}
        onChange={(clr) => setColor(clr.hex)}
        className="!bg-bga !w-full"
      />
    </div>
  );
}

export default Index;
