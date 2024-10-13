import { useState, useEffect } from "react";
import { useUser } from "../contexts/UserContext";
import { useWebhook } from "../contexts/WebhookContext";
import { useMetatrader } from "../contexts/MetatraderContext";
import { useBinance } from "../contexts/BinanceContext";
import {
  addAdvancedWebhook,
  addWebhook,
  updateWebhookColor,
  updateWebhookName,
  updateWebhookData,
  updateWebhookApps,
  activeWebhook,
  publicWebhook as publicWH,
  deleteWebhook as deleteWH,
  editMessage,
  deleteMessage,
  addMessage,
  getWebhookByPublicId,
  searchWebhooksByName,
} from "../lib/webhooks";
import { getAlertsByWebhookId } from "../lib/alerts";

import { getUser } from "../lib/users";

import { processAlerts } from "./AlertHook";
import { processTrades } from "./TradeHook";

import { getMessageData as getMsgData } from "../lib/third/webhookMessage";

export const getMessageData = (msg, symbol, fixedLotSize) =>
  getMsgData(msg, symbol, fixedLotSize);

export const NewAdvancedWebhook = () => {
  const { user } = useUser();
  const { getAllWebhooks, setWebhooks } = useWebhook();

  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [useFixedLotSize, setUseFixedLotSize] = useState(false);
  const [fixedLotSize, setFixedLotSize] = useState("");

  function getData(webhook) {
    if (webhook) {
      setName(webhook.name);
      setPair(webhook.pair);
      setUseFixedLotSize(!!webhook.fixedLotSize);
      setFixedLotSize(webhook.fixedLotSize);
    }
  }

  async function update(webhook) {
    if (!webhook) {
      setError("Webhook not available!");
      return;
    }
    if (!name) {
      setError("Webhook name must be provided!");
      return;
    }
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    setError("");

    const r = await updateWebhookData(
      user.uid,
      webhook.id,
      name,
      pair,
      useFixedLotSize ? fixedLotSize : 0
    );

    if (r?.length > 0) setWebhooks(r);

    return r;
  }

  async function add() {
    if (!name) {
      setError("Webhook name must be provided!");
      return;
    }
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    setError("");

    const r = await addAdvancedWebhook(
      name,
      pair,
      user.uid,
      useFixedLotSize ? fixedLotSize : 0
    );

    if (r) {
      await getAllWebhooks(user.uid);
    }

    return r;
  }

  return {
    error,
    name,
    setName,
    pair,
    setPair,
    add,
    update,
    getData,
    fixedLotSize,
    setFixedLotSize,
    useFixedLotSize,
    setUseFixedLotSize,
  };
};

