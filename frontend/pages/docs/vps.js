import { useState, useEffect, Fragment, useRef } from "react";

import DocsLayout from "../../components/layout/DocsLayout";

import { H1, H5, H4 } from "../../components/H";

function Vps() {
  return (
    <Fragment>
      <DocsLayout title="VPS" docPage="vps"></DocsLayout>

      {/* <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={10} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              <H4 className="font-bold">How to add MT4 account </H4>
              <p className="mt-3 text-text-p text-sm">
                Join our partnered VPS company{" "}
                <a
                  href="https://www.forexhost.net/automatedtrader"
                  className="text-text-h underline font-semibold text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  FOREXHOST
                </a>
                <br />
                <br />
                Yes, a Virtual Private Server (VPS) is an excellent tool to use
                with Automated Trader for several reasons:
                <br />
                <br />
                <Step num={1} imgSrc="">
                  Reliability: By using a VPS, traders can ensure that their
                  Automated Trader is up and running 24/7 without any
                  interruptions due to power outages, internet connectivity
                  issues, or other technical problems.
                </Step>
                <Step num={2} imgSrc="">
                  Speed: A VPS can provide faster execution speeds, ensuring
                  that traders can take advantage of trading opportunities as
                  soon as they arise.
                </Step>
                <Step num={3} imgSrc="">
                  Security: A VPS can offer enhanced security features, such as
                  firewalls and anti-virus protection, which can help keep
                  traders&apos; data and trading strategies safe from potential
                  threats.
                </Step>
                <Step num={4} imgSrc="">
                  Flexibility: A VPS allows traders to access their Automated
                  Trader platform from anywhere with an internet connection,
                  giving them the flexibility to trade on the go or from
                  different devices.
                </Step>
                <Step num={5} imgSrc="">
                  Cost-effectiveness: Using a VPS can be more cost-effective
                  than purchasing and maintaining a dedicated physical server,
                  as it requires no hardware setup or maintenance.
                </Step>
                Overall, using a VPS with Automated Trader can provide traders
                with the reliability, speed, security, flexibility, and
                cost-effectiveness they need to trade successfully in
                today&apos;s fast-paced financial markets.
              </p>
            </Index>
          </div>
        </div> */}
    </Fragment>
  );
}

export default Vps;
