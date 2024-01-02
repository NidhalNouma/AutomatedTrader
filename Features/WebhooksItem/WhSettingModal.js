import { useState } from "react";
import { Button, ButtonGroup } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../Components/H";

import { ButtonP } from "../../Components/Button";

import { GetFullUserContext, WebhookSettings } from "../../hooks/UserHook";

import { Toggle1 } from "../../Components/Input";

function Index({ close }) {
  const { fullUser, getFullUser } = GetFullUserContext();

  const { showCharts, setShowCharts, saveWebhookSettings } = WebhookSettings(
    fullUser,
    getFullUser
  );

  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <H3 className="flex">Settings</H3>
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
      <div className="flex flex-col justify-center items-center w-full my-2">
        <Toggle1
          name="Show charts"
          value={showCharts}
          setValue={() => setShowCharts(!showCharts)}
        />
      </div>

      <div className="mt-4 mb-6 w-full flex justify-center">
        <ButtonP
          onClick={async () => {
            await saveWebhookSettings();
            close();
          }}
          className="w-full max-w-xs mx-auto"
        >
          Save
        </ButtonP>
      </div>
    </div>
  );
}

export default Index;
