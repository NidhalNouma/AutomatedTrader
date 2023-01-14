import { Fragment } from "react";
import { Select1 } from "../../Components/Input";
import { Alert } from "react-daisyui";
import { ButtonP } from "../../Components/Button";

import { GetMTAccountsContext } from "../../hooks/MTAccounts";
import { GetWebhookContext } from "../../hooks/WebHook";
import { PlaceWebhookTrade } from "../../hooks/ManualTrade";
import { GetToastContext } from "../../hooks/ToastHook";

function WebhookTrade({ close }) {
  const { mtAccounts } = GetMTAccountsContext();
  const { webhooks } = GetWebhookContext();
  const { newAlert } = GetToastContext();

  const {
    sAccount,
    setSAccount,
    sWebhook,
    setSWebhook,
    sMessage,
    setSMessage,
    error,
    send,
  } = PlaceWebhookTrade(mtAccounts, webhooks);

  return (
    <div className="w-full mx-auto flex flex-col items-center max-w-md">
      <Select1
        className="my-1"
        name="Choose an account"
        helper="Choose an active account to place the trade"
        options={mtAccounts.map((v) => v.accountDisplayName)}
        value={mtAccounts.indexOf(sAccount)}
        setValue={(v) => setSAccount(mtAccounts[v])}
      />
      <Select1
        className="my-1"
        name="Choose a webhook"
        helper="Choose a webhook"
        options={webhooks.map((v) => v.name)}
        value={webhooks.indexOf(sWebhook)}
        setValue={(v) => setSWebhook(webhooks[v])}
      />
      {sWebhook && sMessage && (
        <Select1
          className="my-1"
          name="Choose a message"
          helper="Choose a message"
          options={sWebhook?.messages.map((v) => v)}
          value={sWebhook?.messages.indexOf(sMessage)}
          setValue={(v) => setSMessage(sWebhook?.messages[v])}
        />
      )}

      {error && (
        <div className="mt-2 max-w-xs w-full">
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

      <div className="mt-4 mb-6 w-full flex justify-center">
        <ButtonP
          onClick={async () => {
            await send(() => {
              newAlert("Trade was sent successfully!", "success");
              close();
            });
          }}
          className="w-full max-w-xs mx-auto"
        >
          Send
        </ButtonP>
      </div>
    </div>
  );
}

export default WebhookTrade;
