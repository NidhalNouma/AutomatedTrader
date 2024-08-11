import React, { Fragment, useEffect, useState } from "react";
import Script from "next/script";
// import { GetChargeBeeContext } from "../../hooks/ChargeBee";

function Index({ children }) {
  const [load, setLoad] = useState(false);
  // const { setChargeBee } = GetChargeBeeContext();

  return (
    <Fragment>
      <Script
        src="https://js.chargebee.com/v2/chargebee.js"
        onLoad={() => {
          window?.Chargebee?.init({
            site: process.env.NEXT_PUBLIC_CHARGEBEE_SITE,
            publishableKey: process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY,

            isItemsModel: true,
          });

          // get cb Instance
          let cbInstance = window?.Chargebee?.getInstance();
          // console.log(cbInstance);
          // setChargeBee(cbInstance);
          setLoad(true);
        }}
        onError={(e) => {
          console.log("Error getting chargebee instance ...", e);
          setLoad(true);
        }}
      ></Script>
      {load && children}
    </Fragment>
  );
}

export default Index;
