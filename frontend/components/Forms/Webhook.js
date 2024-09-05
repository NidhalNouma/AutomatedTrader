import { Fragment, useEffect, useState } from "react";
import { Select, InputInline, Range, ToggleInline } from "../ui/Input";
import { Button, ButtonText } from "../ui/Button";
import { Button as Button_, ButtonGroup, Checkbox } from "react-daisyui";
import { CiSaveUp2 } from "react-icons/ci";
import { Info, Error } from "../ui/Alerts";

import {
  NewAdvancedWebhook,
  NewWebhook,
  WebhookApps as WhAppsHook,
} from "../../hooksp/WebhooksHook";
import { Label } from "../ui/Text";

function WebhookForm({ close }) {
  const [type, setType] = useState(0);

  return (
    <section className="w-full flex flex-col items-center">
      <div className="mb-5">
        <ButtonGroup>
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg w-24 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary ${
              type === 0 &&
              "text-btn bg-primary hover:!bg-primary hover:text-btn"
            }`}
            onClick={() => setType(0)}
          >
            Basic
          </Button_>
          <Button_
            size="sm"
            className={`capitalize !text-sm rounded-lg bg-bg  w-24 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary ${
              type === 1 &&
              "text-btn bg-primary hover:!bg-primary hover:text-btn"
            }`}
            onClick={() => setType(1)}
          >
            Advanced
          </Button_>
        </ButtonGroup>
      </div>

      <div className="w-full mb-5 max-w-xsi">
        {type === 0 ? (
          <Info>
            Basic webhook allows you to create three different messages:
            <br />
            1. Market Order: Places a market order based on specified inputs.
            <br />
            2. Update SL: Updates the stop-loss price to a particular level.
            <br />
            3. Close Trade: Closes the open trade or trades and optionally
            closes a partial trade.
          </Info>
        ) : type === 1 ? (
          <Info>
            Advanced webhook support by algo companies integrates our alerts
            directly with their indicators, making it easier for you to automate
            your trades.
            <br /> One of our partners in this endeavor is{" "}
            <a
              className="underline underline-offset-2"
              target="_blank"
              rel="noreferrer"
              href="https://www.trustedsignals.com"
            >
              trustedsignals.com
            </a>
            .
          </Info>
        ) : (
          <Fragment />
        )}
      </div>

      {type === 0 ? (
        <BasicWebhookForm close={close} />
      ) : type === 1 ? (
        <AdvancedWebhookForm close={close} />
      ) : (
        <Fragment />
      )}
    </section>
  );
}

export default WebhookForm;

export function AdvancedWebhookForm({ close, webhook }) {
  const {
    error,
    name,
    setName,
    pair,
    setPair,
    add,
    update,
    getData,
    fixedLotSize,
    setFixedLotSize,
    useFixedLotSize,
    setUseFixedLotSize,
  } = NewAdvancedWebhook();

  useEffect(() => {
    getData(webhook);
  }, [webhook]);

  return (
    <Fragment>
      <InputInline
        className=""
        name={<Fragment>{"Name"}</Fragment>}
        helper="The webhook name"
        type="text"
        placeholder="First webhook"
        value={name}
        setValue={setName}
      />

      <InputInline
        className="mt-0"
        name={<Fragment>{"Pair"}</Fragment>}
        helper="Asset pair or symbol name."
        type="text"
        placeholder="BTCUSD"
        value={pair}
        setValue={setPair}
      />
      <InputInline
        className=""
        focus={useFixedLotSize}
        name={
          <Fragment>
            <Checkbox
              className="text-primary mr-2"
              size="sm"
              color="primary"
              checked={useFixedLotSize}
              onClick={() => setUseFixedLotSize(!useFixedLotSize)}
            />
            {"Fixed size"}
          </Fragment>
        }
        helper="Fixed position value"
        type="number"
        placeholder="10"
        value={fixedLotSize}
        setValue={setFixedLotSize}
      />

      {error && <Error className="mt-4 max-w-xs">{error}</Error>}

      <div className="mt-5 w-full max-w-xs mx-auto">
        <Button
          onClick={async () => {
            let r = null;
            if (webhook) r = await update(webhook);
            else r = await add();
            if (r && !r.error) close();
          }}
          className=" w-full"
          icon={<CiSaveUp2 className="h-3.5 aspect-square stroke-2" />}
        >
          Save
        </Button>
      </div>
    </Fragment>
  );
}

export function BasicWebhookForm({ close, webhook, message, onDuplicate, to }) {
  const {
    orderTypes,
    msgType,
    setMsgType,
    name,
    setName,
    msgName,
    setMsgName,
    pair,
    setPair,
    type,
    setType,
    pendingDistance,
    setPendingDistance,
    usePositionPercentage,
    setUsePositionPercentage,
    useFixedPosition,
    setUseFixedPosition,
    positionValue,
    setPositionValue,
    positionValuePercentage,
    setPositionValuePercentage,
    useStopLoss,
    setUseStopLoss,
    stopLoss,
    setStopLoss,
    useTakeProfit,
    setUseTakeProfit,
    takeProfit,
    setTakeProfit,
    time,
    setTime,
    allTrades,
    setAllTrades,
    moveToBE,
    setMoveToBE,
    usePartialClose,
    setUsePartialClose,
    partialCloseValue,
    setPartialCloseValue,
    error,
    add,
    addMsg,
    editMsg,
    getData,
    deleteMsg,
    getMsg,
  } = NewWebhook();

  useEffect(() => {
    if (message) getData(message.value);
  }, [message]);

  return (
    <section className="w-full flex flex-col items-center">
      {/* {message && (
        <Select
          name="Message"
          className="mb-8"
          options={webhook.messages}
          helper="Market order type."
          // value={type}
          // setValue={setType}
        ></Select>
      )} */}
      <ButtonGroup className="mb-6 w-full grid grid-cols-3 max-w-xs">
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary truncate ${
            msgType === 0 &&
            "text-btn bg-primary hover:!bg-primary hover:text-btn"
          }`}
          onClick={() => setMsgType(0)}
        >
          Market Order
        </Button_>
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary truncate ${
            msgType === 3 &&
            "text-btn bg-primary hover:!bg-primary hover:text-btn"
          }`}
          onClick={() => setMsgType(3)}
        >
          Modify Order
        </Button_>
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-lg bg-bg py-1 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary truncate ${
            msgType === 2 &&
            "text-btn bg-primary hover:!bg-primary hover:text-btn"
          }`}
          onClick={() => setMsgType(2)}
        >
          Close Order
        </Button_>
      </ButtonGroup>

      {!webhook && (
        <InputInline
          className=""
          name={<Fragment>{"Webhook name"}</Fragment>}
          helper="The webhook name"
          type="text"
          placeholder="First webhook"
          value={name}
          setValue={setName}
        />
      )}

      <InputInline
        className=""
        name={<Fragment>{"Message name"}</Fragment>}
        helper="The message name"
        type="text"
        placeholder="Buy-BTCUSD"
        value={msgName}
        setValue={(value) => {
          const dashedValue = value.replace(/\s+/g, "-");
          setMsgName(dashedValue);
        }}
      />

      <InputInline
        className="mt-0"
        name={<Fragment>{"Pair"}</Fragment>}
        helper="Asset pair or symbol name."
        type="text"
        placeholder="BTCUSD"
        value={pair}
        setValue={setPair}
      />

      {msgType === 0 ? (
        <MarketOrder
          orderTypes={orderTypes}
          type={type}
          setType={setType}
          usePositionPercentage={usePositionPercentage}
          setUsePositionPercentage={setUsePositionPercentage}
          useFixedPosition={useFixedPosition}
          setUseFixedPosition={setUseFixedPosition}
          positionValue={positionValue}
          setPositionValue={setPositionValue}
          positionValuePercentage={positionValuePercentage}
          setPositionValuePercentage={setPositionValuePercentage}
          useStopLoss={useStopLoss}
          setUseStopLoss={setUseStopLoss}
          stopLoss={stopLoss}
          setStopLoss={setStopLoss}
          useTakeProfit={useTakeProfit}
          setUseTakeProfit={setUseTakeProfit}
          takeProfit={takeProfit}
          setTakeProfit={setTakeProfit}
        />
      ) : msgType === 3 ? (
        <UpdateOrder
          orderTypes={orderTypes}
          type={type}
          setType={setType}
          stopLoss={stopLoss}
          setStopLoss={setStopLoss}
          allTrades={allTrades}
          setAllTrades={setAllTrades}
        />
      ) : msgType === 2 ? (
        <CloseOrder
          orderTypes={orderTypes}
          type={type}
          setType={setType}
          usePartialClose={usePartialClose}
          setUsePartialClose={setUsePartialClose}
          partialCloseValue={partialCloseValue}
          setPartialCloseValue={setPartialCloseValue}
          moveToBE={moveToBE}
          setMoveToBE={setMoveToBE}
          allTrades={allTrades}
          setAllTrades={setAllTrades}
        />
      ) : (
        <Fragment />
      )}

      {error && <Error className="mt-4 max-w-xs">{error}</Error>}

      <div className="w-full max-w-xs mt-5 ">
        <Button
          onClick={async () => {
            let r = null;
            if (to === "edit") r = await editMsg(webhook.id, message);
            else if (to === "add") r = await addMsg(webhook.id);
            else r = await add();
            if (r && !r.error) close();
          }}
          className="w-full "
          icon={<CiSaveUp2 className="h-3.5 aspect-square stroke-2" />}
        >
          Save
        </Button>

        {to === "edit" && (
          <div className="mt-4 w-full flex items-center justify-between">
            <ButtonText
              className="text-error/80"
              onClick={async () => {
                let r = await deleteMsg(webhook.id, message);
                if (r && !r.error) close();
              }}
            >
              Delete
            </ButtonText>
            <ButtonText onClick={onDuplicate} className="text-text/80">
              Duplicate
            </ButtonText>
          </div>
        )}
      </div>
    </section>
  );
}

