import React from "react";
import Link from "next/link";
import { ArrowSmRightIcon } from "@heroicons/react/outline";

function Section1() {
  return (
    <section className="flex-col items-center justify-center">
      <div className="max-w-5xl mt-[25vh] pb-32 mx-auto">
        <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            data-aos="fade-up"
            data-aos-duration="1000"
            data-aos-delay="100"
            className="object-cover object-center w-3/4 mb-10 m-4"
            alt="Placeholder Image"
            src="/Logo/dark-logo.png"
          />
        </div>
        <h1
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="text-80 text-center font-4 lh-6 ld-04 font-bold text-text-p mb-6"
        >
          Automate your trades
        </h1>
        <h2
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="200"
          className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-text-p text-center"
        >
          TradingView to any broker, any indicator, any alert, instantly ...
        </h2>
        <div
          data-aos="fade-up"
          data-aos-duration="1000"
          data-aos-delay="250"
          className="ml-6 text-center"
        >
          <Link href="/signup">
            <div className="cursor-pointer text-text-h border-4 border-primary rounded-full inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline">
              <div className="flex text-lg">
                <span className="flex justify-center items-center">
                  Get started
                  <ArrowSmRightIcon className="ml-[0.5rem] h-6 w-7" />
                </span>
              </div>
            </div>
          </Link>
        </div>
      </div>

      <div
        data-aos="fade-up"
        data-aos-duration="1200"
        data-aos-delay="300"
        className="container flex flex-col items-center justify-center mx-auto"
      >
        <img
          className="object-cover object-center w-full mb-10 rounded-3xl border-2"
          alt="Placeholder Image"
          src="/Images/landing/profilepage.png"
        />
      </div>
    </section>
  );
}

export default Section1;
