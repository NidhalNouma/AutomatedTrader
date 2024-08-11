import React from "react";
import { Button, Select } from "react-daisyui";

import { H3 } from "../../components/H";
import WebhookData from "./WebhookData";
import { Select1 } from "../../components/Input";

function EditMessage({ close, webhook, msg, setMsg, messages, duplicateMsg }) {
  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <div className="flex items-center">
          <H3 className="block whitespace-nowrap">Edit message</H3>

          <Select
            // value={msg.msg}
            onChange={(v) => setMsg(messages[v])}
            size="sm"
            className="bg-transparent border focus:outline-none rounded-lg text-text-p font-bold ml-5"
          >
            {messages.map((v, i) => (
              <option key={i} value={i} selected={v.msg === msg.msg}>
                {v.data.pair}
                {" - "}
                {v.data.type}
              </option>
            ))}
          </Select>
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
          duplicateMsg={duplicateMsg}
        />
      </div>
    </div>
  );
}

export default EditMessage;
