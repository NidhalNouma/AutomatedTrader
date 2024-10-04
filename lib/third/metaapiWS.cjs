const MetaApi = require("metaapi.cloud-sdk").default;

let api = null;

let start = async () => {
  const { metaApiToken } = await import("../../utils/constant.js");
  api = new MetaApi(metaApiToken);
  // console.log(api);
};

start();

async function openTrade(
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
    if (!api?.accountApiId) await start();
    const account = await api.metatraderAccountApi.getAccount(accountApiId);
    const connection = account.getRPCConnection();

    await connection.connect();
    await connection.waitSynchronized();

    const positionType =
      actionType == "buy"
        ? "POSITION_TYPE_BUY"
        : actionType == "sell"
        ? "POSITION_TYPE_SELL"
        : "";

    const symbolInfo = await connection.getSymbolSpecification(symbol);
    console.log(symbolInfo);
    const symbolPrice = await connection.getSymbolPrice(symbol);
    console.log(symbolInfo, symbolInfo.tickSize, symbolPrice);

    // throw error("Error");

    let ask = symbolPrice.ask;
    let bid = symbolPrice.bid;

    // let pips = symbolInfo.pipSize;
    let pips = symbolInfo.tickSize;

    const minVolume = symbolInfo.minVolume;
    const maxVolume = symbolInfo.maxVolume;
    const volumeStep = symbolInfo.volumeStep;

    // console.log(ask, bid);

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

    // console.log(slPrice, stopLoss);

    let lotSize = Number(volume);

    if (volumePercentage) {
      // const accountInfo = await connection.getAccountInformation();
      // console.log(accountInfo);
      let equity = symbolPrice.equity;

      // let accountCurrencyExchangeRate = symbolPrice.accountCurrencyExchangeRate;
      let lossTickValue = symbolPrice.lossTickValue;

      // let pointPerTick = accountCurrencyExchangeRate / pips;

      let riskAmmount = (equity * Number(volumePercentage)) / 100;

      let slPips = Math.abs(bid - stopLoss) / pips;
      if (actionType == "buy") Math.abs(ask - stopLoss) / pips;

      let riskLot = riskAmmount / (slPips * lossTickValue);

      // console.log(riskLot, slPips, riskAmmount, pointPerTick);
      lotSize = Number(riskLot);
    }

    lotSize = Math.round(lotSize / volumeStep) * volumeStep;
    lotSize = Math.min(lotSize, maxVolume);
    lotSize = Math.max(lotSize, minVolume);

    let trade = null;

    if (actionType == "buy")
      trade = await connection.createMarketBuyOrder(
        symbol,
        lotSize,
        stopLoss,
        takeProfit,
        { clientId: id }
      );
    else if (actionType == "sell")
      trade = await connection.createMarketSellOrder(
        symbol,
        lotSize,
        stopLoss,
        takeProfit,
        { clientId: id }
      );

    console.log(trade);

    if (trade) {
      return trade;
    } else {
      return { error: trade };
    }
  } catch (e) {
    // throw error("Error");
    // console.log(e);
    return { error: e.message, message: e.message };
  }
}

async function closeTradeByWHID(
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
    if (!api?.accountApiId) await start();
    // Create MetaApi instance and connect to account using WebSocket
    const account = await api.metatraderAccountApi.getAccount(accountApiId);
    const connection = account.getStreamingConnection();

    await connection.connect();
    await connection.waitSynchronized();

    const terminalState = connection.terminalState;
    const listOfTrades = terminalState.positions; // Retrieve active trades using WebSocket

    const positionType =
      actionType === "buy"
        ? "POSITION_TYPE_BUY"
        : actionType === "sell"
        ? "POSITION_TYPE_SELL"
        : "";

    for (let i = 0; i < listOfTrades.length; i++) {
      const trade = listOfTrades[i];
      console.log(
        "Close trade by webhook ID",
        trade.clientId,
        trade.volume,
        " | ",
        tradeId,
        " | ",
        symbol,
        listOfTrades.length
      );
      if (!symbol?.toLowerCase() == "all" || !symbol) all = true;
      if (all || (trade.clientId && trade.clientId?.includes(tradeId))) {
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
            console.log(pClose, partialClose);
            if (moveToBE) {
              // let data = {
              //   actionType: "POSITION_MODIFY",
              //   positionId: tradeId,
              //   stopLoss: Number(SLprice),
              //   takeProfit: Number(TPprice),
              //   stopLossUnits: "ABSOLUTE_PRICE",
              // };
              const r1 = await connection.modifyPosition(
                trade.id,
                trade.openPrice,
                trade.takeProfit || 0
              );

              // await modifyTPandSLprice(
              //   accountApiId,
              //   trade.id,
              //   trade.openPrice,
              //   trade.takeProfit
              // );
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
                });
              }
            }

            // Close the trade using WebSocket
            const tradeCloseRequest = {
              actionType: "POSITION_CLOSE_PARTIAL",
              positionId: trade.id,
              volume: pClose,
            };

            const r = await connection.closePositionPartially(trade.id, pClose);

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
                errorMessage: r.message,
                msg: "Error closing the order",
              });
            }
          }
        }
      }
    }
    console.log(res);

    if (res.length === 0)
      return {
        errorMessage: "No trade available to close!",
        msg: "No trade available to close!",
      };
  } catch (e) {
    console.log(e);

    return {
      errorMessage: "An error occured while modifing the trades!",
      msg: "An error occured while modifing the trades!",
    };
  }

  if (res.length === 0)
    return {
      errorMessage: "No trade availble to modify!",
      msg: "No trade availble to modify!",
    };

  return res;
}

async function modifyTradeByWHID(
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
    if (!api?.accountApiId) await start();
    // Create MetaApi instance and connect to account using WebSocket
    const account = await api.metatraderAccountApi.getAccount(accountApiId);
    const connection = account.getRPCConnection();

    await connection.connect();
    await connection.waitSynchronized();

    // const terminalState = connection.terminalState;
    // const listOfTrades = terminalState.positions; // Retrieve active trades using WebSocket
    const listOfTrades = await connection.getPositions(); // Retrieve active trades using WebSocket

    const positionType =
      actionType == "buy"
        ? "POSITION_TYPE_BUY"
        : actionType == "sell"
        ? "POSITION_TYPE_SELL"
        : "";

    const symbolInfo = await connection.getSymbolSpecification(symbol);
    // console.log(symbolInfo, symbolInfo.tickSize);

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

              try {
                // console.log(trade, stopLoss);
                const r = await connection.modifyPosition(
                  trade.id,
                  stopLoss || 0,
                  trade.takeProfit || 0
                  // data
                );

                console.log(r);
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
              } catch (e) {
                res.push({
                  orderId: trade.id,
                  positionId: trade.positionId,
                  error: e,
                  errorMessage: e.message,
                  msg: "Error with updating the stop loss",
                });
              }
            }
          }
      }
  } catch (e) {
    console.log(e);

    return {
      errorMessage: "An error occured while modifing the trades!",
      msg: "An error occured while modifing the trades!",
    };
  }

  if (res.length === 0)
    return {
      errorMessage: "No trade availble to modify!",
      msg: "No trade availble to modify!",
    };

  return res;
}

// Export the function
module.exports = {
  closeTradeByWHID,
  modifyTradeByWHID,
  openTrade,
};
