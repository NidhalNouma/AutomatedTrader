import { Fragment, useState } from "react";
import { Select1 } from "../../components/Input";
import { Alert } from "react-daisyui";
import { ButtonP } from "../../components/Button";

import { GetMTAPIAccountsContext } from "../../hooks/MTAccountsApi";
import { GetWebhookContext } from "../../hooks/WebHook";
import { PlaceWebhookTrade } from "../../hooks/ManualTrade";
import { GetToastContext } from "../../hooks/ToastHook";

function WebhookTrade({ close }) {
  const { mtAPIAccounts, mt5Accounts } = GetMTAPIAccountsContext();
  let { webhooks } = GetWebhookContext();
  const { newAlert } = GetToastContext();
  webhooks = webhooks.filter(
    (v) => v.advanced === false || v.advanced === undefined
  );

  const {
    sAccount,
    setSAccount,
    sWebhook,
    setSWebhook,
    sMessage,
    setSMessage,
    error,
    send,

    accounts,
  } = PlaceWebhookTrade(mtAPIAccounts, webhooks);

  // console.log(sAccount);

  return (
    <div className="w-full mx-auto flex flex-col items-center max-w-md">
      {/* {mtAPIAccounts?.length > 0 && (
        <Select1
          className="my-1"
          name="Choose a broker"
          helper="Choose a broker"
          options={brokers}
          value={brokers.indexOf(sbroker)}
          setValue={(v) => setSBroker(brokers[v])}
        />
      )} */}
      <Select1
        className="my-1"
        name="Choose an account"
        helper="Choose an active account to place the trade"
        options={accounts.map((v) => v.accountDisplayName)}
        value={accounts.indexOf(sAccount)}
        setValue={(v) => setSAccount(accounts[v])}
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

      {sWebhook && sMessage && (
        <p className="my-2 p-1 text-text-h bg-bga rounded-lg text-xs max-w-xs">
          {sMessage}
        </p>
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
