import { Fragment } from "react";
import DocsLayout from "../../components/layout/DocsLayout";
import { Par, SubTitle3 } from "../../components/ui/Text";

function Webhooks() {
  return (
    <Fragment>
      <DocsLayout
        title="Documentation"
        docPage="webhooks"
        sideNavLinks={
          [
            // { name: "About us", id: "about-us" },
            // { name: "Introduction", id: "Introduction" },
            // { name: "Trading tools", id: "trading-tools" },
            // { name: "Data Analysis", id: "data-analysis" },
            // { name: "Security Measures", id: "security-measures" },
            // { name: "Benefits", id: "Benefits" },
            // { name: "Conclusion", id: "Conclusion" },
          ]
        }
      ></DocsLayout>
      {/* <MainWithHeader mainClassName="!overflow-x-clip">
        <H1>Documentation</H1>
        <div className="mt-6 flex">
          <div className="sticky top-20 sm:top-[5.5rem] h-[50vh]">
            <Side ty={1} />
          </div>
          <div className="flex-1 px-6">
            <Index>
              <div className="flex items-center mt-0">
                <H4 className="font-bold">Webhook in AutomatedTrader</H4>
                <PlayVideoPopup src={videosUrls.webhooksAT} pulse={true} />
              </div>

              <p className="mt-3 text-text-p text-sm">
                Creating a webhook can help you automate your trading strategy.
                Here&apos;s a step-by-step guide on how to add a webhook to your
                dashboard:
                <br />
                <br />
                <Step
                  num={1}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2FCover.jpg?alt=media&token=12a08014-e92d-4479-8bdc-25cbe8e09e29"
                >
                  Log in to your dashboard and click on &quot;Webhooks&quot; on
                  the left side of the screen.
                </Step>
                <Step
                  num={2}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2FCover%20(2).jpg?alt=media&token=8c80ca77-3162-4320-be87-c2ae38c06083"
                >
                  Click &quot;New webhook&quot; in the upper right corner of the
                  screen.
                </Step>
                <Step
                  num={3}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F4.jpg?alt=media&token=0c9ef9ff-cc42-4b38-9283-0695376e9581"
                >
                  Name your webhook. You can choose any name you want, but make
                  sure you remember it.
                </Step>
                <Step
                  num={4}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F5.jpg?alt=media&token=4dbc4863-fbd2-422b-8f59-97224b215a0c"
                >
                  Choose your asset pair name. Each broker may name their assets
                  differently, so check your MT4 account to see how it&apos;s
                  spelled exactly.
                </Step>
                <Step
                  num={5}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F6.jpg?alt=media&token=1033f432-2d12-4cd9-b79e-9095fa08af30"
                >
                  Choose your order type for your alerts. Remember that you have
                  to set up multiple messages if you want to take both buys and
                  sells.
                </Step>
                <Step
                  num={6}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F7.jpg?alt=media&token=a6272647-5ca5-42af-a16d-95e51966f54d"
                >
                  Choose your entry position size. You can choose either risk %
                  or fixed lot size. If you choose percentage-based risk, your
                  alert will risk only the percentage you select on your
                  account. For example, if you choose 3% on a $1000 account, you
                  will only lose $30 if the stop loss is hit. If you choose a
                  fixed lot size, that means you are pre-setting up the lot size
                  that will execute when the alert is fired. For example, 0.50
                  lot.
                </Step>
                <Step
                  num={7}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F8.jpg?alt=media&token=c2594ca1-20b4-4441-b8ea-c10e66286454"
                >
                  Choose your stop loss and take profit value. This is
                  broker/asset-specific, so check how your broker calculates
                  pips for each asset. You can do so by using a ruler on your
                  MT4 account for each asset you are creating alerts for.
                </Step>
                Toggle features on or off.
                <br />
                <br />
                <Step
                  num={8}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F9.jpg?alt=media&token=e94f55dc-1cf3-4727-98d5-4d0578943eb6"
                >
                  The first feature is trailing stop in pips. Trailing stop
                  start is when you want the trailing stop to activate. For
                  example, when the price moves 50 pips into profit, activate
                  trailing stop. Trailing stop distance is how many pips you
                  want the trailing stop to be from price.
                </Step>
                <Step
                  num={9}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F10.jpg?alt=media&token=7b42f597-220c-4e0f-8d94-465c769265ef"
                >
                  Trailing step is when...
                </Step>
                <Step
                  num={10}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F11.jpg?alt=media&token=359563f7-e871-42e6-a910-45895892b12f"
                >
                  Toggle break even/partial take profit. Partial close target is
                  calculated in pips, and you can choose the % you would like to
                  close once the price reaches the target. For example, close
                  50% of my trade when the price reaches 50 pips in profit.
                  Activate breakeven will move your stop to break even when you
                  reach a certain amount of pips SL in profit is also calculated
                  in pips and will move your Stop loss x amount of pips you
                  choose, similar to trailing stop but without the stop trailing
                  price.
                </Step>
                <Step
                  num={11}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F12.jpg?alt=media&token=b855be5a-f8f3-4244-8534-07931150b2fb"
                >
                  Toggle time filter. You can choose the time of day you want
                  the bots/webhooks to start or finish. Time is based upon NY
                  Eastern time.
                </Step>
                <Step
                  num={12}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F13.jpg?alt=media&token=6e1708c9-299c-4e8a-9dad-76d11c455aed"
                >
                  Toggle hedging. It allows users to set the pending duration
                  they want an order to be placed. For example, if you choose
                  sell limit as your order type, then if the price doesn&apos;t
                  reach your order in X amount of time, it will automatically
                  close your order.
                </Step>
                <Step
                  num={13}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F14.jpg?alt=media&token=fb86a75f-9762-49dc-8c00-d68296ba48d3"
                >
                  Toggle max spread/slippage. This deals with your broker. For
                  example, if the price of your pair has a higher/max spread of
                  10, it will not take the trade if it&apos;s any higher.
                </Step>
                <Step
                  num={14}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2F15.jpg?alt=media&token=3468cb5e-174f-47ce-a9e8-a53d8b64eae4"
                >
                  Send a test alert to your MT4 account to test the settings. We
                  recommend this only on demo accounts.
                </Step>
                <Step num={15} imgSrc="">
                  Click &quot;Save&quot; and now you have created a webhook.
                </Step>
              </p>

              <p className="mt-6 text-text-p text-sm">
                If you want to set up multiple order types, you need to repeat
                these steps above by making new messages in Automated Trader:
                <br />
                <br />
                <Step
                  num={1}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Fadding%20message%2FCover.jpg?alt=media&token=27058ef5-5649-4669-a53f-59830f616944"
                >
                  Go back to Automated Trader and select Webhook.
                </Step>
                <Step
                  num={2}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Fadding%20message%2F2.jpg?alt=media&token=af35aae3-cadd-4bb5-b671-8fff5393cf7b"
                >
                  Click the three dots next to the list of messages and select
                  New Message.
                </Step>
                <Step
                  num={3}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Fadding%20message%2F3.jpg?alt=media&token=083fb97c-9c4c-4909-90a4-2a4f218f7b45"
                >
                  Add the pair name and select another order type (change
                  settings if you would like).
                </Step>
                <Step
                  num={4}
                  imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Fadding%20message%2F4.jpg?alt=media&token=914971be-71ea-40ce-b1bf-a8f4329b09e7"
                >
                  Click Save.
                </Step>
              </p>

              <div className="scroll-mt-24" ref={sec2}>
                <WebhookTradingView />
              </div>
            </Index>
          </div>
        </div>
      </MainWithHeader> */}
    </Fragment>
  );
}

