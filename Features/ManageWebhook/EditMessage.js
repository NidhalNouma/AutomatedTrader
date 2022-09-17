import React from "react";
import { Button } from "react-daisyui";

import { H3 } from "../../Components/H";
import WebhookData from "./WebhookData";
import { Select1 } from "../../Components/Input";

function EditMessage({ close, webhook, msg, setMsg, messages }) {
  return (
    <div className="">
      <div className="sticky top-0 bg-accenti p-4 z-20 flex justify-between items-center">
        <div className="flex items-center">
          <H3 className="block whitespace-nowrap">Edit message</H3>
          <Select1
            options={messages.map((v) => v.pair)}
            value={msg.pair}
            setValue={(v) => setMsg(messages[v])}
          />
        </div>
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
          typeWh="EditMessage"
          webhook={webhook}
          msg={msg}
        />
      </div>
    </div>
  );
}

export default EditMessage;
