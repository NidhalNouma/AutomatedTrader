import React, { useRef, Fragment } from "react";
import {
  CardComponent,
  CardNumber,
  CardExpiry,
  CardCVV,
} from "@chargebee/chargebee-js-react-wrapper";
import { Button as ButtonP } from "../../components/ui/Button";

function PaymentMethod() {
  const cardRef = useRef(null);
  return (
    <Fragment>
      <CardComponent ref={cardRef} className="rounded-xl " styles={{}}>
        <CardNumber className="mb-2 text-xl bg-text-h p-3 pb-2 rounded-xl" />
        <CardExpiry className="mb-2 text-xl bg-text-h p-3 pb-2 rounded-xl" />
        <CardCVV className="mt-1 text-xl bg-text-h p-3 pb-2 rounded-xl" />
      </CardComponent>

      <div className="flex items-center justify-center mt-6">
        <ButtonP className="">Next</ButtonP>
      </div>
    </Fragment>
  );
}

export default PaymentMethod;
