import React from "react";
import { Input1, Toggle1, Input1Inline, Select1 } from "../../Components/Input";
import { ButtonP } from "../../Components/Button";

function WebhookData() {
  return (
    <div className="w-11/12 mx-auto flex flex-col items-center">
      <Input1
        name="What's the pair name?"
        placeholder={"pair"}
        helper="Information about this input"
      />
      <div className="my-1"></div>
      <Select1
        name="Position size type"
        helper="Information about this input"
        options={["Percentage", "fixed"]}
      />
      <Input1Inline
        name="Position size value"
        placeholder=""
        helper="Information about this input"
      />

      <Input1Inline
        name="Stop loss"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Take profit"
        placeholder=""
        helper="Information about this input"
      />

      <Toggle1 name="Trailing stop" helper="Information about this input" />
      <Input1Inline
        name="Trailing start"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Trailing stop"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Trailing step"
        placeholder=""
        helper="Information about this input"
      />

      <Toggle1
        name="Break even / Partial profit"
        helper="Information about this input"
      />
      <Input1Inline
        name="Stop in profit"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Partial profit"
        placeholder=""
        helper="Information about this input"
      />

      <Toggle1 name="Time filter" helper="Information about this input" />
      <Input1Inline
        name="Time start"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Time end"
        placeholder=""
        helper="Information about this input"
      />

      <Toggle1 name="Hedging" helper="Information about this input" />
      <Input1Inline
        name="Pending order duration"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Max open trade"
        placeholder=""
        helper="Information about this input"
      />

      <Toggle1
        name="Max spread/ slippage"
        helper="Information about this input"
      />
      <Input1Inline
        name="Max spread"
        placeholder=""
        helper="Information about this input"
      />
      <Input1Inline
        name="Max slippage"
        placeholder=""
        helper="Information about this input"
      />

      <div className="mt-6 mb-4 w-full px-20">
        <ButtonP className="w-full">Save</ButtonP>
      </div>
    </div>
  );
}

export default WebhookData;
