import Pricing from "../Pricing";

export default function Main() {
  return (
    <section className="text-gray-600 body-font bg-bgl">
      <div className="max-w-5xl pt-24 pb-24 mx-auto">
        <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            className="object-cover object-center w-3/4 mb-10 g327 m-4"
            alt="Placeholder Image"
            src="/Logo/dark-logo.png"
          ></img>
        </div>
        <h1 className="text-80 text-center font-4 lh-6 ld-04 font-bold text-white mb-6">
          Automate your trades
        </h1>
        <h2 className="text-2xl font-4 font-semibold lh-6 ld-04 pb-11 text-gray-700 text-center">
          The easiest way to automate your ALL your trades even the manual ones!
          {/* <br /> */}
          {/* with Next.js and styled with Tailwind CSS */}
        </h2>
        <div className="ml-6 text-center">
          <a
            className="text-primaryi border rounded-full inline-flex items-center py-3 font-semibold text-black transition duration-500 ease-in-out transform bg-transparent bg-white px-7 text-md md:mt-0 hover:text-black hover:bg-white focus:shadow-outline"
            // href="/"
          >
            <div className="flex text-lg">
              <span className="justify-center">Get started</span>
            </div>
          </a>
          {/* <a
            className="inline-flex items-center py-3 font-semibold tracking-tighter text-white transition duration-500 ease-in-out transform bg-transparent ml-11 bg-gradient-to-r from-blue-500 to-blue-800 px-14 text-md md:mt-0 focus:shadow-outline"
            href="/"
          >
            <div className="flex text-lg">
              <span className="justify-center">Purchase</span>
            </div>
          </a> */}
        </div>
        <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
          TRADING SIGNAL FROM TRADINGVIEW{" "}
          <span className="text-primaryi">HANDSFREE</span>
        </h2>
        {/* <div className="container flex flex-col items-center justify-center mx-auto">
          <img
            className="object-cover object-center w-full mb-10 g327"
            alt="Placeholder Image"
            src="/Images/landing1.png"
          ></img>
        </div> */}
      </div>
      <h2 className="pt-40 mb-1 text-2xl font-semibold tracking-tighter text-center text-gray-200 lg:text-7xl md:text-6xl">
        Pricing
      </h2>
      <br></br>
      <p className="mx-auto text-xl text-center text-gray-300 font-normal leading-relaxed fs521 lg:w-2/3">
        Here is our collection of membership choose one and get started today.
      </p>

      <div className="mt-6">
        <section className="container mx-auto flex flex-wrap">
          {/* <Pricing title="Standard" />
          <Pricing title="Pro" />
          <Pricing title="Primium" /> */}
        </section>
      </div>

      <div className="mb-16 text-center mt-56">
        <h2 className="text-4xl font-bold text-indigo-600">Testimonials</h2>
        <p className="text-lg text-gray-600">What others say about us</p>
      </div>
      <div className="lg:grid lg:grid-cols-3 lg:gap-x-2 max-w-6xl mx-auto fsac4 md:px-1 px-3">
        <div className="p-4 text-gray-800 rounded-lgi shadow-md border-b m-4">
          <div className="mb-2">
            <p className="mb-2 text-center text-gray-600 ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique sapiente iusto esse.
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                <img
                  src="https://cdn.pixabay.com/photo/2017/05/19/12/38/entrepreneur-2326419__340.jpg"
                  alt="img"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <h5 className="font-bold text-indigo-600">John Doe</h5>
              <p className="text-sm text-gray-600">Forex trader</p>
            </div>
          </div>
        </div>
        <div className="p-4 text-gray-800 rounded-lgi shadow-md border-b m-4">
          <div className="mb-2">
            <p className="mb-2 text-center text-gray-600 ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique sapiente iusto esse.
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                <img
                  src="https://cdn.pixabay.com/photo/2021/07/14/17/32/manager-6466713__340.jpg"
                  alt="img"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <h5 className="font-bold text-indigo-600">michael james</h5>
              <p className="text-sm text-gray-600">MT4 developer</p>
            </div>
          </div>
        </div>
        <div className="p-4 text-gray-800 rounded-lgi shadow-md border-b m-4">
          <div className="mb-2">
            <p className="mb-2 text-center text-gray-600 ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique sapiente iusto esse.
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                <img
                  src="https://cdn.pixabay.com/photo/2021/07/14/17/32/manager-6466713__340.jpg"
                  alt="img"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <h5 className="font-bold text-indigo-600">michael james</h5>
              <p className="text-sm text-gray-600">Crypto trader</p>
            </div>
          </div>
        </div>
        <div className="p-4 text-gray-800 rounded-lgi shadow-md border-b m-4">
          <div className="mb-2">
            <p className="mb-2 text-center text-gray-600 ">
              Lorem ipsum dolor, sit amet consectetur adipisicing elit.
              Similique sapiente iusto esse.
            </p>
            <div className="flex flex-col items-center justify-center">
              <div className="w-12 h-12 overflow-hidden bg-gray-100 border-2 border-indigo-100 rounded-full">
                <img
                  src="https://cdn.pixabay.com/photo/2021/07/14/17/32/manager-6466713__340.jpg"
                  alt="img"
                  className="object-cover object-center w-full h-full"
                />
              </div>
              <h5 className="font-bold text-indigo-600">michael james</h5>
              <p className="text-sm text-gray-600">Crypto trader</p>
            </div>
          </div>
        </div>
      </div>

      <section className="relative pb-24">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 text-center">
          <div className="py-24 md:py-36">
            <h1 className="mb-5 text-6xl font-bold text-white">
              Subscribe to our newsletter
            </h1>
            <h1 className="mb-9 text-2xl font-semibold text-gray-200">
              Enter your email address and get our newsletters straight away.
            </h1>
            <input
              type="email"
              placeholder="jack@example.com"
              name="email"
              autoComplete="email"
              className="border border-gray-600 w-1/4 pr-2 pl-2 py-3 mt-2 rounded-md text-gray-800 font-semibold hover:border-gray-700 bg-black"
            />{" "}
            <a
              className="inline-flex items-center px-14 py-3 mt-2 ml-2 font-medium text-black transition duration-500 ease-in-out transform bg-transparent border rounded-lg bg-white"
              // href="/"
            >
              <span className="justify-center">Subscribe</span>
            </a>
          </div>
        </div>
      </section>
    </section>
  );
}