function MarketOrder({
  orderTypes,
  type,
  setType,
  usePositionPercentage,
  setUsePositionPercentage,
  useFixedPosition,
  setUseFixedPosition,
  positionValue,
  setPositionValue,
  positionValuePercentage,
  setPositionValuePercentage,
  useStopLoss,
  setUseStopLoss,
  stopLoss,
  setStopLoss,
  useTakeProfit,
  setUseTakeProfit,
  takeProfit,
  setTakeProfit,
}) {
  return (
    <Fragment>
      <Select
        name="Order type"
        className="mt-2"
        options={orderTypes}
        helper="Market order type."
        value={type}
        setValue={setType}
      ></Select>
      <Range
        max="40"
        step={0.1}
        min="0.1"
        className="mt-5"
        name={
          <Fragment>
            <Checkbox
              className="text-primary mr-2"
              size="sm"
              color="primary"
              checked={usePositionPercentage}
              onClick={() => setUsePositionPercentage(!usePositionPercentage)}
            />
            {"Percentage size"}
          </Fragment>
        }
        value={positionValuePercentage}
        setValue={setPositionValuePercentage}
        helper="Position size percentage."
        nextValue=" %"
      />
      <InputInline
        className="mt-3"
        name={
          <Fragment>
            <Checkbox
              className="text-primary mr-2"
              size="sm"
              color="primary"
              checked={useFixedPosition}
              onClick={() => setUseFixedPosition(!useFixedPosition)}
            />
            {"Fixed size"}
          </Fragment>
        }
        focus={useFixedPosition}
        helper="Fixed position value"
        type="number"
        placeholder="10"
        value={positionValue}
        setValue={setPositionValue}
      />

      <InputInline
        name={
          <Fragment>
            <Checkbox
              className="text-primary mr-2"
              size="sm"
              color="primary"
              checked={useStopLoss}
              onClick={() => setUseStopLoss(!useStopLoss)}
            />
            {"Stop loss"}
          </Fragment>
        }
        focus={useStopLoss}
        placeholder="200"
        helper="Stop loss value in pips"
        type="number"
        value={stopLoss}
        setValue={setStopLoss}
      />
      <InputInline
        name={
          <Fragment>
            <Checkbox
              className="text-primary mr-2"
              size="sm"
              color="primary"
              checked={useTakeProfit}
              onClick={() => setUseTakeProfit(!useTakeProfit)}
              // onChange={() => setPositionType(1)}
            />
            {"Take profit"}
          </Fragment>
        }
        focus={useTakeProfit}
        placeholder="200"
        helper="Take profit value in pips"
        type="number"
        value={takeProfit}
        setValue={setTakeProfit}
      />

      {/* <ToggleInline
        className="mt-1"
        name="Time filter"
        helper="Allow time filter"
        // value={time.use}
        // setValue={() => setTime({ ...time, use: !time.use })}
      /> */}

      {/* <ButtonGroup className="my-2 rounded_lg">
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "MON")}
          //   onClick={() => {
          //     const d = "MON";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Mon
        </Button_>
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "TUE")}
          //   onClick={() => {
          //     const d = "TUE";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Tue
        </Button_>
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "WED")}
          //   onClick={() => {
          //     const d = "WED";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Wed
        </Button_>
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "THI")}
          //   onClick={() => {
          //     const d = "THI";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Thi
        </Button_>
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "FRI")}
          //   onClick={() => {
          //     const d = "FRI";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Fri
        </Button_>
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "SAT")}
          //   onClick={() => {
          //     const d = "SAT";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Sat
        </Button_>
        <Button_
          size="xs"
          //   active={time?.day.find((v) => v === "SUN")}
          //   onClick={() => {
          //     const d = "SUN";
          //     const active = time?.day.find((v) => v === d);
          //     let r = time?.day;
          //     if (active) r = r.filter((v) => v !== d);
          //     else r.push(d);
          //     setTime({ ...time, day: r });
          //   }}
        >
          Sun
        </Button_>
      </ButtonGroup> */}
    </Fragment>
  );
}

