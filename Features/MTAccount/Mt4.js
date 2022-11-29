import React, { useState } from "react";
import { H6, H5 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";
import { Button } from "react-daisyui";

import { Modal1 } from "../../Components/Modal";
import { DeleteMessage } from "../../Components/ModalMsg";
import WebhooksPopUp from "./WebhooksPopUp";

import { TrashIcon } from "@heroicons/react/outline";

import { GetMTAccountsContext, DeleteMTAccount } from "../../hooks/MTAccounts";
import { txtColorFromBg } from "../../utils/functions";

import tailwindConfig from "../../tailwind.config.js";

function Mt4({ account, userId }) {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { setMTAccounts } = GetMTAccountsContext();

  const colors = tailwindConfig.theme.colors;

  const txtColor = txtColorFromBg(
    account.color,
    colors["text-p"],
    colors["text-h"]
  );

  return (
    <div
      className="bg-bga p-3 rounded-xl my-2"
      style={{ backgroundColor: account.color || "rgb(52, 54, 59)" }}
    >
      <div className="">
        <H6 style={{ color: txtColor }}>Account name: {account.accountName}</H6>
        <H6 style={{ color: txtColor }}>
          Account balance: {account.accountBalance}
        </H6>
        <H6 style={{ color: txtColor }}>
          Account equity: {account.accountEquity}
        </H6>

        <div className="flex items-center justify-between">
          <ButtonText
            helper="List of webhooks"
            className=""
            onClick={() => setOpen(true)}
          >
            Webhooks
            {/* <PlusCircleIcon className="h-5 w-5 text-secondaryi " /> */}
          </ButtonText>

          <Button
            size="xs"
            className="bg-transparent border-0"
            onClick={() => setOpenDel(true)}
          >
            <TrashIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <WebhooksPopUp close={() => setOpen(false)} id={account?.id} />
      </Modal1>

      <Modal1
        open={openDel}
        close={() => {
          setOpenDel(false);
        }}
        backclose={() => {
          setOpenDel(false);
        }}
      >
        <DeleteMessage
          close={() => setOpenDel(false)}
          title="Delete account"
          onDelete={async () => {
            const r = await DeleteMTAccount(userId, account.id);
            setMTAccounts(r);
          }}
        >
          <H5 className="px-8">
            Are you sure you want to delete this account, all your data will be
            lost!
          </H5>
        </DeleteMessage>
      </Modal1>
    </div>
  );
}

export default Mt4;
