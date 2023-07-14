import React from "react";

function index({ children, className }) {
  return (
    <main
      className={` ${className} px-5 md:px-10 py-6 overflow-x-hidden bg-bgt `}
    >
      {children}
    </main>
  );
}

export default index;