function UpdateOrder({
  orderTypes,
  type,
  setType,
  stopLoss,
  setStopLoss,
  time,
  setTime,
  allTrades,
  setAllTrades,
}) {
  return (
    <Fragment>
      <Select
        className="my-2"
        name="Order type"
        helper="Order type"
        value={type}
        setValue={setType}
        options={orderTypes}
      />

      <InputInline
        name="Move stop loss"
        placeholder="200"
        helper="Move stop loss to"
        type="number"
        value={stopLoss}
        setValue={setStopLoss}
      />

      <ToggleInline
        className="mt-1"
        name="All trades"
        helper="Update all trades, not just the ones that were opened by this webhook."
        checked={allTrades}
        onChange={() => setAllTrades(!allTrades)}
      />
    </Fragment>
  );
}

function CloseOrder({
  orderTypes,
  type,
  setType,
  usePartialClose,
  setUsePartialClose,
  partialCloseValue,
  setPartialCloseValue,
  moveToBE,
  setMoveToBE,
  allTrades,
  setAllTrades,
}) {
  return (
    <Fragment>
      <Select
        className="my-2"
        name="Close type"
        helper="Close type"
        options={orderTypes}
        value={type}
        setValue={setType}
      />
      <div className="flex items-center max-w-xs w-full">
        <InputInline
          name={
            <Fragment>
              <Checkbox
                className="text-primaryi mr-2"
                size="sm"
                color="primary"
                checked={usePartialClose}
                onClick={() => setUsePartialClose(!usePartialClose)}
              />
              {"Partial close"}
            </Fragment>
          }
          focus={usePartialClose}
          helper="Partial close percentage"
          type="number"
          value={usePartialClose && partialCloseValue}
          setValue={setPartialCloseValue}
        />
      </div>

      {usePartialClose && partialCloseValue < 100 && (
        <ToggleInline
          className="mt-1"
          name="Move to BE"
          helper="Move price to breakeven."
          checked={moveToBE}
          onChange={() => setMoveToBE(!moveToBE)}
        />
      )}

      <ToggleInline
        className="mt-1"
        name="All trades"
        helper="Update all trades, not just the ones that were opened by this webhook."
        checked={allTrades}
        onChange={() => setAllTrades(!allTrades)}
      />
    </Fragment>
  );
}

