import express from "express";
import bodyParser from "body-parser";
import rateLimit from "express-rate-limit";
import cors from "cors";

// import { openTrade as openMTTrade } from "../lib/third/metaapi.js";
import { placeOrder as openBinanceTrade } from "../lib/third/binanace.js";
import metaapiFunctions from "../lib/third/metaapiWS.cjs";

const {
  openTrade: openMTTrade,
  closeTradeByWHID: closeMTTrade,
  modifyTradeByWHID: modifyMTTrade,
} = metaapiFunctions;

const app = express();
app.use(express.json({ limit: "50mb" }));
app.use(bodyParser.text({ limit: "50mb" }));
app.use(cors());

// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//   message: "Too many requests from this IP, please try again later.", // Custom message
//   standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//   legacyHeaders: false, // Disable the `X-RateLimit-*` headers
// });

// app.use(limiter);

app.post("/metatrader", async (req, res) => {
  const accountSrc = "metatrader";
  try {
    const { account, messageData, openOn, webhookId } = req.body;
    if (!account || !account.id)
      return res.status(500).send("Account not available");
    if (!messageData) return res.status(500).send("Message data not available");
    // if (!openOn) return res.status(500).send("Apps not available");
    if (!webhookId) return res.status(500).send("Webhook ID not available");

    console.log("Metatrader: managing trade for ", account.id);

    if (messageData.msgType == 0) {
      console.log("Metatrader: Opening trade ... ");
      const trade = await openMTTrade(
        account.accountApiId,
        "N_N_" + webhookId,
        messageData.type,
        messageData.pair,
        messageData.positionValue,
        messageData.useStopLoss ? messageData.stopLoss : null,
        messageData.useTakeProfit ? messageData.takeProfit : null,
        messageData.stopLossPrice,
        messageData.takeProfitPrice,
        messageData.positionValuePercentage
      );

      let errorMessage = null;
      if (!trade.orderId && trade.message) errorMessage = trade.message;
      let tradeId = trade.orderId || null;

      return res.send({
        ...trade,
        accountId: account.id,
        accountSrc,
        tradeId,
        errorMessage,
      });
    } else if (messageData.msgType == 1) {
      console.log("Metatrader: Placing pending order ... ");
    } else if (messageData.msgType == 2) {
      console.log("Metatrader: Closing orders ... ");
      const closedTrades = await closeMTTrade(
        account.accountApiId,
        "N_N_" + webhookId,
        messageData.pair,
        messageData.type,
        messageData.usePartialClose ? messageData.partialCloseValue : 0,
        messageData.allTrades,
        messageData.moveToBE
      );

      return res.send({
        trades: closedTrades,
        accountId: account.id,
        accountSrc,
      });
    } else if (messageData.msgType == 3) {
      console.log("Metatrader: Modifying orders ... ");
      const modifyTrade = await modifyMTTrade(
        account.accountApiId,
        webhookId,
        messageData.pair,
        messageData.type,
        messageData.useStopLoss ? messageData.stopLoss : 0,
        messageData.stopLossPrice,
        messageData.allTrades
      );

      return res.send({
        trades: modifyTrade,
        accountId: account.id,
        accountSrc,
      });
    }

    return res.send({ res: req.body });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.post("/binance", async (req, res) => {
  const accountSrc = "binance";
  try {
    const { account, messageData, openOn, webhookId } = req.body;
    if (!account) return res.status(500).send("Account not available");
    if (!messageData) return res.status(500).send("Message data not available");
    // if (!openOn) return res.status(500).send("Apps not available");
    if (!webhookId) return res.status(500).send("Webhook ID not available");

    console.log("Binance: managing trade for ", account.id);

    if (messageData.msgType == 0) {
      console.log("Binance: Opening trade ... ");
      const trade = await openBinanceTrade(
        account,
        messageData.pair,
        messageData.type,
        messageData.positionValue
      );

      let errorMessage = null;
      if (trade.error && trade.error.msg) errorMessage = trade.error.msg;
      let tradeId = trade.orderId || null;

      return res.send({
        ...trade,
        accountId: account.id,
        accountSrc,
        errorMessage,
        tradeId,
      });
    } else if (messageData.msgType == 1) {
      return res.send({
        accountId: account.id,
        accountSrc,
      });
    } else if (messageData.msgType == 2) {
      return res.send({
        // trades: closedTrades,
        accountId: account.id,
        accountSrc,
      });
    }
    if (messageData.msgType == 3) {
      return res.send({
        // trades: modifyTrades,
        accountId: account.id,
        accountSrc,
      });
    }
    return res.send({ res: req.body });
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(4001, () => {
  console.log("Trade management service running on port 4001");
});
