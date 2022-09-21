import { sendMessage } from "../../../../db/telegram";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    const chatId = req.body.message.chat.id;
    const message = req.body.message.text;

    console.log(chatId, message, id);
    if (message === "/start") {
      const r = await sendMessage(chatId, `Your chat Id is ${chatId}`);
    }
  } else if (req.method === "GET") {
  }

  return res.status(200).json({ done: false });
}
