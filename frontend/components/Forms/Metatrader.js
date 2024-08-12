import { Fragment, useState } from "react";
import { ButtonGroup, Button as Button_ } from "react-daisyui";

import { InputInline, Input } from "../ui/Input";
import { Button } from "../ui/Button";

import { CiSaveUp2 } from "react-icons/ci";
import { Info, Error } from "../ui/Alerts";
import { AddMTAccount } from "../../hooksp/MetatraderHook";

export default function NewAccountForm({ close }) {
  const {
    type,
    setType,
    accountName,
    setAccountName,
    accountLogin,
    setAccountLogin,
    accountPassword,
    setAccountPassword,
    accountServer,
    setAccountServer,
    error,
    add,
  } = AddMTAccount();

  return (
    <section className="w-full flex flex-col items-center">
      <div className="mb-5">
        <ButtonGroup>
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg w-24 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary ${
              type === "mt4" &&
              "text-btn bg-primary hover:!bg-primary hover:text-btn"
            }`}
            onClick={() => setType("mt4")}
          >
            MT4
          </Button_>
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg  w-24 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary ${
              type === "mt5" &&
              "text-btn bg-primary hover:!bg-primary hover:text-btn"
            }`}
            onClick={() => setType("mt5")}
          >
            MT5
          </Button_>
        </ButtonGroup>
      </div>
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
        value={accountLogin}
        setValue={setAccountLogin}
        className="mt-4"
        name="Account Number"
        type="number"
        placeholder="34893203"
        helper="The account number."
      />
      <Input
        value={accountPassword}
        setValue={setAccountPassword}
        className="mt-4"
        name="Account Password"
        type="password"
        placeholder="--------"
        helper="Account password."
      />
      <Input
        value={accountServer}
        setValue={setAccountServer}
        className="mt-4 mb-2"
        name="Account Server"
        type="text"
        placeholder="EagleFX-DEMO"
        helper="The account server."
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
