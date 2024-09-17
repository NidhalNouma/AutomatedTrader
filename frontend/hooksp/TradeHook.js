import { useState, useEffect } from "react";

import moment from "moment";
import axios from "axios";

import { useWebhook } from "../contexts/WebhookContext";
import { usePreset } from "../contexts/PresetsContext";
import { useMetatrader } from "../contexts/MetatraderContext";
import { useBinance } from "../contexts/BinanceContext";

import { servicesURL } from "../utils/constant";
import {
  getMessageData,
  presetToMsgData,
} from "../lib/third/webhookMessage.js";

import { addAlpha } from "../utils/functions";

export function OpenTrade() {
  const { webhooks } = useWebhook();
  const { presets } = usePreset();
  const { mtAccounts, mtAccountsData } = useMetatrader();
  const { binanceAccounts } = useBinance();

  const [app, setApp] = useState(null);
  const [account, setAccount] = useState(null);
  const [accountOptions, setAccountOptions] = useState(null);

  useEffect(() => {
    if (app === "metatrader") {
      if (mtAccountsData?.length > 0) {
        console.log(mtAccountsData);
        let accounts = mtAccountsData.map((acc) => {
          let racc = {
            name: acc.account.accountName,
            color: acc.account.color,
            account: acc.account,
            accountInfo: acc.information,
            positions: acc.positions,
          };

          if (account && account.account?.id == acc.account?.id) {
            setAccount(racc);
          }
          return racc;
        });

        setAccountOptions(accounts);
      } else setAccountOptions([]);
    }
  }, [app, mtAccountsData]);

  const [presetsActions, setPresetActions] = useState({
    market: [],
    modify: [],
    close: [],
  });
  const [selectedPreset, setSelectedPreset] = useState(null);

  useEffect(() => {
    if (presets?.length > 0) {
      let pr = {
        market: [],
        modify: [],
        close: [],
      };
      for (let preset of presets) {
        if (preset.type == 0) pr.market.push(preset);
        if (preset.type == 2) pr.close.push(preset);
        if (preset.type == 3) pr.modify.push(preset);
      }

      setPresetActions(pr);
    }
  }, [presets]);

  const [error, setError] = useState("");

  async function sendTrade() {
    setError("");
    if (!account) {
      setError("Account is required!");
      return false;
    }
    if (!app) {
      setError("App is required!");
      return false;
    }
    if (!selectedPreset) {
      setError("Preset is required!");
      return false;
    }

    console.log("Sending trade ... ", app, account, selectedPreset);

    // let url = "http://localhost:4001";
    let url = servicesURL.trade;

    let messageData = presetToMsgData(selectedPreset);

    const r = await axios.post(
      url + "/" + app,
      {
        account: account.account,
        presetId: selectedPreset.id,
        messageData,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    console.log(r);

    if (r?.data?.errorMessage) {
      setError(r.data.errorMessage);
      return false;
    }

    return true;
  }

  return {
    app,
    setApp,
    account,
    setAccount,
    presetsActions,
    selectedPreset,
    setSelectedPreset,
    accountOptions,
    error,
    sendTrade,
  };
}

export function TradesData() {
  const { webhooks } = useWebhook();
  const { mtAccountsData, mtAccounts } = useMetatrader();
  const { binanceAccountsData, binanceAccounts } = useBinance();

  const [trades, setTrades] = useState(null);
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
    if (liveTrades?.length > 0) {
      let pairsData = [];

      for (let trade of liveTrades) {
        const pair = trade.symbol;

        const data = pairsData.find((p) => p?.pair === pair);
        if (data) {
          data.profit += trade.profit;
          data.count += 1;
        } else {
          let d = {
            pair,
            profit: trade.profit,
            count: 1,
          };
          pairsData.push(d);
        }
      }

      let p = {
        data: [],
        count: [],
        labels: [],
        colors: liveTradesData.colors,
      };
      for (let pair of pairsData) {
        if (p.data.length < 6) {
          p.data.push(pair.profit);
          p.count.push(pair.count);
          p.labels.push(pair.pair);
        }
      }

      setLiveTradesData(p);
    }
  }, [liveTrades]);

  const [tradesDay, setTradesDay] = useState([]);
  const [tradesData, setTradesData] = useState(null);

  useEffect(() => {
    if (trades?.length > 0) {
      let tr = processTrades(trades);
      setTradesData(tr);
      let days = tr?.days;
      setTradesDay(days);
    }
  }, [trades]);

  useEffect(() => {
    let tTrades = [];
    if (mtAccountsData?.length > 0) {
      for (let account of mtAccountsData) {
        const tr = account.positions.map((trade) => {
          let webhookId = trade.clientId?.split("_")?.slice(2)?.join("_");
          let webhook = webhookId
            ? webhooks.find((v) => v.id == webhookId)
            : null;
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
            webhookId,
            webhook,
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
            let webhookId = trade.clientId?.split("_")?.slice(2)?.join("_");
            let webhook = webhookId
              ? webhooks.find((v) => v.id == webhookId)
              : null;
            return {
              ...trade,
              type: trade.type,
              src: "metatrader",
              webhookId,
              webhook,
            };
          });
          tr.sort((a, b) => new Date(b.closeTime) - new Date(a.closeTime));
          tTrades = tr;
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
    tradesData,
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
    symbols: {}, // New symbols object to store trades by symbol
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
    // Extract the date (day) from closeTime
    const tradeDate = moment(trade.closeTime).format("YYYY-MM-DD");
    const dayName = moment(trade.closeTime).format("dddd");
    const symbol = trade.symbol; // Extract the symbol from the trade.pair

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

    // Group trades by symbol
    if (!totals.symbols[symbol]) {
      totals.symbols[symbol] = []; // Initialize the array if it doesn't exist
    }
    totals.symbols[symbol].push(trade); // Add trade to the symbol array
  });

  return {
    days: Object.values(groupedTrades).sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    ),
    buys: totals.buys,
    sells: totals.sells,
    profit: totals.profit,
    loss: totals.loss,
    Trades: totals.Trades,
    symbols: totals.symbols, // Include the symbols object
    dayOfTheWeek: totals.dayOfTheWeek, // Include the dayOfTheWeek object
  };
}
