import Head from "next/head";
import Header from "../Features/Landing/Header";
import Main from "../Features/Landing/Main";
import Footer from "../Features/Landing/Footer";

export default function Home() {
  return (
    <div className="text-black bg-black w-full">
      <Head>
        {/* <title>nine4</title> */}
        {/* <link rel="icon" href="/favicon.png" /> */}
      </Head>
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
