import React, { Fragment, useState } from "react";
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
} from "../../hooksp/BinanceHook.js";

import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/solid";
import { IoMdArrowDroprightCircle } from "react-icons/io";

import { txtColorFromBg, numToFixed, addAlpha } from "../../utils/functions";

export default function BinanceStatus({ account, accountData }) {
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

  const totalSpotUSDT = accountData?.spot?.balances?.reduce(
    (total, balance) => {
      return balance.asset === "USDT"
        ? total + Number(balance.balance)
        : total + (balance.usdtPrice || 0);
    },
    0
  );

  const totalusdMUSDT = accountData?.usdm?.balances?.reduce(
    (total, balance) => {
      return balance.asset === "USDT"
        ? total + Number(balance.balance)
        : total + (balance.usdtPrice || 0);
    },
    0
  );

  const totalcoinMUSDT = accountData?.coinm?.balances?.reduce(
    (total, balance) => {
      return balance.asset === "USDT"
        ? total + Number(balance.balance)
        : total + (balance.usdtPrice || 0);
    },
    0
  );

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
                {account.accountName}
              </SubTitle3>
              {/* {account.name && (
              <span className="text-xs ml-1" style={{ color: txtColor }}>
                ({account.name})
              </span>
            )} */}
            </div>
            <div className="flex items-center">
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
              <div className="">
                <Label2 className={txtColor}>Spot Balance</Label2>
                {totalSpotUSDT >= 0 ? (
                  <Label className={txtColor + " font-semibold !text-lg"}>
                    $ {Number(totalSpotUSDT).toFixed(8)}
                  </Label>
                ) : (
                  <Label className={txtColor + " font-semibold !text-lg"}>
                    NA
                  </Label>
                )}
              </div>
              <div className="mt-3">
                <Label2 className={txtColor}>USDⓈ-M Balance</Label2>
                {totalusdMUSDT >= 0 ? (
                  <Label className={txtColor + " font-semibold !text-lg"}>
                    $ {Number(totalusdMUSDT).toFixed(8)}
                  </Label>
                ) : (
                  <Label className={txtColor + " font-semibold !text-lg"}>
                    NA
                  </Label>
                )}
              </div>
              <div className="mt-3">
                <Label2 className={txtColor}>COIN-M Balance</Label2>
                {totalcoinMUSDT >= 0 ? (
                  <Label className={txtColor + " font-semibold !text-lg"}>
                    $ {Number(totalcoinMUSDT).toFixed(8)}
                  </Label>
                ) : (
                  <Label className={txtColor + " font-semibold !text-lg"}>
                    NA
                  </Label>
                )}
              </div>
            </Fragment>
          )}
        </div>
      </div>
    </Fragment>
  );
}
