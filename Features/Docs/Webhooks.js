import React from "react";
import Index from "./index";

import { H4, H5 } from "../../Components/H";

function Webhooks() {
  return (
    <Index>
      <H4 className="font-bold">Adding Webhook</H4>

      <p className="mt-3 text-text-p text-sm">
        The first thing you want to do to add a webhook is Click webhooks on the
        right side of your dashboard Once on the webhooks page Click New webook
        in the upper right corner It will bring you to a menu where you can add
        your Auto Trade Perimeters Let&apos;s go over these now...
        <br />
        <br />
        First thing you want to do is name your webhook you can give it any name
        you choose but remember Next you want to choose your pair name each
        broker may name their assets differently so please check mt4 to see how
        it&apos;s exactly spelled
        <br />
        Here is an example of where to check the name on your broker
        <br />
        <br />
        After you add your assets name next you need to choose your order type
        for you alerts remember that you have to setup multiple messages if you
        want to take buys and sells
        <br />
        <br /> Now lets choose your entry position size this is where you choose
        your risk % or your fixed lot size If you choose percentage base that
        means your Alert will risk only the percentage you select on your
        account
        <br />
        for example if you choose 3% on a $1000 account you will only lose $30
        if stop loss is hit If you choose fixed lot size that just means you are
        pre setting up the lot size that will execute when alert is fired for
        example .50 lot Next is choosing stop loss and take profit value this is
        broker / asset specific so please check how you broker calculates pips
        for each asset you can do so by using a ruler on your mt4 account for
        each asset you are creating alerts for
        <br />
        <br />
        Next is the toggle features you can turn these on or off first is
        trailing stop in pips Trailing stop start is when you want the trailing
        stop to activate For example when price moves 50 pips into profit
        activate trailing stop Trailing stop distance is how many pips you want
        the trailing stop to be from price Trailing Step is when .....
        <br />
        <br />
        next is Break even / partial take profit Partial close target is
        calculated in pips and you can choose the % you would like to close once
        price reaches target for example close 50% of my trade when price
        reaches 50 pips in profit Activate breakeven will move your stop to
        break even when you reach a certain amount of pips SL in profit is also
        calculated in pips and will move your Stop loss x amount of pips you
        choose similar to trailing stop but without the stop trailing price.
        <br />
        <br />
        The next toggle is Time filter which is self explanatory but basically
        you can choose the time of day you want the bots / web-hooks to start or
        finish Time is based upon NY eastern time
        <br />
        <br />
        Hedging toggle allows users to set the pending duration they want an
        order to be placed for example if you choose sell limit as your oder
        type then price doesn&apos;t reach your oder in X amount of time then it
        will automated close your order.
        <br />
        <br /> Last toggle for webhook settings is max spread / slippage which
        has to deal with your broker so for example if the price of your pair
        has a higher/max spread of 10 it will not take the trade if it&apos;s
        any higher.
        <br />
        <br />
        you can also send a test alert to your mt4 account to test the settings
        (we recommend this only on demo accounts) Click save and now you have
        created a webhook
      </p>

      <WebhookTradingView />
      {/* 
      <H4 className="font-bold mt-6">
        how to add automated trader webhook in Tradingview
      </H4>

      <p className="mt-3 text-text-p text-sm">
        This is a very simple process and works with any indicator or alert
        system built on tradingview.
        <br /> After creating your webhook in Automated Trader Find an indicator
        or alert in tradingview to attach your Automated trader settings Once
        you have an alert in tradingview visit the notifications tab Go to
        Automated Trader and Copy webhook url
        <br /> Go back to tradingview and paste your webhook url in the field
        <br />
        <br />
        Next go to settings in your tradingview alert tab Select your conditions
        Name the alert anything you want preferably adding the order type you
        selected in Automated Trader (buy, buy limit, sell, sell limit, buy
        stop, sell stop) also pair type and time frame the chart on.
        <br />
        <br />
        next go to Automated trader and copy webhook message Go back to
        tradingview and paste the message in the message field click create If
        you want to set up multiple order types you need to repeat these steps
        above except by making new messages in automated trader to do so go back
        to automated trader select webhook click the three dots next to list of
        messages select new message add pair name and select another order type
        ( Change settings if you would like) click save Then in Automated Trader
        click list of messages and select the new message you want to use in
        tradingview Copy webhook messsage and paste in message field Follow
        steps above if needed.{" "}
      </p> */}
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