export const NewWebhook = () => {
  const { user } = useUser();
  const { getAllWebhooks, setWebhooks } = useWebhook();

  const orderTypes = [
    { value: "BUY", label: "Buy" },
    { value: "SELL", label: "Sell" },
    // { value: "BUY-STOP", label: "Buy Stop" },
    // { value: "SELL-STOP", label: "Sell Stop" },
    // { value: "BUY-LIMIT", label: "Buy Limit" },
    // { value: "SELL-LIMIT", label: "Sell Limit" },
  ];

  const [error, setError] = useState("");
  const [succTestMsg, setSuccTestMsg] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [msgType, setMsgType] = useState(0);
  const [msgName, setMsgName] = useState("");
  const [type, setType] = useState(orderTypes[0]);
  const [pendingDistance, setPendingDistance] = useState("");

  const [usePositionPercentage, setUsePositionPercentage] = useState(true);
  const [useFixedPosition, setUseFixedPosition] = useState(true);
  const [positionValue, setPositionValue] = useState(2);
  const [positionValuePercentage, setPositionValuePercentage] = useState(1);

  const [useStopLoss, setUseStopLoss] = useState(true);
  const [stopLoss, setStopLoss] = useState("200.0");
  const [useTakeProfit, setUseTakeProfit] = useState(true);
  const [takeProfit, setTakeProfit] = useState("200.0");

  const [allTrades, setAllTrades] = useState(false);
  const [moveToBE, setMoveToBE] = useState(false);

  const [usePartialClose, setUsePartialClose] = useState(false);
  const [partialCloseValue, setPartialCloseValue] = useState(50);

  const [time, setTime] = useState({
    use: false,
    start: "",
    end: "",
    day: ["MON", "TUE", "WED"],
  });

  function formatMsg() {
    let msg = pair + " " + type.value + " ";

    if (msgType === 0) msg = "MARKET-ORDER " + msg;
    else if (msgType === 1) msg = "PENDING-ORDER " + msg;
    else if (msgType === 2) msg = "CLOSE-ORDER " + msg;
    else if (msgType === 3) msg = "UPDATE-SL " + msg;

    if (msgType < 2) {
      if (pendingDistance) msg += "PENDING-DISTANCE=" + pendingDistance + " ";
      if (useFixedPosition && !usePositionPercentage) {
        msg += "RISK=" + positionValue + " ";
      } else if (usePositionPercentage) {
        msg += "RISK=" + positionValuePercentage + "% ";
        if (useFixedPosition) msg += "FIXED-SIZE=" + positionValue + " ";
      }

      if (useTakeProfit) msg += "TAKE-PROFIT=" + takeProfit + " ";
      if (useStopLoss) msg += "STOP-LOSS=" + stopLoss + " ";
    } else if (msgType == 3) {
      msg += "STOP-LOSS=" + stopLoss + " ";
    } else if (msgType === 2) {
      if (usePartialClose) {
        msg += "PARTIAL-CLOSE=" + partialCloseValue + " ";
      }
    }

    if (time.use) {
      msg += "USE-TIME ";
      let days = "";
      time.day.forEach((d, i) => {
        days += (i > 0 ? "," : "") + d;
      });

      msg += "DAYS=" + days + " ";
      msg += "START-TIME=" + time.start + " ";
      msg += "END-TIME=" + time.end + " ";
    }

    if (allTrades) msg += "ALL-TRADES ";
    if (moveToBE) msg += "MOVE-TO-BE ";
    if (msgName) msg += "MSG-NAME=" + msgName + " ";

    return msg;
  }

  function getData(str) {
    if (!str) return;
    const r = getMessageData(str);

    // console.log(str, r);

    setMsgName(r.msgName);
    setMsgType(r.msgType);
    setPair(r.pair);
    setType(
      orderTypes.find((v) => v.value.toLowerCase() === r.type.toLowerCase())
    );
    setPendingDistance(r.pendingDistance);

    setUsePositionPercentage(r.usePositionPercentage);
    setUseFixedPosition(r.useFixedLotSize);

    setPositionValue(r.positionValue);
    setPositionValuePercentage(r.positionValuePercentage);
    setStopLoss(r.stopLoss);
    setTakeProfit(r.takeProfit);
    setTime(r.time);
    setAllTrades(r.allTrades);
    setMoveToBE(r.moveToBE);
    setUsePartialClose(r.usePartialClose);
    setPartialCloseValue(r.partialCloseValue);
  }

  async function add() {
    if (!name) {
      setError("Webhook name must be provided!");
      return;
    }
    if (!msgName) {
      setError("Message name must be provided!");
      return;
    }
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }
    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    const msg = formatMsg();

    const message = {
      label: msgName,
      value: msg,
    };

    // console.log(msg);
    const r = await addWebhook(name, message, user?.uid);
    if (r) {
      await getAllWebhooks(user.uid);
    }

    return r;
  }

  async function addMsg(id) {
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    const msg = formatMsg();

    const message = {
      label: msgName,
      value: msg,
    };
    // console.log(msg);

    const r = await addMessage(id, message);

    if (r) {
      await getAllWebhooks(user.uid);
    }
    return r;
  }

  async function editMsg(id, oldmsg) {
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!user?.uid) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    const msg = formatMsg();

    const message = {
      label: msgName,
      value: msg,
    };
    // console.log(msg);

    const r = await editMessage(id, message, oldmsg);

    if (r) {
      await getAllWebhooks(user.uid);
    }
    return r;
  }

  async function deleteMsg(id, msg) {
    setError("");
    const r = await deleteMessage(id, msg);

    if (r) {
      await getAllWebhooks(user.uid);
    }
    return r;
  }

  useEffect(() => {
    setError("");
    setSuccTestMsg("");
  }, []);

  function getMsg() {
    return formatMsg();
  }

  return {
    orderTypes,
    msgType,
    setMsgType,
    name,
    setName,
    msgName,
    setMsgName,
    pair,
    setPair,
    type,
    setType,
    pendingDistance,
    setPendingDistance,
    usePositionPercentage,
    setUsePositionPercentage,
    useFixedPosition,
    setUseFixedPosition,
    positionValue,
    setPositionValue,
    positionValuePercentage,
    setPositionValuePercentage,
    useStopLoss,
    setUseStopLoss,
    stopLoss,
    setStopLoss,
    useTakeProfit,
    setUseTakeProfit,
    takeProfit,
    setTakeProfit,
    time,
    setTime,
    allTrades,
    setAllTrades,
    moveToBE,
    setMoveToBE,
    usePartialClose,
    setUsePartialClose,
    partialCloseValue,
    setPartialCloseValue,
    error,
    succTestMsg,
    add,
    addMsg,
    editMsg,
    getData,
    deleteMsg,
    getMsg,
  };
};

