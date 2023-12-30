import { useState, useEffect, useContext, createContext } from "react";
import {
  addWebhook,
  addAdvancedWebhook,
  addMessage,
  deleteMessage,
  getWebhooksByUserId,
  activeWebhook,
  publicWebhook,
  deleteWebhook,
  updateWebhookName,
  updateWebhookPair,
  updateWebhookColor,
  updateWebhookData,
} from "../db/webhooks";
import axios from "axios";

export const WebhookAdvanced = (userId) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [useFixedLotSize, setUseFixedLotSize] = useState(false);
  const [fixedLotSize, setFixedLotSize] = useState("");

  async function add() {
    if (!name) {
      setError("Webhook name must be provided!");
      return;
    }
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!userId) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    // const msg = formatMsg();
    // console.log(msg);
    const r = await addAdvancedWebhook(
      name,
      pair,
      "/api/",
      userId,
      useFixedLotSize ? fixedLotSize : 0
    );
    return r;
  }

  return {
    error,
    name,
    setName,
    pair,
    setPair,
    add,
    fixedLotSize,
    setFixedLotSize,
    useFixedLotSize,
    setUseFixedLotSize,
  };
};

export const WebHook = (userId) => {
  const [error, setError] = useState("");
  const [succTestMsg, setSuccTestMsg] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [msgType, setMsgType] = useState(0);
  const [type, setType] = useState(0);
  const [pendingDistance, setPendingDistance] = useState("");
  const [positionType, setPositionType] = useState(0);
  const [positionValue, setPositionValue] = useState("1");
  const [positionValuePercentage, setPositionValuePercentage] = useState("1");
  const [stopLoss, setStopLoss] = useState("200.0");
  const [takeProfit, setTakeProfit] = useState("200.0");
  const [allTrades, setAllTrades] = useState(false);
  const [moveToBE, setMoveToBE] = useState(false);

  const [time, setTime] = useState({
    use: false,
    start: "",
    end: "",
    day: ["MON", "TUE", "WED"],
  });

  function formatMsg() {
    let msg =
      pair +
      " " +
      typeToStr(msgType === 1 ? (type + 1).toString() : type.toString()) +
      " ";

    if (msgType === 0) msg = "MARKET-ORDER " + msg;
    else if (msgType === 1) msg = "PENDING-ORDER " + msg;
    else if (msgType === 2) msg = "CLOSE-ORDER " + msg;
    else if (msgType === 3) msg = "UPDATE-SL " + msg;

    if (msgType < 2) {
      if (pendingDistance) msg += "PENDING-DISTANCE=" + pendingDistance + " ";
      if (positionType === 1) {
        msg += "RISK=" + positionValue + " ";
      } else {
        msg += "RISK=" + positionValuePercentage + "% ";
      }

      msg += "TAKE-PROFIT=" + takeProfit + " ";
      msg += "STOP-LOSS=" + stopLoss + " ";
    } else if (msgType == 3) {
      msg += "STOP-LOSS=" + stopLoss + " ";
    } else if (msgType === 2) {
      if (positionType === 1) {
        msg += "PARTIAL-CLOSE=" + positionValue + " ";
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

    return msg;
  }

  function getData(str) {
    if (!str) return;
    const r = getMessageData(str);

    // console.log(str, r);

    setMsgType(r.msgType);
    setPair(r.pair);
    setType(r.type);
    setPendingDistance(r.pendingDistance);
    setPositionType(r.positionType);
    setPositionValue(r.positionValue);
    setPositionValuePercentage(r.positionValuePercentage);
    setStopLoss(r.stopLoss);
    setTakeProfit(r.takeProfit);
    setTime(r.time);
    setAllTrades(r.allTrades);
    setMoveToBE(r.moveToBE);
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

    if (!userId) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    const msg = formatMsg();
    console.log(msg);
    const r = await addWebhook(name, msg, "/api/", userId);
    return r;
  }

  async function testMsg(id, accounts) {
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!userId) {
      setError("User ID must be provided!");
      return;
    }

    if (accounts?.length <= 0) {
      setError("Please select an account!");
      return;
    }

    setError("");
    setSuccTestMsg("");
    let msg = formatMsg();
    msg = "test " + JSON.stringify({ account: accounts }) + " " + msg;
    console.log(msg, accounts);

    const r = await axios.post("/api/wh/" + id, msg, {
      headers: {
        "Content-Type": "text/plain",
      },
    });

    setSuccTestMsg("Test alert sent successfully!");

    // const r = await addMessage(id, msg);
    return r;
  }

  async function addMsg(id) {
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!userId) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    const msg = formatMsg();
    // console.log(msg);

    const r = await addMessage(id, msg);
    return r;
  }

  async function editMsg(id, oldmsg) {
    if (!pair) {
      setError("Pair must be provided!");
      return;
    }

    if (!userId) {
      setError("User ID must be provided!");
      return;
    }

    setError("");
    await deleteMessage(id, oldmsg);
    const msg = formatMsg();
    // console.log(msg);

    const r = await addMessage(id, msg);
    return r;
  }

  async function deleteMsg(id, msg) {
    setError("");
    await deleteMessage(id, msg);
  }

  useEffect(() => {
    setError("");
    setSuccTestMsg("");
  }, []);

  function getMsg() {
    return formatMsg();
  }

  return {
    msgType,
    setMsgType,
    name,
    setName,
    pair,
    setPair,
    type,
    setType,
    pendingDistance,
    setPendingDistance,
    positionType,
    setPositionType,
    positionValue,
    setPositionValue,
    positionValuePercentage,
    setPositionValuePercentage,
    stopLoss,
    setStopLoss,
    takeProfit,
    setTakeProfit,
    time,
    setTime,
    allTrades,
    setAllTrades,
    moveToBE,
    setMoveToBE,
    error,
    succTestMsg,
    add,
    addMsg,
    editMsg,
    getData,
    deleteMsg,
    testMsg,
    getMsg,
  };
};

