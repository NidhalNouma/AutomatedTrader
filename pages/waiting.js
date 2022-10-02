import Head from "next/head";

export default function Home() {
  return (
    <div className="text-black w-full h-screen flex flex-col justify-center items-center">
      <div className="container flex flex-col items-center justify-center mx-auto">
        <img
          className="object-cover object-center w-3/4 mb-10 g327 m-4"
          alt="Placeholder Image"
          src="/Logo/dark-logo.png"
        ></img>
      </div>
      <div className="p-8 bg-accent rounded-xl">
        <h4 className="text-text-h">
          You&apos;re successfully signed up, You will receive an email when our
          product is ready.
        </h4>
      </div>
    </div>
  );
}
