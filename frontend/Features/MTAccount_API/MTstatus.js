import React, { Fragment, useState } from "react";
import { H6, H5, H4, H3 } from "../../components/H";
// import { ButtonText } from "../../components/Button";
import { Input1 } from "../../components/Input";
import { Button, Dropdown } from "react-daisyui";

import { Modal1 } from "../../components/Modal";
import { DeleteMessage, EditMessage } from "../../components/ModalMsg";
import ColorPicker from "../../components/ColorPicker";
import WebhooksPopUp from "./WebhooksPopUp";
import AccountDetails from "./AccountDetails";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { IoMdArrowDroprightCircle } from "react-icons/io";

// import { EllipsVer } from "@heroicons/react/solid";

import {
  GetMTAPIAccountsContext,
  DeleteMTAccount,
  EditMTAccountDisplayName,
  EditMTAccountColor,
} from "../../hooks/MTAccountsApi";
import { txtColorFromBg } from "../../utils/functions";

import tailwindConfig from "../../tailwind.config.js";

import { ModalBig1 } from "../../components/Modal";

function Mtstatus({ account, userId }) {
  const [openNumbers, setOpenNumbers] = useState(true);
  const [open, setOpen] = useState(false);
  const [openAcc, setOpenAcc] = useState(false);
  const [openDel, setOpenDel] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openColor, setOpenColor] = useState(false);
  const { setMTAPIAccounts } = GetMTAPIAccountsContext();
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
      className="bg-bga px-3 py-2 rounded-xl my-2 cursor-pointer"
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
            {/* {account.name && (
              <span className="text-xs ml-1" style={{ color: txtColor }}>
                ({account.name})
              </span>
            )} */}
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
          <Fragment>
            {account.balance ? (
              <div className="grid grid-cols-3">
                <div className="">
                  <H6 style={{ color: txtColor }}>Balance</H6>
                  <H5 style={{ color: txtColor }} className="font-bold">
                    {Number(account.balance).toFixed(2)}
                  </H5>
                </div>
                <div className="">
                  <H6 style={{ color: txtColor }}>Equity</H6>
                  <H5 style={{ color: txtColor }} className="font-bold">
                    {Number(account.equity).toFixed(2)}
                  </H5>
                </div>
                <div className="w-full flex items-end">
                  <span className="ml-auto" onClick={() => setOpenAcc(true)}>
                    <IoMdArrowDroprightCircle
                      style={{ color: txtColor }}
                      className="h-6 w-6"
                    />
                  </span>
                </div>
              </div>
            ) : (
              <H6 style={{ color: txtColor }}>Connecting ... </H6>
            )}
          </Fragment>
        )}
      </div>

      <ModalBig1
        open={openAcc}
        close={() => {
          setOpenAcc(false);
        }}
      >
        <AccountDetails account={account} close={() => setOpenAcc(false)} />
      </ModalBig1>

      <Modal1
        open={open}
        close={() => {
          setOpen(false);
        }}
      >
        <WebhooksPopUp
          close={() => setOpen(false)}
          id={account?.accountApiId ? account.accountApiId : account.id}
        />
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
            const r = await DeleteMTAccount(
              userId,
              account.id,
              account.accountApiId
            );
            setMTAPIAccounts(r);
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
            setMTAPIAccounts(r);
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
            setMTAPIAccounts(r);
          }}
        >
          <ColorPicker color={mtcolor} setColor={setMtcolor} />
        </EditMessage>
      </Modal1>
    </div>
  );
}

export default Mtstatus;

function DataTable({ data, closeTrade }) {
  return (
    <div className="overflow-x-auto w-full max-h-72 hideScrollbar">
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-bga text-title sticky top-0">
            <th className=" text-xs py-2">Open Time</th>
            <th className=" text-xs">Type</th>
            <th className="text-xs">Pair</th>
            <th className="text-xs">Open Price</th>
            <th className="text-xs">Lot</th>
            <th className="text-xs">SL</th>
            <th className="text-xs">TP</th>
            <th className="text-xs">Profit</th>
            <th className="text-xs"></th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(0)
            .reverse()
            ?.map((v, i) => {
              return (
                <React.Fragment key={i}>
                  <tr className="border-spacing-[7px] border-b-[1px] border-bga">
                    <td className="text-xs text-center py-3">
                      {moment(v.time).format("MMM DD YYYY - HH:mm:ss")}
                    </td>
                    <td className={"text-xs text-center "}>
                      <span
                        className={`px-2 py-[0.15rem] rounded-md font-semibold ${
                          v?.type?.search("BUY") >= 0
                            ? "bg-green-300 text-green-700"
                            : v.type?.search("SELL") >= 0
                            ? "bg-red-300 text-red-700"
                            : ""
                        }
                        `}
                      >
                        {v.type === "POSITION_TYPE_BUY" ? "BUY" : "SELL"}
                      </span>
                    </td>
                    <td className="text-xs text-center">{v.symbol}</td>
                    <td className="text-xs text-center">{v.openPrice}</td>
                    <td className="text-xs text-center">{v.volume}</td>
                    <td className="text-xs text-center">{v.stopLoss}</td>
                    <td className="text-xs text-center">{v.takeProfit}</td>
                    <td
                      className={`text-xs text-center ${
                        v.profit > 0
                          ? "text-green-300"
                          : v.profit < 0
                          ? "text-red-400"
                          : ""
                      } `}
                    >
                      ${Number(v.profit).toFixed(2)}
                    </td>
                    <td className="text-xs text-center  ">
                      <Button
                        size="sm"
                        shape="circle"
                        className=" bg-transparent text-xs font-thin hover:bg-bga"
                        onClick={() => closeTrade(v.id)}
                      >
                        X
                      </Button>
                    </td>
                  </tr>
                  {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                </React.Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
