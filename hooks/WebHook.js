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
} from "../db/webhooks";
import axios from "axios";

export const WebhookAdvanced = (userId) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [useDigits, setUseDigits] = useState(false);
  const [digits, setDigits] = useState("");

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
      useDigits ? digits : null
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
    digits,
    setDigits,
    useDigits,
    setUseDigits,
  };
};

export const WebHook = (userId) => {
  const [error, setError] = useState("");
  const [succTestMsg, setSuccTestMsg] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [type, setType] = useState(0);
  const [pendingDistance, setPendingDistance] = useState("");
  const [positionType, setPositionType] = useState(0);
  const [positionValue, setPositionValue] = useState("1");
  const [stopLoss, setStopLoss] = useState("200.0");
  const [takeProfit, setTakeProfit] = useState("200.0");

  const [TS, setTS] = useState({
    use: false,
    start: "",
    stop: "",
    step: "",
  });
  const [BE, setBE] = useState({
    use: false,
    stop: "",
    partiel: "",
    activate: "",
    move: "",
  });
  const [time, setTime] = useState({
    use: false,
    start: "",
    end: "",
    day: ["MON", "TUE", "WED"],
  });
  const [hedging, setHedging] = useState({
    use: false,
    pending: "",
    max: "",
    period: 0,
  });
  const [maxSS, setMaxSS] = useState({ use: false, spread: "", slippage: "" });

  function formatMsg() {
    let msg = typeToStr(type.toString()) + " " + pair + " ";
    if (positionType === 1) {
      msg += positionValue + " ";
    } else {
      msg += positionValue + "% ";
    }
    if (pendingDistance) msg += "pendingDistance=" + pendingDistance + " ";

    msg += "takeProfit=" + takeProfit + " ";
    msg += "stopLoss=" + stopLoss + " ";

    if (TS.use) {
      msg += "useTrailing=" + TS.use + " ";
      msg += "trailingStart=" + TS.start + " ";
      msg += "trailingStop=" + TS.stop + " ";
      msg += "trailingStep=" + TS.step + " ";
    }

    if (BE.use) {
      msg += "useBreakEven=" + BE.use + " ";
      msg += "stopInProfit=" + BE.stop + " ";
      msg += "partialProfit=" + BE.partiel + " ";
      msg += "activateBE=" + BE.activate + " ";
      msg += "moveSL=" + BE.move + " ";
    }

    if (hedging.use) {
      msg += "useHedging=" + hedging.use + " ";
      msg += "pendingPeriod=" + periodToStr(hedging.period) + " ";
      msg += "pendingOrderDuration=" + hedging.pending + " ";
      // msg += "-MT " + hedging.max + " ";
    }

    if (maxSS.use) {
      msg += "useMax=" + maxSS.use + " ";
      msg += "maxSpread=" + maxSS.spread + " ";
      msg += "maxSlippage=" + maxSS.slippage + " ";
    }

    if (time.use) {
      msg += "useTime=" + time.use + " ";
      let days = "";
      time.day.forEach((d, i) => {
        days += (i > 0 ? "," : "") + d;
      });

      msg += "days=" + days + " ";
      msg += "startTime=" + time.start + " ";
      msg += "endTime=" + time.end + " ";
    }

    return msg;
  }

  function getData(str) {
    if (!str) return;
    const r = getMessageData(str);

    // console.log(str, r);

    setPair(r.pair);
    setType(r.type);
    setPendingDistance(r.pendingDistance);
    setPositionType(r.positionType);
    setPositionValue(r.positionValue);
    setStopLoss(r.stopLoss);
    setTakeProfit(r.takeProfit);

    setTS(r.TS);
    setBE(r.BE);
    setTime(r.time);
    setHedging(r.hedging);
    setMaxSS(r.maxSS);
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
    stopLoss,
    setStopLoss,
    takeProfit,
    setTakeProfit,
    TS,
    setTS,
    BE,
    setBE,
    time,
    setTime,
    hedging,
    setHedging,
    maxSS,
    setMaxSS,
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
      return "Buy";
    case "1":
      return "Sell";
    case "2":
      return "Buy stop";
    case "3":
      return "Sell stop";
    case "4":
      return "Buy limit";
    case "5":
      return "Sell limit";
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

  if (datai.length > 1) {
    if (datai[0] === "test") {
      const testData = JSON.parse(datai[1]);
      r.test = { isTest: true, ...testData };

      datai = datai.filter((v, i) => i > 1);
      // console.log(datai, r);
    } else if (datai[0] === "manual") {
      const testData = JSON.parse(datai[1]);
      r.manual = { isManual: true, ...testData };

      datai = datai.filter((v, i) => i > 1);
      // console.log(datai, r);
    }
  }

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
      if (t === "buy") r.type = 0;
      else if (t === "sell") r.type = 1;
    } else if (i === 1) {
      const t = v.toLowerCase();
      if (t === "limit") {
        if (r.type === 0) r.type = 4;
        else if (r.type === 1) r.type = 5;
      } else if (t === "stop") {
        if (r.type === 0) r.type = 2;
        else if (r.type === 1) r.type = 3;
      } else r.pair = v;
    } else if (i === 2 && r.type > 1) {
      r.pair = v;
    } else if ((i === 2 && r.type <= 1) || (i === 3 && r.type > 1)) {
      if (v.search("%") >= 0) {
        r.positionType = 0;
        r.positionValue = v.replace("%", "");
      } else {
        r.positionType = 1;
        r.positionValue = v;
      }
    } else {
      if (v.search("pendingDistance=") >= 0) {
        r.pendingDistance = v.replace("pendingDistance=", "");
      } else if (v.search("stopLoss=") >= 0) {
        r.stopLoss = v.replace("stopLoss=", "");
      } else if (v.search("takeProfit=") >= 0) {
        r.takeProfit = v.replace("takeProfit=", "");
      } else if (v.search("useTrailing=") >= 0) {
        tsi = { ...tsi, use: Boolean(v.replace("useTrailing=", "")) };
      } else if (v.search("trailingStart=") >= 0) {
        tsi = { ...tsi, start: v.replace("trailingStart=", "") };
      } else if (v.search("trailingStop=") >= 0) {
        tsi = { ...tsi, stop: v.replace("trailingStop=", "") };
      } else if (v.search("trailingStep=") >= 0) {
        tsi = { ...tsi, step: v.replace("trailingStep=", "") };
      } else if (v.search("useBreakEven=") >= 0) {
        bei = { ...bei, use: Boolean(v.replace("useBreakEven=", "")) };
      } else if (v.search("stopInProfit=") >= 0) {
        bei = { ...bei, stop: v.replace("stopInProfit=", "") };
      } else if (v.search("partialProfit=") >= 0) {
        bei = { ...bei, partiel: v.replace("partialProfit=", "") };
      } else if (v.search("activateBE=") >= 0) {
        bei = { ...bei, activate: v.replace("activateBE=", "") };
      } else if (v.search("moveSL=") >= 0) {
        bei = { ...bei, move: v.replace("moveSL=", "") };
      } else if (v.search("useHedging=") >= 0) {
        hedgingi = { ...hedgingi, use: Boolean(v.replace("useHedging=", "")) };
      } else if (v.search("pendingPeriod=") >= 0) {
        hedgingi = {
          ...hedgingi,
          period: strToPeriod(v.replace("pendingPeriod=", "")),
        };
      } else if (v.search("pendingOrderDuration=") >= 0) {
        hedgingi = {
          ...hedgingi,
          pending: v.replace("pendingOrderDuration=", ""),
        };
      } else if (v.search("useMax=") >= 0) {
        maxSSi = { ...maxSSi, use: Boolean(v.replace("useMax=", "")) };
      } else if (v.search("maxSpread=") >= 0) {
        maxSSi = {
          ...maxSSi,
          spread: v.replace("maxSpread=", ""),
        };
      } else if (v.search("maxSlippage=") >= 0) {
        maxSSi = {
          ...maxSSi,
          slippage: v.replace("maxSlippage=", ""),
        };
      } else if (v.search("useTime=") >= 0) {
        timei = { ...timei, use: Boolean(v.replace("useTime=", "")) };
      } else if (v.search("startTime=") >= 0) {
        timei = { ...timei, start: v.replace("startTime=", "") };
      } else if (v.search("endTime=") >= 0) {
        timei = { ...timei, end: v.replace("endTime=", "") };
      } else if (v.search("days=") >= 0) {
        timei = { ...timei, day: v.replace("days=", "").split(",") };
      }
    }
  });

  r.TS = tsi;
  r.BE = bei;
  r.time = timei;
  r.hedging = hedgingi;
  r.maxSS = maxSSi;

  if (
    Number(r.type) >= 0 &&
    Number(r.positionValue) > 0 &&
    Number(r.stopLoss) >= 0 &&
    Number(r.takeProfit) >= 0
  )
    r.isValid = true;
  else r.isValid = false;
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

    parcialClose: 0,
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
          r.riskPercentage = Number(value);
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
          r.parcialClose = Number(value);
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

  if (Number(r.type) >= 0 && Number(r.riskPercentage) > 0) r.isValid = true;

  return r.alertType ? r : null;
}