export async function DeleteWebhook(id) {
  const r = await deleteWebhook(id);
  return r;
}

export async function setActiveWebhook(id, active) {
  const r = activeWebhook(id, active);
  return r;
}

export async function setPublicWebhook(id, ispublic) {
  const r = publicWebhook(id, ispublic);
  return r;
}

export function EditWebhookName(userId, whId, defaultName) {
  const [whname, setWHname] = useState(defaultName || "");

  async function editWhName() {
    if (!userId || !whId) return;
    const r = await updateWebhookName(userId, whId, whname);
    return r;
  }

  return { whname, setWHname, editWhName };
}

export function EditWebhookPair(userId, whId, defaultPair) {
  const [whpair, setWHpair] = useState(defaultPair || "");

  async function editWhPair() {
    if (!userId || !whId) return;
    const r = await updateWebhookPair(userId, whId, whpair);
    return r;
  }

  return { whpair, setWHpair, editWhPair };
}

export function EditWebhookData(userId, whId, defaultPair, defaultLotSize) {
  const [whpair, setWHpair] = useState(defaultPair || "");

  const [useFixedLotSize, setUseFixedLotSize] = useState(
    defaultLotSize > 0 ? true : false
  );
  const [fixedLotSize, setFixedLotSize] = useState(
    defaultLotSize > 0 ? defaultLotSize : ""
  );

  async function editWhData() {
    if (!userId || !whId) return;
    const r = await updateWebhookData(
      userId,
      whId,
      whpair,
      useFixedLotSize ? fixedLotSize : 0
    );
    return r;
  }

  return {
    whpair,
    setWHpair,
    useFixedLotSize,
    setUseFixedLotSize,
    fixedLotSize,
    setFixedLotSize,
    editWhData,
  };
}

export function EditWebhookColor(userId, whId, defaultColor) {
  const [whcolor, setWHcolor] = useState(defaultColor || "");

  async function editWhColor() {
    if (!userId || !whId) return;
    const r = await updateWebhookColor(userId, whId, whcolor);
    return r;
  }

  return { whcolor, setWHcolor, editWhColor };
}

export function getMessages(webhook) {
  const messages = webhook.messages;
  if (!messages) return [];

  let r = [];

  messages.forEach(function (str) {
    const d = getMessageData(str);
    d.type = typeToStr(d.type?.toString());
    r.push({ msg: str, data: d });
  });

  return r;
}

