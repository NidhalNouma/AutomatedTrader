import { useState } from "react";
import { Button, ButtonGroup } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";
import WebhookData from "./WebhookData";
import WebhookDataAdvanced from "./WebhookDataAdvanced";

function Index({ close }) {
  const [type, setType] = useState(0);

  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <H3 className="flex">New Webhooks</H3>
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
        <ButtonGroup>
          <Button
            size="sm"
            className={`capitalize !text-sm rounded-xl bg-bg mb-3 w-24 hover:!bg-bgt text-text-p hover:text-text-h ${
              type === 0 && "text-text-h bg-primary hover:!bg-primary"
            }`}
            onClick={() => setType(0)}
          >
            Basic
          </Button>
          <Button
            size="sm"
            className={`capitalize !text-sm rounded-xl bg-bg w-24 hover:!bg-bgt text-text-p hover:text-text-h ${
              type === 1 && "text-text-h bg-primary hover:!bg-primary"
            }`}
            onClick={() => setType(1)}
          >
            Advanced
          </Button>
        </ButtonGroup>
        {type === 0 ? (
          <WebhookData includeName={true} close={close} typeWh="index" />
        ) : (
          <WebhookDataAdvanced
            includeName={true}
            close={close}
            typeWh="index"
          />
        )}
      </div>
    </div>
  );
}

export default Index;
