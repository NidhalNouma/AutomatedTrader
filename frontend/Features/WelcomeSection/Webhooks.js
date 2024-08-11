import React, { Fragment } from "react";
import Link from "next/link";
import Video, { PlayVideoPopup } from "../../components/Video";

function Webhooks({ sub }) {
  return (
    <Fragment>
      <div className="flex flex-col items-center pt-8">
        <p className="text-center">
          Here you can create webhooks and connect them with tradingview to get
          alerts.
          <br />
          Alerts will fire on automatedTrader and on your trading accounts.
        </p>

        <div className="pt-8 w-full">
          <Video
            controls={true}
            className="aspect-video w-[80%] mx-auto rounded-xl border-2 border-text-p"
            src="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fwebhooks-AT.mp4?alt=media&token=f8bf7b15-9084-4211-9bfe-0004c0b40aa9"
          />
        </div>

        <p className="mt-4">
          For more details click{" "}
          <span className=" font-bold text-text-h">
            <Link href="/help">here</Link>
          </span>
          .
        </p>
      </div>
    </Fragment>
  );
}

export default Webhooks;
