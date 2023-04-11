import React from "react";
import Link from "next/link";
import Video from "../../Components/Video";

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
          src="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fmetatrader-addaccount.mp4?alt=media&token=9c4a82b6-4474-46ba-b102-df1a8e0c9fb4"
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
