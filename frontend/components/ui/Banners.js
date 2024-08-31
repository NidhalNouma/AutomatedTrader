import { useState, useEffect, Children, Fragment } from "react";

export function BinanceBanner({ className, children }) {
  return (
    <aside
      className={` inline-flex items-center mt-1 mb-3 relative h-8 py-1 bg-transparent pl-4 pr-2 ${className}`}
    >
      <div className="absolute left-0 inset-y-0 w-full border rounded-lg -skew-x-[20deg] border-[#f0b90b]/60 bg-[#f0b90b]/10" />
      {/* <div className="absolute right-0 inset-y-0 w-3/4 border-l-0 border border-[#f0b90b] " /> */}
      <p className="text-title  text-lg  w-auto whitespace-nowrap overflow-hidden flex items-center">
        Get 8% CashBack
      </p>
      <img src="/Images/binance-logo.png" className="h-full w-auto" />
    </aside>
  );
}

export function TSBanner({ className, children }) {
  return (
    <aside
      className={` inline-flex items-center mt-1 mb-3 relative h-8 py-1  pl-4 pr-2 ${className}`}
    >
      <div className="absolute left-0 inset-y-0 w-full border rounded-lg -skew-x-[20deg] border-[rgb(41,97,242)]/60 bg-[rgb(41,97,242)]/10" />
      {/* <div className="absolute right-0 inset-y-0 w-3/4 border-l-0 border border-[rgb(41,97,242)] " /> */}
      <h1 className="text-title inline text-lg truncate">
        Get Your Signals from
      </h1>
      <h1 className="text-[rgb(41,97,242)] inline text-lg font-extrabold truncate mr-2">
        TrustedSignals
      </h1>
      {/* <img src="/Images/ts-logo.png" className="h-full" /> */}
    </aside>
  );
}

export const FlippingBanners = ({ children, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(
        (prevIndex) => (prevIndex + 1) % Children.count(children)
      );
    }, 7000); // 7 seconds interval

    return () => clearInterval(interval);
  }, [children]);

  return (
    <div className={`relative  ml-auto h-10  ${className}`}>
      {Children.map(children, (child, index) => (
        <div
          className={`absolute top-0 left-0 mr-2 w-full  h-full transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          {child}
        </div>
      ))}
    </div>
  );
};