export function typeToStr(type) {
  switch (type) {
    case "0":
      return "BUY";
    case "1":
      return "SELL";
    case "2":
      return "BUT-STOP";
    case "3":
      return "SELL-STOP";
    case "4":
      return "BUY-LIMIT";
    case "5":
      return "SELL-LIMIT";
  }

  return type;
}

function periodToStr(type) {
  type = type.toString();
  switch (type) {
    case "0":
      return "Minutes";
    case "1":
      return "Hours";
    case "2":
      return "Days";
    case "3":
      return "Weeks";
    case "4":
      return "Months";
  }

  return type;
}

function strToPeriod(type) {
  type = type.toString();
  switch (type) {
    case "Minutes":
      return 0;
    case "Hours":
      return 1;
    case "Days":
      return 2;
    case "Weeks":
      return 3;
    case "Months":
      return 4;
  }

  return type;
}

export const GetWebhook = () => {
  const [webhooks, setWebhooks] = useState([]);

  const getAllWebhooks = async (userId, onlyPublic = false) => {
    if (!userId) return;
    let r = await getWebhooksByUserId(userId);
    if (r.length > 0)
      r = r.sort((a, b) => b?.created_at.seconds - a?.created_at.seconds);
    if (!onlyPublic) setWebhooks(r);
    else {
      const nr = r.filter((v, i) => v?.public);
      setWebhooks(nr);
    }
  };

  function changeWebhookData(data) {
    const i = webhooks.indexOf(webhooks.find((wh) => wh.id === data.id));
    if (i === -1) return;
    setWebhooks((whs) => {
      const r = whs;
      r[i] = data;
      return r;
    });
  }

  return { webhooks, getAllWebhooks, setWebhooks, changeWebhookData };
};

export const WebHooksC = createContext(null);

export const WebHookCC = ({ children, value }) => {
  return <WebHooksC.Provider value={value}>{children}</WebHooksC.Provider>;
};

export const GetWebhookContext = () => useContext(WebHooksC);

