import { Fragment, useEffect, useState } from "react";
import { Select, InputInline, Range, ToggleInline } from "../ui/Input";
import { Button, ButtonText } from "../ui/Button";
import { Button as Button_, ButtonGroup, Checkbox } from "react-daisyui";
import { CiSaveUp2 } from "react-icons/ci";
import { Info, Error } from "../ui/Alerts";

import { Label } from "../ui/Text";
import { NewPreset } from "../../hooksp/PresetHook";

function PresetForm({ close, preset }) {
  const {
    presetType,
    setPresetType,
    name,
    setName,
    pair,
    setPair,
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
    moveToBE,
    setMoveToBE,
    usePartialClose,
    setUsePartialClose,
    partialCloseValue,
    setPartialCloseValue,
    error,
    add,
    edit,
  } = NewPreset(preset);

  return (
    <section className="w-full flex flex-col items-center">
      {/* <div className="w-full mb-5 max-w-xsi">
        <Info>
          Basic webhook allows you to create three different messages:
          <br />
          1. Market Order: Places a market order based on specified inputs.
          <br />
          2. Update SL: Updates the stop-loss price to a particular level.
          <br />
          3. Close Trade: Closes the open trade or trades and optionally closes
          a partial trade.
        </Info>
      </div> */}
      <ButtonGroup className="mb-6 w-full max-w-xs grid grid-cols-3">
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary truncate ${
            presetType === 0 &&
            "text-btn bg-primary hover:!bg-primary hover:text-btn"
          }`}
          onClick={() => setPresetType(0)}
        >
          Market Order
        </Button_>
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-lg bg-bg py-1  hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary truncate ${
            presetType === 3 &&
            "text-btn bg-primary hover:!bg-primary hover:text-btn"
          }`}
          onClick={() => setPresetType(3)}
        >
          Modify Order
        </Button_>
        <Button_
          size="sm"
          className={`capitalize !text-sm rounded-lg bg-bg py-1 hover:!bg-bg text-text/80 hover:text-text border-none outline outline-1 outline-dashed outline-primary truncate ${
            presetType === 2 &&
            "text-btn bg-primary hover:!bg-primary hover:text-btn"
          }`}
          onClick={() => setPresetType(2)}
        >
          Close Order
        </Button_>
      </ButtonGroup>

      <InputInline
        className=""
        name={<Fragment>{"Preset name"}</Fragment>}
        helper="The preset name"
        type="text"
        placeholder="First %"
        value={name}
        setValue={setName}
      />

      <InputInline
        className=""
        name={<Fragment>{"Symbol"}</Fragment>}
        helper="Choose pair name"
        type="text"
        placeholder="US30"
        value={pair}
        setValue={setPair}
      />

      {presetType === 0 ? (
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
      ) : presetType === 3 ? (
        <UpdateOrder
          orderTypes={orderTypes}
          type={type}
          setType={setType}
          stopLoss={stopLoss}
          setStopLoss={setStopLoss}
        />
      ) : presetType === 2 ? (
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
        />
      ) : (
        <Fragment />
      )}

      {error && <Error className="mt-4 max-w-xs">{error}</Error>}

      <div className="w-full max-w-xs mt-5 ">
        <Button
          onClick={async () => {
            let r = null;
            if (preset) r = await edit();
            else r = await add();

            if (r) close();
          }}
          className="w-full "
          icon={<CiSaveUp2 className="h-3.5 aspect-square stroke-2" />}
        >
          Save
        </Button>
      </div>
    </section>
  );
}

export default PresetForm;

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
    </Fragment>
  );
}

function UpdateOrder({ orderTypes, type, setType, stopLoss, setStopLoss }) {
  if (orderTypes.length === 2)
    orderTypes?.push({ value: "Both", label: "Both" });
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
}) {
  if (orderTypes.length === 2)
    orderTypes?.push({ value: "Both", label: "Both" });
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
    </Fragment>
  );
}
