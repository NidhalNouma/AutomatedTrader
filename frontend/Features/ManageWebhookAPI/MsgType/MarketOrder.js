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

function MarketOrder({
  type,
  setType,
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
        options={["Buy", "Sell"]}
        value={type}
        setValue={setType}
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

export default MarketOrder;
