import React from "react";

function Index({ children }) {
  return (
    <div className="bg-bg rounded-lg px-4 py-2 max-h-[68vh] overflow-y-scroll hideScrollbar">
      {children}
    </div>
  );
}

export default Index;
