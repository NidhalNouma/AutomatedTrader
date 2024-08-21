import { Fragment } from "react";
import LineChart from "../charts/Line2";

import { SubTitle3, Label2 } from "../ui/Text";
import { addAlpha } from "../../utils/functions";

export default function WebhookChart({ webhook }) {
  return (
    <div className="p-1.5 rounded relative">
      <div
        className="backdrop-blur-xl absolute inset-0 rounded -z-10"
        style={{ backgroundColor: addAlpha(webhook.color, 0.1) }}
      ></div>
      <div className="">
        <LineChart className="h-52" data={[]} />
      </div>
      <div className="">
        <SubTitle3 className="">
          {webhook.name}
          {!webhook.public && (
            <span className="text-text text-xs bg-text/20 rounded px-1">
              {" "}
              Private
            </span>
          )}
        </SubTitle3>
        <div className="mt-0.5">
          <Label2 className="">{webhook.trades.length} Open trades</Label2>
        </div>
      </div>
    </div>
  );
}