export function getMessageData(message) {
  // console.log("New basic webhook alert: ", message);
  if (!message) return;
  let datai = message.split(" ");

  let r = {
    advanced: false,
  };

  // if (datai.length > 1) {
  //   if (datai[0] === "test") {
  //     const testData = JSON.parse(datai[1]);
  //     r.test = { isTest: true, ...testData };

  //     datai = datai.filter((v, i) => i > 1);
  //     // console.log(datai, r);
  //   } else if (datai[0] === "manual") {
  //     const testData = JSON.parse(datai[1]);
  //     r.manual = { isManual: true, ...testData };

  //     datai = datai.filter((v, i) => i > 1);
  //     // console.log(datai, r);
  //   }
  // }

  let tsi = {
    use: false,
    start: "",
    stop: "",
    step: "",
  };
  let bei = { use: false, stop: "", partiel: "", activate: "", move: "" };
  let timei = {
    use: false,
    start: "",
    end: "",
    day: ["MON", "TUE", "WED"],
  };
  let hedgingi = {
    use: false,
    pending: "",
    period: 0,
    // max: "",
  };
  let maxSSi = { use: false, spread: "", slippage: "" };

  datai.forEach(function (v, i) {
    if (i == 0) {
      const t = v.toLowerCase();
      if (t === "market-order") r.msgType = 0;
      else if (t === "pending-order") r.msgType = 1;
      else if (t === "close-order") r.msgType = 2;
      else if (t === "update-sl") r.msgType = 3;
    } else if (i == 1) {
      r.pair = v;
    } else if (i == 2) {
      const t = v.toLowerCase();
      if (t === "buy") r.type = 0;
      else if (t === "sell") r.type = 1;
      else if (t === "buy-stop") r.type = 2;
      else if (t === "sell-stop") r.type = 3;
      else if (t === "buy-limit") r.type = 4;
      else if (t === "sell-limit") r.type = 5;
    }
    // else if (i === 2) {
    //   const t = v.toLowerCase();
    //   if (t === "limit") {
    //     if (r.type === 0) r.type = 4;
    //     else if (r.type === 1) r.type = 5;
    //   } else if (t === "stop") {
    //     if (r.type === 0) r.type = 2;
    //     else if (r.type === 1) r.type = 3;
    //   } else r.pair = v;
    // } else if (i === 2 && r.type > 1) {
    //   r.pair = v;
    // }
    // else if ((i === 2 && r.type <= 1) || (i === 3 && r.type > 1)) {
    //   if (v.search("%") >= 0) {
    //     r.positionType = 0;
    //     r.positionValue = v.replace("%", "");
    //   } else {
    //     r.positionType = 1;
    //     r.positionValue = v;
    //   }
    // }
    else {
      if (v.search("RISK=") >= 0) {
        const risk = v.replace("RISK=", "");
        if (risk.search("%") >= 0) {
          r.positionType = 0;
          r.positionValuePercentage = risk.replace("%", "");
        } else {
          r.positionType = 1;
          r.positionValue = risk;
        }
      } else if (v.search("PENDING-DISTANCE=") >= 0) {
        r.pendingDistance = v.replace("PENDING-DISTANCE=", "");
      } else if (v.search("STOP-LOSS=") >= 0) {
        r.stopLoss = v.replace("STOP-LOSS=", "");
      } else if (v.search("TAKE-PROFIT=") >= 0) {
        r.takeProfit = v.replace("TAKE-PROFIT=", "");
        // } else if (v.search("useTrailing=") >= 0) {
        //   tsi = { ...tsi, use: Boolean(v.replace("useTrailing=", "")) };
        // } else if (v.search("trailingStart=") >= 0) {
        //   tsi = { ...tsi, start: v.replace("trailingStart=", "") };
        // } else if (v.search("trailingStop=") >= 0) {
        //   tsi = { ...tsi, stop: v.replace("trailingStop=", "") };
        // } else if (v.search("trailingStep=") >= 0) {
        //   tsi = { ...tsi, step: v.replace("trailingStep=", "") };
        // } else if (v.search("useBreakEven=") >= 0) {
        //   bei = { ...bei, use: Boolean(v.replace("useBreakEven=", "")) };
        // } else if (v.search("stopInProfit=") >= 0) {
        //   bei = { ...bei, stop: v.replace("stopInProfit=", "") };
        // } else if (v.search("partialProfit=") >= 0) {
        //   bei = { ...bei, partiel: v.replace("partialProfit=", "") };
        // } else if (v.search("activateBE=") >= 0) {
        //   bei = { ...bei, activate: v.replace("activateBE=", "") };
        // } else if (v.search("moveSL=") >= 0) {
        //   bei = { ...bei, move: v.replace("moveSL=", "") };
        // } else if (v.search("useHedging=") >= 0) {
        //   hedgingi = { ...hedgingi, use: Boolean(v.replace("useHedging=", "")) };
        // } else if (v.search("pendingPeriod=") >= 0) {
        //   hedgingi = {
        //     ...hedgingi,
        //     period: strToPeriod(v.replace("pendingPeriod=", "")),
        //   };
        // } else if (v.search("pendingOrderDuration=") >= 0) {
        //   hedgingi = {
        //     ...hedgingi,
        //     pending: v.replace("pendingOrderDuration=", ""),
        //   };
        // } else if (v.search("useMax=") >= 0) {
        //   maxSSi = { ...maxSSi, use: Boolean(v.replace("useMax=", "")) };
        // } else if (v.search("maxSpread=") >= 0) {
        //   maxSSi = {
        //     ...maxSSi,
        //     spread: v.replace("maxSpread=", ""),
        //   };
        // } else if (v.search("maxSlippage=") >= 0) {
        //   maxSSi = {
        //     ...maxSSi,
        //     slippage: v.replace("maxSlippage=", ""),
        //   };
      } else if (v.search("PARTIAL-CLOSE=") >= 0) {
        r.positionValue = v.replace("PARTIAL-CLOSE=", "");
        r.positionType = 1;
      } else if (v.search("USE-TIME=") >= 0) {
        timei = { ...timei, use: Boolean(v.replace("USE-TIME=", "")) };
      } else if (v.search("USE-TIME") >= 0) {
        timei = { ...timei, use: true };
      } else if (v.search("START-TIME=") >= 0) {
        timei = { ...timei, start: v.replace("START-TIME=", "") };
      } else if (v.search("END-TIMES=") >= 0) {
        timei = { ...timei, end: v.replace("END-TIME=", "") };
      } else if (v.search("DAYS=") >= 0) {
        timei = { ...timei, day: v.replace("DAYS=", "").split(",") };
      } else if (v.search("ALL-TRADES") >= 0) {
        r.allTrades = true;
      } else if (v.search("MOVE-TO-BE") >= 0) {
        r.moveToBE = true;
      }
    }
  });

  // r.TS = tsi;
  // r.BE = bei;
  r.time = timei;
  // r.hedging = hedgingi;
  // r.maxSS = maxSSi;

  // if (
  //   Number(r.type) >= 0 &&
  //   // (Number(r.positionValue) > 0) &&
  //   Number(r.stopLoss) >= 0 &&
  //   Number(r.takeProfit) >= 0
  // )
  r.isValid = true;
  // else r.isValid = false;
  // console.log(r, message);
  // console.log(r.type, r.isValid);

  return r;
}

