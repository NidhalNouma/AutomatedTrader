import Head from "next/head";
import Link from "next/link";
import Header from "../Features/Landing/Header";
// import Main from "../Features/Landing/Main";
// import Footer from "../Features/Landing/Footer";

export default function Home() {
  return (
    // <div className="text-black w-full h-screen bg-accent bg-gradient-to-tl from-bg to-accent">
    <div
      className="text-black w-full min-h-screen bg-scale"
      style={{ backgroundImage: "url(/Images/bg-landing.png" }}
    >
      <Head>
        {/* <title>nine4</title> */}
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      <Header />

      <div className="mt-24 sm:mx-0 mx-2 text-center">
        <div className="flex justify-center">
          <h5 className="bg-gray-600 px-5 mt-4 rounded-full text-lg font-bold text-text-h">
            Beta Comming Soon Q4
          </h5>
        </div>
        <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            className="object-cover object-center w-4/6 b-8 m-4"
            alt="Placeholder Image"
            src="/Logo/dark-logo.png"
          ></img>
        </div>
        <h1 className=" text-primary text-2xl text-center font-4 lh-6 ld-04 font-bold text-white">
          TRADINGVIEW TO ANY BROKER, ANY INDICATOR, ANY ALERT, INSTANTLY ...
        </h1>
      </div>

      <div className="mx-auto sm:flex-row flex flex-col-reverse justify-center items-center w-full max-w-6xl">
        <div className="sm:w-2/5 w-4/5 p-5 text-center">
          <h4 className="text-primary mb-3 text-xl font-bold">
            The most innovative trading Dashboard!
          </h4>

          <div className="flex justify-center">
            <p className="text-text-h bg-primary rounded-xl p-1 text-lg text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
              Pre-regestration is now available.
            </p>
          </div>
          <p className="text-text-h font-bold mb-5">
            Make Your own BOT Share your BOTS Copy Other Traders Control your
            risk per trade Keep Track with Automated Insights
          </p>

          <Link href="/signup">
            <span className="cursor-pointer mr-4 py-1 px-4 text-xl font-bold rounded-lg text-text-h bg-primary border-2 border-primary">
              JOIN WAITLIST
            </span>
          </Link>
        </div>

        <div className="sm:w-3/5 w-4/5 p-0 rounded-xl relative overflow-hidden">
          {/* <video className="w-full rounded-xl" autoPlay loop muted>
            <source src="/Draft3.mp4" type="video/mp4" />
          </video> */}
          <img
            className="absolute w-full h-full top-0 left-0 bottom-0 right-0 scale-125 "
            src="/Images/flow.png"
          />
          <img
            src="https://looksyummyapp.s3.us-east-2.amazonaws.com/_SCREEN-OPTION-4-angled.gif"
            className="w-full transform-gpu skew-y-2"
          />
        </div>
      </div>

      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
}
