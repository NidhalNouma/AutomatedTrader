import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Metatrader() {
  return (
    <Index>
      <H4 className="font-bold">How to add MT4 account </H4>

      <p className="mt-3 text-text-p text-sm">
        Add your account by navigating to the apps tab in your dashboard and
        clicking on MT4.
        <br />
        <br />
        Use MT4 on a VPS for around-the-clock trading, even when your computer
        is off. To join the suggested VPS, click the provided link and open the
        pre-downloaded MT4 in forexhost.net VPS.
        <br />
        If not using a VPS, open your MT4 and log into your broker account.
        Navigate to the Tools menu, click Options, and select &quot;Allow
        Automated Trading.&quot;
        <br />
        Turn on Autotrading by clicking &quot;Auto trading.&quot;
        <br />
        <br />
        Download the EA from the Automated Traders dashboard and copy it.
        <br />
        <br />
        Open the MQL4 folder in MT4&apos;s data folder and paste the EA in the
        Experts folder.
        <br />
        <br />
        Refresh the Expert Advisers tab in the navigator and drag the EA to any
        chart.
        <br />
        <br />
        Allow Live Trading and DLL imports in the EA pop-up.
        <br />
        <br />
        Copy the ID from the Automated Traders dashboard and paste it into the
        user ID value in the MT4 input tab.
        <br />
        <br />
        If the Automated Trader text in the right corner displays a smiley face,
        you&apos;re finished. If not, rewatch the video.
        <br />
        <br />
        Change account name and colors or add webhooks in the Automated Traders
        dashboard. Your account data will be displayed on the MT4 app dashboard.
      </p>
    </Index>
  );
}

export default Metatrader;
