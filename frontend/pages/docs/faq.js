import { useState, useEffect, Fragment, useRef } from "react";

import DocsLayout from "../../components/layout/DocsLayout";

import { H1, H5, H4 } from "../../components/H";

function Faq() {
  return (
    <Fragment>
      <DocsLayout title="F&Q" docPage="fandq">
        {/* <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={4} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              <H4 className="font-bold">FAQ</H4>

              <H5 className="font-bold mt-6">What is automated trader?</H5>
              <p className="mt-3 text-text-p text-sm">
                Automated Trader is a cutting-edge platform that uses advanced
                algorithms and data intelligence to identify and execute trades
                on behalf of its users. With Automated Trader, you can sit back
                and let the technology do the work for you, while still
                maintaining complete control over your investment portfolio. Our
                intuitive interface and easy-to-use tools make it simple for
                even the most inexperienced investors to get started achieving
                your financial goals.
              </p>

              <H5 className="font-bold mt-6">
                How does Automated Trader work?
              </H5>
              <p className="mt-3 text-text-p text-sm">
                When a trade is identified using tradingview alert systems , the
                platform automatically executes the trade on behalf of the user
                with all your preset settings and risk management automation.
              </p>

              <H5 className="font-bold mt-6">Does it work with any broker? </H5>
              <p className="mt-3 text-text-p text-sm">
                Yes, any broker on the mt4 and mt5 platform with new platforms
                being built soon! Checkout our sponsored broker for fast
                execution ( Hanko Trade{" "}
                <a
                  href="https://login.hankotrade.com/register?franchiseLead=Mzc1OQ== )"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://login.hankotrade.com/register?franchiseLead=Mzc1OQ== )
                </a>
              </p>

              <H5 className="font-bold mt-6">Does it work with propfirms? </H5>
              <p className="mt-3 text-text-p text-sm">
                Yes, you can link Automated Trader to any mt4 / mt5 including
                propfirm. In fact we created Automated trader with propfirm
                mind. No more big losses , Our platform incorporates advanced
                risk management strategies, which help to minimize losses and
                protect traders funds.
              </p>

              <H5 className="font-bold mt-6">Do we need a VPS? </H5>
              <p className="mt-3 text-text-p text-sm">
                No, Automated trader does not need a VPS to function but if you
                would like 24/7 around the clock trades users must have
                computers running. VPS is recommended ( visit{" "}
                <a
                  href="https://forexhost.net/automatedtrader"
                  target="_blank"
                  rel="noreferrer"
                >
                  https://forexhost.net/automatedtrader
                </a>{" "}
                )
              </p>

              <H5 className="font-bold mt-6">
                Does it work with any indicator?{" "}
              </H5>
              <p className="mt-3 text-text-p text-sm">
                Yes, Automated trader works with every indicator, alert or
                strategy on tradingview.
              </p>

              <H5 className="font-bold mt-6">
                Do you need a paid Tradingview?{" "}
              </H5>
              <p className="mt-3 text-text-p text-sm">
                No, you can use the FREE version but are limited to only 3
                alerts
              </p>

              <H5 className="font-bold mt-6">
                Is Automated Trader suitable for beginners?
              </H5>
              <p className="mt-3 text-text-p text-sm">
                Automated Trader is designed to be user-friendly and accessible
                to investors of all experience levels. The platform includes
                easy-to-use tools and an intuitive interface, as well as a team
                of experienced professionals to provide support and guidance
                whenever needed.
              </p>

              <H5 className="font-bold mt-6">
                Can I control my investments with Automated Trader?
              </H5>
              <p className="mt-3 text-text-p text-sm">
                Yes, Automated Trader gives users complete control over their
                investment portfolio. Users can set their own investment goals
                and risk tolerance, and the platform will execute trades
                accordingly.
              </p>

              <H5 className="font-bold mt-6">
                Can I trade a variety of assets with Automated Trader?
              </H5>
              <p className="mt-3 text-text-p text-sm">
                Yes, Automated Trader supports a wide range of assets, including
                stocks, bonds, commodities, and more.
              </p>

              <H5 className="font-bold mt-6">
                Does Automated trader require a premium membership?
              </H5>
              <p className="mt-3 text-text-p text-sm">
                Yes, To receive webhook alerts for an automated trader, a pro
                membership is required. This membership provides access to
                advanced features and tools that allow traders to create and
                customize automated trading strategies, as well as receive
                real-time notifications through webhooks. Without a pro
                membership, traders may not have access to these features and
                may miss out on key trading opportunities.
              </p>
            </Index>
          </div>
        </div> */}
      </DocsLayout>
    </Fragment>
  );
}

export default Faq;
