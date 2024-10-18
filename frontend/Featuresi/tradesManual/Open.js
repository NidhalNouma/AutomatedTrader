import React from "react";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";

import WebhookTrade from "./WebhookTrade";

function Open({ close }) {
  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <H3 className="flex">New Trade</H3>
        <Button
          size="sm"
          shape="circle"
          className=" bg-accenti"
          onClick={() => {
            close();
          }}
        >
          <XIcon className="h-4 w-4" />
        </Button>
      </div>
      <div className="flex flex-col justify-center items-center w-full mt-2">
        <WebhookTrade close={close} />
        {/* <WebhookData includeName={true} close={close} typeWh="index" /> */}
      </div>
    </div>
  );
}

export default Open;
