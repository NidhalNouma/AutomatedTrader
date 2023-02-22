import React from "react";
import Index, { Step } from "./index";

import { H4, H5 } from "../../Components/H";

function Metatrader() {
  return (
    <Index>
      <H4 className="font-bold">How to add MT4 account </H4>

      <p className="mt-3 text-text-p text-sm">
        Setup is easy and take just minutes, Automated Trader is compatible with
        any broker, providing traders with the flexibility to choose their
        preferred brokerage platform. However, for traders who want to use a
        trusted partner, we recommend Hanko Trade. By using the following link
        to sign up for a Hanko Trade account, traders can enter monthly
        giveaways and gain access to additional benefits that can help enhance
        their trading experience.
        <br />
        <br />
        How to add Automated Trader EA to mt4:
        <br />
        <br />
        <Step
          num={1}
          imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover.jpg?alt=media&token=1ed564b4-3ace-45f9-9043-8ed9b520eeda"
        >
          Navigate to the Apps tab in your Automated Trader dashboard and click
          on MT4 to add your account.
        </Step>
        <Step
          num={2}
          imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(2).jpg?alt=media&token=1bbd45f0-00d8-4356-abec-0416b457edb9"
        >
          If you want to use MT4 on a VPS for around-the-clock trading, click
          the provided link and open the pre-downloaded MT4 in{" "}
          <a
            href="https://forexhost.net/automatedtrader/"
            className="text-text-h underline"
            target="_blank"
            rel="noreferrer"
          >
            forexhost.net
          </a>{" "}
          VPS. If not using a VPS, open your MT4 and log into your broker
          account.
        </Step>
        <Step
          num={3}
          imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(3).jpg?alt=media&token=4637a238-3be7-47e4-a02b-e85b0ce7a03a"
        >
          Download the EA from the Automated Traders dashboard and copy it.
        </Step>
        <Step
          num={4}
          imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(4).jpg?alt=media&token=ebb0ee23-df6a-42c1-ac8f-ebe93bd74fa7"
        >
          Open the MQL4 folder in MT4&apos;s data folder and paste the EA in the
          Experts folder.
        </Step>
        <Step
          num={5}
          imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(5).jpg?alt=media&token=3b0f45c1-9d22-40f8-a997-c2064f0429de"
        >
          Refresh the Expert Advisers tab in the navigator and drag the EA to
          any chart.
        </Step>
        <Step
          num={6}
          imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2F14.jpg?alt=media&token=ae2c8783-a0c0-4d15-b609-1ae76888d3a3"
        >
          Allow Live Trading and DLL imports in the EA pop-up.
        </Step>
        <Step num={7} imgSrc="">
          Copy the ID from the Automated Traders dashboard and paste it into the
          user ID value in the MT4 input tab.
        </Step>
        <Step num={8} imgSrc="">
          In Meta trader navigate to the Tools menu, click Options tab.
        </Step>
        <Step num={9} imgSrc="">
          Next choose Experts and make sure allow trading and allow DLL imports
          is selected and turned on Select ok.
        </Step>
        <Step num={10} imgSrc="">
          Then turn on Autotrading by clicking &quot;Auto trading&quot;. above
          your chart Green means it&apos;s turned on.
        </Step>
        <Step num={11} imgSrc="">
          If the Automated Trader text in the right corner displays a smiley
          face, you&apos;re finished. If not, rewatch the video.
        </Step>
        <Step num={12} imgSrc="">
          Customize your account name and colors or add webhooks in the
          Automated Traders dashboard. Your account data will be displayed on
          the MT4 app dashboard.
        </Step>
        <br />
        <br />
        By following these steps, you can easily set up your MT4 account in
        Automated Trader and begin using its advanced features to optimize your
        trading strategy.
      </p>
      <AddingWebhookToMT4 />
    </Index>
  );
}

export default Metatrader;

function AddingWebhookToMT4() {
  return (
    <React.Fragment>
      <H4 className="font-bold pt-6">Adding webhook to MT4 </H4>

      <p className="mt-3 text-text-p text-sm">
        If you have already set up webhooks on your Automated Trader and
        TradingView platforms, adding them to your MT4 account is a
        straightforward process. Here&apos;s a step-by-step guide to help you
        get started:
        <br />
        <br />
        <Step num={1} imgSrc="">
          Access the MT4 apps menu and select the account you want to attach the
          webhooks to. This can be done by clicking on the three dots beside the
          account name.
        </Step>
        <Step num={2} imgSrc="">
          Next, select &quot;Webhooks&quot; from the available options. This
          will bring up a list of available webhooks that you can use to execute
          trades on your MT4 account.
        </Step>
        <Step num={3} imgSrc="">
          Toggle on the webhooks that you want to use on your trading account.
          Make sure to select only the webhooks that you trust and that are
          compatible with your trading strategy.
        </Step>
        <Step num={4} imgSrc="">
          Once you have selected the webhooks you want to use, you&apos;re all
          set! You will now start receiving trades on your MT4 account through
          the webhooks you have enabled.
        </Step>
        <br />
        <br />
        By following these simple steps, you can easily integrate your webhooks
        from Automated Trader and TradingView to your MT4 account, allowing you
        to receive trades and stay on top of your trading strategy with ease.
      </p>
    </React.Fragment>
  );
}
