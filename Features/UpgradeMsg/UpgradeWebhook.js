import React from "react";
import Image from "next/image";
import Link from "next/link";

function UpgradeWebhook() {
  return (
    <Link href="/membership">
      <div className="bg-bgt rounded-xl p-2 flex flex-col items-center cursor-pointer">
        <h2 className="text-text-h font-semibold">Want more webhooks?</h2>
        <h2 className="text-text-h font-bold">Upgrade NOW!</h2>
        <div className="w-40 h-40">
          <Image
            src="/Images/banners/startup-investment.png"
            alt=""
            width="1w"
            height="1h"
            className=""
            layout="responsive"
          />
        </div>
      </div>
    </Link>
  );
}

export default UpgradeWebhook;
