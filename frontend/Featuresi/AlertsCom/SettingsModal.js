import { useState } from "react";

import { XIcon } from "@heroicons/react/solid";
import { SubTitle2 as H3 } from "../../components/ui/Text";

import { Button as ButtonP } from "../../components/ui/Button";

import { GetFullUserContext, AlertSettings } from "../../hooks/UserHook";

import { Toggle1 } from "../../components/Input";

function Index({ close }) {
  const { fullUser, getFullUser } = GetFullUserContext();

  const {
    sendNotification,
    setSendNotification,
    showPopUp,
    setShowPopUp,
    popUpSound,
    setPopUpSound,
    saveAlertSettings,
    sendTelegram,
    setSendTelegram,
  } = AlertSettings(fullUser, getFullUser);

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
          name="Show pop-up"
          value={showPopUp}
          setValue={() => setShowPopUp(!showPopUp)}
        />
        <Toggle1
          name="Pop-up sound"
          value={popUpSound}
          setValue={() => setPopUpSound(!popUpSound)}
        />
        <Toggle1
          name="Send notification"
          value={sendNotification}
          setValue={() => setSendNotification(!sendNotification)}
        />
        <Toggle1
          name="Send to telegram"
          value={sendTelegram}
          setValue={() => setSendTelegram(!sendTelegram)}
        />
      </div>

      <div className="mt-4 mb-6 w-full flex justify-center">
        <ButtonP
          onClick={async () => {
            await saveAlertSettings();
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
