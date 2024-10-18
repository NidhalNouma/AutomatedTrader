export function getMessageData(msg, symbol, fixedLotSize) {
  let message = null;
  if (typeof msg === "string") message = msg;
  else if (typeof msg === "object") message = msg.value;
  if (!message) return null;
  let datai = message.split(" ");

  let r = {
    // advanced: false,
    msgName: "",
  };

  let timei = {
    use: false,
    start: "",
    end: "",
    day: ["MON", "TUE", "WED"],
  };

  datai.forEach(function (v, i) {
    if (i == 0) {
      const t = v.toLowerCase();
      if (t === "market-order") r.msgType = 0;
      else if (t === "pending-order") r.msgType = 1;
      else if (t === "close-order") r.msgType = 2;
      else if (t === "update-sl") r.msgType = 3;
    } else if (i == 1) {
      r.pair = v;
      if (symbol) r.pair = symbol;
      r.pair = r.pair?.replace(/\s/g, "");
    } else if (i == 2) {
      const t = v.toLowerCase();
      r.type = t;
      //   if (t === "buy") r.type = 0;
      //   else if (t === "sell") r.type = 1;
      //   else if (t === "buy-stop") r.type = 2;
      //   else if (t === "sell-stop") r.type = 3;
      //   else if (t === "buy-limit") r.type = 4;
      //   else if (t === "sell-limit") r.type = 5;
    } else {
      if (v.search("RISK=") >= 0) {
        const risk = v.replace("RISK=", "");
        if (risk.search("%") >= 0) {
          r.usePositionPercentage = true;
          const riskPer = risk.replace("%", "");
          r.positionValuePercentage = Number(riskPer).toFixed(2);
        } else {
          r.useFixedLotSize = true;
          r.positionValue = Number(risk).toFixed(2);
        }

        if (fixedLotSize) {
          r.useFixedLotSize = true;
          r.positionValue = Number(fixedLotSize).toFixed(2);

          r.positionValuePercentage = 0;
          r.usePositionPercentage = false;
        }
      } else if (v.search("FIXED-SIZE=") >= 0) {
        const lotSize = v.replace("FIXED-SIZE=", "");

        r.useFixedLotSize = true;
        r.positionValue = Number(lotSize).toFixed(2);
      } else if (v.search("PENDING-DISTANCE=") >= 0) {
        r.pendingDistance = v.replace("PENDING-DISTANCE=", "");
      } else if (v.search("STOP-LOSS=") >= 0) {
        r.useStopLoss = true;
        r.stopLoss = v.replace("STOP-LOSS=", "");
      } else if (v.search("TAKE-PROFIT=") >= 0) {
        r.useTakeProfit = true;
        r.takeProfit = v.replace("TAKE-PROFIT=", "");
      } else if (v.search("STOP-LOSS-@=") >= 0) {
        r.stopLossPrice = v.replace("STOP-LOSS-@=", "");
      } else if (v.search("TAKE-PROFIT-@=") >= 0) {
        r.takeProfitPrice = v.replace("TAKE-PROFIT-@=", "");
      } else if (v.search("PARTIAL-CLOSE=") >= 0) {
        r.usePartialClose = true;
        r.partialCloseValue = v.replace("PARTIAL-CLOSE=", "");
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
      } else if (v.search("MANUEL-") >= 0) {
        const testData = JSON.parse(v.replace("MANUEL-", ""));
        r.manual = { isManual: true, ...testData };
      } else if (v.search("MSG-NAME") >= 0) {
        r.msgName = v.replace("MSG-NAME=", "");
      }
    }
  });

  r.time = timei;

  r.isValid = false;

  if (r.type?.length > 0 && r.pair?.length > 0 && r.msgType >= 0) {
    r.isValid = true;
  }

  return r;
}

export function presetToMsgData(preset) {
  let msgData = {
    ...preset.data,
    msgType: preset.type,
    pair: preset.data?.pair?.replace(/\s/g, ""),
    allTrades: true,
    type: preset.data?.type?.value?.toLowerCase() || "both",
    useStopLoss: preset.data?.stopLoss > 0 ? true : false,
    useTakeProfit: preset.data?.takeProfit > 0 ? true : false,
    usePartialClose: preset.data?.partialCloseValue > 0 ? true : false,
  };

  return msgData;
}
