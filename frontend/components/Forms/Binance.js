import { Fragment, useState } from "react";
import { ButtonGroup, Button as Button_ } from "react-daisyui";

import { InputInline, Input, ToggleInline } from "../ui/Input";
import { Button } from "../ui/Button";

import { CiSaveUp2 } from "react-icons/ci";
import { Info, Error } from "../ui/Alerts";
import { AddBinanceAccount } from "../../hooksp/BinanceHook";

export default function NewAccountForm({ close }) {
  const {
    accountName,
    setAccountName,
    apiKey,
    setApiKey,
    apiSecretKey,
    setApiSecretKey,
    testAccount,
    setTestAccount,
    error,
    add,
  } = AddBinanceAccount();

  return (
    <section className="w-full flex flex-col items-center">
      <Input
        value={accountName}
        setValue={setAccountName}
        className="mt-2"
        name="Account Name"
        type="text"
        placeholder="Account T"
        helper="The account name."
      />
      <Input
        value={apiKey}
        setValue={setApiKey}
        className="mt-4"
        name="API key"
        type="string"
        placeholder="api_key"
        helper="Your binance API key."
      />
      <Input
        value={apiSecretKey}
        setValue={setApiSecretKey}
        className="mt-4"
        name="API secret key"
        type="password"
        placeholder="--------"
        helper="Your binance secret key."
      />
      <ToggleInline
        className="mt-4 mb-2"
        name="Testnet account"
        checked={testAccount}
        onChange={() => setTestAccount(!testAccount)}
        helper="Enabele if you're using a binance test account."
      />

      {error && <Error className="mt-4 max-w-xs">{error}</Error>}

      <Button
        onClick={async () => {
          const r = await add();
          if (r && !r.error) close();
        }}
        className="mt-5 w-full max-w-xs"
        spinnerClassName="mt-5"
        icon={<CiSaveUp2 className="h-3.5 aspect-square stroke-2" />}
      >
        Save
      </Button>
    </section>
  );
}
