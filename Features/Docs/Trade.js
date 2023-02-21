import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Trade() {
  return (
    <Index>
      <H4 className="font-bold">Trade dashboard </H4>

      <p className="mt-3 text-text-p text-sm">
        Here&apos;s a simplified guide for understanding the Trade section in
        Automated Trader:
        <br />
        <br />
        <span className="font-semibold">1. </span>The Trade section displays all
        your trades from all the accounts you have added in Automated Trader.
        <br />
        <br />
        <span className="font-semibold">2. </span>You can view the webhook that
        fired to give you the trade.
        <br />
        <br />
        <span className="font-semibold">3. </span>The section shows the symbol
        type, order type, lot size, pip amount, and the amount of profit or
        loss. Additionally, it shows the open/close price and the closed time.
        <br />
        <br />
        <span className="font-semibold">4. </span>By clicking on a trade, you
        can access more details, such as which account it was taken on and the
        entry and exit price.
      </p>

      <p className="mt-3 text-text-p text-sm">
        The Trade section is an essential tool for tracking your trades and
        analyzing your trading strategy&apos;s performance. By accessing the
        information provided in this section, you can make informed decisions on
        how to improve your trading strategy and optimize your profits.
      </p>
    </Index>
  );
}

export default Trade;
