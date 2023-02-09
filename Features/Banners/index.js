import React from "react";
import Image from "next/image";

function Index() {
  return (
    <div className="grid grid-cols-3 mx-auto mt-4 gap-2">
      <B1 />
      <B2 />
      <B3 />
    </div>
  );
}

export default Index;

function B1() {
  return (
    <div className="cursor-pointer flex items-center justify-center bg-bga rounded-xl p-2">
      <div className="w-10 h-10 mr-2">
        <Image
          src="/Images/banners/bug-detected.png"
          alt=""
          width="1w"
          height="1h"
          className=""
          layout="responsive"
        />
      </div>

      <p className="text-text-h text-xs font-semibold">
        Remember this is BETA <br />
        Report any bugs may find.
      </p>
    </div>
  );
}

function B2() {
  return (
    <div className="cursor-pointer flex items-center justify-center bg-bga rounded-xl p-2">
      <div className="w-10 h-10 mr-2">
        <Image
          src="/Images/banners/trophy.png"
          alt=""
          width="1w"
          height="1h"
          className=""
          layout="responsive"
        />
      </div>

      <p className="text-text-h text-xs font-semibold">
        Leaders boards coming soon <br />
        $5000 Giveaway to best BOT.
      </p>
    </div>
  );
}

function B3() {
  return (
    <div className="cursor-pointer flex items-center justify-center bg-bga rounded-xl p-2">
      <div className="w-10 h-10 mr-2">
        <Image
          src="/Images/banners/attracting-money.png"
          alt=""
          width="1w"
          height="1h"
          className=""
          layout="responsive"
        />
      </div>

      <p className="text-text-h text-xs font-semibold">
        Upgrade to Lifetime <br />
        Memebership
      </p>
    </div>
  );
}
