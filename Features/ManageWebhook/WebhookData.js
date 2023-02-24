import React, { Fragment, useEffect, useState } from "react";
import { Alert, Checkbox, ButtonGroup, Button } from "react-daisyui";
import {
  Input1,
  Toggle1,
  Input1Inline,
  Select1,
  Range1,
} from "../../Components/Input";
import { ButtonP, ButtonText } from "../../Components/Button";
import { WebHook } from "../../hooks/WebHook";

import { GetUserContext } from "../../hooks/UserHook";
import { GetWebhookContext } from "../../hooks/WebHook";
import { GetToastContext } from "../../hooks/ToastHook";
import { GetMTAccountsContext } from "../../hooks/MTAccounts";

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
    stopLoss,
    setStopLoss,
    takeProfit,
    setTakeProfit,
    TS,
    setTS,
    BE,
    setBE,
    time,
    setTime,
    hedging,
    setHedging,
    maxSS,
    setMaxSS,
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

      <Select1
        name="Order type"
        helper="Type of the order"
        options={[
          "Buy",
          "Sell",
          "Buy stop",
          "Sell stop",
          "Buy limit",
          "Sell limit",
        ]}
        value={type}
        setValue={setType}
      />

      {type > 1 && (
        <Input1Inline
          name="Pending distance"
          placeholder=""
          helper="Pending order distance in pips"
          type="number"
          value={pendingDistance}
          setValue={setPendingDistance}
        />
      )}

      <span className="text-text-h w-full max-w-xs my-1">
        Entry position size:
      </span>
      <div className="flex items-center max-w-xs w-full">
        <Range1
          name={
            <Fragment>
              <Checkbox
                className="text-primaryi mr-2"
                size="sm"
                color="primary"
                checked={positionType === 0}
                onClick={() => setPositionType(0)}
                // onChange={() => setPositionType(0)}
              />
              {"Percentage base %"}
            </Fragment>
          }
          value={positionType === 0 && positionValue}
          setValue={setPositionValue}
        />
        {/* <Select1
          name="Position size type"
          helper="Information about this input"
          options={["Percentage", "Fixed"]}
          value={positionType}
          setValue={setPositionType}
        /> */}
      </div>

      <div className="flex items-center max-w-xs w-full">
        <Input1Inline
          name={
            <Fragment>
              <Checkbox
                className="text-primaryi mr-2"
                size="sm"
                color="primary"
                checked={positionType === 1}
                onClick={() => setPositionType(1)}
                // onChange={() => setPositionType(1)}
              />
              {"Fixing position based"}
            </Fragment>
          }
          helper="Fixed position value"
          type="number"
          value={positionType === 1 && positionValue}
          setValue={setPositionValue}
        />
      </div>

      <Input1Inline
        name="Stop loss (Pips)"
        placeholder=""
        helper="Stop loss value in pips"
        type="number"
        value={stopLoss}
        setValue={setStopLoss}
      />
      <Input1Inline
        name="Take profit (Pips)"
        placeholder=""
        helper="Take profit value in pips"
        type="number"
        value={takeProfit}
        setValue={setTakeProfit}
      />

      <Toggle1
        name="Trailing stop (Pips)"
        helper="Enable trailing stop"
        value={TS.use}
        setValue={() => setTS({ ...TS, use: !TS.use })}
      />
      {TS.use && (
        <Fragment>
          <Input1Inline
            name="Trailing Stop Start"
            placeholder=""
            helper="Trailing start value in pips"
            type="number"
            disabled={!TS.use}
            value={TS.start}
            setValue={(v) => setTS({ ...TS, start: v })}
          />
          <Input1Inline
            name="Trailing Stop Distance"
            placeholder=""
            helper="Trailing stop value in pips"
            type="number"
            disabled={!TS.use}
            value={TS.stop}
            setValue={(v) => setTS({ ...TS, stop: v })}
          />
          <Input1Inline
            name="Trailing Step"
            placeholder=""
            helper="Trailing step value in pips"
            type="number"
            disabled={!TS.use}
            value={TS.step}
            setValue={(v) => setTS({ ...TS, step: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Break even / Partial profit"
        helper="Enable break even and partial profit"
        value={BE.use}
        setValue={() => setBE({ ...BE, use: !BE.use })}
      />
      {BE.use && (
        <Fragment>
          <Input1Inline
            name="Partial Close Target (Pips)"
            placeholder=""
            helper="Profit close target in pips"
            type="number"
            disabled={!BE.use}
            value={BE.stop}
            setValue={(v) => setBE({ ...BE, stop: v })}
          />
          <Input1Inline
            name="Partial Close %"
            placeholder=""
            helper="Close % of the trade after hitting the partial target"
            type="number"
            disabled={!BE.use}
            value={BE.partiel}
            setValue={(v) => setBE({ ...BE, partiel: v })}
          />
          <Input1Inline
            name="Activate Break Even (Pips)"
            placeholder=""
            helper="Profit pips to activate Breakeven"
            type="number"
            disabled={!BE.use}
            value={BE.activate}
            setValue={(v) => setBE({ ...BE, activate: v })}
          />
          <Input1Inline
            name="SL into profit (Pips)"
            placeholder=""
            helper="Move SL into profit"
            type="number"
            disabled={!BE.use}
            value={BE.move}
            setValue={(v) => setBE({ ...BE, move: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Time filter"
        helper="Allow time filter"
        value={time.use}
        setValue={() => setTime({ ...time, use: !time.use })}
      />
      {time.use && (
        <Fragment>
          <ButtonGroup className="my-2">
            <Button
              size="xs"
              active={time?.day.find((v) => v === "MON")}
              onClick={() => {
                const d = "MON";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Mon
            </Button>
            <Button
              size="xs"
              active={time?.day.find((v) => v === "TUE")}
              onClick={() => {
                const d = "TUE";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Tue
            </Button>
            <Button
              size="xs"
              active={time?.day.find((v) => v === "WED")}
              onClick={() => {
                const d = "WED";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Wed
            </Button>
            <Button
              size="xs"
              active={time?.day.find((v) => v === "THI")}
              onClick={() => {
                const d = "THI";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Thi
            </Button>
            <Button
              size="xs"
              active={time?.day.find((v) => v === "FRI")}
              onClick={() => {
                const d = "FRI";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Fri
            </Button>
            <Button
              size="xs"
              active={time?.day.find((v) => v === "SAT")}
              onClick={() => {
                const d = "SAT";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Sat
            </Button>
            <Button
              size="xs"
              active={time?.day.find((v) => v === "SUN")}
              onClick={() => {
                const d = "SUN";
                const active = time?.day.find((v) => v === d);
                let r = time?.day;
                if (active) r = r.filter((v) => v !== d);
                else r.push(d);
                setTime({ ...time, day: r });
              }}
            >
              Sun
            </Button>
          </ButtonGroup>
          <Input1Inline
            name="Time start"
            placeholder="08:30"
            helper="Time ti start accepting the alerts"
            disabled={!time.use}
            value={time.start}
            setValue={(v) => setTime({ ...time, start: v })}
          />
          <Input1Inline
            name="Time end"
            placeholder="22:30"
            helper="End time"
            disabled={!time.use}
            value={time.end}
            setValue={(v) => setTime({ ...time, end: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Hedging"
        helper="Allow hedging"
        value={hedging.use}
        setValue={() => setHedging({ ...hedging, use: !hedging.use })}
      />
      {hedging.use && (
        <Fragment>
          <Select1
            name="Period"
            helper="Period of the pending order duration"
            options={["Minutes", "Hours", "Days", "Weeks", "Months"]}
            value={hedging.period}
            setValue={(v) => setHedging({ ...hedging, period: v })}
          />
          <Input1Inline
            name="Pending order duration"
            placeholder=""
            helper="Pending order duration"
            type="number"
            disabled={!hedging.use}
            value={hedging.pending}
            setValue={(v) => setHedging({ ...hedging, pending: v })}
          />
          {/* <Input1Inline
            name="Max open trade"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!hedging.use}
            value={hedging.max}
            setValue={(v) => setHedging({ ...hedging, max: v })}
          /> */}
        </Fragment>
      )}

      <Toggle1
        name="Max spread/ slippage"
        helper="Allow spread and slippage"
        value={maxSS.use}
        setValue={() => setMaxSS({ ...maxSS, use: !maxSS.use })}
      />
      {maxSS.use && (
        <Fragment>
          <Input1Inline
            name="Max spread"
            placeholder=""
            helper="Maximum spread"
            type="number"
            disabled={!maxSS.use}
            value={maxSS.spread}
            setValue={(v) => setMaxSS({ ...maxSS, spread: v })}
          />
          <Input1Inline
            name="Max slippage"
            placeholder=""
            helper="Maximum slippage"
            type="number"
            disabled={!maxSS.use}
            value={maxSS.slippage}
            setValue={(v) => setMaxSS({ ...maxSS, slippage: v })}
          />
        </Fragment>
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

      {mtAccounts?.length > 0 && (
        <div className="mb-2 w-full max-w-xs">
          <div className=" flex justify-between items-center">
            <ButtonText
              onClick={async () => {
                await testMsg(webhook?.id, [testAccount?.id]);
              }}
              className="ml-auto"
            >
              Send Test alert
            </ButtonText>
            <Select1
              className="!border-bgai focus:outline-none"
              helper="Information about this input"
              options={mtAccounts.map((v) => v.accountDisplayName)}
              value={mtAccounts.indexOf(testAccount)}
              setValue={(v) => setTestAccount(mtAccounts[v])}
            />
          </div>
          {succTestMsg && (
            // <div className="mx-auto text-center">
            <span className="text-success px-3rounded-xl text-sm">
              {succTestMsg}
            </span>
            // {/* </div> */}
          )}
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
