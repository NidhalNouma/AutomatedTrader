import React, { Fragment, useEffect, useState } from "react";
import Script from "next/script";

function Index({ children }) {
  const [load, setLoad] = useState(false);

  return (
    <Fragment>
      <Script
        src="https://js.chargebee.com/v2/chargebee.js"
        onLoad={() => {
          window?.Chargebee?.init({
            site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
            publishableKey: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,
          });

          // get cb Instance
          let cbInstance = window?.Chargebee?.getInstance();
          console.log(cbInstance);
          setLoad(true);
        }}
      ></Script>
      {load && children}
    </Fragment>
  );
}

export default Index;
