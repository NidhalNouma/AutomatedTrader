import { useState } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import Pricing from "../Features/Pricing";
import { H1 } from "../Components/H";
import { ButtonGroup, Button } from "react-daisyui";

import PaddleLoader from "../Features/Paddle";

import { pricingList } from "../utils/pricing";

export default function Membership() {
  const [ty, setTy] = useState(1);
  return (
    <>
      <Sidenav cpath="membership" />
      <MainWithHeader>
        <H1>Membership</H1>
        <div className="mt-6">
          <div className="w-full flex justify-center mb-6">
            <ButtonGroup>
              <Button
                animation={false}
                className="bg-bg rounded-xl capitalize md:!px-6"
                size="sm"
                active={ty === 1}
                onClick={() => setTy(1)}
              >
                Monthly Pricing
              </Button>
              <Button
                animation={false}
                size="sm"
                className="bg-bg rounded-xl capitalize md:!px-6 "
                active={ty === 2}
                onClick={() => setTy(2)}
              >
                Annual Pricing
              </Button>
              <Button
                animation={false}
                size="sm"
                className="bg-bg rounded-xl capitalize md:!px-6"
                active={ty === 3}
                onClick={() => setTy(3)}
              >
                Lifetime Membership
              </Button>
            </ButtonGroup>
          </div>

          {ty === 1 ? (
            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
              {Object.keys(pricingList.monthly).map((key) => (
                <Pricing
                  key={key}
                  title={key}
                  value={pricingList.monthly[key]}
                  t="mo"
                />
              ))}
            </section>
          ) : ty === 2 ? (
            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
              {Object.keys(pricingList.annual).map((key) => (
                <Pricing
                  key={key}
                  title={key}
                  value={pricingList.annual[key]}
                  t="yearly"
                />
              ))}
            </section>
          ) : ty === 3 ? (
            <section className="flex flex-wrap justify-center container">
              {Object.keys(pricingList.lifetime).map((key) => (
                <div key={key} className="lg:w-1/3 md:w-1/2 w-full">
                  <Pricing
                    key={key}
                    title={key}
                    value={pricingList.lifetime[key]}
                    t="lifetime"
                  />
                </div>
              ))}
            </section>
          ) : (
            <></>
          )}
        </div>
      </MainWithHeader>

      <PaddleLoader />
    </>
  );
}
