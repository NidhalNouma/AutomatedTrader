import React, { Fragment, useEffect, useState } from "react";
import { Alert, Checkbox, ButtonGroup, Button } from "react-daisyui";
import {
  Input1,
  Toggle1,
  Input1Inline,
  Select1,
  Range1,
} from "../../Components/Input";
import { ButtonP, ButtonText } from "../../Components/Button";
import { WebhookAdvanced } from "../../hooks/WebHook";

import { GetUserContext } from "../../hooks/UserHook";
import { GetWebhookContext } from "../../hooks/WebHook";
import { GetToastContext } from "../../hooks/ToastHook";
import { GetMTAccountsContext } from "../../hooks/MTAccounts";

function WebhookDataAdvanced({
  includeName,
  close,
  webhook,
  typeWh,
  msg,
  duplicateMsg,
}) {
  const { newAlert } = GetToastContext();
  const { user } = GetUserContext();

  const { name, setName, pair, setPair, error, add } = WebhookAdvanced(
    user?.uid
  );

  const { getAllWebhooks, changeWebhookData } = GetWebhookContext();

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center">
      {includeName && (
        <Input1
          classNameInput="bg-accenti "
          name="Webhooks name"
          placeholder={"Name"}
          helper="Name of the webhook"
          value={name}
          setValue={setName}
        />
      )}
      <Input1
        classNameInput="bg-accenti "
        name="What's the pair name?"
        placeholder={"pair"}
        helper="Pair Name"
        value={pair}
        setValue={setPair}
      />
      <div className="my-1"></div>

      <hr className="my-2" />

      {error && (
        <div className="mb-4 max-w-xs w-full">
          <Alert
            className="p-2 rounded-lg text-sm"
            status="error"
            icon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="w-5 h-5 mr-1 stroke-current"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636"
                ></path>
              </svg>
            }
          >
            {error}
          </Alert>
        </div>
      )}

      <div className="mt-1 mb-4 w-full flex justify-center">
        <ButtonP
          onClick={async () => {
            let r;
            r = await add();
            if (r) {
              // if (typeWh !== "index") changeWebhookData(r);
              // else
              await getAllWebhooks(user?.uid);

              newAlert("New advanced webhook added", "success");

              close();
            }
          }}
          className="w-full max-w-xs mx-auto"
        >
          Save
        </ButtonP>
      </div>
    </div>
  );
}

export default WebhookDataAdvanced;
