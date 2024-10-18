import React from "react";
import { Button } from "react-daisyui";

import { H3 } from "../../components/H";
import WebhookData from "./WebhookData";

function AddMessage({ close, webhook, msg }) {
  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <H3 className="flex">New message</H3>
        <Button
          size="sm"
          shape="circle"
          className=" bg-accenti"
          onClick={() => {
            close();
          }}
        >
          ✕
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-2">
        <WebhookData
          close={close}
          typeWh="AddMessage"
          webhook={webhook}
          msg={msg}
        />
      </div>
    </div>
  );
}

export default AddMessage;
