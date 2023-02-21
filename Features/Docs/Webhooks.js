import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Webhooks() {
  return (
    <Index>
      <H4 className="font-bold">Setting up Webhook</H4>

      <H4 className="font-bold mt-6">Webhook in TradingView</H4>

      <p className="mt-3 text-text-p text-sm">
        Creating a webhook can help you automate your trading strategy.
        Here&apos;s a step-by-step guide on how to add a webhook to your
        dashboard:
        <br />
        <br />
        <span className="font-semibold">1. </span>Log in to your dashboard and
        click on &quot;Webhooks&quot; on the left side of the screen.
        <br />
        <br />
        <span className="font-semibold">2. </span>Click &quot;New webhook&quot;
        in the upper right corner of the screen.
        <br />
        <br />
        <span className="font-semibold">3. </span>Name your webhook. You can
        choose any name you want, but make sure you remember it.
        <br />
        <br />
        <span className="font-semibold">4. </span>Choose your asset pair name.
        Each broker may name their assets differently, so check your MT4 account
        to see how it&apos;s spelled exactly.
        <br />
        <br />
        <span className="font-semibold">5. </span>Choose your order type for
        your alerts. Remember that you have to set up multiple messages if you
        want to take both buys and sells.
        <br />
        <br />
        <span className="font-semibold">6. </span>Choose your entry position
        size. You can choose either risk % or fixed lot size. If you choose
        percentage-based risk, your alert will risk only the percentage you
        select on your account. For example, if you choose 3% on a $1000
        account, you will only lose $30 if the stop loss is hit. If you choose a
        fixed lot size, that means you are pre-setting up the lot size that will
        execute when the alert is fired. For example, 0.50 lot.
        <br />
        <br />
        <span className="font-semibold">7. </span>Choose your stop loss and take
        profit value. This is broker/asset-specific, so check how your broker
        calculates pips for each asset. You can do so by using a ruler on your
        MT4 account for each asset you are creating alerts for.
        <br />
        <br />
        Toggle features on or off.
        <br />
        <br />
        <span className="font-semibold">8. </span>The first feature is trailing
        stop in pips. Trailing stop start is when you want the trailing stop to
        activate. For example, when the price moves 50 pips into profit,
        activate trailing stop. Trailing stop distance is how many pips you want
        the trailing stop to be from price.
        <br />
        <br />
        <span className="font-semibold">10. </span>Toggle break even/partial
        take profit. Partial close target is calculated in pips, and you can
        choose the % you would like to close once the price reaches the target.
        For example, close 50% of my trade when the price reaches 50 pips in
        profit. Activate breakeven will move your stop to break even when you
        reach a certain amount of pips SL in profit is also calculated in pips
        and will move your Stop loss x amount of pips you choose, similar to
        trailing stop but without the stop trailing price.
        <br />
        <br />
        <span className="font-semibold">11. </span>Toggle time filter. You can
        choose the time of day you want the bots/webhooks to start or finish.
        Time is based upon NY Eastern time.
        <br />
        <br />
        <span className="font-semibold">12. </span>Toggle hedging. It allows
        users to set the pending duration they want an order to be placed. For
        example, if you choose sell limit as your order type, then if the price
        doesn&apos;t reach your order in X amount of time, it will automatically
        close your order.
        <br />
        <br />
        <span className="font-semibold">13. </span>Toggle max spread/slippage.
        This deals with your broker. For example, if the price of your pair has
        a higher/max spread of 10, it will not take the trade if it&apos;s any
        higher.
        <br />
        <br />
        <span className="font-semibold">14. </span>Send a test alert to your MT4
        account to test the settings. We recommend this only on demo accounts.
        <br />
        <br />
        <span className="font-semibold">15. </span>Click &quot;Save&quot; and
        now you have created a webhook.
        <br />
        <br />
      </p>

      <p className="mt-6 text-text-p text-sm">
        If you want to set up multiple order types, you need to repeat these
        steps above by making new messages in Automated Trader:
        <br />
        <br />
        <span className="font-semibold">1. </span>Go back to Automated Trader
        and select Webhook.
        <br />
        <br />
        <span className="font-semibold">2. </span>Click the three dots next to
        the list of messages and select New Message.
        <br />
        <br />
        <span className="font-semibold">3. </span>Add the pair name and select
        another order type (change settings if you would like).
        <br />
        <br />
        <span className="font-semibold">4. </span>Click Save.
        <br />
        <br />
        <span className="font-semibold">5. </span>In Automated Trader, click the
        list of messages and select the new message you want to use in
        TradingView.
        <br />
        <br />
        <span className="font-semibold">6. </span>Copy the webhook message and
        paste it in the Message field.
        <br />
        <br />
        <span className="font-semibold">7. </span>Follow the steps above if
        needed.
      </p>

      <WebhookTradingView />
    </Index>
  );
}

export default Webhooks;

function WebhookTradingView() {
  return (
    <React.Fragment>
      <H4 className="font-bold mt-6">Webhook in TradingView</H4>

      <p className="mt-3 text-text-p text-sm">
        Here&apos;s a step-by-step guide on how to add an Automated Trader
        webhook in TradingView:
        <br />
        <br />
        <span className="font-semibold">1. </span>Create your webhook in
        Automated Trader.
        <br />
        <br />
        <span className="font-semibold">2. </span>Find an indicator or alert in
        TradingView to attach your Automated Trader settings.
        <br />
        <br />
        <span className="font-semibold">3. </span>Visit the Notifications tab in
        TradingView and go to Automated Trader. Copy the webhook URL.
        <br />
        <br />
        <span className="font-semibold">4. </span>Go back to TradingView and
        paste your webhook URL in the field.
        <br />
        <br />
        <span className="font-semibold">5. </span>In the TradingView Alert tab,
        go to Settings.
        <br />
        <br />
        <span className="font-semibold">6. </span>Select your conditions and
        name the alert anything you want, preferably adding the order type you
        selected in Automated Trader (buy, buy limit, sell, sell limit, buy
        stop, sell stop), as well as the pair type and time frame of the chart.
        <br />
        <br />
        <span className="font-semibold">7. </span>Go back to Automated Trader
        and copy the webhook message.
        <br />
        <br />
        <span className="font-semibold">8. </span>Go back to TradingView and
        paste the message in the Message fiel
        <br />
        <br />
        <span className="font-semibold">9. </span>Click Create.
      </p>

      <p className="mt-6 text-text-p text-sm">
        If you want to set up multiple order types, you need to repeat these
        steps above by making new messages in Automated Trader:
        <br />
        <br />
        <span className="font-semibold">1. </span>Go back to Automated Trader
        and select Webhook.
        <br />
        <br />
        <span className="font-semibold">2. </span>Click the three dots next to
        the list of messages and select New Message.
        <br />
        <br />
        <span className="font-semibold">3. </span>Add the pair name and select
        another order type (change settings if you would like).
        <br />
        <br />
        <span className="font-semibold">4. </span>Click Save.
        <br />
        <br />
        <span className="font-semibold">5. </span>In Automated Trader, click the
        list of messages and select the new message you want to use in
        TradingView.
        <br />
        <br />
        <span className="font-semibold">6. </span>Copy the webhook message and
        paste it in the Message field.
        <br />
        <br />
        <span className="font-semibold">7. </span>Follow the steps above if
        needed.
      </p>
    </React.Fragment>
  );
}
