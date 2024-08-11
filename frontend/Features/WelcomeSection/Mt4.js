import React from "react";
import Link from "next/link";
import Video from "../../components/Video";
import { videosUrls } from "../../utils/constant";

function Mt4() {
  return (
    <div className="flex flex-col items-center pt-8">
      <p className="text-center">
        Download the EA and connect it to your metatrader 4 account
        <br />
        to start recieving webhooks alerts.
      </p>

      <div className="pt-8 w-full">
        <Video
          controls={true}
          className="aspect-video w-[80%] mx-auto rounded-xl border-2 border-text-p"
          src={videosUrls.metatraderAddAccount}
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
  );
}

export default Mt4;
