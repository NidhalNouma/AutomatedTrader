import { Fragment, useState } from "react";
import { GetMTAPIAccountsContext } from "../../hooks/MTAccountsApi";
import { BsArrowRightCircleFill } from "react-icons/bs";

import { H4, H3, Hi4 } from "../../components/H.js";

import { Modal1 } from "../../components/Modal.js";
import { Button } from "react-daisyui";

import { XIcon } from "@heroicons/react/solid";

import { txtColorFromBg } from "../../utils/functions";
import tailwindConfig from "../../tailwind.config.js";
import moment from "moment";

function AlertAccount({ accountId, data, msg }) {
  const { mtAPIAccounts } = GetMTAPIAccountsContext();
  const account = mtAPIAccounts.find((v) => v.accountApiId === accountId);

  // console.log(account, accountId, mtAccounts);

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
          className="max-h-full w-full"
          open={open}
          close={() => {
            setOpen(false);
          }}
        >
          <Details
            msg={msg}
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
            className="!text-xs !font-bold flex items-center justify-center truncate"
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

function Details({ data, close, account, msg }) {
  // if (account) console.log(account, data);
  return (
    <div className="flex flex-col">
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
      {data.length > 0 ? (
        <div className="px-4 pb-4">
          {data.map((msg, i) => <Data_n key={i} msg={msg} />).reverse()}
        </div>
      ) : (
        <div className=" w-full px-10 mt-2 mb-4">
          <Hi4 className="text-center">No response!</Hi4>
        </div>
      )}

      <div className=" mx-auto mt-0 mb-4">
        <div className=" text-text-p text-xs mt-2 border border-text-p/30 px-2 py-0.5 rounded inline-block">
          {msg}
        </div>
      </div>
    </div>
  );
}

function Data_n({ msg }) {
  // console.log(msg);
  return (
    <div
      className={`text-xs mb-2 px-2 rounded-lg py-1 font-semibold ${
        msg.error ? "bg-red-400 text-red-900" : "bg-green-400 text-green-900"
      }`}
    >
      <p className="">{msg.error || msg.msg}</p>
      {msg.trade && (
        <Fragment>
          <div
            className={`pb-1 mt-1.5 border-b-2 ${
              msg.error ? " border-red-900" : " border-green-900"
            }`}
          >
            <span
              className={`px-2 font-medium rounded-lg border-[1px] ${
                msg.error ? " border-red-900" : " border-green-900"
              }`}
            >
              {msg.trade.type}
            </span>{" "}
            {msg.trade.symbol}
          </div>
          <div className="pt-1">
            <div className="">
              <span className="mr-2">ID: {msg.trade.id}</span>
              {/* <span className="mr-2">Price: {msg.trade.openPrice}</span> */}
            </div>
            <div className="">
              <span className="mr-2">broker time: {msg.trade.brokerTime}</span>
              {/* <span className="mr-2">Price: {msg.trade.openPrice}</span> */}
            </div>
            <div className="">
              <span className="mr-2">Price: {msg.trade.openPrice}</span>
            </div>
            <div className="">
              <span className="mr-2">Lot size: {Number(msg.trade.volume)}</span>
            </div>
            <div className="">
              <span className="mr-2">Stop Loss: {msg.trade.stopLoss}</span>
            </div>
            <div className="">
              <span className="mr-2">Take Profit: {msg.trade.takeProfit}</span>
            </div>
            {msg.trade.profit && (
              <div className="">
                <span className="mr-2">Profit: {msg.trade.profit}</span>
              </div>
            )}
          </div>
        </Fragment>
      )}
    </div>
  );
}

function Data({ msg }) {
  return (
    <div
      className={`text-xs mb-2 px-2 rounded-lg py-1 font-semibold ${
        msg.d === "error"
          ? "bg-red-500 text-red-900"
          : "bg-green-500 text-green-900"
      }`}
    >
      <div
        className={`pb-1 border-b-2 ${
          msg.d === "error" ? " border-red-900" : " border-green-900"
        }`}
      >
        <span
          className={`px-2 rounded-lg border-2 ${
            msg.d === "error" ? " border-red-900" : " border-green-900"
          }`}
        >
          {msg.type}
        </span>{" "}
        {msg.pair} {msg.msg}
      </div>
      <div className="pt-1">
        <div className="">
          <span className="mr-2">broker time: {msg.at}</span>
          <span className="mr-2">Price: {msg.price}</span>
        </div>
        <div className="">
          <span className="mr-2">
            Lot size:{" "}
            {Number(msg.new_lot_size) !== 0 ? msg.new_lot_size : msg.lot_size}
          </span>
        </div>
        <div className="">
          <span className="mr-2">Stop Loss: {msg.new_sl}</span>
          {msg.new_sl !== msg.old_sl && (
            <span className="mr-2">Old Stop Loss: {msg.old_sl}</span>
          )}
        </div>
        <div className="">
          <span className="mr-2">Take Profit: {msg.new_tp}</span>
          {msg.new_tp !== msg.old_tp && (
            <span className="mr-2">Old Take Profit: {msg.old_tp}</span>
          )}
        </div>
      </div>
    </div>
  );
}
