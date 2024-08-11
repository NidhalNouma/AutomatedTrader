import React, { useState } from "react";
import { H6, H5, H4, H3 } from "../../components/H";
// import { ButtonText } from "../../components/Button";
import { Input1 } from "../../components/Input";
import { Button, Dropdown } from "react-daisyui";

import { Modal1 } from "../../components/Modal";
import { DeleteMessage, EditMessage } from "../../components/ModalMsg";
import ColorPicker from "../../components/ColorPicker";
import WebhooksPopUp from "./WebhooksPopUp";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
// import { EllipsVer } from "@heroicons/react/solid";

import {
  GetMTAccountsContext,
  DeleteMTAccount,
  EditMTAccountDisplayName,
  EditMTAccountColor,
} from "../../hooks/MTAccounts";
import { txtColorFromBg } from "../../utils/functions";

import tailwindConfig from "../../tailwind.config.js";

function Mt4({ account, userId, version }) {
  const [openNumbers, setOpenNumbers] = useState(true);
  const [open, setOpen] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const { setMTAccounts } = GetMTAccountsContext();
  const { mtname, setMtname, editMTDisplayName } = EditMTAccountDisplayName(
    userId,
    account.id,
    account.accountDisplayName
  );
  const { mtcolor, setMtcolor, editMTColor } = EditMTAccountColor(
    userId,
    account.id,
    account.color
  );

  const colors = tailwindConfig.theme.colors;

  const txtColor = txtColorFromBg(
    account.color,
    colors["bgt"],
    colors["text-h"]
  );

  return (
    <div
      className="bg-bga px-3 py-2 rounded-xl my-2"
      style={{ backgroundColor: account.color || "rgb(52, 54, 59)" }}
    >
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-end">
            <H4
              style={{ color: txtColor }}
              className="flex items-center font-bold"
            >
              {!openNumbers ? (
                <ChevronDownIcon
                  className="h-4 w-4 ml-auto cursor-pointer"
                  onClick={() => setOpenNumbers(!openNumbers)}
                />
              ) : (
                <ChevronUpIcon
                  className="h-4 w-4 ml-auto cursor-pointer"
                  onClick={() => setOpenNumbers(!openNumbers)}
                />
              )}
              {account.accountDisplayName}
            </H4>
            <span className="text-xs ml-1" style={{ color: txtColor }}>
              ({account.accountName})
            </span>
          </div>
          <div className="flex items-center">
            <H6 style={{ color: txtColor }}>No: {account.accountNumber}</H6>

            <Dropdown vertical="end" horizontal="center">
              {/* <Dropdown.Toggle className="h-4 w-4">i</Dropdown.Toggle> */}
              {/* <Button className=""> */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6 cursor-pointer"
                style={{ color: txtColor }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                />
              </svg>
              {/* </Button> */}
              <Dropdown.Menu
                className="w-40 bg-bg shadow-2xl shadow-bg"
                // style={{ backgroundColor: account.color }}
              >
                <Dropdown.Item onClick={() => setOpen(true)}>
                  <span className="text-secondary text-sm font-bold">
                    Webhooks
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOpenEdit(true)}>
                  <span className="text-secondary text-sm font-bold">
                    Change name
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOpenColor(true)}>
                  <span className="text-secondary text-sm font-bold">
                    Change color
                  </span>
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setOpenDel(true)}>
                  <span className="text-text-p text-sm font-bold">Delete</span>
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>
        </div>

        {openNumbers && (
          <div className="grid grid-cols-3">
            <div className="">
              <H6 style={{ color: txtColor }}>Balance</H6>
              <H5 style={{ color: txtColor }} className="font-bold">
                {account.accountBalance}
              </H5>
            </div>
            <div className="">
              <H6 style={{ color: txtColor }}>Equity</H6>
              <H5 style={{ color: txtColor }} className="font-bold">
                {account.accountEquity}
              </H5>
            </div>
          </div>
        )}

        {(!account.version ||
          account.version.toString() !== version.toString()) && (
          <div className="">
            <span className="text-xs font-semibold rounded-lg bg-red-400 text-red-900 px-2 py-1">
              Account doesn&apos;t have the latest EA!
            </span>
          </div>
        )}
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

      <Modal1
        open={openEdit}
        close={() => {
          setOpenEdit(false);
        }}
        backclose={() => {
          setOpenEdit(false);
        }}
      >
        <EditMessage
          close={() => setOpenEdit(false)}
          title="Change account name"
          onEdit={async () => {
            const r = await editMTDisplayName();
            setMTAccounts(r);
          }}
        >
          <div className="">
            <Input1
              className="mb-4"
              // name="Your name"
              type="text"
              placeholder="Name"
              value={mtname}
              setValue={(v) => setMtname(v)}
              focus={openEdit}
            />
          </div>
        </EditMessage>
      </Modal1>

      <Modal1
        open={openColor}
        close={() => {
          setOpenColor(false);
        }}
        backclose={() => {
          setOpenColor(false);
        }}
      >
        <EditMessage
          close={() => setOpenColor(false)}
          title="Change account color"
          onEdit={async () => {
            const r = await editMTColor();
            setMTAccounts(r);
          }}
        >
          <ColorPicker color={mtcolor} setColor={setMtcolor} />
        </EditMessage>
      </Modal1>
    </div>
  );
}

export default Mt4;
