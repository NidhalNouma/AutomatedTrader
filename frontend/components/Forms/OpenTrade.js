import { Fragment } from "react";
import { Select } from "../ui/Input";
import { Button } from "../ui/Button";
import { Error } from "../ui/Alerts";

import { OpenTrade as OpenTradeHook } from "../../hooksp/TradeHook";

function OpenTrade({ close, children }) {
  const {
    account,
    setAccount,
    accountOptions,
    webhook,
    setWebhook,
    webhookOptions,
    message,
    setMessage,
    messageOptions,
    error,
    sendTrade,
  } = OpenTradeHook();

  return (
    <section className="w-full flex flex-col items-center">
      <Select
        name="Choose an app"
        className=""
        options={accountOptions}
        value={account}
        setValue={setAccount}
        helper="Select one of your account to where the trade will be sent."
      ></Select>
      <Select
        name="Choose a webhook"
        className="mt-5"
        options={webhookOptions}
        value={webhook}
        setValue={setWebhook}
        helper="Select one of your account to where the trade will be sent."
      ></Select>
      <Select
        name="Choose a message"
        className="mt-5 mb-3"
        options={messageOptions}
        value={message}
        setValue={setMessage}
        helper="Select one of your account to where the trade will be sent."
      ></Select>

      {error && <Error className="mt-3 mb-0 max-w-xs">{error}</Error>}

      <Button
        onClick={async () => {
          const r = await sendTrade();
          if (r && typeof close === "function") close();
        }}
        className="mt-3 w-full max-w-xs"
        spinnerClassName="mt-3"
        icon={
          <svg
            className="h-3.5 aspect-square"
            stroke="currentColor"
            fill="none"
            strokeWidth="2"
            viewBox="0 0 24 24"
            strokeLinecap="round"
            strokeLinejoin="round"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="m22 2-7 20-4-9-9-4Z"></path>
            <path d="M22 2 11 13"></path>
          </svg>
        }
      >
        Send
      </Button>
    </section>
  );
}

export default OpenTrade;
