import axios from "axios";
import { telegramWebhookAPI } from "../utils/constant";

export async function sendMessage(chatId, message) {
  const r = await axios.post(`${telegramWebhookAPI}/sendMessage`, {
    chat_id: chatId,
    text: message,
  });

  console.log(r);
  return r;
}
