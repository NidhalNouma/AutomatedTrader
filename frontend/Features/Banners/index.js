import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { GetFullUserContext } from "../../hooks/UserHook";

function Index() {
  const { fullUser } = GetFullUserContext();
  // const sub = fullUser?.subObj;

  const [div, setDiv] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setDiv((prev) => {
        if (prev > 3) return 0;
        else return prev + 1;
      });
    }, 10000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="">
      {div === 0 ? <B1 /> : div === 1 ? <B2 /> : div === 2 ? <B3 /> : <B2 />}
      {/* <B2 />
      {sub.time !== "lifetime" && <B3 />}
      <Henko /> */}
    </div>
  );
}

export default Index;

function B1() {
  return (
    <a
      href="mailto:support@automatedtrader.com"
      target="_blank"
      rel="noreferrer"
    >
      <div className="cursor-pointer flex items-center justify-center bg-transparent rounded-xl p-2 flip-animation ">
        <div className="w-10 h-10 mr-2">
          {/* <Image
            src="/Images/banners/bug-detected.png"
            alt=""
            width="1w"
            height="1h"
            className=""
            layout="responsive"
          /> */}
          <img
            src="/Images/banners/bug-detected.png"
            alt=""
            className="w-full aspect-auto"
          />
        </div>

        <p className="text-text-h text-xs font-medium">
          Remember this is BETA <br />
          Report any bugs may find.
        </p>
      </div>
    </a>
  );
}

function B2() {
  return (
    <div className="cursor-pointer flex items-center justify-center bg-transparent rounded-xl p-2 flip-animation ">
      <div className="w-10 h-10 mr-2">
        <img
          src="/Images/banners/trophy.png"
          alt=""
          className="w-full aspect-auto"
        />
      </div>

      <p className="text-text-h text-xs font-medium">
        Leaders boards coming soon <br />
        $5000 Giveaway to best BOT.
      </p>
    </div>
  );
}

function B3() {
  return (
    <Link href="/membership">
      <div className="cursor-pointer flex items-center justify-center bg-transparent rounded-xl p-2 flip-animation ">
        <div className="w-10 h-10 mr-2">
          <img
            src="/Images/banners/attracting-money.png"
            alt=""
            className="w-full aspect-auto"
          />
        </div>

        <p className="text-text-h text-xs font-medium">
          Upgrade to Lifetime <br />
          membership
        </p>
      </div>
    </Link>
  );
}

function Henko() {
  return (
    <a
      href="https://login.hankotrade.com/register?franchiseLead=Mzc1OQ=="
      target="_blank"
      rel="noreferrer"
    >
      <div className="cursor-pointer flex items-center justify-center bg-transparent rounded-xl p-2 flip-animation ">
        <div className="w-10 h-10 mr-2">
          <img
            src="/Images/banners/henko-logo.png"
            alt=""
            className="w-full aspect-auto"
          />
        </div>

        <p className="text-text-h text-xs font-medium">
          Deposit bonus up to $25000 <br />
          Click here to join today!
        </p>
      </div>
    </a>
  );
}
