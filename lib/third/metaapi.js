import axios from "axios";
import { generateRandomString } from "../../utils/functions.js";
import { metaApiToken } from "../../utils/constant.js";

const token = metaApiToken;

const apiURL = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";
const apiDataURL = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

async function getMTProfileByServerName(serverName, version) {
  console.log("Checking MT profiles for server ...", serverName);
  const v = version == "mt4" ? 4 : 5;
  try {
    const req = await axios.get(
      apiURL + "/users/current/provisioning-profiles?version=" + v,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    // console.log(req.data);
    if (req.data.error) {
      if (req.data.id) {
        console.log(req.data);
      }
      return { error: req.data.message };
    } else {
      let r = { valid: true, id: "" };
      if (req.data?.length > 0) {
        const data = req.data;
        for (let i = 0; i < data.length; i++) {
          const name = data[i].name;
          if (serverName.search(name) >= 0) r.id = data[i]._id;
        }
        // console.log(r, data);
      }
      return r;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function addMTAccount(
  accountName,
  accountNumber,
  accountPassword,
  accountServer,
  accountType,
  profileId = ""
) {
  console.log("Adding new MT API account ...");

  const transactionId = generateRandomString(32);

  try {
    if (profileId === "") {
      const pr = await getMTProfileByServerName(accountServer, accountType);
      if (pr.valid && pr.id) profileId = pr.id;
      console.log("profileId: ", profileId);
    }
    const req = await axios.post(
      apiURL + "/users/current/accounts",
      {
        login: accountNumber,
        password: accountPassword,
        name: accountName,
        server: accountServer,
        platform: accountType,
        region: "new-york",
        manualTrades: true,
        metastatsApiEnabled: true,
        magic: 0,
        provisioningProfileId: profileId,
      },
      {
        headers: {
          "auth-token": token,
          "transaction-id": transactionId,
        },
      }
    );
    console.log(req);
    if (req.data.error) {
      if (req.data.id) {
        console.log(req.data);
      }
      return { error: req.data.message };
    }
    return req.data;
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function deleteMTAPIaccount(accountApiId) {
  console.log("delete account API ... ", accountApiId);

  try {
    const req = await axios.delete(
      apiURL + "/users/current/accounts/" + accountApiId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getAccountInformation(accountApiId) {
  console.log("Get account information ... ", accountApiId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/account-information",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getSymbolInformation(accountApiId, symbol) {
  console.log("Get symbol information ... ", accountApiId), symbol;

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/symbols/" +
        symbol +
        "/specification",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getSymbolPrice(accountApiId, symbol) {
  console.log("Get symbol price ... ", accountApiId), symbol;

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/symbols/" +
        symbol +
        "/current-price",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getHistoryOrders(accountApiId, startTime, offset = 0) {
  console.log("Get history trades ... ", accountApiId, startTime);

  const currentDate = new Date();
  const endTime = new Date(
    currentDate.setDate(currentDate.getDate() + 2)
  ).toISOString();

  if (!startTime)
    startTime = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 30)
    ).toISOString();
  else startTime = new Date(startTime).toISOString();

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/time/" +
        startTime +
        "/" +
        endTime +
        "?limit=1000&offset=" +
        offset,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      // console.log(startTime, endTime, req.data);
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getActiveOrders(accountApiId) {
  console.log("Get Active trades ... ", accountApiId);

  try {
    const req = await axios.get(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/positions",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getHistoryOrderById(accountApiId, orderId) {
  console.log("Get History Order by OrderId ... ", accountApiId, orderId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/ticket/" +
        orderId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getOrdernById(accountApiId, orderId) {
  console.log("Get order by orderId ... ", accountApiId, orderId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/orders/" +
        orderId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getPositionById(accountApiId, positionId) {
  console.log("Get Position by PositionId ... ", accountApiId, positionId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/positions/" +
        positionId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function getHistoryPositionById(accountApiId, positionId) {
  console.log(
    "Get History position by positionId ... ",
    accountApiId,
    positionId
  );

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/position/" +
        positionId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function openTrade(
  accountApiId,
  id,
  actionType,
  symbol,
  volume,
  SL,
  TP,
  slPrice,
  tpPrice,
  volumePercentage
) {
  console.log("Open a trade ... ", accountApiId);
  try {
    let slData = {};
    let tpData = {};

    const symPriceReq = getSymbolPrice(accountApiId, symbol);
    const symInfoReq = getSymbolInformation(accountApiId, symbol);

    const [symPrice, symInfo] = await Promise.all([symPriceReq, symInfoReq]);

    if (symPrice?.error) {
      return { error: symPrice.error.error, message: symPrice.error.message };
    }
    if (symInfo?.error) {
      return { error: symInfo.error.error, message: symInfo.error.message };
    }

    let ask = symPrice.ask;
    let bid = symPrice.bid;

    // let pips = symbolInfo.pipSize;
    let pips = symInfo.tickSize;

    const minVolume = symInfo.minVolume;
    const maxVolume = symInfo.maxVolume;
    const volumeStep = symInfo.volumeStep;

    let stopLoss = 0;
    if (slPrice) stopLoss = Number(slPrice);
    else if (SL) {
      if (actionType == "buy") stopLoss = ask - SL * pips;
      else if (actionType == "sell") stopLoss = bid + SL * pips;
    }

    let takeProfit = 0;
    if (tpPrice) takeProfit = Number(tpPrice);
    else if (TP) {
      if (actionType == "buy") takeProfit = ask + TP * pips;
      else if (actionType == "sell") takeProfit = bid - TP * pips;
    }

    if (stopLoss)
      slData = { stopLossUnits: "ABSOLUTE_PRICE", stopLoss: Number(stopLoss) };
    if (takeProfit)
      tpData = {
        takeProfitUnits: "ABSOLUTE_PRICE",
        takeProfit: Number(takeProfit),
      };

    // console.log(symPrice);

    let lotSize = Number(volume);

    if (volumePercentage) {
      let equity = symPrice.equity;

      if (!equity) {
        const eqReq = await getAccountInformation(accountApiId);
        equity = eqReq.equity;
      }

      let lossTickValue = symPrice.lossTickValue;

      let riskAmmount = (equity * Number(volumePercentage)) / 100;

      let slPips = Math.abs(bid - stopLoss) / pips;
      if (actionType == "buy") Math.abs(ask - stopLoss) / pips;

      let riskLot = riskAmmount / (slPips * lossTickValue);

      lotSize = Number(riskLot);

      // console.log(equity, riskLot, lossTickValue, slPips);

      if (!lotSize) lotSize = minVolume;
    }

    lotSize = Math.round(lotSize / volumeStep) * volumeStep;
    lotSize = Math.min(lotSize, maxVolume);
    lotSize = Math.max(lotSize, minVolume);

    console.log(
      actionType + " " + lotSize + " " + symbol + " " + id,
      slData,
      tpData
    );

    // throw new Error("Error");

    const positionType =
      actionType == "buy"
        ? "ORDER_TYPE_BUY"
        : actionType == "sell"
        ? "ORDER_TYPE_SELL"
        : "";

    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      {
        actionType: positionType,
        symbol: symbol,
        volume: Number(lotSize),
        clientId: id,
        ...slData,
        ...tpData,
      },
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);

    // throw new Error("Error");
    return { error: e.response.data, errorMessage: e.response?.data?.message };
  }
}

export async function closeTradeByWHID(
  accountApiId,
  tradeId,
  symbol,
  actionType,
  partialClose = 0,
  all,
  moveToBE
) {
  console.log("Close a trade by webhook ID ... ", accountApiId, " ", tradeId);
  const res = [];

  try {
    const listOfTrades = await getActiveOrders(accountApiId);
    const positionType =
      actionType == "buy"
        ? "POSITION_TYPE_BUY"
        : actionType == "sell"
        ? "POSITION_TYPE_SELL"
        : "";

    // console.log("l", listOfTrades);

    for (let i = 0; i < listOfTrades.length; i++) {
      const trade = listOfTrades[i];
      console.log(
        "Close trade by webhook ID",
        trade.clientId,
        trade.volume,
        " | ",
        tradeId
      );

      if (!symbol?.toLowerCase() == "all" || !symbol) all = true;

      if (all || (trade.clientId && trade.clientId?.includes(tradeId)))
        if (
          trade.symbol === symbol ||
          symbol?.toLowerCase() == "all" ||
          !symbol
        ) {
          if (trade.type === positionType || !positionType) {
            let pClose = trade.volume;

            if (partialClose > 0 && partialClose < 100) {
              pClose = (trade.volume * partialClose) / 100;
              pClose = Math.ceil(pClose * 100) / 100;
            }

            const r = await closeTrade(
              accountApiId,
              trade.id,
              partialClose,
              pClose
            );

            if (r.orderId) {
              res.push({
                tradeId: trade.id,
                trade: trade,
                orderId: r.orderId,
                msg: "Order closed successfully",
              });
            } else {
              res.push({
                tradeId: trade.id,
                trade: trade,
                orderId: trade.id,
                errorMessage: "Closing trade:  " + r.message,
                msg: "Error closing the order",
              });
            }

            if (moveToBE) {
              const r1 = await modifyTPandSLprice(
                accountApiId,
                trade.id,
                trade.openPrice,
                trade.takeProfit
              );

              if (r1.orderId) {
                res.push({
                  orderId: r1.positionId,
                  trade: trade,
                  msg: "Stop loss move to break even successfully",
                });
              } else {
                res.push({
                  orderId: trade.id,
                  error: r1.message,
                  trade: trade,
                  msg: "Error moving SL to breakeven",
                  errorMessage: "Modifying trade:  " + r.message,
                });
              }
            }
          }
        }
    }

    if (res.length === 0)
      return {
        errorMessage: "No trade available to close!",
        message: "No trade available to close!",
        error: "No trade available to close!",
      };

    return res;
  } catch (e) {
    console.error("Error : ", e.response.data);

    return { error: e.response.data, errorMessage: e.response?.data?.message };
  }
}

export async function modifyTradeByWHID(
  accountApiId,
  tradeId,
  symbol,
  actionType,
  SL,
  slPrice,
  all
) {
  console.log("Modify a trade by webhook ID ... ", accountApiId, " ", tradeId);
  const res = [];

  try {
    const listOfTrades = await getActiveOrders(accountApiId);
    const positionType =
      actionType == "buy"
        ? "POSITION_TYPE_BUY"
        : actionType == "sell"
        ? "POSITION_TYPE_SELL"
        : "";

    const symbolInfo = await getSymbolInformation(accountApiId, symbol);

    if (listOfTrades.length > 0)
      for (let i = 0; i < listOfTrades.length; i++) {
        const trade = listOfTrades[i];

        if (!symbol?.toLowerCase() == "all" || !symbol) all = true;
        if (all || trade.clientId?.includes(tradeId))
          if (
            trade.symbol === symbol ||
            symbol?.toLowerCase() == "all" ||
            !symbol
          ) {
            if (trade.type == positionType || !positionType) {
              console.log("Modify a trade", trade.id);

              let stopLoss = null;
              if (slPrice) stopLoss = Number(slPrice);
              else if (SL) {
                if (actionType == "buy")
                  stopLoss = trade.currentPrice - SL * symbolInfo.tickSize;
                else if (actionType == "sell")
                  stopLoss = trade.currentPrice + SL * symbolInfo.tickSize;
              }

              const r = await modifyTrade(
                accountApiId,
                trade.id,
                null,
                stopLoss,
                null,
                trade.takeProfit
              );
              // console.log(r);
              if (r.positionId) {
                res.push({
                  tradeId: trade.id,
                  positionId: r.positionId,
                  orderId: r.positionId,
                  msg: "Order modified successfully",
                });
              } else {
                res.push({
                  orderId: trade.id,
                  positionId: trade.positionId,
                  error: r,
                  errorMessage: r.message,
                  msg: "Error with updating the stop loss",
                });
              }
            }
          }
      }

    if (res.length === 0)
      return {
        errorMessage: "No trade availble to modify!",
        msg: "No trade availble to modify!",
      };

    return res;
  } catch (e) {
    console.error("Error : ", e.response.data);

    return { error: e.response.data, errorMessage: e.response?.data?.message };
  }
}

export async function closeTrade(
  accountApiId,
  tradeId,
  partialClosePercentage = 0,
  partialClose = 0
) {
  console.log("Close a trade ... ", accountApiId, " ", tradeId);

  let data = {
    actionType: "POSITION_CLOSE_ID",
    positionId: tradeId,
  };

  if (partialClosePercentage > 0 && partialClosePercentage < 100)
    data = {
      actionType: "POSITION_PARTIAL",
      positionId: tradeId,
      volume: partialClose,
    };

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      data,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function modifyTrade(
  accountApiId,
  tradeId,
  sl,
  slPrice,
  tp,
  tpPrice
) {
  console.log(
    "Modify a trade ... ",
    accountApiId,
    " ",
    tradeId,
    "  ",
    sl,
    " ",
    slPrice
  );

  let slData = {};
  let tpData = {};

  if (slPrice)
    slData = { stopLossUnits: "ABSOLUTE_PRICE", stopLoss: Number(slPrice) };
  else if (sl)
    slData = { stopLossUnits: "RELATIVE_PIPS", stopLoss: Number(sl) };

  if (tpPrice)
    tpData = { takeProfitUnits: "ABSOLUTE_PRICE", takeProfit: Number(tpPrice) };
  else if (tp)
    tpData = { takeProfitUnits: "RELATIVE_PIPS", takeProfit: Number(tp) };

  let data = {
    actionType: "POSITION_MODIFY",
    positionId: tradeId,
    ...slData,
    ...tpData,
  };

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      data,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      // console.log(req.data);
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}

export async function modifyTPandSLprice(
  accountApiId,
  tradeId,
  SLprice,
  TPprice
) {
  console.log(
    "Modify a trade ... ",
    accountApiId,
    " ",
    tradeId,
    " new-sl ",
    SLprice
  );

  let data = {
    actionType: "POSITION_MODIFY",
    positionId: tradeId,
    stopLoss: Number(SLprice),
    takeProfit: Number(TPprice),
    stopLossUnits: "ABSOLUTE_PRICE",
  };

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      data,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.response.data);
    return { error: e.response.data };
  }
}
