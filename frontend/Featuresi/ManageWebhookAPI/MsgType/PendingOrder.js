import { Fragment } from "react";

import { Alert, Checkbox, ButtonGroup, Button } from "react-daisyui";
import {
  Input1,
  Toggle1,
  Input1Inline,
  Select1,
  Range1,
} from "../../../components/Input";
import { ButtonP, ButtonText } from "../../../components/Button";

function PendingOrder({
  type,
  setType,
  pendingDistance,
  setPendingDistance,
  positionType,
  setPositionType,
  positionValue,
  setPositionValue,
  positionValuePercentage,
  setPositionValuePercentage,
  stopLoss,
  setStopLoss,
  takeProfit,
  setTakeProfit,
  time,
  setTime,
}) {
  return (
    <Fragment>
      <Select1
        name="Order type"
        helper="Type of the order"
        options={[
          //   "Buy",
          //   "Sell",
          "Buy stop",
          "Sell stop",
          "Buy limit",
          "Sell limit",
        ]}
        value={type}
        setValue={setType}
      />

      <Input1Inline
        name="Pending distance"
        placeholder="100"
        helper="Pending order distance in pips"
        type="number"
        value={pendingDistance}
        setValue={setPendingDistance}
      />

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
              {"Position size %"}
            </Fragment>
          }
          value={positionValuePercentage}
          setValue={setPositionValuePercentage}
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
          value={positionValue}
          setValue={setPositionValue}
        />
      </div>

      <Input1Inline
        name="Stop loss (Pips)"
        placeholder="200"
        helper="Stop loss value in pips"
        type="number"
        value={stopLoss}
        setValue={setStopLoss}
      />
      <Input1Inline
        name="Take profit (Pips)"
        placeholder="200"
        helper="Take profit value in pips"
        type="number"
        value={takeProfit}
        setValue={setTakeProfit}
      />

      {/* <Toggle1
      name="Trailing stop (Pips)"
      helper="Enable trailing stop"
      value={TS.use}
      setValue={() => setTS({ ...TS, use: !TS.use })}
    />
    {TS.use && (
      <Fragment>
        <Input1Inline
          name="Trailing Stop Start"
          placeholder="100"
          helper="Trailing start value in pips"
          type="number"
          disabled={!TS.use}
          value={TS.start}
          setValue={(v) => setTS({ ...TS, start: v })}
        />
        <Input1Inline
          name="Trailing Stop Distance"
          placeholder="50"
          helper="Trailing stop value in pips"
          type="number"
          disabled={!TS.use}
          value={TS.stop}
          setValue={(v) => setTS({ ...TS, stop: v })}
        />
        <Input1Inline
          name="Trailing Step"
          placeholder="5"
          helper="Trailing step value in pips"
          type="number"
          disabled={!TS.use}
          value={TS.step}
          setValue={(v) => setTS({ ...TS, step: v })}
        />
      </Fragment>
    )} */}

      {/* <Toggle1
      name="Break even / Partial profit"
      helper="Enable break even and partial profit"
      value={BE.use}
      setValue={() => setBE({ ...BE, use: !BE.use })}
    />
    {BE.use && (
      <Fragment>
        <Input1Inline
          name="Partial Close Target (Pips)"
          placeholder="40"
          helper="Profit close target in pips"
          type="number"
          disabled={!BE.use}
          value={BE.stop}
          setValue={(v) => setBE({ ...BE, stop: v })}
        />
        <Input1Inline
          name="Partial Close %"
          placeholder="50"
          helper="Close % of the trade after hitting the partial target"
          type="number"
          disabled={!BE.use}
          value={BE.partiel}
          setValue={(v) => setBE({ ...BE, partiel: v })}
        />
        <Input1Inline
          name="Activate Break Even (Pips)"
          placeholder="80"
          helper="Profit pips to activate Breakeven"
          type="number"
          disabled={!BE.use}
          value={BE.activate}
          setValue={(v) => setBE({ ...BE, activate: v })}
        />
        <Input1Inline
          name="SL into profit (Pips)"
          placeholder="10"
          helper="Move SL into profit"
          type="number"
          disabled={!BE.use}
          value={BE.move}
          setValue={(v) => setBE({ ...BE, move: v })}
        />
      </Fragment>
    )} */}

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
            helper="Time to start accepting the alerts (EST time zone)"
            disabled={!time.use}
            value={time.start}
            setValue={(v) => setTime({ ...time, start: v })}
          />
          <Input1Inline
            name="Time end"
            placeholder="22:30"
            helper="End time (EST time zone)"
            disabled={!time.use}
            value={time.end}
            setValue={(v) => setTime({ ...time, end: v })}
          />
        </Fragment>
      )}
    </Fragment>
  );
}

export default PendingOrder;
