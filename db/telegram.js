import axios from "axios";
import { telegramWebhookAPI } from "../utils/constant";

export async function sendMessage(chatId, message, msgData, wh) {
  let r = null;
  try {
    r = await axios.post(`${telegramWebhookAPI}/sendMessage`, {
      chat_id: chatId,
      text: `AutomatedTrader: ${wh.name} webhook\nNew Trade: ${
        msgData.pair
      } with ${msgData.positionValue}${
        msgData.positionType === 0 && "%"
      } Lot size.\nStopLoss: ${msgData.stopLoss} pips, TakeProfit: ${
        msgData.takeProfit
      } pips.\n${
        msgData.TS?.use ? `Trailing Stop is ON` : "Trailing Stop is OFF"
      }`,
    });
  } catch (err) {
    console.log("telegram msg err ", err?.message, err?.description);
  }

  // console.log(r);
  return r;
}
