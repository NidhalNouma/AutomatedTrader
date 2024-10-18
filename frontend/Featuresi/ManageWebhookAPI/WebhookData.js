import React, { Fragment, useEffect, useState } from "react";
import { Alert, Checkbox, ButtonGroup, Button } from "react-daisyui";
import {
  Input1,
  Toggle1,
  Input1Inline,
  Select1,
  Range1,
} from "../../components/Input";
import { ButtonP, ButtonText } from "../../components/ui/Button";
import { WebHook } from "../../hooks/WebHook";

import { GetUserContext } from "../../hooks/UserHook";
import { GetWebhookContext } from "../../hooks/WebHook";
import { GetToastContext } from "../../hooks/ToastHook";
import { GetMTAccountsContext } from "../../hooks/MTAccounts";

import MarketOrder from "./MsgType/MarketOrder";
import PendingOrder from "./MsgType/PendingOrder";
import CloseOrder from "./MsgType/CloseOrder";
import UpdateSL from "./MsgType/UpdateSL";

function WebhookData({
  includeName,
  close,
  webhook,
  typeWh,
  msg,
  duplicateMsg,
}) {
  const { newAlert } = GetToastContext();
  const { user } = GetUserContext();
  const { mtAccounts } = GetMTAccountsContext();
  const [testAccount, setTestAccount] = useState(
    mtAccounts?.length > 0 ? mtAccounts[0] : null
  );

  const [showDelete, setShowDelete] = useState(false);

  const {
    msgType,
    setMsgType,
    name,
    setName,
    pair,
    setPair,
    type,
    setType,
    pendingDistance,
    setPendingDistance,
    positionType,
    setPositionType,
    positionValue,
    setPositionValue,
    allTrades,
    setAllTrades,
    moveToBE,
    setMoveToBE,

    positionValuePercentage,
    setPositionValuePercentage,
    stopLoss,
    setStopLoss,
    takeProfit,
    setTakeProfit,
    time,
    setTime,
    error,
    succTestMsg,
    add,
    addMsg,
    getData,
    editMsg,
    deleteMsg,
    testMsg,
    getMsg,
  } = WebHook(user?.uid);

  const { getAllWebhooks, changeWebhookData } = GetWebhookContext();

  useEffect(() => {
    setShowDelete(false);
    if (msg) {
      if (typeWh === "EditMessage") getData(msg?.msg);
      if (typeWh === "AddMessage") getData(msg);
    }
  }, [msg]);

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center">
      <div className="my-2"></div>
      {/* <Select1
        name="Message for"
        helper=""
        options={["Market Order", "Pending Order", "Close Order"]}
        value={msgType}
        setValue={setMsgType}
        className="w-[90%]"
      /> */}

      <ButtonGroup>
        <Button
          size="sm"
          className={` font-medium capitalize !text-sm rounded-xl bg-bg mb-3  hover:!bg-bgt text-text-p hover:text-text-h ${
            msgType === 0 && "text-text-h bg-primary hover:!bg-primary"
          }`}
          onClick={() => setMsgType(0)}
        >
          Market Order
        </Button>
        {/* <Button
          size="sm"
          className={` font-medium capitalize !text-sm rounded-xl bg-bg  hover:!bg-bgt text-text-p hover:text-text-h ${
            msgType === 1 && "text-text-h bg-primary hover:!bg-primary"
          }`}
          onClick={() => setMsgType(1)}
        >
          Pending Order
        </Button> */}
        <Button
          size="sm"
          className={` font-medium capitalize !text-sm rounded-xl bg-bg  hover:!bg-bgt text-text-p hover:text-text-h ${
            msgType === 3 && "text-text-h bg-primary hover:!bg-primary"
          }`}
          onClick={() => setMsgType(3)}
        >
          Update SL
        </Button>
        <Button
          size="sm"
          className={` font-medium capitalize !text-sm rounded-xl bg-bg  hover:!bg-bgt text-text-p hover:text-text-h ${
            msgType === 2 && "text-text-h bg-primary hover:!bg-primary"
          }`}
          onClick={() => setMsgType(2)}
        >
          Close Order
        </Button>
      </ButtonGroup>
      {/* <div className="my-1"></div> */}
      {includeName && (
        <Input1
          classNameInput="bg-accenti "
          name="Webhooks name"
          placeholder={"Name"}
          helper="Name of the webhook"
          value={name}
          setValue={setName}
        />
      )}

      <Input1
        classNameInput="bg-accenti "
        name="What's the pair name?"
        placeholder={"pair"}
        helper="Pair Name"
        value={pair}
        setValue={setPair}
      />
      <div className="my-1"></div>
      {msgType == 0 ? (
        <MarketOrder
          type={type}
          setType={setType}
          positionType={positionType}
          setPositionType={setPositionType}
          positionValue={positionValue}
          setPositionValue={setPositionValue}
          positionValuePercentage={positionValuePercentage}
          setPositionValuePercentage={setPositionValuePercentage}
          stopLoss={stopLoss}
          setStopLoss={setStopLoss}
          takeProfit={takeProfit}
          setTakeProfit={setTakeProfit}
          time={time}
          setTime={setTime}
        />
      ) : msgType == 1 ? (
        <PendingOrder
          type={type}
          setType={setType}
          pendingDistance={pendingDistance}
          setPendingDistance={setPendingDistance}
          positionType={positionType}
          setPositionType={setPositionType}
          positionValue={positionValue}
          setPositionValue={setPositionValue}
          positionValuePercentage={positionValuePercentage}
          setPositionValuePercentage={setPositionValuePercentage}
          stopLoss={stopLoss}
          setStopLoss={setStopLoss}
          takeProfit={takeProfit}
          setTakeProfit={setTakeProfit}
          time={time}
          setTime={setTime}
        />
      ) : msgType == 2 ? (
        <CloseOrder
          type={type}
          setType={setType}
          positionType={positionType}
          setPositionType={setPositionType}
          positionValue={positionValue}
          setPositionValue={setPositionValue}
          time={time}
          setTime={setTime}
          allTrades={allTrades}
          setAllTrades={setAllTrades}
          moveToBE={moveToBE}
          setMoveToBE={setMoveToBE}
        />
      ) : msgType == 3 ? (
        <UpdateSL
          type={type}
          setType={setType}
          positionType={positionType}
          setPositionType={setPositionType}
          stopLoss={stopLoss}
          setStopLoss={setStopLoss}
          time={time}
          setTime={setTime}
          allTrades={allTrades}
          setAllTrades={setAllTrades}
        />
      ) : (
        <Fragment />
      )}

      <hr className="my-2" />

      {error && (
        <div className="mb-4 max-w-xs w-full">
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

      <div className="mt-1 mb-4 w-full flex justify-center">
        <ButtonP
          onClick={async () => {
            let r;
            if (typeWh === "index") r = await add();
            else if (typeWh === "AddMessage") r = await addMsg(webhook?.id);
            else if (typeWh === "EditMessage")
              r = await editMsg(webhook?.id, msg.msg);
            if (r) {
              // if (typeWh !== "index") changeWebhookData(r);
              // else
              await getAllWebhooks(user?.uid);

              if (typeWh === "index") newAlert("New webhook added", "success");
              else if (typeWh === "AddMessage")
                newAlert("New message added", "success");
              else if (typeWh === "EditMessage")
                newAlert("Message updated", "success");
              close();
            }
          }}
          className="w-full max-w-xs mx-auto"
        >
          Save
        </ButtonP>
      </div>

      {showDelete && (
        <div className="w-full max-w-xs border-error border-[1px] p-2 mb-4 rounded-lg">
          <p className="text-text-p text-sm text-center">
            This messsage will no longer be visible.
          </p>
          <div className="mb-2 w-full flex justify-around">
            <ButtonText
              className="!text-error"
              onClick={async () => {
                const r = await deleteMsg(webhook?.id, msg.msg);
                // if (r) {
                //   // if (typeWh !== "index") changeWebhookData(r);
                //   // else
                await getAllWebhooks(user?.uid);

                newAlert("Message deleted!", "error");
                close();
                // }
              }}
            >
              Delete
            </ButtonText>
            <ButtonText className="" onClick={() => setShowDelete(false)}>
              Cancel
            </ButtonText>
          </div>
        </div>
      )}

      {typeWh === "EditMessage" && !showDelete && (
        <div className="mb-2 w-full max-w-xs flex justify-between">
          <ButtonText
            className="!text-error"
            onClick={() => setShowDelete(true)}
          >
            Delete
          </ButtonText>
          <ButtonText className="" onClick={() => duplicateMsg(getMsg())}>
            Duplicate
          </ButtonText>
        </div>
      )}
    </div>
  );
}

export default WebhookData;
