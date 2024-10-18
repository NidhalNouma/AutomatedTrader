import React, { useRef, Fragment } from "react";
import { CardComponent } from "@chargebee/chargebee-js-react-wrapper";

function Checkout() {
  const cardRef = useRef(null);
  return (
    <Fragment>
      <CardComponent ref={cardRef} />
    </Fragment>
  );
}

export default Checkout;
