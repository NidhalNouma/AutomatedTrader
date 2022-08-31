import { useState, useEffect, useContext, createContext } from "react";
import { addWebhook, getWebhooksByUserId } from "../db/webhooks";

export const WebHook = (userId) => {
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [pair, setPair] = useState("");
  const [positionType, setPositionType] = useState("Percentage");
  const [positionValue, setPositionValue] = useState("");
  const [stopLoss, setStopLoss] = useState("");
  const [takeProfit, setTakeProfit] = useState("");
  //   const [useTrailingStop, setUseTrailingStop] = useState(false);
  //   const [trailingStart, setTrailingStart] = useState("");
  //   const [trailingStop, setTrailingStop] = useState("");
  //   const [trailingStep, setTrailingStep] = useState("");
  const [TS, setTS] = useState({
    use: false,
    start: "",
    stop: "",
    step: "",
  });
  const [BE, setBE] = useState({ use: false, stop: "", partiel: "" });
  const [time, setTime] = useState({ use: false, start: "", end: "" });
  const [hedging, setHedging] = useState({ use: false, pending: "", max: "" });
  const [maxSS, setMaxSS] = useState({ use: false, spread: "", slippage: "" });

  function formatMsg() {
    let msg = "-P " + pair + " ";
    msg += "-PO " + positionType + " ";
    msg += "-POV " + positionValue + " ";
    msg += "-SL " + stopLoss + " ";
    msg += "-TP " + takeProfit + " ";

    if (TS.use) {
      msg += "-TS " + TS.use + " ";
      msg += "-TSs " + TS.start + " ";
      msg += "-TSo " + TS.stop + " ";
      msg += "-TSe " + TS.step + " ";
    }

    if (BE.use) {
      msg += "-BE " + BE.use + " ";
      msg += "-SP " + BE.stop + " ";
      msg += "-PP " + BE.partiel + " ";
    }

    if (time.use) {
      msg += "-TF " + time.use + " ";
      msg += "-TIS " + time.start + " ";
      msg += "-TIE " + time.end + " ";
    }

    if (hedging.use) {
      msg += "-HE " + hedging.use + " ";
      msg += "-POD " + hedging.pending + " ";
      msg += "-MT " + hedging.max + " ";
    }

    if (maxSS.use) {
      msg += "-MXSS " + maxSS.use + " ";
      msg += "-MXp " + maxSS.spread + " ";
      msg += "-MXl " + maxSS.slippage + " ";
    }

    return msg;
  }

  function getData(str) {
    const data = str.split(" ");
    const dataLength = data.length;

    data.forEach(function (v, i) {
      if (i + 1 < dataLength) {
        const data = data[i + 1];
        switch (v) {
          case "-P":
            setPair(data);
            break;

          case "-PO":
            setPositionType(data);
            break;

          case "-POV":
            setPositionValue(data);
            break;

          case "-SL":
            setStopLoss(data);
            break;
          case "-TP":
            setTakeProfit(data);
            break;
        }
      }
    });
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

  return {
    name,
    setName,
    pair,
    setPair,
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
  };
};

export const GetWebhook = () => {
  const [webhooks, setWebhooks] = useState([]);

  const getAllWebhooks = async (userId) => {
    if (!userId) return;
    const r = await getWebhooksByUserId(userId);
    setWebhooks(r);
  };

  return { webhooks, getAllWebhooks };
};

export const WebHooksC = createContext(null);

export const WebHookCC = ({ children, value }) => {
  return <WebHooksC.Provider value={value}>{children}</WebHooksC.Provider>;
};

export const GetWebhookContext = () => useContext(WebHooksC);
