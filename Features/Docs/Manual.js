import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Manual() {
  return (
    <Index>
      <H4 className="font-bold">Manual Automation </H4>

      <p className="mt-3 text-text-p text-sm">
        If you want to open a live trade using Automated, a platform that helps
        manage your trade size and risk, here&apos;s a step-by-step guide to
        help you:
        <br />
        <br />
        Requirements: Premium or lifetime user account
      </p>

      <p className="mt-3 text-text-p text-sm">
        Steps:
        <br />
        <br />
        <span className="font-semibold">1. </span>Set up your accounts and
        webhooks with your desired trading pairs and preset Automated trader
        settings/messages.
        <br />
        <br />
        <span className="font-semibold">2. </span>Go to your Automated dashboard
        and click &quot;Open Trade&quot; in the upper left corner.
        <br />
        <br />
        <span className="font-semibold">3. </span>Select the account you want
        the trade to execute on.
        <br />
        <br />
        <span className="font-semibold">4. </span>Choose the webhook/preset
        setting you want to use.
        <br />
        <br />
        <span className="font-semibold">5. </span>Choose the specific message
        you want, mainly for the order type and settings you have preset in the
        webhook dashboard.
        <br />
        <br />
        <span className="font-semibold">6. </span>Click &quot;Send&quot;.
      </p>

      <p className="mt-3 text-text-p text-sm">
        Automated trader will then calculate the lot size, risk, and move stops
        and profits into place based on the settings you selected. This is an
        efficient way to manage your trades and prevent huge losses, especially
        for prop firms and managed accounts.
      </p>
    </Index>
  );
}

export default Manual;