export function EditWebhookName(webhook) {
  const { user } = useUser();
  const { setWebhooks } = useWebhook();
  const [whName, setWhName] = useState(webhook?.name || "");
  const [error, setError] = useState("");

  async function editWhName() {
    if (!user || !webhook) {
      setError("Invalid data provided!");
      return;
    }
    const r = await updateWebhookName(user.uid, webhook.id, whName);
    if (r.length > 0) setWebhooks(r);
    return r;
  }

  return { whName, setWhName, editWhName, error };
}

export function EditWebhookColor(webhook) {
  const { user } = useUser();
  const { setWebhooks } = useWebhook();
  const [whColor, setWhColor] = useState(webhook?.color || "");
  const [error, setError] = useState("");

  async function editWhColor() {
    if (!user || !webhook) {
      setError("Invalid data provided!");
      return;
    }
    const r = await updateWebhookColor(user.uid, webhook.id, whColor);
    if (r.length > 0) setWebhooks(r);

    return r;
  }

  return { whColor, setWhColor, editWhColor, error };
}

export function DeleteWebhook(webhook) {
  const { user } = useUser();
  const { getAllWebhooks } = useWebhook();
  const [error, setError] = useState("");

  async function deleteWebhook() {
    if (!user || !webhook) {
      setError("Invalid data provided!");
      return;
    }
    const r = await deleteWH(webhook.id);
    if (r?.error) {
      setError(r.error);
      return false;
    }
    await getAllWebhooks(user.uid);
    return true;
  }

  return { deleteWebhook, error };
}

export function SetActiveWebhook(webhook) {
  const { user } = useUser();
  const { getAllWebhooks } = useWebhook();
  const [active, setActive] = useState(webhook?.active || false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (webhook) setActive(webhook.active);
  }, [webhook]);

  async function activateWebhook() {
    if (!user || !webhook) {
      setError("Invalid data provided!");
      return;
    }
    const r = await activeWebhook(webhook.id, !active);
    // console.log(r);
    await getAllWebhooks(user.uid);
    return r;
  }

  return { active, setActive, activateWebhook, error };
}

export function SetPublicWebhook(webhook) {
  const { user } = useUser();
  const { getAllWebhooks } = useWebhook();
  const [isPublic, setIsPublic] = useState(webhook?.public || false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (webhook) setIsPublic(webhook.public);
  }, [webhook]);

  async function publicWebhook() {
    if (!user || !webhook) {
      setError("Invalid data provided!");
      return;
    }
    const r = await publicWH(webhook.id, !isPublic);
    await getAllWebhooks(user.uid);
    return r;
  }

  return { isPublic, setIsPublic, publicWebhook, error };
}

