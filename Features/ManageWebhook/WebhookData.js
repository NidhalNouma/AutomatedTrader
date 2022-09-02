import React, { Fragment, useEffect } from "react";
import { Alert } from "react-daisyui";
import { Input1, Toggle1, Input1Inline, Select1 } from "../../Components/Input";
import { ButtonP } from "../../Components/Button";
import { WebHook } from "../../hooks/WebHook";

import { GetUserContext } from "../../hooks/UserHook";
import { GetWebhookContext } from "../../hooks/WebHook";

function WebhookData({ includeName, close, webhook, type, msg }) {
  const user = GetUserContext();
  const {
    name,
    setName,
    pair,
    setPair,
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
    add,
    addMsg,
    getData,
    editMsg,
  } = WebHook(user?.uid);

  const { getAllWebhooks } = GetWebhookContext();

  useEffect(() => {
    if (type === "EditMessage") getData(msg.msg);
  }, [msg]);

  return (
    <div className="w-11/12 mx-auto flex flex-col items-center">
      {includeName && (
        <Input1
          classNameInput="bg-accenti "
          name="Webhooks name"
          placeholder={"Name"}
          helper="Information about this input"
          value={name}
          setValue={setName}
        />
      )}
      <Input1
        classNameInput="bg-accenti "
        name="What's the pair name?"
        placeholder={"pair"}
        helper="Information about this input"
        value={pair}
        setValue={setPair}
      />
      <div className="my-1"></div>
      <Select1
        name="Position size type"
        helper="Information about this input"
        options={["Percentage", "Fixed"]}
        value={positionType}
        setValue={setPositionType}
      />
      <Input1Inline
        name="Position size value"
        placeholder=""
        helper="Information about this input"
        type="number"
        value={positionValue}
        setValue={setPositionValue}
      />

      <Input1Inline
        name="Stop loss"
        placeholder=""
        helper="Information about this input"
        type="number"
        value={stopLoss}
        setValue={setStopLoss}
      />
      <Input1Inline
        name="Take profit"
        placeholder=""
        helper="Information about this input"
        type="number"
        value={takeProfit}
        setValue={setTakeProfit}
      />

      <Toggle1
        name="Trailing stop"
        helper="Information about this input"
        value={TS.use}
        setValue={() => setTS({ ...TS, use: !TS.use })}
      />
      {TS.use && (
        <Fragment>
          <Input1Inline
            name="Trailing start"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!TS.use}
            value={TS.start}
            setValue={(v) => setTS({ ...TS, start: v })}
          />
          <Input1Inline
            name="Trailing stop"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!TS.use}
            value={TS.stop}
            setValue={(v) => setTS({ ...TS, stop: v })}
          />
          <Input1Inline
            name="Trailing step"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!TS.use}
            value={TS.step}
            setValue={(v) => setTS({ ...TS, step: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Break even / Partial profit"
        helper="Information about this input"
        value={BE.use}
        setValue={() => setBE({ ...BE, use: !BE.use })}
      />
      {BE.use && (
        <Fragment>
          <Input1Inline
            name="Stop in profit"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!BE.use}
            value={BE.stop}
            setValue={(v) => setBE({ ...BE, stop: v })}
          />
          <Input1Inline
            name="Partial profit"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!BE.use}
            value={BE.partiel}
            setValue={(v) => setBE({ ...BE, partiel: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Time filter"
        helper="Information about this input"
        value={time.use}
        setValue={() => setTime({ ...time, use: !time.use })}
      />
      {time.use && (
        <Fragment>
          <Input1Inline
            name="Time start"
            placeholder=""
            helper="Information about this input"
            disabled={!time.use}
            value={time.start}
            setValue={(v) => setTime({ ...time, start: v })}
          />
          <Input1Inline
            name="Time end"
            placeholder=""
            helper="Information about this input"
            disabled={!time.use}
            value={time.end}
            setValue={(v) => setTime({ ...time, end: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Hedging"
        helper="Information about this input"
        value={hedging.use}
        setValue={() => setHedging({ ...hedging, use: !hedging.use })}
      />
      {hedging.use && (
        <Fragment>
          <Input1Inline
            name="Pending order duration"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!hedging.use}
            value={hedging.pending}
            setValue={(v) => setHedging({ ...hedging, pending: v })}
          />
          <Input1Inline
            name="Max open trade"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!hedging.use}
            value={hedging.max}
            setValue={(v) => setHedging({ ...hedging, max: v })}
          />
        </Fragment>
      )}

      <Toggle1
        name="Max spread/ slippage"
        helper="Information about this input"
        value={maxSS.use}
        setValue={() => setMaxSS({ ...maxSS, use: !maxSS.use })}
      />
      {maxSS.use && (
        <Fragment>
          <Input1Inline
            name="Max spread"
            placeholder=""
            helper="Information about this input"
            type="number"
            disabled={!maxSS.use}
            value={maxSS.spread}
            setValue={(v) => setMaxSS({ ...maxSS, spread: v })}
          />
          <Input1Inline
            name="Max slippage"
            placeholder=""
            helper="Information about this input"
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

      <div className="mt-1 mb-4 w-full px-20">
        <ButtonP
          onClick={async () => {
            let r;
            if (type === "index") r = await add();
            else if (type === "AddMessage") r = await addMsg(webhook?.id);
            else if (type === "EditMessage")
              r = await editMsg(webhook?.id, msg.msg);
            if (r) {
              const ga = await getAllWebhooks(user?.uid);
              close();
            }
          }}
          className="w-full"
        >
          Save
        </ButtonP>
      </div>
    </div>
  );
}

export default WebhookData;
