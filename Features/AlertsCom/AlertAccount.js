import { Fragment, useState } from "react";
import { GetMTAccountsContext } from "../../hooks/MTAccounts";
import { BsArrowRightCircleFill } from "react-icons/bs";

import { H4, H3 } from "../../Components/H";

import { Modal1 } from "../../Components/Modal";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";

import { txtColorFromBg } from "../../utils/functions";
import tailwindConfig from "../../tailwind.config.js";

function AlertAccount({ accountId, data }) {
  const { mtAccounts } = GetMTAccountsContext();
  const account = mtAccounts.find((v) => v.id === accountId);

  const colors = tailwindConfig.theme.colors;
  const txtColor = txtColorFromBg(
    account?.color,
    colors["bgt"],
    colors["text-h"]
  );

  const [open, setOpen] = useState(false);

  return (
    account && (
      <Fragment>
        <Modal1
          open={open}
          close={() => {
            setOpen(false);
          }}
        >
          <Details
            account={account}
            data={data}
            close={() => {
              setOpen(false);
            }}
          />
        </Modal1>
        <div
          onClick={() => setOpen(true)}
          className="bg-bga px-3 py-0 rounded-xl cursor-pointer"
          style={{ backgroundColor: account.color || "rgb(52, 54, 59)" }}
        >
          <H4
            className="!text-xs !font-bold flex items-center justify-center"
            style={{ color: txtColor }}
          >
            {account.accountDisplayName}
            <BsArrowRightCircleFill
              className="h-3 w-3 ml-2 my-1"
              style={{ color: txtColor }}
            />
          </H4>
        </div>
      </Fragment>
    )
  );
}

export default AlertAccount;

function Details({ data, close, account }) {
  if (account) console.log(account, data);
  return (
    <div className="">
      <div className="sticky top-0 bg-bg p-4 z-20 flex justify-between items-center">
        <div className="flex items-center">
          <H3 className="inline-block mr-2">{account.accountDisplayName}</H3>
        </div>
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
      <div className=" w-full px-10 mt-2 mb-4">No Data</div>
    </div>
  );
}
