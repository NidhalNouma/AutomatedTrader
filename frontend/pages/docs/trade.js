import { useState, useEffect, Fragment, useRef } from "react";

import DocsLayout from "../../components/layout/DocsLayout";

import { H1, H5, H4 } from "../../components/H";

import { PlayVideoPopup } from "../../components/ui/Video";
import { videosUrls } from "../../utils/constant";

function Trade() {
  return (
    <Fragment>
      <DocsLayout title="Trades" docPage="trade"></DocsLayout>

      {/* <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={6} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              {" "}
              <div className="flex items-center mt-0">
                <H4 className="font-bold">Trade dashboard </H4>
                <PlayVideoPopup src={videosUrls.alertsPage} pulse={true} />
              </div>
              <p className="mt-3 text-text-p text-sm">
                Here&apos;s a simplified guide for understanding the Trade
                section in Automated Trader:
                <br />
                <br />
                <Step num={1} imgSrc="">
                  The Trade section displays all your trades from all the
                  accounts you have added in Automated Trader.
                </Step>
                <Step num={2} imgSrc="">
                  You can view the webhook that fired to give you the trade.
                </Step>
                <Step num={3} imgSrc="">
                  The section shows the symbol type, order type, lot size, pip
                  amount, and the amount of profit or loss. Additionally, it
                  shows the open/close price and the closed time.
                </Step>
                <Step num={4} imgSrc="">
                  By clicking on a trade, you can access more details, such as
                  which account it was taken on and the entry and exit price.
                </Step>
              </p>
              <p className="mt-3 text-text-p text-sm">
                The Trade section is an essential tool for tracking your trades
                and analyzing your trading strategy&apos;s performance. By
                accessing the information provided in this section, you can make
                informed decisions on how to improve your trading strategy and
                optimize your profits.
              </p>
            </Index>
          </div>
        </div> */}
    </Fragment>
  );
}

export default Trade;
