// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getWebhook } from "../../../db/webhooks";
import { addAlert } from "../../../db/alerts";
import { getUser } from "../../../db/user";
import { sendMessage } from "../../../db/telegram";

import {
  newAlert,
  getAlert,
  getAlertByUserId,
  webhookTime,
} from "../../../db/manageAlerts";
import { getMessageData, getMessageAdvancedData } from "../../../hooks/WebHook";
import moment from "moment";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    let message = req.body;
    if (id != undefined && message?.get) {
      const r = getAlertByUserId(id);
      return res.status(200).json(r);
    } else if (id != undefined && message) {
      const r = await getWebhook(id);
      if (r) {
        let msgData = null;
        if (r.advanced) {
          // if (r.digits) message = message + ",digits: " + r.digits;
          msgData = getMessageAdvancedData(message, r.pair);
          message = "pair: " + r.pair + "," + message;
        } else msgData = getMessageData(message);

        // console.log(msgData);

        const advanced = msgData.advanced;

        const test = msgData.test;
        if (test && test?.isTest) {
          const accId = test.account;
          r.MT4 = accId;
        }

        const manual = msgData.manual;
        if (manual && manual?.isManual) {
          const accId = manual.account;
          r.MT4 = accId;
        }

        if (
          r &&
          (advanced ||
            (r.active === true && webhookTime(msgData.time)) ||
            test ||
            manual)
        ) {
          const user = await getUser(r.userId);

          if (advanced || msgData.time.use || msgData.time.use === false)
            if (msgData.isValid) {
              const alert =
                (advanced && msgData.alertType === "ENTRY") || !advanced
                  ? await addAlert(id, message, r.userId, r.name, r.MT4)
                  : true;
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
                  alertId: alert,
                });

                if (user && user.telegram) {
                  await sendMessage(user.telegram, message, msgData, r);
                }
                return res.status(200).json({ done: true });
              }
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
