import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import moment from "moment";

import { Countdown } from "react-daisyui";

function MegaSale1({ endDate = new Date("2023-04-10") }) {
  const router = useRouter();

  return (
    endDate > new Date() && (
      <div className="w-full relative min-h-[60vh] z-0 mb-12 sm:mb-0">
        {/* <div className="absolute top-[-135%] left-0 right-0 aspect-square bg-gradient-to-b from-accent to-primary rounded-full"></div> */}
        <div
          className="absolute bottom-[0] left-0 right-0 h-full w-full bg-gradient-to-b from-bgt to-primary"
          style={{
            clipPath: "circle(50% at 50% 0)",
          }}
        ></div>
        <div className="z-10 relative w-full h-full flex flex-col items-center justify-start pt-11">
          <p className="text-center text-transparent text-6xl font-extrabold bg-clip-text bg-gradient-to-r from-accent to-primary">
            HUGE DISCOUNT
          </p>
          <p className="text-text-p text-3xl text-center mt-4">
            Additional <span className="font-extrabold text-text-h">$500</span>{" "}
            off limited time offer!
            <br /> Don’t wait much longer spots are filling up!
          </p>
          {/* <ButtonP
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
        </ButtonP> */}
          <div className="mt-6">
            <CountDown endTime={endDate} />
          </div>

          <div className="mt-6">
            <p className="text-center font-extrabold text-2xl">
              Use coupon code <span className="text-text-h">BETALAUNCH</span>
            </p>
            <p className="text-center font-extrabold text-md mt-4">
              Only for LIFETIME membership.
            </p>
          </div>
        </div>
      </div>
    )
  );
}

export default MegaSale1;

const CountDown = ({ endTime }) => {
  const [sec, setSec] = useState(null);
  const [min, setMin] = useState(0);
  const [ho, setHo] = useState(0);
  const [da, setDa] = useState(0);

  useEffect(() => {
    const start = new Date().getTime();
    const end = endTime.getTime();

    const time = getTimeDiff(start, end);

    setSec(time.seconds);
    setMin(time.minutes);
    setHo(time.hours);
    setDa(time.days);
  }, [endTime]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const start = new Date().getTime();
      const end = endTime.getTime();

      const time = getTimeDiff(start, end);

      setSec(time.seconds);
      setMin(time.minutes);
      setHo(time.hours);
      setDa(time.days);
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [sec, endTime]);

  return (
    sec !== null && (
      <div className="grid grid-flow-col gap-5 text-center auto-cols-max">
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <Countdown className="font-mono text-5xl" value={da} />
          days
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <Countdown className="font-mono text-5xl" value={ho} />
          hours
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <Countdown className="font-mono text-5xl" value={min} />
          min
        </div>
        <div className="flex flex-col p-2 bg-neutral rounded-box text-neutral-content">
          <Countdown className="font-mono text-5xl" value={sec} />
          sec
        </div>
      </div>
    )
  );
};

function getTimeDiff(start, end) {
  const diff = end - start;

  let seconds = Math.floor(diff / 1000),
    minutes = Math.floor(seconds / 60),
    hours = Math.floor(minutes / 60),
    days = Math.floor(hours / 24),
    months = Math.floor(days / 30),
    years = Math.floor(days / 365);

  seconds %= 60;
  minutes %= 60;
  hours %= 24;
  days %= 30;
  months %= 12;

  return {
    seconds,
    minutes,
    hours,
    days,
    months,
    years,
  };
}