export function WebhookApps({ webhook, close }) {
  const { data, toggleAccountValue, onSave, error } = WhAppsHook(webhook);

  return (
    <Fragment>
      {data?.metatrader?.length > 0 && (
        <div className="mb-1">
          <Label className="mr-auto !text-text/60 mt-1.5">Metatrader</Label>
          {data.metatrader.map((account, i) => (
            <ToggleInline
              key={i}
              className="mb-0.5"
              name={account.name}
              // helper="Move price to breakeven."
              checked={account.value}
              onChange={() => toggleAccountValue("metatrader", account.id)}
            />
          ))}
        </div>
      )}

      {data?.binance?.length > 0 && (
        <div className="mb-1">
          <Label className="mr-auto !text-text/60 mt-1.5">Binance</Label>

          {data.binance.map((account, i) => (
            <div key={i} className="mb-2">
              <Label className="mr-auto !text-text mt-1.5">
                {account.name}
              </Label>
              <div className="flex w-full justify-between gap-8">
                <ToggleInline
                  className=""
                  name="Spot"
                  checked={account.value.spot}
                  onChange={() =>
                    toggleAccountValue("binance", account.id, "spot")
                  }
                />
                <ToggleInline
                  className=""
                  name="USD@M"
                  checked={account.value.usdm}
                  onChange={() =>
                    toggleAccountValue("binance", account.id, "usdm")
                  }
                />
                <ToggleInline
                  className=""
                  name="Coin@M"
                  checked={account.value.coinm}
                  onChange={() =>
                    toggleAccountValue("binance", account.id, "coinm")
                  }
                />
              </div>
            </div>
          ))}
        </div>
      )}

      {error && <Error className="mt-4 max-w-xs">{error}</Error>}

      <div className="mt-5 w-full max-w-xs mx-auto">
        <Button
          onClick={async () => {
            let r = await onSave();
            if (r && !r.error) close();
          }}
          className=" w-full"
          icon={<CiSaveUp2 className="h-3.5 aspect-square stroke-2" />}
        >
          Save
        </Button>
      </div>
    </Fragment>
  );
}
