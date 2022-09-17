import { useState } from "react";
import { Button } from "react-daisyui";

import { H3 } from "../../Components/H";
import WebhookData from "./WebhookData";

function Index({ close }) {
  return (
    <div className="">
      <div className="sticky top-0 bg-accenti p-4 z-20 flex justify-between items-center">
        <H3 className="flex">New Webhooks</H3>
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
        <WebhookData includeName={true} close={close} typeWh="index" />
      </div>
    </div>
  );
}

export default Index;