export function WebhookApps(webhook) {
  const { getAllWebhooks, setWebhooks } = useWebhook();
  const { mtAccounts } = useMetatrader();
  const { binanceAccounts } = useBinance();

  const [isConnected, setIsConnected] = useState(false);

  const [error, setError] = useState("");
  const [data, setData] = useState({ metatrader: [], binance: [] });

  useEffect(() => {
    let d = { ...data };

    // Update Metatrader accounts
    if (mtAccounts?.length > 0) {
      let mt = webhook.apps?.metatrader || [];
      mtAccounts.forEach((account) => {
        const existingAccount = mt.find((a) => a.id === account.id);
        if (existingAccount) {
          existingAccount.name = account.accountDisplayName;
        } else {
          mt.push({
            id: account.id,
            value: false,
            name: account.accountDisplayName,
          });
        }
      });
      mt.forEach((account) => {
        const notExist = mtAccounts.find((a) => a.id === account.id);
        if (!notExist) mt = mt.filter((a) => a.id !== account.id);
      });
      d["metatrader"] = mt;
    }

    // Update Binance accounts
    if (binanceAccounts?.length > 0) {
      let bin = webhook.apps?.binance || [];
      binanceAccounts.forEach((account) => {
        const existingAccount = bin.find((a) => a.id === account.id);
        if (existingAccount) {
          existingAccount.name = account.accountName;
        } else {
          bin.push({
            id: account.id,
            value: { spot: false, usdm: false, coinm: false },
            name: account.accountName,
          });
        }
      });

      bin.forEach((account) => {
        const notExist = binanceAccounts.find((a) => a.id === account.id);
        if (!notExist) bin = bin.filter((a) => a.id !== account.id);
      });

      d["binance"] = bin;
    }

    setData(d);
  }, [mtAccounts, binanceAccounts, webhook]);

  useEffect(() => {
    let connect = false;

    data?.metatrader?.forEach((account) => {
      if (account.value === true) connect = true;
    });

    data?.binance?.forEach((account) => {
      if (account.value?.spot === true) connect = true;
      if (account.value?.usdm === true) connect = true;
      if (account.value?.coinm === true) connect = true;
    });

    setIsConnected(connect);
  }, [data]);

  const toggleAccountValue = (type, accountId, option) => {
    setData((prevData) => {
      const updatedData = { ...prevData };
      const accounts = updatedData[type].map((account) => {
        if (account.id === accountId) {
          if (type === "binance" && option) {
            return {
              ...account,
              value: { ...account.value, [option]: !account.value[option] },
            };
          } else {
            return { ...account, value: !account.value };
          }
        }
        return account;
      });
      updatedData[type] = accounts;
      return updatedData;
    });
  };

  async function onSave() {
    const r = await updateWebhookApps(webhook.userId, webhook.id, data);
    if (r.length > 0) setWebhooks(r);
    return r;
  }

  return { data, setData, onSave, error, toggleAccountValue, isConnected };
}

export const SearchWebhooksByName = () => {
  const [name, setName] = useState("");
  const [webhooks, setWebhooks] = useState([]);

  useEffect(() => {
    if (name.length > 2)
      (async () => {
        const r = await searchWebhooksByName(name);
        // console.log(r);
        setWebhooks(r);
      })();
    else setWebhooks([]);
  }, [name]);

  return { webhooks, name, setName };
};

export function WebhookChartData(webhook) {
  const [trades, setTrades] = useState(null);
  const [tradesData, setTradesData] = useState(null);

  useEffect(() => {
    if (trades?.length > 0) {
      const pr = processTrades(trades);
      setTradesData(pr);
    }
  }, [trades]);

  useEffect(() => {
    if (webhook) {
      const allTrades = webhook.trades;
      if (allTrades?.length > 0) {
        let closedTrades = [];
        for (let trade of allTrades) {
          let closedTrade = {
            ...trade.trade,
            tradeSrc: trade.tradeSrc,
            accountId: trade.accountId,
          };
          if (trade.trade) closedTrades.push(closedTrade);
        }
        setTrades(closedTrades);
      } else setTrades([]);
    }
  }, [webhook]);

  return { tradesData };
}

export function ViewWebhookPage(publicId) {
  const [webhook, setWebhook] = useState(null);
  const [whUser, setWhUser] = useState(null);
  const [error, setError] = useState("");

  const [alerts, setAlerts] = useState(null);
  const [trades, setTrades] = useState(null);

  const [alertsData, setAlertsData] = useState(null);
  const [tradesData, setTradesData] = useState(null);

  useEffect(() => {
    if (alerts?.length > 0) {
      const pr = processAlerts(alerts);
      console.log(pr);
      setAlertsData(pr);
    }
  }, [alerts]);

  useEffect(() => {
    if (trades?.length > 0) {
      const pr = processTrades(trades);
      console.log(pr);
      setTradesData(pr);
    }
  }, [trades]);

  useEffect(() => {
    if (webhook) {
      const allTrades = webhook.trades;
      if (allTrades?.length > 0) {
        let closedTrades = [];
        for (let trade of allTrades) {
          let closedTrade = {
            ...trade.trade,
            tradeSrc: trade.tradeSrc,
            accountId: trade.accountId,
          };
          if (trade.trade) closedTrades.push(closedTrade);
        }
        setTrades(closedTrades);
      } else setTrades([]);
    }
  }, [webhook]);

  async function getWebhook() {
    const r = await getWebhookByPublicId(publicId);
    if (r) {
      setWebhook(r);
      const u = await getUser(r.userId);
      setWhUser(u);
      const a = await getAlertsByWebhookId(r.id);
      setAlerts(a);
    } else setError("Webhook not found!");
  }

  useEffect(() => {
    if (publicId) {
      setWebhook(null);
      setWhUser(null);
      setAlerts(null);
      setTrades(null);
      getWebhook();
    }
  }, [publicId]);

  return { error, whUser, webhook, trades, alerts, alertsData, tradesData };
}
