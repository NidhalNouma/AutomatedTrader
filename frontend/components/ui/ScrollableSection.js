import { Fragment, useEffect } from "react";

export function ScrollableButtons({ className, children }) {
  return (
    <section className={`max-w-full w-full flex  ${className}`}>
      <div className={`relative w-full mx-auto max-w-xl`}>
        {/* Scrollable container */}
        <div className="flex overflow-x-auto hideScrollbar space-x-2 bg-bgt max-w-full rounded px-16">
          {children}
        </div>

        {/* Overlay effect for indicating more content */}
        <div className="absolute top-0 right-0 h-full w-16 bg-gradient-to-l from-bgt pointer-events-none"></div>
        <div className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-bgt pointer-events-none"></div>
      </div>
    </section>
  );
}
