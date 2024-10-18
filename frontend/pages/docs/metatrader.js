import { useState, useEffect, Fragment, useRef } from "react";

import DocsLayout from "../../components/layout/DocsLayout";

import { H1, H5, H4 } from "../../components/H";

import { PlayVideoPopup } from "../../components/ui/Video";
import { videosUrls } from "../../utils/constant";

function Metatrader() {
  const sec2 = useRef(null);

  useEffect(() => {
    // if (ty === 1.2) {
    //   sec2.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    // }
  }, []);

  return (
    <Fragment>
      <DocsLayout title="Metatrader" docPage="metatrader"></DocsLayout>

      {/* <MainWithHeader mainClassName="!overflow-x-clip">
        <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={2} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              {" "}
              <div className="flex items-center mt-0">
                <H4 className="font-bold">How to add MT4 account </H4>
                <PlayVideoPopup
                  src={videosUrls.metatraderAddAccount}
                  pulse={true}
                />
              </div>
              <p className="mt-3 text-text-p text-sm">
                Setup is easy and take just minutes, Automated Trader is
                compatible with any broker, providing traders with the
                flexibility to choose their preferred brokerage platform.
                However, for traders who want to use a trusted partner, we
                recommend{" "}
                <a
                  href="https://login.hankotrade.com/register?franchiseLead=Mzc1OQ=="
                  className="text-text-h underline font-semibold text-sm"
                  target="_blank"
                  rel="noreferrer"
                >
                  Henko Trade
                </a>
                . By using the following link to sign up for a Hanko Trade
                account, traders can enter monthly giveaways and gain access to
                additional benefits that can help enhance their trading
                experience.
                <br />
                <br />
                How to add Automated Trader EA to MT4
                <br />
                <br />
                <Step
                  num={1}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover.jpg?alt=media&token=1ed564b4-3ace-45f9-9043-8ed9b520eeda"
                >
                  Navigate to the Apps tab in your Automated Trader dashboard
                  and click on MT4 to add your account.
                </Step>
                <Step
                  num={2}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(2).jpg?alt=media&token=1bbd45f0-00d8-4356-abec-0416b457edb9"
                >
                  If you want to use MT4 on a VPS for around-the-clock trading,
                  click the provided link and open the pre-downloaded MT4 in{" "}
                  <a
                    href="https://forexhost.net/automatedtrader/"
                    className="text-text-h underline"
                    target="_blank"
                    rel="noreferrer"
                  >
                    forexhost.net
                  </a>{" "}
                  VPS. If not using a VPS, open your MT4 and log into your
                  broker account.
                </Step>
                <Step
                  num={3}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(3).jpg?alt=media&token=4637a238-3be7-47e4-a02b-e85b0ce7a03a"
                >
                  Download the EA from the Automated Traders dashboard and copy
                  it.
                </Step>
                <Step
                  num={4}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(5).jpg?alt=media&token=3b0f45c1-9d22-40f8-a997-c2064f0429de"
                >
                  Open the MQL4 folder in MT4&apos;s data folder and paste the
                  EA in the Experts folder.
                </Step>
                <Step
                  num={5}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2F11.jpg?alt=media&token=872109d0-5d37-4079-ba84-81d200afd6c5"
                >
                  Refresh the Expert Advisers tab in the navigator and drag the
                  EA to any chart.
                </Step>
                <Step
                  num={6}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2F14.jpg?alt=media&token=ae2c8783-a0c0-4d15-b609-1ae76888d3a3"
                >
                  Allow Live Trading and DLL imports in the EA pop-up.
                </Step>
                <Step
                  num={7}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(11).jpg?alt=media&token=6aaff65a-7399-48d6-90ad-5ce445b21d2f"
                >
                  Copy the ID from the Automated Traders dashboard and paste it
                  into the user ID value in the MT4 input tab.
                </Step>
                <Step
                  num={8}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(12).jpg?alt=media&token=505399ab-74ea-4113-8cfd-ef80a824cf1a"
                >
                  In Meta trader navigate to the Tools menu, click Options tab.
                </Step>
                <Step
                  num={9}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(13).jpg?alt=media&token=6b86c33c-5c54-4632-8413-d28ca905ce3e"
                >
                  Next choose Experts and make sure allow trading and allow DLL
                  imports is selected and turned on Select ok.
                </Step>
                <Step
                  num={10}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(14).jpg?alt=media&token=979f9b87-5714-4802-a4ae-118348b44d82"
                >
                  Then turn on Autotrading by clicking &quot;Auto trading&quot;.
                  above your chart Green means it&apos;s turned on.
                </Step>
                <Step
                  num={11}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(15).jpg?alt=media&token=c5abcbe2-577b-472b-a11f-ef4c2ffabc6d"
                >
                  If the Automated Trader text in the right corner displays a
                  smiley face, you&apos;re finished. If not, rewatch the video.
                </Step>
                <Step
                  num={12}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FCover%20(16).jpg?alt=media&token=cb6f287c-0d78-4b05-b5ba-dd6015f4c68a"
                >
                  Customize your account name and colors or add webhooks in the
                  Automated Traders dashboard. Your account data will be
                  displayed on the MT4 app dashboard.
                </Step>
                By following these steps, you can easily set up your MT4 account
                in Automated Trader and begin using its advanced features to
                optimize your trading strategy.
              </p>
              <div className="scroll-mt-20" ref={sec2}>
                <AddingWebhookToMT4 />
              </div>
            </Index>
          </div>
        </div>
      </MainWithHeader> */}
    </Fragment>
  );
}

export default Metatrader;

// function AddingWebhookToMT4() {
//   return (
//     <Fragment>
//       <div className="flex items-center mt-6 mb-3">
//         <H4 className="font-bold ">Adding webhook to MT4 </H4>
//         <PlayVideoPopup src={videosUrls.metatraderAddWebhooks} pulse={true} />
//       </div>

//       <p className="mt-3 text-text-p text-sm">
//         If you have already set up webhooks on your Automated Trader and
//         TradingView platforms, adding them to your MT4 account is a
//         straightforward process. Here&apos;s a step-by-step guide to help you
//         get started:
//         <br />
//         <br />
//         <Step
//           num={1}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FwebhookInMt%2FCover.jpg?alt=media&token=f605d4ff-515f-4101-aca5-d640946260c7"
//         >
//           Access the MT4 apps menu and select the account you want to attach the
//           webhooks to. This can be done by clicking on the three dots beside the
//           account name.
//         </Step>
//         <Step
//           num={2}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FwebhookInMt%2FCover%20(2).jpg?alt=media&token=0cc7d047-13b9-490b-9804-c9fda666fb11"
//         >
//           Next, select &quot;Webhooks&quot; from the available options. This
//           will bring up a list of available webhooks that you can use to execute
//           trades on your MT4 account.
//         </Step>
//         <Step
//           num={3}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FMetatrader%2FwebhookInMt%2FCover%20(3).jpg?alt=media&token=ac04e6a3-3069-482e-a54a-d5d5775ff5ae"
//         >
//           Toggle on the webhooks that you want to use on your trading account.
//           Make sure to select only the webhooks that you trust and that are
//           compatible with your trading strategy.
//         </Step>
//         <Step num={4} imgSrc="">
//           Once you have selected the webhooks you want to use, you&apos;re all
//           set! You will now start receiving trades on your MT4 account through
//           the webhooks you have enabled.
//         </Step>
//         By following these simple steps, you can easily integrate your webhooks
//         from Automated Trader and TradingView to your MT4 account, allowing you
//         to receive trades and stay on top of your trading strategy with ease.
//       </p>
//     </Fragment>
//   );
// }
