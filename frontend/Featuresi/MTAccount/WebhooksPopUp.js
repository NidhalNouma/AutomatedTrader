import React from "react";

import { Button } from "react-daisyui";

import { H3 } from "../../components/H";
import { Toggle1 } from "../../components/Input";

import { GetWebhookContext } from "../../hooks/WebHook";
import { WebhookMT4 } from "../../hooks/WebhookAccounts";

function WebhooksPopUp({ id, close }) {
  const { webhooks, changeWebhookData } = GetWebhookContext();
  const { active, addMT4, removeMT4 } = WebhookMT4(id, webhooks);

  return (
    <div className="mb-8">
      <div className="sticky top-0 bg-accenti p-4 z-20 flex justify-between items-center">
        <H3 className="flex">Webhooks</H3>
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
        {/* <WebhookData includeName={true} close={close} type="index" /> */}

        {webhooks.map((v, i) => {
          const r = active?.find((vi) => vi.id === v.id);
          if (r)
            return (
              <Toggle1
                key={v.id}
                name={v.name}
                value={r?.active}
                setValue={async () => {
                  const req = r?.active
                    ? await removeMT4(r?.id)
                    : await addMT4(r?.id);
                  if (req) changeWebhookData(req);
                }}
              />
            );
        })}
      </div>
    </div>
  );
}

export default WebhooksPopUp;
