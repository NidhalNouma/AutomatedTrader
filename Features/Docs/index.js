import React from "react";

function Index({ children }) {
  return (
    <div className="bg-bg rounded-lg px-4 py-3 :max-h-[68vh] overflow-y-scroll hideScrollbar">
      {children}
    </div>
  );
}

export default Index;

export function Step({ children, imgSrc, num }) {
  return (
    <React.Fragment>
      <span className="font-semibold">{num}. </span>
      {children}
      {imgSrc && (
        <img
          className="aspect-video object-contain mt-4 mb-2 max-w-4xl rounded"
          src={imgSrc}
        />
      )}
      <br />
      <br />
    </React.Fragment>
  );
}
