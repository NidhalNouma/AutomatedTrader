import Head from "next/head";
import Header from "../Features/Landing/Header";
import Main from "../Features/Landing/Main";
import Footer from "../Features/Landing/Footer";

export default function Home() {
  return (
    <div className="text-black w-full h-screen">
      <Head>
        {/* <title>nine4</title> */}
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      <Header />
      {/* <Main /> */}
      {/* <Footer /> */}
      <video className="w-screen h-screen" autoPlay loop muted>
        <source src="/Draft3.mp4" type="video/mp4" />
      </video>
    </div>
  );
}
