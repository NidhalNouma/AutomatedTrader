// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getWebhook } from "../../../db/webhooks";
import { addAlert } from "../../../db/alerts";
import { getUser } from "../../../db/user";
import { sendMessage } from "../../../db/telegram";

import { newAlert, getAlert, getAlertByUserId } from "../../../db/manageAlerts";
import { getMessageData } from "../../../hooks/WebHook";
import moment from "moment";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    const message = req.body;
    console.log("msg, ", message);
    if (id && message) {
      const r = await getWebhook(id);
      const msgData = getMessageData(message);

      const test = msgData.test;

      if (test && test?.isTest) {
        const accId = test.account;
        r.MT4 = accId;
      }

      if (r && (r.active === true || test)) {
        const user = await getUser(r.userId);

        if (msgData.time.use || msgData.time.use === false) {
          const alert = addAlert(id, message, r.userId, r.name);
          if (alert) {
            const time = new Date();
            newAlert(id, {
              message: message,
              messageData: msgData,
              userId: r.userId,
              name: r.name,
              time: time,
              mqlTime: moment(time).format("YYYY.MM.DD HH:mm:ss"),
              MT4: r.MT4,
            });

            if (user && user.telegram) {
              await sendMessage(user.telegram, message);
            }
            return res.status(200).json({ done: true });
          }
        }
      }
    }
  } else if (req.method === "GET") {
    const r = getAlertByUserId(id);
    return res.status(200).json(r);
  }

  return res.status(200).json({ done: false });
}
