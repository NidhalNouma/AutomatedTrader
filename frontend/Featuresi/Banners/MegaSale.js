import React from "react";
import { useRouter } from "next/router";
import { Button as ButtonP } from "../../components/ui/Button";
import { pricingList } from "../../utils/pricing";

function MegaSale() {
  const router = useRouter();

  return (
    <div className="w-full relative min-h-[50vh] z-0 flex flex-col">
      {/* <div className="absolute top-[-135%] left-0 right-0 aspect-square bg-gradient-to-b from-accent to-primary rounded-full"></div> */}
      <div
        className="absolute bottom-0 top-0 left-0 right-0 h-full w-full bg-gradient-to-b from-bgt via-ac/60  to-bgt"
        style={{
          clipPath: "circle(50% at 50% 50%)",
        }}
      ></div>
      <div className="z-10 relative w-full h-full flex flex-col items-center  my-auto">
        <p className="text-transparent text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-accent to-primary">
          BETA SALE
        </p>
        <p className="text-text text-3xl text-center mt-4">
          Save <span className="font-extrabold text-title">60%</span> with{" "}
          <span className="font-extrabold text-title">LIFETIME</span> membership
          and get access
          <br />
          to all of our features.
        </p>
        <ButtonP
          className="mt-6 !bg-text !rounded-full !text-primary !border-none !px-14"
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
