import { Fragment, useState } from "react";
import LineChart from "../charts/Line2";

import { SubTitle3, Label2 } from "../ui/Text";
import { addAlpha, txtColorFromBg } from "../../utils/functions";

import { WideModal } from "../ui/Modal";

import { WebhookPage } from "../../pages/webhook/[id]";
import { WebhookChartData } from "../../hooksp/WebhooksHook";

import { LinesBarsChartData } from "../../utils/chartsData";

export default function WebhookChart({ webhook }) {
  const [viewData, setViewData] = useState(false);
  const { tradesData } = WebhookChartData(webhook);

  return (
    <Fragment>
      {viewData && (
        <WideModal
          title={webhook?.name || "Loading..."}
          open={viewData}
          close={() => {
            history.back();
            setViewData(false);
          }}
          withHeader={true}
          className="max-w-[90vw] min-h-[90vh]"
        >
          <WebhookPage id={webhook.publicId} title={false} />
        </WideModal>
      )}

      <div className="p-1.5 rounded relative">
        <div
          className="backdrop-blur-xl absolute inset-0 rounded -z-10"
          style={{ backgroundColor: addAlpha(webhook.color, 0.05) }}
        ></div>
        <div className="">
          <LineChart
            className="h-52"
            data={LinesBarsChartData(
              ["Total trades"],
              [tradesData?.days?.map((day) => day.Trades.length)],
              tradesData?.days?.map((day) => day.time),
              [webhook.color]
            )}
            // minYAxis={0}
            defaultColor={webhook.color}
          />
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
          <div className="mt-0.5 flex items-center justify-between">
            <Label2 className="">{webhook.trades.length} Open trades</Label2>
            <span
              onClick={() => {
                window.history.pushState(
                  { urlPath: "/webhook/" + webhook.publicId },
                  "",
                  "/webhook/" + webhook.publicId
                );
                setViewData(true);
              }}
              style={{
                backgroundColor: addAlpha(webhook.color, 0.2),
                // color: txtColorFromBg(webhook.color),
              }}
              className="text-xs text-text bg-accent rounded px-1 cursor-pointer"
            >
              View data
            </span>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
