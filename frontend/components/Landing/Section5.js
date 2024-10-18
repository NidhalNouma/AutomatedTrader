import React from "react";
import Image from "next/image";
// import { Player, Controls } from "@lottiefiles/react-lottie-player";
// const src = "https://assets9.lottiefiles.com/packages/lf20_yvmyimd3.json";

function Section5() {
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-5xl mt-[15vh] pb-10 mx-auto flex-col flex">
        <h1 className="md:text-7xl text-5xl text-center font-bold text-title mb-3 ">
          Copy & Share Trader
        </h1>
        <h2 className="text-xl font-semibold pb-0 text-text text-center">
          Passive investing handsfree, just find a profitable trading solution
          that works for you. We show you all the users public data so you can
          know exactly what to expect when following a signal provider!
        </h2>
        <spam className="mx-auto text-lg mt-6 font-semibold text-title px-6 bg-secondary rounded-full ">
          Coming soon
        </spam>
      </div>

      <div className="relative w-full flex items-center justify-center">
        <div className="absolute top-[25px] rounded-full  bg-gradient-to-tr from-primary to-secondary w-[32%] aspect-square scale-150 blur-[280px]"></div>
        <div className="">
          <img
            className="h-96 aspect-square"
            src="/Images/landing/trading-and-invest-app.png"
            alt="Picture of the author"
          />
          {/* <Player
            autoplay
            loop
            src={src}
            style={{
              height: "500px",
            }}
          >
            <Controls
              visible={false}
              buttons={["play", "repeat", "frame", "debug"]}
            />
          </Player> */}
        </div>
      </div>
    </section>
  );
}

export default Section5;
