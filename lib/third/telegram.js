import axios from "axios";
import { telegramWebhookAPI } from "../../utils/constant.js";

export async function sendMessage(chatId, message) {
  let r = null;

  try {
    r = await axios.post(`${telegramWebhookAPI}/sendMessage`, {
      chat_id: chatId,
      message,
      text: message,
    });
  } catch (err) {
    console.log("telegram msg err ", err, telegramWebhookAPI);
  }

  return r;
}
