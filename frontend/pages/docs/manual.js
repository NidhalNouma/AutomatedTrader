import { useState, useEffect, Fragment, useRef } from "react";

import DocsLayout from "../../components/layout/DocsLayout";

import { H1, H5, H4 } from "../../components/H";

import { PlayVideoPopup } from "../../components/ui/Video";
import { videosUrls } from "../../utils/constant";

function Manual() {
  return (
    <Fragment>
      <DocsLayout title="Presets" docPage="manual">
        {/* <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={7} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              <div className="flex items-center mt-0">
                <H4 className="font-bold">Manual Automation </H4>
                <PlayVideoPopup src={videosUrls.manualTrade} pulse={true} />
              </div>

              <p className="mt-3 text-text-p text-sm">
                If you want to open a live trade using Automated, a platform
                that helps manage your trade size and risk, here&apos;s a
                step-by-step guide to help you:
                <br />
                <br />
                Requirements: Premium or lifetime user account
              </p>

              <p className="mt-3 text-text-p text-sm">
                Steps:
                <br />
                <br />
                <Step num={1} imgSrc="">
                  Set up your accounts and webhooks with your desired trading
                  pairs and preset Automated trader settings/messages.
                </Step>
                <Step num={2} imgSrc="">
                  Go to your Automated dashboard and click &quot;Open
                  Trade&quot; in the upper left corner.
                </Step>
                <Step num={3} imgSrc="">
                  Select the account you want the trade to execute on.
                </Step>
                <Step num={4} imgSrc="">
                  Choose the webhook/preset setting you want to use.
                </Step>
                <Step num={5} imgSrc="">
                  Choose the specific message you want, mainly for the order
                  type and settings you have preset in the webhook dashboard.
                </Step>
                <Step num={6} imgSrc="">
                  Click &quot;Send&quot;.
                </Step>
              </p>

              <p className="mt-3 text-text-p text-sm">
                Automated trader will then calculate the lot size, risk, and
                move stops and profits into place based on the settings you
                selected. This is an efficient way to manage your trades and
                prevent huge losses, especially for prop firms and managed
                accounts.
              </p>
            </Index>
          </div>
        </div> */}
      </DocsLayout>
    </Fragment>
  );
}

export default Manual;
