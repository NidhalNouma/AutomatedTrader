import { useState, useEffect } from "react";

import axios from "axios";

import { useWebhook } from "../contexts/WebhookContext";
import { useMetatrader } from "../contexts/MetatraderContext";
import { useBinance } from "../contexts/BinanceContext";

import { servicesURL } from "../utils/constant";
import { getMessageData } from "../lib/third/webhookMessage.js";

import { addAlpha } from "../utils/functions";

export function OpenTrade() {
  const { webhooks } = useWebhook();
  const { mtAccounts } = useMetatrader();
  const { binanceAccounts } = useBinance();

  const [account, setAccount] = useState(null);
  const [accountOptions, setAccountOptions] = useState(null);
  const [webhook, setWebhook] = useState(null);
  const [webhookOptions, setWebhookOptions] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageOptions, setMessageOptions] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    let groupOptions = [];

    if (mtAccounts?.length > 0) {
      let options = [];
      for (let i = 0; i < mtAccounts.length; i++) {
        const acc = mtAccounts[i];

        const option = { value: acc, label: acc.accountDisplayName };
        options.push(option);
      }

      groupOptions.push({
        label: "Metatrader",
        options,
      });
    }

    if (binanceAccounts?.length > 0) {
      let options = [];
      for (let i = 0; i < binanceAccounts.length; i++) {
        const acc = binanceAccounts[i];

        const option = { value: acc, label: acc.accountName };
        options.push(option);
      }

      groupOptions.push({
        label: "Binance",
        options,
      });
    }

    if (groupOptions.length > 0) {
      setAccountOptions(groupOptions);
      setAccount(groupOptions[0]);
    }
  }, [mtAccounts, binanceAccounts]);

  useEffect(() => {
    if (webhooks?.length > 0) {
      const options = [];
      for (let i = 0; i < webhooks.length; i++) {
        const w = webhooks[i];

        if (!w.advanced) {
          const option = { value: w, label: w.name };
          options.push(option);
        }
      }
      if (options.length > 0) {
        setWebhookOptions(options);
        setWebhook(options[0]);
      }
    }
  }, [webhooks]);

  useEffect(() => {
    if (webhook?.value && webhook.value?.messages?.length > 0) {
      setMessageOptions(webhook.value?.messages);
      setMessage(webhook.value.messages[0]);
    }
  }, [webhook]);

  async function sendTrade() {
    setError("");
    if (!account || !account.value) {
      setError("Account is required!");
      return false;
    }
    if (!webhook || !webhook.value) {
      setError("Webhook is required!");
      return false;
    }
    if (!message || !message.value) {
      setError("Message is required!");
      return false;
    }

    const accountId = account.value.id;
    const webhookId = webhook.value.id;
    const messageData = getMessageData(message.value);

    // console.log("Sending trade", account, webhook, message);
    console.log("Sending trade ... ", accountId, webhookId, messageData);

    // let url = "http://localhost:4001";
    let url = servicesURL.trade;

    let accountSrc = accountOptions.find((o) => {
      const r = o.options.find((v) => v.value.id === account.value.id);
      return r;
    });

    if (!accountSrc) {
      setError("Account source not availble!");
      return false;
    }

    let accountSrcName = accountSrc.label.toLowerCase();

    const r = await axios.post(
      url + "/" + accountSrcName,
      {
        account: account.value,
        webhookId,
        messageData,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    if (r?.data?.errorMessage) {
      setError(r.data.errorMessage);
      return false;
    }

    return true;
  }

  return {
    account,
    setAccount,
    accountOptions,
    webhook,
    setWebhook,
    webhookOptions,
    message,
    setMessage,
    messageOptions,
    error,
    sendTrade,
  };
}

export function TradesData() {
  const { webhooks } = useWebhook();
  const { mtAccountsData, mtAccounts } = useMetatrader();
  const { binanceAccountsData, binanceAccounts } = useBinance();

  const [trades, setTrades] = useState([]);
  const [liveTrades, setLiveTrades] = useState([]);
  const [liveTradesData, setLiveTradesData] = useState({
    data: [],
    labels: [],
    colors: [
      "#3d74a8",
      "#6ca834",
      "#a89a34",
      "#de6259",
      "#797fdb",
      "#b779db",
      "#db79bc",
    ],
  });

  useEffect(() => {
    if (liveTrades.length > 0) {
      let pairsData = [];

      for (let trade of liveTrades) {
        const pair = trade.symbol;

        const data = pairsData.find((p) => p?.pair === pair);
        if (data) {
          data.profit += trade.profit;
        } else {
          let d = {
            pair,
            profit: trade.profit,
          };
          pairsData.push(d);
        }
      }

      let p = { data: [], labels: [], colors: liveTradesData.colors };
      for (let pair of pairsData) {
        if (p.data.length < 6) {
          p.data.push(pair.profit);
          p.labels.push(pair.pair);
        }
      }

      setLiveTradesData(p);
    }
  }, [liveTrades]);

  const [tradesDay, setTradesDay] = useState([]);

  useEffect(() => {
    if (trades.length > 0) {
      let tr = processTrades(trades).days;
      setTradesDay(tr);
    }
  }, [trades]);

  useEffect(() => {
    let tTrades = [];
    if (mtAccountsData?.length > 0) {
      for (let account of mtAccountsData) {
        const tr = account.positions.map((trade) => {
          return {
            ...trade,
            type:
              trade.type == "POSITION_TYPE_BUY"
                ? "buy"
                : trade.type == "POSITION_TYPE_SELL"
                ? "sell"
                : "NA",
            openTime: trade.brokerTime,
            src: "metatrader",
          };
        });
        tTrades = [...tr];
      }
    }
    setLiveTrades(tTrades);
  }, [binanceAccountsData, mtAccountsData]);

  useEffect(() => {
    let tTrades = [];
    if (mtAccounts?.length > 0) {
      // console.log("changing .. trades");
      for (let account of mtAccounts) {
        if (account?.historyData) {
          const tr = account.historyData.map((trade) => {
            return {
              ...trade,
              type: trade.type == 0 ? "buy" : "sell",
              src: "metatrader",
            };
          });
          tTrades = [...tr];
        }
      }
    }
    setTrades(tTrades);
  }, [mtAccounts, binanceAccounts]);

  const [nbTrades, setNbTrades] = useState([]);
  const [nbLots, setNbLots] = useState([]);
  const [nbProfits, setNbProfits] = useState([]);
  const [nbLosses, setNbLosses] = useState([]);

  const [totalProfit, setTotalProfit] = useState([]);
  const [totalPositiveProfit, setTotalPositiveProfit] = useState([]);
  const [totalNegativeProfit, setTotalNegativeProfit] = useState([]);

  const createDataObject = (label, color) => ({
    label,
    labels: [],
    data: [],
    color,
  });

  const pushData = (dataObj, time, value) => {
    if (!dataObj) return;
    dataObj.labels?.push(time);
    dataObj.data?.push(value);
  };

  useEffect(() => {
    if (tradesDay?.length > 0) {
      const primaryColor = getComputedStyle(
        document.documentElement
      ).getPropertyValue("--clr-primary");
      const sellColor = addAlpha(
        `hsl(${getComputedStyle(document.documentElement).getPropertyValue(
          "--short-color"
        )})`,
        0.3
      );
      const buyColor = addAlpha(
        `hsl(${getComputedStyle(document.documentElement).getPropertyValue(
          "--long-color"
        )})`,
        0.3
      );
      const profitColor = addAlpha(
        `hsl(${getComputedStyle(document.documentElement).getPropertyValue(
          "--profit-color"
        )})`,
        0.3
      );
      const lossColor = addAlpha(
        `hsl(${getComputedStyle(document.documentElement).getPropertyValue(
          "--loss-color"
        )})`,
        0.3
      );

      const nbtrades = [
        createDataObject("Nb of trades", primaryColor),
        createDataObject("Nb of sell trades", sellColor),
        createDataObject("Nb of buy trades", buyColor),
      ];

      const nbprofittrades = [
        createDataObject("Profit trades", profitColor),
        createDataObject("Sell", sellColor),
        createDataObject("Buy", buyColor),
      ];

      const nblosstrades = [
        createDataObject("Loss trades", lossColor),
        createDataObject("Sell", sellColor),
        createDataObject("Buy", buyColor),
      ];

      const nblots = [
        createDataObject("Volume", primaryColor),
        createDataObject("Sell volume", sellColor),
        createDataObject("Buy volume", buyColor),
      ];

      const totalprofit = [
        createDataObject("Profit", primaryColor),
        createDataObject("Sell", sellColor),
        createDataObject("Buy", buyColor),
      ];

      const totalpositiveprofit = [
        createDataObject("Profit", profitColor),
        createDataObject("Sell", sellColor),
        createDataObject("Buy", buyColor),
      ];

      const totalnegativeprofit = [
        createDataObject("Loss", lossColor),
        createDataObject("Sell", sellColor),
        createDataObject("Buy", buyColor),
      ];

      tradesDay.forEach((day) => {
        const { time, Trades, sells, buys, profit, loss } = day;

        let nbSellProfit = profit.reduce(
          (count, trade) =>
            trade.type === "sell" && trade.profit > 0 ? count + 1 : count,
          0
        );

        let nbBuyProfit = profit.reduce(
          (count, trade) =>
            trade.type === "buy" && trade.profit > 0 ? count + 1 : count,
          0
        );

        let nbSellLoss = loss.reduce(
          (count, trade) =>
            trade.type === "sell" && trade.profit < 0 ? count + 1 : count,
          0
        );

        let nbBuyLoss = loss.reduce(
          (count, trade) =>
            trade.type === "buy" && trade.profit < 0 ? count + 1 : count,
          0
        );

        const totalLots = Trades.reduce((lot, trade) => trade.lot + lot, 0);
        const sellLots = sells.reduce((lot, trade) => trade.lot + lot, 0);
        const buyLots = buys.reduce((lot, trade) => trade.lot + lot, 0);

        const totalProfit = Trades.reduce(
          (profit, trade) => trade.profit + profit,
          0
        );
        const sellProfit = sells.reduce(
          (profit, trade) => trade.profit + profit,
          0
        );
        const buyProfit = buys.reduce(
          (profit, trade) => trade.profit + profit,
          0
        );

        let positiveprofit = profit.reduce(
          (pr, trade) => (trade.profit > 0 ? trade.profit + pr : pr),
          0
        );

        let positiveBuyprofit = profit.reduce(
          (pr, trade) =>
            trade.type === "buy" && trade.profit > 0 ? trade.profit + pr : pr,
          0
        );

        let positiveSellprofit = profit.reduce(
          (pr, trade) =>
            trade.type === "sell" && trade.profit > 0 ? trade.profit + pr : pr,
          0
        );

        let negativeprofit = loss.reduce(
          (pr, trade) => (trade.profit < 0 ? trade.profit + pr : pr),
          0
        );

        let negativeBuyprofit = loss.reduce(
          (pr, trade) =>
            trade.type === "buy" && trade.profit < 0 ? trade.profit + pr : pr,
          0
        );

        let negativeSellprofit = loss.reduce(
          (pr, trade) =>
            trade.type === "sell" && trade.profit < 0 ? trade.profit + pr : pr,
          0
        );

        pushData(nbtrades[0], time, Trades.length);
        pushData(nbtrades[1], time, sells.length);
        pushData(nbtrades[2], time, buys.length);

        pushData(nbprofittrades[0], time, profit.length);
        pushData(nbprofittrades[1], time, nbSellProfit);
        pushData(nbprofittrades[2], time, nbBuyProfit);

        pushData(nblosstrades[0], time, loss.length);
        pushData(nblosstrades[1], time, nbSellLoss);
        pushData(nblosstrades[2], time, nbBuyLoss);

        pushData(nblots[0], time, totalLots);
        pushData(nblots[1], time, sellLots);
        pushData(nblots[2], time, buyLots);

        pushData(totalprofit[0], time, totalProfit);
        pushData(totalprofit[1], time, sellProfit);
        pushData(totalprofit[2], time, buyProfit);

        pushData(totalpositiveprofit[0], time, positiveprofit);
        pushData(totalpositiveprofit[1], time, positiveSellprofit);
        pushData(totalpositiveprofit[2], time, positiveBuyprofit);

        pushData(totalnegativeprofit[0], time, negativeprofit);
        pushData(totalnegativeprofit[1], time, negativeSellprofit);
        pushData(totalnegativeprofit[2], time, negativeBuyprofit);
      });

      setNbTrades(nbtrades);
      setNbProfits(nbprofittrades);
      setNbLosses(nblosstrades);

      setNbLots(nblots);
      setTotalProfit(totalprofit);
      setTotalPositiveProfit(totalpositiveprofit);
      setTotalNegativeProfit(totalnegativeprofit);
    }
  }, [tradesDay]);

  return {
    trades,
    liveTrades,
    liveTradesData,
    tradesDay,
    nbTrades,
    nbProfits,
    nbLosses,
    nbLots,
    totalProfit,
    totalPositiveProfit,
    totalNegativeProfit,
  };
}

export function processTrades(trades) {
  const groupedTrades = {};
  const totals = {
    buys: [],
    sells: [],
    profit: [],
    loss: [],
    Trades: [],
    dayOfTheWeek: {
      Sunday: [],
      Monday: [],
      Tuesday: [],
      Wednesday: [],
      Thursday: [],
      Friday: [],
      Saturday: [],
    },
  };

  trades.forEach((trade) => {
    // Extract the date (day) from openTime
    const tradeDate = new Date(trade.openTime).toISOString().split("T")[0];
    const dayName = new Date(trade.openTime).toLocaleDateString("en-US", {
      weekday: "long",
    });

    // If the date doesn't exist in the groupedTrades object, initialize it
    if (!groupedTrades[tradeDate]) {
      groupedTrades[tradeDate] = {
        time: tradeDate,
        Trades: [],
        buys: [],
        sells: [],
        profit: [],
        loss: [],
      };
    }

    // Add the trade to the Trades array
    groupedTrades[tradeDate].Trades.push(trade);
    totals.Trades.push(trade); // Add to total Trades array

    // Separate into buys and sells
    if (trade.type === "buy") {
      groupedTrades[tradeDate].buys.push(trade);
      totals.buys.push(trade); // Add to total buys array
    } else if (trade.type === "sell") {
      groupedTrades[tradeDate].sells.push(trade);
      totals.sells.push(trade); // Add to total sells array
    }

    // Separate into profit and loss
    if (trade.profit >= 0) {
      groupedTrades[tradeDate].profit.push(trade);
      totals.profit.push(trade); // Add to total profit array
    } else {
      groupedTrades[tradeDate].loss.push(trade);
      totals.loss.push(trade); // Add to total loss array
    }

    // Add the trade to the dayOfTheWeek object
    totals.dayOfTheWeek[dayName].push(trade);
  });

  // Return the grouped trades and totals
  return {
    days: Object.values(groupedTrades),
    buys: totals.buys,
    sells: totals.sells,
    profit: totals.profit,
    loss: totals.loss,
    Trades: totals.Trades,
    dayOfTheWeek: totals.dayOfTheWeek, // Include the dayOfTheWeek object
  };
}
