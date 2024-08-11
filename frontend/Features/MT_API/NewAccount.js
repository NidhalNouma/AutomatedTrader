import { useState } from "react";
import { Alert, Button, ButtonGroup } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";
import { H3 } from "../../components/H";
import { Input1 } from "../../components/Input";
import { ButtonP } from "../../components/Button";

// import WebhookData from "./WebhookData";
// import WebhookDataAdvanced from "./WebhookDataAdvanced";

import { AddNewMTAccount } from "../../hooks/MTAccountsApi";

function Index({ close, user }) {
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
    spin,
    add,
  } = AddNewMTAccount();

  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <H3 className="flex">New Account</H3>
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
              type === "mt4" && "text-text-h bg-primary hover:!bg-primary"
            }`}
            onClick={() => setType("mt4")}
          >
            MT4
          </Button>
          <Button
            size="sm"
            className={`capitalize !text-sm rounded-xl bg-bg w-24 hover:!bg-bgt text-text-p hover:text-text-h ${
              type === "mt5" && "text-text-h bg-primary hover:!bg-primary"
            }`}
            onClick={() => setType("mt5")}
          >
            MT5
          </Button>
        </ButtonGroup>

        <div className="my-1"></div>
        <Input1
          classNameInput="bg-accenti "
          name="Account name"
          placeholder={"Account name"}
          helper="Account name"
          value={accountName}
          setValue={setAccountName}
        />
        <div className="my-1"></div>
        <Input1
          classNameInput="bg-accenti "
          name="Metatrader login"
          placeholder={"Metatrader login"}
          helper="Metatrader account login number"
          value={accountLogin}
          setValue={setAccountLogin}
        />
        <div className="my-1"></div>
        <Input1
          classNameInput="bg-accenti "
          name="Metatrader password"
          placeholder={"Metatrader password"}
          helper="Metatrader account password"
          value={accountPassword}
          setValue={setAccountPassword}
          type="password"
        />
        <div className="my-1"></div>
        <Input1
          classNameInput="bg-accenti "
          name="Metatrader server"
          placeholder={"Server name"}
          helper="MetaTrader server name (case-sensitive)"
          value={accountServer}
          setValue={setAccountServer}
        />

        <div className="my-1"></div>

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
              await add(user?.uid, close);
            }}
            className="w-full max-w-xs mx-auto"
          >
            Save
          </ButtonP>
        </div>
      </div>
    </div>
  );
}

export default Index;
