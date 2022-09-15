import React, { useState } from "react";
import { H6 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";

import { Modal1 } from "../../Components/Modal";
import WebhooksPopUp from "./WebhooksPopUp";

function Mt4({ account }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="bg-bga p-3 rounded-b-xl">
      <div className="">
        <H6>Account name: {account.accountName}</H6>
        <H6>Account balance: {account.accountBalance}</H6>
        <H6>Account equity: {account.accountEquity}</H6>

        <ButtonText
          helper="List of webhooks"
          className=""
          onClick={() => setOpen(true)}
        >
          Webhooks
          {/* <PlusCircleIcon className="h-5 w-5 text-secondaryi " /> */}
        </ButtonText>
      </div>

      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <WebhooksPopUp close={() => setOpen(false)} id={account?.id} />
      </Modal1>
    </div>
  );
}

export default Mt4;
