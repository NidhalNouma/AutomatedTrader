import React from "react";
import Link from "next/link";
import Video from "../../Components/Video";

function Alerts() {
  return (
    <div className="flex flex-col items-center pt-8">
      <p className="text-center">
        All webhooks alerts will be fire here
        <br />
        with all the information.
      </p>

      <div className="pt-8 w-full">
        <Video
          controls={true}
          className="aspect-video w-[80%] mx-auto rounded-xl border-2 border-text-p"
          src="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Falerts.mp4?alt=media&token=a6db0f73-00fd-4e99-9f51-c0c39bd25184"
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

export default Alerts;
