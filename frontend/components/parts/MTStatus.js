import { Fragment, useState } from "react";
import { Label, Label2, SubTitle3, Par } from "../ui/Text.js";
import { RoundedButton } from "../ui/Button.js";
import { Input } from "../ui/Input.js";
import { WideModalWithHeader, EditModal, DeleteModal } from "../ui/Modal.js";
import { Dropdown, DropdownButton } from "../ui/Dropdown.js";
import { ColorPicker } from "../ui/ColorPicker.js";

import moment from "moment";

import {
  EditAccountName,
  EditAccountColor,
  DeleteAccount,
} from "../../hooksp/MetatraderHook.js";

import { useMetatrader } from "../../contexts/MetatraderContext.js";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { IoMdArrowDroprightCircle } from "react-icons/io";

import { txtColorFromBg, addAlpha } from "../../utils/functions";

export default function MTStatus({ account, accountData }) {
  const { closeTradeById } = useMetatrader();

  const { accountName, setAccountName, editAccountName } =
    EditAccountName(account);
  const { accountColor, setAccountColor, editAccountColor } =
    EditAccountColor(account);
  const { deleteAccount } = DeleteAccount(account);

  const [openChangeName, setOpenChangeName] = useState(false);
  const [openChangeColor, setOpenChangeColor] = useState(false);
  const [openDel, setOpenDel] = useState(false);

  const [openNumbers, setOpenNumbers] = useState(true);

  const txtColor = "text-text"; //txtColorFromBg(account.color, "!text-dark", "!text-light");

  //   console.log(accountData);

  return (
    <Fragment>
      <EditModal
        withHeader={true}
        title="Change name"
        open={openChangeName}
        close={() => {
          setOpenChangeName(false);
        }}
        backclose={() => {
          setOpenChangeName(false);
        }}
        onSave={async () => {
          const r = await editAccountName();
          if (r) setOpenChangeName(false);
        }}
      >
        <div className="mx-auto w-full max-w-xs">
          <Input
            name="Account name"
            className="mb-4 "
            type="text"
            placeholder="Name"
            value={accountName}
            setValue={(v) => setAccountName(v)}
            focus={openChangeName}
          />
        </div>
      </EditModal>

      <EditModal
        open={openChangeColor}
        close={() => setOpenChangeColor(false)}
        withHeader={true}
        title="Account color"
        onSave={async () => {
          const r = await editAccountColor();
          if (r) setOpenChangeColor(false);
        }}
      >
        <ColorPicker
          className="max-w-xs mb-4"
          color={accountColor}
          setColor={setAccountColor}
        />
      </EditModal>

      <DeleteModal
        className=""
        title="Delete account"
        withHeader={true}
        open={openDel}
        close={() => {
          setOpenDel(false);
        }}
        backclose={() => {
          setOpenDel(false);
        }}
        onDelete={async () => {
          const r = await deleteAccount();
          return r;
        }}
      >
        <Par className="mx-auto max-w-xs text-sm text-center mb-4">
          Are you sure you want to delete this account, all your data will be
          lost!
        </Par>
      </DeleteModal>

      <div
        className="bg-bga/30 px-3 py-2 rounded-lg my-2 cursor-pointer border relative"
        style={{
          borderColor: addAlpha(account.color, 0.4) || "rgb(52, 54, 59)",
        }}
      >
        <div
          className="absolute inset-0 backdrop-blur-xl rounded-lg -z-10"
          style={{
            backgroundColor: addAlpha(account.color, 0.1) || "rgb(52, 54, 59)",
          }}
        ></div>
        <div className="">
          <div className="flex items-center justify-between mb-0.5">
            <div className="flex items-end">
              <SubTitle3
                className={"flex items-center font-semibold " + txtColor}
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
              </SubTitle3>
              {/* {account.name && (
              <span className="text-xs ml-1" style={{ color: txtColor }}>
                ({account.name})
              </span>
            )} */}
            </div>
            <div className="flex items-center">
              <Label2 className={txtColor}>No: {account.accountNumber}</Label2>

              <Dropdown
                content={
                  <Fragment>
                    <DropdownButton onClick={() => setOpenChangeName(true)}>
                      Change name
                    </DropdownButton>
                    <DropdownButton onClick={() => setOpenChangeColor(true)}>
                      Change color
                    </DropdownButton>
                    <DropdownButton onClick={() => setOpenDel(true)}>
                      Delete
                    </DropdownButton>
                  </Fragment>
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={txtColor + " w-6 h-6 cursor-pointer"}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z"
                  />
                </svg>
              </Dropdown>
            </div>
          </div>

          {openNumbers && (
            <Fragment>
              {accountData?.information?.balance ? (
                <div className="grid grid-cols-3">
                  <div className="">
                    <Label2 className="!text-text/80">Balance</Label2>
                    <Label className={txtColor + " font-semibold"}>
                      {Number(accountData?.information?.balance).toFixed(2)}
                    </Label>
                  </div>
                  <div className="">
                    <Label2 className="!text-text/80">Equity</Label2>
                    <Label className={txtColor + " font-semibold"}>
                      {Number(accountData?.information?.equity).toFixed(2)}
                    </Label>
                  </div>
                  <div className="w-full flex items-end">
                    <WideModalWithHeader
                      title={account.accountDisplayName}
                      trigger={
                        <span
                          className="ml-auto"
                          onClick={() => setOpenAcc(true)}
                        >
                          <IoMdArrowDroprightCircle
                            className={txtColor + " h-6 w-6"}
                          />
                        </span>
                      }
                    >
                      <div className="flex flex-col justify-center items-center w-full">
                        <div className="grid grid-cols-2 sm:grid-cols-4 w-full text-center gap-y-4">
                          <div className="r">
                            <Label2 className="!text-text/80">Number</Label2>
                            <Label className="font-bold">
                              {account.accountNumber}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">Broker</Label2>
                            <Label className="font-bold">
                              {accountData.information.broker}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">Currency</Label2>
                            <Label className="font-bold">
                              {accountData.information.currency}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">Platform</Label2>
                            <Label className="font-bold uppercase">
                              {accountData.information.platform}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">Balance</Label2>
                            <Label className="font-bold">
                              {Number(accountData.information.balance).toFixed(
                                2
                              )}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">Equity</Label2>
                            <Label className="font-bold">
                              {Number(accountData.information.equity).toFixed(
                                2
                              )}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">
                              Free margin
                            </Label2>
                            <Label className="font-bold">
                              {Number(
                                accountData.information.freeMargin
                              ).toFixed(2)}
                            </Label>
                          </div>
                          <div className="">
                            <Label2 className="!text-text/80">Leverage</Label2>
                            <Label className="font-bold">
                              {accountData.information.leverage}
                            </Label>
                          </div>
                        </div>

                        {accountData.positions?.length > 0 && (
                          <div className="mt-6 w-full px-4">
                            <DataTable
                              data={accountData.positions}
                              closeTrade={async (tradeId) => {
                                await closeTradeById(
                                  account.accountApiId,
                                  tradeId
                                );
                              }}
                            />
                          </div>
                        )}
                      </div>
                    </WideModalWithHeader>
                  </div>
                </div>
              ) : (
                <Label className={txtColor}>Connecting ... </Label>
              )}
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}

function DataTable({ data, closeTrade }) {
  return (
    <div className="overflow-x-auto w-full max-h-72 hideScrollbar">
      <table className="table-auto w-full ">
        <thead className="">
          <tr className="bg-bg/20 backdrop-blur-xl text-title sticky top-0 ">
            <th className=" text-xs py-2  rounded-l-lg">Open Time</th>
            <th className=" text-xs">Type</th>
            <th className="text-xs">Pair</th>
            <th className="text-xs">Open Price</th>
            <th className="text-xs">Lot</th>
            <th className="text-xs">SL</th>
            <th className="text-xs">TP</th>
            <th className="text-xs">Profit</th>
            <th className="text-xs rounded-r-lg"></th>
          </tr>
        </thead>
        <tbody>
          {data
            ?.slice(0)
            .reverse()
            ?.map((v, i) => {
              return (
                <Fragment key={i}>
                  <tr className="border-spacing-[7px] border-b-[1px] border-text/10 text-text">
                    <td className="text-xs text-center py-3">
                      {moment(v.time).format("MMM DD YYYY - HH:mm:ss")}
                    </td>
                    <td className={"text-xs text-center "}>
                      <span
                        className={`px-2 py-[0.1rem] rounded font-semibold ${
                          v?.type?.search("BUY") >= 0
                            ? "text-long bg-long/10"
                            : v.type?.search("SELL") >= 0
                            ? "text-short bg-short/10"
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
                      className={`text-sm text-center ${
                        v.profit > 0
                          ? "text-profit"
                          : v.profit < 0
                          ? "text-loss"
                          : ""
                      } `}
                    >
                      ${Number(v.profit).toFixed(2)}
                    </td>
                    <td className="text-xs text-center  ">
                      <RoundedButton
                        className=" bg-transparent text-xs font-thin hover:bg-bga !h-4 hover:text-text hover:outline-text/50"
                        onClick={() => closeTrade(v.id)}
                      >
                        X
                      </RoundedButton>
                    </td>
                  </tr>
                  {/* <hr className="my-0 h-px bg-gray-200 border-0 dark:bg-gray-700"></hr> */}
                </Fragment>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}
