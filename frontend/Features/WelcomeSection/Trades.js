import React from "react";
import Link from "next/link";
import Video from "../../components/ui/Video";
import { videosUrls } from "../../utils/constant";

function Trades() {
  return (
    <div className="flex flex-col items-center pt-8">
      <p className="text-center">
        Here you can see all your trades from your trading accounts
        <br />
        with all the information.
      </p>

      <div className="pt-8 w-full">
        <Video
          controls={true}
          className="aspect-video w-[80%] mx-auto rounded-xl border-2 border-text-p"
          src={videosUrls.tradePage}
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

export default Trades;