export default Webhooks;

// function WebhookTradingView() {
//   return (
//     <Fragment>
//       <div className="flex items-center mt-6">
//         <H4 className="font-bold ">Webhook in TradingView</H4>
//         <PlayVideoPopup src={videosUrls.webhooksTradingView} pulse={true} />
//       </div>

//       <p className="mt-3 text-text-p text-sm">
//         Here&apos;s a step-by-step guide on how to add an Automated Trader
//         webhook in TradingView:
//         <br />
//         <br />
//         <Step
//           num={1}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2FCover.jpg?alt=media&token=3423db6b-7baa-412b-927d-905594a658d8"
//         >
//           Create your webhook in Automated Trader.
//         </Step>
//         <Step
//           num={2}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F2.jpg?alt=media&token=82624c71-1967-4609-b084-0767fc3ead08"
//         >
//           Find an indicator or alert in TradingView to attach your Automated
//           Trader settings.
//         </Step>
//         <Step
//           num={3}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F3.jpg?alt=media&token=623f9110-9a2c-49ba-8c56-0956c47bb265"
//         >
//           Visit the Notifications tab in TradingView and go to Automated Trader.
//           Copy the webhook URL.
//         </Step>
//         <Step num={4} imgSrc="">
//           To receive webhook alerts for an automated trader, a pro membership is
//           required to receive real-time notifications through webhooks.
//         </Step>
//         <Step
//           num={5}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F7.jpg?alt=media&token=413991c8-e6bd-4f0d-9cf6-65c07d790225"
//         >
//           Go back to TradingView and paste your webhook URL in the field.
//         </Step>
//         <Step
//           num={6}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F8.jpg?alt=media&token=d378a159-3ea8-4494-9a7d-5a89104c218c"
//         >
//           In the TradingView Alert tab, go to Settings.
//         </Step>
//         <Step num={7} imgSrc="">
//           Select your conditions and name the alert anything you want,
//           preferably adding the order type you selected in Automated Trader
//           (buy, buy limit, sell, sell limit, buy stop, sell stop), as well as
//           the pair type and time frame of the chart.
//         </Step>
//         <Step
//           num={8}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F10.jpg?alt=media&token=49829c95-7fcc-4d52-8f7a-3b6b2d715192"
//         >
//           Go back to Automated Trader and copy the webhook message.
//         </Step>
//         <Step
//           num={9}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F11.jpg?alt=media&token=5bb48c09-f9f9-4161-a049-58d952d0fbc7"
//         >
//           Go back to TradingView and paste the message in the Message field.
//         </Step>
//         <Step
//           num={10}
//           imgSrc="https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/Docs%2FWebhhoks%2Ftradingview%2F12.jpg?alt=media&token=fcd278d7-995e-43b9-950a-fc89c1925672"
//         >
//           Click Create.
//         </Step>
//       </p>
//     </Fragment>
//   );
// }
