import { useState, Fragment, useEffect } from "react";
import { withAuth } from "../contexts/UserContext";
import { MainLayoutWithHeader } from "../components/layout/MainLayout";
import { ButtonText } from "../components/ui/Button";

import { useUser } from "../contexts/UserContext";
import { useRouter } from "next/router";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

import PricingItem from "../components/parts/PriceingItem";
import { pricingList } from "../utils/pricing";

// import MegaSale1 from "../Features/Banners/MegaSale1";

function Membership() {
  const router = useRouter();
  const { m } = router.query;
  let queryMembership = 2;

  if (m) {
    const arr = Object.values(pricingList);

    for (let i = 0; i < arr.length; i++) {
      const d = arr[i];

      Object.values(d).forEach((v) => {
        if (v.chargeBeeId === m) queryMembership = i + 1;
      });
    }
  }

  const [ty, setTy] = useState(queryMembership);

  const [success, setSuccess] = useState(false);
  const { fullUser } = useUser();

  return (
    <Fragment>
      <MainLayoutWithHeader title="Membership" page="membership">
        {/* {fullUser?.subObj?.chargeBeeId !==
          pricingList.lifetime["Lifetime access"].chargeBeeId && <MegaSale1 />} */}

        <div className="w-full flex flex-col mb-8 bg-bgt mt-8">
          <div className="flex items-center justify-between w-full max-w-md mb-6 p-3 mx-auto rounded-lg outline outline-1 outline-dashed outline-primary/40 outline-offset-4">
            <ButtonText
              className={`text-title/80 capitalize  !text-lg font-semibold hover:bg-transparent hover:text-title ${
                ty === 1 && "text-primary hover:text-primary"
              }`}
              active={ty === 1}
              onClick={() => setTy(1)}
            >
              Monthly
            </ButtonText>
            <ButtonText
              className={`text-title/80 capitalize  !text-lg font-semibold hover:bg-transparent hover:text-title ${
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
              className={`text-title/80 capitalize  !text-lg font-semibold hover:bg-transparent hover:text-title ${
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

          <div className="mt-4">
            {ty === 1 ? (
              <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-4">
                {Object.keys(pricingList.monthly).map((key, i) => (
                  <PricingItem
                    key={key}
                    title={key}
                    value={pricingList.monthly[key]}
                    t="mo"
                    i={i}
                    setSuccess={setSuccess}
                  />
                ))}
              </section>
            ) : ty === 2 ? (
              <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-4">
                {Object.keys(pricingList.annual).map((key, i) => (
                  <PricingItem
                    key={key}
                    title={key}
                    value={pricingList.annual[key]}
                    t="yearly"
                    i={i}
                    setSuccess={setSuccess}
                  />
                ))}
              </section>
            ) : ty === 3 ? (
              <section className="flex flex-wrap justify-center container">
                {Object.keys(pricingList.lifetime).map((key, i) => (
                  <div key={key} className="lg:w-1/3 md:w-1/2 w-full">
                    <PricingItem
                      key={key}
                      title={key}
                      value={pricingList.lifetime[key]}
                      t="lifetime"
                      i={i}
                      setSuccess={setSuccess}
                    />
                  </div>
                ))}
              </section>
            ) : (
              <Fragment></Fragment>
            )}
          </div>
        </div>
      </MainLayoutWithHeader>
      {success && (
        <div className="relative">
          <Play l={0} />
          <Play l={1} />
        </div>
      )}
    </Fragment>
  );
}

export default withAuth(Membership);

function Play({ l }) {
  // const src = "https://assets7.lottiefiles.com/packages/lf20_lg6lh7fp.json";
  const src = "https://assets9.lottiefiles.com/packages/lf20_wjGXUyYZSf.json";
  const style = {
    position: "absolute",
    bottom: "0px",
    left: `${l === 0 ? 0 : "auto"}`,
    right: `${l === 1 ? 0 : "auto"}`,
    zIndex: 0,
    pointerEvents: "none",
    height: "100vh",
  };

  return (
    <Player autoplay loop src={src} style={style}>
      <Controls
        visible={false}
        buttons={["play", "repeat", "frame", "debug"]}
      />
    </Player>
  );
}
