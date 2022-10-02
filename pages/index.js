import Head from "next/head";
import Link from "next/link";
import Header from "../Features/Landing/Header";
import Main from "../Features/Landing/Main";
import Footer from "../Features/Landing/Footer";

export default function Home() {
  return (
    // <div className="text-black w-full h-screen bg-accent bg-gradient-to-tl from-bg to-accent">
    <div
      className="text-black w-full h-screen bg-scale"
      style={{ backgroundImage: "url(/Images/bg-landing.png" }}
    >
      <Head>
        {/* <title>nine4</title> */}
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      <Header />

      <div className="mt-24 sm:mx-0 mx-2">
        <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            className="object-cover object-center w-4/6 b-8 m-4"
            alt="Placeholder Image"
            src="/Logo/dark-logo.png"
          ></img>
        </div>
        <h1 className="text-2xl text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          TRADINGVIEW TO MT4, ANY INDICATOR, ANY ALERT, INSTANTLY ...
        </h1>
      </div>

      <div className="mx-auto flex justify-center items-center w-full max-w-6xl">
        <div className="w-2/5 p-5 text-center">
          <h4 className="text-primary mb-3 text-xl font-bold">
            Would you like to be one of the first to be able touse Automated
            Trader
          </h4>

          <p className="text-text-h bg-primary rounded-xl p-1 text-lg text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
            Pre-regestration is now available.
          </p>
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
        <div className="w-3/5 p-0 rounded-xl">
          {/* <video className="w-full rounded-xl" autoPlay loop muted>
            <source src="/Draft3.mp4" type="video/mp4" />
          </video> */}
          <img
            src="https://looksyummyapp.s3.us-east-2.amazonaws.com/Transparent-Cropped-NO-SHADOW-SMALL.gif"
            className="w-full transform-gpu skew-y-2"
          />
        </div>
      </div>

      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
}
