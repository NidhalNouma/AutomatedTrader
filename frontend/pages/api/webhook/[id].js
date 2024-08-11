import { rateLimit } from "../../../utils/rateLimit";

import { getWebhook } from "../../../db/webhooks";
import { addAlert } from "../../../db/alerts";
import { getUser } from "../../../db/user";
import { sendMessage } from "../../../db/telegram";
import { addNotification } from "../../../db/notifications";

import {
  openTrade,
  closeTradeByWHID,
  modifyTradeByWHID,
  getHistoryOrderById,
  getHistoryPositionById,
  getPositionById,
  getOrdernById,
} from "../../../db/Metatrader_API";

import { webhookTime } from "../../../db/manageAlerts";
import { getMessageData, getMessageAdvancedData } from "../../../hooks/WebHook";
import moment from "moment";

async function handler(req, res) {
  const allowedHost = "tradingview.com";

  const referer = req.headers.referer || "";
  const origin = req.headers.origin || "";

  if (!referer.includes(allowedHost) && !origin.includes(allowedHost)) {
    console.log("Denied request from:", referer || origin, req.headers);
    // res.status(403).json({ message: "Forbidden" });
    // return;
  }

  const { id } = req.query;

  let dumpRes; //TO-REMOVE
  if (req.method === "POST") {
    let message = req.body;
    if (id != undefined && message) {
      const r = await getWebhook(id);
      if (r) {
        let msgData = null;

        msgData = getMessageData(
          message,
          r.advanced ? r.pair : null,
          r.advanced && r.fixedLotSize ? r.fixedLotSize : null
        );

        const manual = msgData.manual;
        if (manual && manual?.isManual) {
          const accId = manual.account;
          r.MT4 = accId;
        }

        if (r && r.active === true && webhookTime(msgData.time)) {
          // if (advanced || msgData.time.use || msgData.time.use === false)
          // console.log(msgData);
          if (msgData.isValid) {
            if (r.MT4 && r.MT4?.length > 0) {
              let alertRespons = {};
              if (msgData.msgType == 0) {
                for (let i = 0; i < r.MT4?.length; i++) {
                  const volume =
                    msgData.positionType === 1
                      ? msgData.positionValue
                      : msgData.positionValuePercentage;
                  const res = await openTrade(
                    r.MT4[i],
                    "N_N_" + r.id,
                    msgData.type,
                    msgData.pair,
                    Number(volume),
                    msgData.stopLoss,
                    msgData.takeProfit,
                    msgData.stopLossPrice,
                    msgData.takeProfitPrice,
                    msgData.positionType === 1 ? false : true
                  );
                  // console.log(res);
                  dumpRes = res;

                  if (res.orderId) {
                    alertRespons[r.MT4[i]] = [
                      {
                        positionId: res.orderId,
                        orderId: res.orderId,
                        msg: "Order placed successfully",
                        isLive: true,
                        // trade: res,
                      },
                    ];
                  } else {
                    let err = res.error;
                    if (typeof err !== "string") err = res.message;
                    if (typeof err !== "string")
                      err = "Error placing a new trade";
                    alertRespons[r.MT4[i]] = [
                      {
                        error: err,
                        msg: err,
                      },
                    ];
                  }
                }
              } else if (msgData.msgType == 2) {
                // console.log(msgData);
                for (let i = 0; i < r.MT4?.length; i++) {
                  const res = await closeTradeByWHID(
                    r.MT4[i],
                    r.id,
                    msgData.pair,
                    msgData.type,
                    msgData.positionType === 1 ? msgData.positionValue : 0,
                    msgData.allTrades,
                    msgData.moveToBE
                  );
                  alertRespons[r.MT4[i]] = res;
                  // console.log(res);
                }
              } else if (msgData.msgType == 3) {
                for (let i = 0; i < r.MT4?.length; i++) {
                  const res = await modifyTradeByWHID(
                    r.MT4[i],
                    r.id,
                    msgData.pair,
                    msgData.type,
                    msgData.stopLoss,
                    msgData.stopLossPrice,
                    msgData.allTrades
                  );
                  alertRespons[r.MT4[i]] = res;
                }
              }

              // console.log(alertRespons);
              // const time = new Date();
              // await newAlert(id, {
              //   message: message,
              //   messageData: msgData,
              //   userId: r.userId,
              //   name: r.name,
              //   time: time,
              //   mqlTime: moment(time).format("YYYY.MM.DD HH:mm:ss"),
              //   MT4: r.MT4,
              //   // alertId: alert,
              //   whId: id,
              // });
              // console.log(message, alertRespons, msgData);

              if (alertRespons) {
                for (let acc in alertRespons) {
                  for (let r in alertRespons[acc]) {
                    if (
                      alertRespons[acc][r]?.isLive &&
                      alertRespons[acc][r]?.orderId
                    ) {
                      const trade = await getPositionById(
                        acc,
                        alertRespons[acc][r].orderId
                      );
                      if (!trade.error) alertRespons[acc][r]["trade"] = trade;
                      // console.log(alertRespons[acc][r]);
                    }
                  }
                }
              }
              // console.log(alertRespons);

              const alert = await addAlert(
                id,
                message,
                r.userId,
                r.name,
                alertRespons
              );

              const user = await getUser(r.userId);

              if (user?.alertSettings?.sendNotification)
                if (alert) {
                  const msgType =
                    msgData.msgType === 0
                      ? "Market order"
                      : msgData.msgType === 1
                      ? "Pending order"
                      : msgData.msgType === 2
                      ? "Close order"
                      : msgData.msgType === 3
                      ? "Modify order"
                      : "";
                  const text =
                    "New webhook alert: " + msgType + " on " + msgData.pair;
                  await addNotification(
                    r.userId,
                    text,
                    r.name + " " + msgType + " alert",
                    "/alerts?id=" + alert
                  );
                }

              // console.log(alert);

              if (user?.alertSettings?.sendTelegram)
                if (user && user.telegram) {
                  await sendMessage(user.telegram, message, msgData, r);
                }
              return res.status(200).json({
                done: true,
                body: {
                  prev: message,
                  proc: msgData,
                  meta: dumpRes,
                  alertRespons,
                },
              });
            }
          }
        }
      } else {
        //Manage webhooks if it doesn't exist
      }
    }
  }

  return res.status(200).json({ done: false });
}

export default rateLimit(handler);
