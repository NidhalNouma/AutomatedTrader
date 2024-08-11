import axios from "axios";
import { telegramWebhookAPI } from "../utils/constant";

export async function sendMessage(chatId, message) {
  let r = null;

  // let text = `AutomatedTrader: ${wh.name} webhook\nNew Trade: ${
  //   msgData.pair
  // } with ${msgData.positionValue}${
  //   msgData.positionType === 0 && "%"
  // } Lot size.\nStopLoss: ${msgData.stopLoss} pips, TakeProfit: ${
  //   msgData.takeProfit
  // } pips.\n${msgData.TS?.use ? `Trailing Stop is ON` : "Trailing Stop is OFF"}`;

  // if (wh.advanced)
  //   text = `AutomatedTrader: ${wh.name} advanced webhook\nNew ${
  //     wh.type === 0 ? "buy" : "sell"
  //   } Trade: ${wh.pair} with ${msgData.riskPercentage}% Lot size.\nStopLoss: ${
  //     msgData.stopLoss
  //   } pips, TakeProfit 1: ${msgData.takeProfit1} pips.\n TakeProfit 2: ${
  //     msgData.takeProfit2
  //   } pips.\n TakeProfit 3: ${msgData.takeProfit3} pips.`;

  try {
    r = await axios.post(`${telegramWebhookAPI}/sendMessage`, {
      chat_id: chatId,
      message,
    });
  } catch (err) {
    console.log("telegram msg err ", err?.message, err?.description);
  }

  // console.log(r);
  return r;
}
