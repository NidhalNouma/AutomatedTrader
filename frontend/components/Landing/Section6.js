import React from "react";
// import { Player, Controls } from "@lottiefiles/react-lottie-player";
// const src = "https://assets9.lottiefiles.com/packages/lf20_yvmyimd3.json";

function Section6() {
  return (
    <section className="flex flex-col items-center justify-center">
      <div className="max-w-5xl mt-[20vh] pb-10 mx-auto flex-col flex">
        <h1 className="md:text-7xl text-5xl text-center font-bold text-title mb-3 ">
          Hear from them
        </h1>
        <h2 className="text-xl font-semibold pb-0 text-text text-center">
          As a leading trading software company, we engage with our clients
          beyond the conventional relationship,
          <br /> becoming a partner to the people and companies we work with.
        </h2>
      </div>

      <div className="max-w-5xl grid md:grid-cols-3 grid-cols-1 gap-6 justify-center">
        {/* <div className="absolute top-[25px] rounded-full  bg-gradient-to-tr from-primary to-secondary w-[32%] aspect-square scale-150 blur-[280px]"></div> */}
        <Part
          className=""
          name="Brandon, Day Trader"
          img="https://i0.wp.com/automatedtrader.com/wp-content/uploads/2023/03/SpaceSocialclub-8.png?w=780&ssl=1"
        >
          “5 winning trades in a row using Automated Trader BOOM ! 💥 also
          having lots of fun trading this way!“
        </Part>
        <Part
          className=""
          name="FXSCALPER, Youtuber"
          img="https://i0.wp.com/automatedtrader.com/wp-content/uploads/2023/03/SpaceSocialclub-7.png?w=780&ssl=1"
        >
          “I&lsquo;ve used other companies to automate my trading but none have
          worked better then automated trader, the dashboard is legit 🔥 “
        </Part>
        <Part
          className=""
          name="Jay, Funded Trader"
          img="https://i0.wp.com/automatedtrader.com/wp-content/uploads/2023/03/image0-3.jpeg?w=780&ssl=1"
        >
          “I use the manual automation to manage my risk per trade when I trade
          on my propfirm account with FTMO because it makes my trading faster “
        </Part>
      </div>
    </section>
  );
}

export default Section6;

function Part({ className, name, children, img }) {
  return (
    <div className={`${className} rounded-xl bg-bg shadow-lg p-4`}>
      <div className="">
        <div className="flex items-center mb-4">
          <img
            className="h-8 w-8 rounded-full mr-4"
            src={img}
            alt="Picture of the author"
          />
          <h3 className="text-title/80 font-semibold">{name}</h3>
        </div>
        <p className="text-text/80">{children}</p>
      </div>
    </div>
  );
}
