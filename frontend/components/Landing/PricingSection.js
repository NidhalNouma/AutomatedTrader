import React, { useState } from "react";
import { useRouter } from "next/router";
import { ButtonGroup, Button } from "react-daisyui";
import { Button as ButtonP, ButtonText } from "../../components/ui/Button";
import PriceingItem from "../parts/PriceingItem";

import { pricingList } from "../../utils/pricing";

import { CheckCircleIcon } from "@heroicons/react/solid";

function PricingSection() {
  const [ty, setTy] = useState(2);
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-5xl mt-[25vh] mb-20 mx-auto">
        <h1 className="md:text-7xl text-5xl text-center font-4 lh-6 ld-04 font-bold text-title mb-6">
          Honest and thoughtful pricing
        </h1>
        {/* <h2 className="text-xl font-4 font-semibold lh-6 ld-04 pb-11 text-text-p text-center">
          Use our innovative dashboard to stay up to date, track, compare and
          analyze your trading activity like never before. Control your risk per
          trade like a PRO!
        </h2> */}
        <div className="w-full flex flex-col mb-8 bg-bgt mt-20 px-2">
          <div className="flex items-center justify-between w-full max-w-md mb-6 p-3 mx-auto rounded-lg outline outline-1 outline-dashed outline-primary/40 outline-offset-4">
            <ButtonText
              className={`text-title/80 capitalize  !text-xl font-semibold hover:bg-transparent hover:text-title ${
                ty === 1 && "text-primary hover:text-primary"
              }`}
              active={ty === 1}
              onClick={() => setTy(1)}
            >
              Monthly
            </ButtonText>
            <ButtonText
              className={`text-title/80 capitalize  !text-xl font-semibold hover:bg-transparent hover:text-title ${
                ty === 2 && "text-primary hover:text-primary"
              }`}
              active={ty === 2}
              onClick={() => setTy(2)}
            >
              Annually
              <span
                className={`hidden sm:block ml-1 text-xs text-success itranslate-y-2 ${
                  ty === 2 && "!text-primary hover:text-primary"
                }`}
              >
                Save 30%
              </span>
            </ButtonText>
            <ButtonText
              className={`text-title/80 capitalize  !text-xl font-semibold hover:bg-transparent hover:text-title ${
                ty === 3 && "text-primary hover:text-primary"
              }`}
              active={ty === 3}
              onClick={() => setTy(3)}
              // endIcon={}
            >
              Lifetime
              <span
                className={`hidden sm:block ml-1 text-xs text-success itranslate-y-2 ${
                  ty === 3 && "!text-primary hover:text-primary"
                }`}
              >
                Pay once
              </span>
              {/* <AiTwotoneFire
                className={`h-6 w-6 ml-1 text-success ${
                  ty === 3 && "!text-primary hover:text-primary"
                }`}
              /> */}
            </ButtonText>
          </div>
        </div>
      </div>
      {ty === 1 ? (
        <section className="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-x-4">
          {Object.keys(pricingList.monthly).map((key, i) => (
            <PriceingItem
              key={key}
              title={key}
              value={pricingList.monthly[key]}
              t="mo"
              i={i}
              // setSuccess={setSuccess}
            />
          ))}
        </section>
      ) : ty === 2 ? (
        <section className="mx-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-x-4">
          {Object.keys(pricingList.annual).map((key, i) => (
            <PriceingItem
              key={key}
              title={key}
              value={pricingList.annual[key]}
              t="yearly"
              i={i}
              // setSuccess={setSuccess}
            />
          ))}
        </section>
      ) : ty === 3 ? (
        <section className="flex flex-wrap justify-center w-full">
          {Object.keys(pricingList.lifetime).map((key, i) => (
            <div key={key} className="lg:w-1/3 md:w-1/2 w-full">
              <PriceingItem
                key={key}
                title={key}
                value={pricingList.lifetime[key]}
                t="lifetime"
                i={i}
                //   setSuccess={setSuccess}
              />
            </div>
          ))}
        </section>
      ) : (
        <></>
      )}
    </section>
  );
}

export default PricingSection;
