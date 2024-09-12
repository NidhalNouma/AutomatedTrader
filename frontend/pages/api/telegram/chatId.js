import { sendMessage } from "../../../lib/third/telegram";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const chatId = req.body.message?.chat?.id;
    const message = req.body.message?.text;

    // console.log(chatId, message);
    if (message === "/start") {
      const r = await sendMessage(chatId, `Your chat Id is ${chatId}`);
      return res.status(200).json({ done: true });
    }
  }

  return res.status(200).json({ done: false });
}
