import Head from "next/head";
import Link from "next/link";
import Header from "../Features/Landing/Header";
// import Main from "../Features/Landing/Main";
// import Footer from "../Features/Landing/Footer";

export default function Home() {
  return (
    // <div className="text-black w-full h-screen bg-accent bg-gradient-to-tl from-bg to-accent">
    <div
      className="overflow-hidden text-black w-full min-h-screen bg-bg"
      // style={{ backgroundImage: "url(/Images/bg-landing.png" }}
      style={{
        backgroundImage:
          "linear-gradient(-45deg, black 0 77%, rgb(5, 5, 5) 95% 100%)",
      }}
    >
      <Head>
        {/* <title>nine4</title> */}
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      <Header />

      <div className="flex-col justify-between items-center mt-24 h-3/6">
        <div className="sm:mx-0 mx-2 text-center relative z-10">
          <div className="flex justify-center">
            <h5 className="bg-gray-600 px-5 mt-4 rounded-full text-lg font-bold text-text-h">
              Beta Coming Soon Q4
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

        <div className="my-auto mx-auto sm:flex-row flex flex-col-reverse justify-center items-center w-full h-full max-w-6xl">
          <div className="sm:w-2/5 w-4/5 p-5 text-center relative z-10">
            <h4 className="text-primary mb-3 text-xl font-bold">
              The most innovative trading Dashboard!
            </h4>

            <div className="flex justify-center">
              <p className="text-text-h bg-primary rounded-xl p-1 text-lg text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
                Pre-registration is now available.
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

          <div className="sm:w-3/5 w-4/5 p-0 relative sm:my-auto mt-28 overflow-visible">
            {/* <img
              className="absolute -bottom-1/2 right-0 scale-150 z-0"
              src="/Images/flow.png"
            /> */}
            <video
              className="w-5/5 rounded-xl mx-auto z-0 relative"
              autoPlay
              loop
              muted
            >
              <source
                src="https://looksyummyapp.s3.us-east-2.amazonaws.com/NEW+SCREEN+ONE+TRAINAGLE+.mp4"
                type="video/mp4"
              />
            </video>
            {/* <img
              // src="https://looksyummyapp.s3.us-east-2.amazonaws.com/_SCREEN-OPTION-4-angled.gif"
              src="https://looksyummyapp.s3.us-east-2.amazonaws.com/Transparent-Cropped-NO-SHADOW-SMALL.gif"
              className="w-full transform-gpu skew-y-2"
            /> */}
          </div>
        </div>
      </div>

      {/* <Main /> */}
      {/* <Footer /> */}
    </div>
  );
}
