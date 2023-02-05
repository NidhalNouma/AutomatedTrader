import React, { useRef, Fragment } from "react";
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from "@chargebee/chargebee-js-react-wrapper";
import { ButtonP } from "../../Components/Button";

function PaymentMethod() {
  const cardRef = useRef(null);
  return (
    <Fragment>
      <CardComponent ref={cardRef} className="rounded-xl text-text-h">
        <CardNumber className="text-text-p mb-2 text-xl bg-bga p-2 rounded-xl" />
        <CardExpiry className="text-text-p mb-2 text-xl bg-bga p-2 rounded-xl" />
        <CardCVV className="text-text-p mt-1 text-xl bg-bga p-2 rounded-xl" />
      </CardComponent>
      <div className="flex items-center justify-center mt-6">
        <ButtonP className="">Next</ButtonP>
      </div>
    </Fragment>
  );
}

export default PaymentMethod;
