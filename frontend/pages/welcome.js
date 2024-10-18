import { Fragment, useState } from "react";
import { useRouter } from "next/router";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

import { H1, Hi4 } from "../components/H";
import { ButtonGroup, Button } from "react-daisyui";

import { GiPrimitiveTorch } from "react-icons/gi";

import { AiTwotoneFire } from "react-icons/ai";
import { pricingList } from "../utils/pricing";

// import { SignOut } from "../hooks/SignHook";
// import { GetFullUserContext } from "../hooks/UserHook";
// import PaddleLoader from "../Features/Paddle";

// import MegaSale1 from "../Features/Banners/MegaSale1";

export default function Membership() {
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
  const { fullUser } = GetFullUserContext();

  return (
    <Fragment>
      {/* {success && <Sidenav cpath="membership" />}
      <MainWithHeader withBanners={false} header={success}>
        <div className="mt-4 max-w-6xl mx-auto">
          {success ? (
            <H1>Membership</H1>
          ) : (
            <Fragment>
              <div className="flex items-center justify-between">
                <H1>Subscribe to a plan!</H1>
                <button
                  className="text-text-p underline hover:text-text-h !text-sm"
                  onClick={async () => {
                    await SignOut();
                    router.push("/");
                  }}
                >
                  Sign out
                </button>{" "}
              </div>
              <p className="text-text-p font-medium text-sm">
                You can cancel anytime.
                <br />
                Please note that there are no refunds. If you have any questions
                please feel free to contact us.
              </p>
            </Fragment>
          )}
          {fullUser?.subObj?.chargeBeeId !==
            pricingList.lifetime["Lifetime access"].chargeBeeId && (
            <MegaSale1 endDate={new Date("2022-08-10")} />
          )}

          <div className="w-full flex justify-center mb-8 mt-10 bg-bgt">
            <ButtonGroup>
              <Button
                animation={false}
                className="bg-bgt rounded-xl capitalize px-6"
                size="md"
                active={ty === 1}
                onClick={() => setTy(1)}
              >
                Monthly
                <span className="ml-1 hidden md:block">Pricing</span>
              </Button>
              <Button
                animation={false}
                size="md"
                className="bg-bgt rounded-xl capitalize px-6 "
                active={ty === 2}
                onClick={() => setTy(2)}
              >
                Annual
                <span className="ml-1 hidden md:block">Pricing</span>
              </Button>
              <Button
                animation={false}
                size="md"
                className="bg-bgt rounded-xl capitalize px-6 border-2 border-primary text-text-h text-md"
                active={ty === 3}
                onClick={() => setTy(3)}
                // endIcon={}
              >
                Lifetime
                <span className="ml-1 hidden md:block">Membership</span>
                <AiTwotoneFire className="h-6 w-6 ml-1 text-text-h" />
              </Button>
            </ButtonGroup>
          </div>

          {ty === 1 ? (
            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center gap-4">
              {Object.keys(pricingList.monthly).map((key, i) => (
                <Pricing
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
                <Pricing
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
                  <Pricing
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
            <></>
          )}
          {success && (
            <div className="relative">
              <Play l={0} />
              <Play l={1} />
            </div>
          )}
        </div>
      </MainWithHeader>

    */}
    </Fragment>
  );
}

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
