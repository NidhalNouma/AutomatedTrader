import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Telegram() {
  return (
    <Index>
      <H4 className="font-bold">Adding Telegram </H4>

      <p className="mt-3 text-text-p text-sm">
        Telegram alerts are instant and will notify you as soon as a trade alert
        is triggered.
      </p>

      <p className="mt-3 text-text-p text-sm">
        Here&apos;s how to add your Automated Trader account to Telegram:
        <br />
        <br />
        <span className="font-semibold">1. </span>Go to the Telegram dashboard
        in the apps section.
        <br />
        <br />
        <span className="font-semibold">2. </span>Click on the Telegram link to
        open the Telegram app.
        <br />
        <br />
        <span className="font-semibold">3. </span>Once you&aposre in Telegram,
        click &quot;send message&quot;.
        <br />
        <br />
        <span className="font-semibold">4. </span>Once you receive the message
        in Telegram, click &quot;start&quot;.
        <br />
        <br />
        <span className="font-semibold">5. </span>Copy your chat ID from the
        message.
        <br />
        <br />
        <span className="font-semibold">6. </span>Go back to Automated Trader
        and paste your chat ID into the ID field.
        <br />
        <br />
        <span className="font-semibold">7. </span>Click &quot;next&quot;.
      </p>

      <p className="mt-3 text-text-p text-sm">
        You&apos;re all set and will start receiving alerts in your Telegram
        chat. That&aposs it! With these simple steps, you can easily add your
        Automated Trader account to Telegram and receive your trade alerts on
        the go.
      </p>
    </Index>
  );
}

export default Telegram;
