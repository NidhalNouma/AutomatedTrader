import { useState, useEffect, Fragment, useRef } from "react";
import DocsLayout from "../../components/layout/DocsLayout";

import { H1, H5, H4 } from "../../components/H";

import { PlayVideoPopup } from "../../components/ui/Video";
import { videosUrls } from "../../utils/constant";

function Telegram() {
  return (
    <Fragment>
      <DocsLayout title="Telegram" docPage="telegram"></DocsLayout>

      {/* <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={5} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              <div className="flex items-center mt-0">
                <H4 className="font-bold">Adding Telegram </H4>
                <PlayVideoPopup src={videosUrls.telegramPage} pulse={true} />
              </div>

              <p className="mt-3 text-text-p text-sm">
                Telegram alerts are instant and will notify you as soon as a
                trade alert is triggered.
              </p>

              <p className="mt-3 text-text-p text-sm">
                Here&apos;s how to add your Automated Trader account to
                Telegram:
                <br />
                <br />
                <Step num={1} imgSrc="">
                  Go to the Telegram dashboard in the apps section.
                </Step>
                <Step num={2} imgSrc="">
                  Click on the Telegram link to open the Telegram app.
                </Step>
                <Step num={3} imgSrc="">
                  Once you&apos;re in Telegram, click &quot;send message&quot;.
                </Step>
                <Step num={4} imgSrc="">
                  Once you receive the message in Telegram, click
                  &quot;start&quot;.
                </Step>
                <Step num={5} imgSrc="">
                  Copy your chat ID from the message.
                </Step>
                <Step num={6} imgSrc="">
                  Go back to Automated Trader and paste your chat ID into the ID
                  field.
                </Step>
                <Step num={7} imgSrc="">
                  Click &quot;next&quot;.
                </Step>
              </p>

              <p className="mt-3 text-text-p text-sm">
                You&apos;re all set and will start receiving alerts in your
                Telegram chat. That&aposs; it! With these simple steps, you can
                easily add your Automated Trader account to Telegram and receive
                your trade alerts on the go.
              </p>
            </Index>
          </div>
        </div> */}
    </Fragment>
  );
}

export default Telegram;
