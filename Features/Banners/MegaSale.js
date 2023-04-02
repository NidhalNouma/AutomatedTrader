import React from "react";
import { useRouter } from "next/router";
import { ButtonP } from "../../Components/Button";
import { pricingList } from "../../utils/pricing";

function MegaSale() {
  const router = useRouter();

  return (
    <div className="w-full relative h-[60vh] z-0">
      {/* <div className="absolute top-[-135%] left-0 right-0 aspect-square bg-gradient-to-b from-accent to-primary rounded-full"></div> */}
      <div
        className="absolute bottom-[0] left-0 right-0 h-full w-full bg-gradient-to-b from-bgt to-primary"
        style={{
          clipPath: "circle(50% at 50% 0)",
        }}
      ></div>
      <div className="z-10 relative w-full h-full flex flex-col items-center justify-start pt-11">
        <p className="text-transparent text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-accent to-primary">
          BETA SALE
        </p>
        <p className="text-text-p text-3xl text-center mt-4">
          Save <span className="font-extrabold text-text-h">%60</span> with
          lifetime membership and get access
          <br />
          to all of our features.
        </p>
        <ButtonP
          className="mt-6 !bg-text-h !rounded-full !text-primary !border-none !px-14"
          size="lg"
          onClick={() =>
            router.push(
              "/membership?m=" +
                pricingList.lifetime["Lifetime access"].chargeBeeId
            )
          }
        >
          Get Access Now
        </ButtonP>
      </div>
    </div>
  );
}

export default MegaSale;
