import React, { useState } from "react";
import { H6, H5 } from "../../Components/H";
import { ButtonText } from "../../Components/Button";
import { Button } from "react-daisyui";

import { Modal1 } from "../../Components/Modal";
import { DeleteMessage } from "../../Components/ModalMsg";
import WebhooksPopUp from "./WebhooksPopUp";

import { TrashIcon } from "@heroicons/react/outline";

import { GetMTAccountsContext, DeleteMTAccount } from "../../hooks/MTAccounts";

function Mt4({ account, userId }) {
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const { setMTAccounts } = GetMTAccountsContext();

  return (
    <div className="bg-bga p-3 rounded-b-xl">
      <div className="">
        <H6>Account name: {account.accountName}</H6>
        <H6>Account balance: {account.accountBalance}</H6>
        <H6>Account equity: {account.accountEquity}</H6>

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
