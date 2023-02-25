import { useState } from "react";
import Sidenav from "../Features/SideNav";
import MainWithHeader from "../Features/mainLayout/MainWithHeader";

import { Player, Controls } from "@lottiefiles/react-lottie-player";

import Pricing from "../Features/Pricing";
import { H1, Hi4 } from "../Components/H";
import { ButtonGroup, Button } from "react-daisyui";

// import PaddleLoader from "../Features/Paddle";
import { GetFullUserContext } from "../hooks/UserHook";

import { pricingList } from "../utils/pricing";

export default function Membership() {
  const [ty, setTy] = useState(1);
  const [success, setSuccess] = useState(false);
  const { fullUser } = GetFullUserContext();

  return (
    <>
      <Sidenav cpath="membership" />
      <MainWithHeader>
        <H1>Membership</H1>
        <div className="mt-4">
          {/* {success && (
            <div className="flex mb-6 justify-center">
              <p className="text-bg text-sm font-bold bg-success rounded-lg px-8 py-1 ">
                Congratulations! You have now the membership.
                <br />
                You have joined the team.
              </p>
            </div>
          )} */}

          {fullUser?.subObj ? (
            <div className="flex justify-center mb-6">
              <div className="bg-accent px-3 py-1 rounded-lg">
                <Hi4 className="!text-bg font-semibold">
                  You got the{" "}
                  <span className="font-extrabold">{fullUser.subObj.name}</span>{" "}
                  membership.
                </Hi4>
              </div>
            </div>
          ) : (
            <div className="mt-2"></div>
          )}

          <div className="w-full flex justify-center mb-6">
            <ButtonGroup>
              <Button
                animation={false}
                className="bg-bg rounded-xl capitalize px-6"
                size="sm"
                active={ty === 1}
                onClick={() => setTy(1)}
              >
                Monthly
                <span className="ml-1 hidden md:block">Pricing</span>
              </Button>
              <Button
                animation={false}
                size="sm"
                className="bg-bg rounded-xl capitalize px-6 "
                active={ty === 2}
                onClick={() => setTy(2)}
              >
                Annual
                <span className="ml-1 hidden md:block">Pricing</span>
              </Button>
              <Button
                animation={false}
                size="sm"
                className="bg-bg rounded-xl capitalize px-6"
                active={ty === 3}
                onClick={() => setTy(3)}
              >
                Lifetime
                <span className="ml-1 hidden md:block">Membership</span>
              </Button>
            </ButtonGroup>
          </div>

          {ty === 1 ? (
            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
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
            <section className="mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center">
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
              {Object.keys(pricingList.lifetime).map((key) => (
                <div key={key} className="lg:w-1/3 md:w-1/2 w-full">
                  <Pricing
                    key={key}
                    title={key}
                    value={pricingList.lifetime[key]}
                    t="lifetime"
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

      {/* <PaddleLoader /> */}
    </>
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
