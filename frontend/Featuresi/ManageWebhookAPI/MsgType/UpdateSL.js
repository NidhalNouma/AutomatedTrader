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

function UpdateSL({
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
      <Select1
        name="Order type"
        helper="Order type"
        options={["Buy", "Sell"]}
        value={type}
        setValue={setType}
      />

      <Input1Inline
        name="Move stop loss (Pips)"
        placeholder="200"
        helper="Move stop loss to"
        type="number"
        value={stopLoss}
        setValue={setStopLoss}
      />

      <Toggle1
        name="All trades"
        helper="Update all trades, not just the ones that were opened by this webhook."
        value={allTrades}
        setValue={() => setAllTrades(!allTrades)}
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

export default UpdateSL;
