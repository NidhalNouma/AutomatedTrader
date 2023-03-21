import React from "react";
import Link from "next/link";

function Trades() {
  return (
    <div className="flex flex-col items-center pt-8">
      <p className="text-center">
        Here you can see all your trades from your trading accounts
        <br />
        with all the information.
      </p>

      {/* <div className="pt-8 w-full">
          <iframe
            className="rounded-xl border-2 border-text-h aspect-video w-[80%] mx-auto"
            src="https://www.youtube.com/embed/kMWJYE-7pp0"
            title="How to Create your OWN trading robot! (TRADINGVIEW TO METATRADER)"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          ></iframe>
        </div> */}

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