export function getMessageAdvancedData(msg, pair) {
  // console.log("New advanced webhook alert: ", pair, msg);
  let r = {
    advanced: true,
    pair,
    alertType: "",
    id: "",
    type: -1,
    symbol: "",
    riskPercentage: 0,
    fixedLotSize: 0,
    stopLoss: 0,
    takeProfit1: 0,
    parcielClose1: 0,
    takeProfit2: 0,
    parcielClose2: 0,
    takeProfit3: 0,
    parcielClose3: 0,

    breakEvenStart: 0,
    breakEvenOffset: 0,
    breakEvenPClose: 0,

    digits: 0,
    pointValue: 0,
    points: 0,
    price: 0,

    partialClose: 0,
    comment: "",

    isValid: false,
  };
  const dataArray = msg.split(",");

  dataArray.forEach((v) => {
    const data = v.split(":");
    if (data.length === 2) {
      let key = data[0];
      let value = data[1];
      key = key.replace(/\s+/g, "");
      key = key.toUpperCase();
      value = value.replace(/\s+/g, "");

      switch (key) {
        case "ALERT_TYPE":
          r.alertType = value;
          break;

        case "PAIR":
          r.pair = value;
          break;

        case "ID":
          r.id = value;
          break;
        case "TYPE":
          if (value?.toLowerCase() === "buy") r.type = 0;
          else if (value?.toLowerCase() === "sell") r.type = 1;
          break;

        case "RISK":
          if (value.indexOf("%") >= 0) {
            const val = value.replace("%", "");
            r.riskPercentage = Number(val);
          } else r.fixedLotSize = 0; // Number(value);

          r.riskPercentage = Number(value);
          break;

        case "FIXEDLOTSIZE":
          r.fixedLotSize = Number(value);
          break;

        case "SL":
          r.stopLoss = Number(value);
          break;

        case "TP1":
          r.takeProfit1 = Number(value);
          break;
        case "TP1_PCLOSE":
          r.parcielClose1 = Number(value);
          break;

        case "TP2":
          r.takeProfit2 = Number(value);
          break;
        case "TP2_PCLOSE":
          r.parcielClose2 = Number(value);
          break;
        case "TP3":
          r.takeProfit3 = Number(value);
          break;
        case "TP3_PCLOSE":
          r.parcielClose3 = Number(value);
          break;

        case "BE":
          r.breakEvenStart = Number(value);
          break;
        case "BE_OFFSET":
          r.breakEvenOffset = Number(value);
          break;
        case "BE_PCLOSE":
          r.breakEvenPClose = Number(value);
          break;

        case "PARTIAL_CLOSE":
          r.partialClose = Number(value);
          break;
        case "COMMENT":
          r.comment = value;
          break;

        case "POINTS":
          r.pointValue = Number(value);
          break;
        case "DIGITS":
          r.digits = Number(value);
          // r.points = calculatePoints(Number(value));
          break;
        case "PRICE":
          r.price = Number(value);
          break;
        case "PIPS":
          r.points = Number(value);
          break;
      }
    }
  });

  if (r.alertType) r.isValid = true;

  return r.alertType ? r : null;
}
