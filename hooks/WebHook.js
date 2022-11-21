import { useState, useEffect, useContext, createContext } from "react";
import {
  addWebhook,
  addMessage,
  deleteMessage,
  getWebhooksByUserId,
  activeWebhook,
  publicWebhook,
} from "../db/webhooks";

export const WebHook = (userId) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [type, setType] = useState(0);
  const [pendingDistance, setPendingDistance] = useState("");
  const [positionType, setPositionType] = useState(0);
  const [positionValue, setPositionValue] = useState("0.1");
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
    add,
    addMsg,
    editMsg,
    getData,
  };
};

export async function setActiveWebhook(id, active) {
  const r = activeWebhook(id, active);
  return r;
}

export async function setPublicWebhook(id, ispublic) {
  const r = publicWebhook(id, ispublic);
  return r;
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

function typeToStr(type) {
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

  const getAllWebhooks = async (userId) => {
    if (!userId) return;
    const r = await getWebhooksByUserId(userId);
    setWebhooks([...r]);
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
  if (!message) return;
  const datai = message.split(" ");

  let r = {};

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

  return r;
}
