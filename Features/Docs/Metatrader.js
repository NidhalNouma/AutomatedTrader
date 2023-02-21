import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Metatrader() {
  return (
    <Index>
      <H4 className="font-bold">How to add MT4 account </H4>

      <p className="mt-3 text-text-p text-sm">
        {/* Here&apos;s a step-by-step guide on how to add an Automated Trader
        webhook in TradingView:
        <br />
        <br /> */}
        <span className="font-semibold">1. </span>Navigate to the Apps tab in
        your Automated Trader dashboard and click on MT4 to add your account.
        <br />
        <br />
        <span className="font-semibold">2. </span>If you want to use MT4 on a
        VPS for around-the-clock trading, click the provided link and open the
        pre-downloaded MT4 in forexhost.net VPS. If not using a VPS, open your
        MT4 and log into your broker account.
        <br />
        <br />
        <span className="font-semibold">3. </span>Navigate to the Tools menu,
        click Options, and select &quot;Allow Automated Trading&quot;.
        <br />
        <br />
        <span className="font-semibold">4. </span>Turn on Autotrading by
        clicking &quot;Auto trading&quot;.
        <br />
        <br />
        <span className="font-semibold">5. </span>Download the EA from the
        Automated Traders dashboard and copy it.
        <br />
        <br />
        <span className="font-semibold">6. </span>Open the MQL4 folder in
        MT4&apos;s data folder and paste the EA in the Experts folder.
        <br />
        <br />
        <span className="font-semibold">7. </span>Refresh the Expert Advisers
        tab in the navigator and drag the EA to any chart.
        <br />
        <br />
        <span className="font-semibold">8. </span>Allow Live Trading and DLL
        imports in the EA pop-up.
        <br />
        <br />
        <span className="font-semibold">9. </span>Copy the ID from the Automated
        Traders dashboard and paste it into the user ID value in the MT4 input
        tab.
        <br />
        <br />
        <span className="font-semibold">10. </span>If the Automated Trader text
        in the right corner displays a smiley face, you&apos;re finished. If
        not, rewatch the video.
        <br />
        <br />
        <span className="font-semibold">11. </span>Customize your account name
        and colors or add webhooks in the Automated Traders dashboard. Your
        account data will be displayed on the MT4 app dashboard.
        <br />
        <br />
        By following these steps, you can easily set up your MT4 account in
        Automated Trader and begin using its advanced features to optimize your
        trading strategy.
      </p>
    </Index>
  );
}

export default Metatrader;
