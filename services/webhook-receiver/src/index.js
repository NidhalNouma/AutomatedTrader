import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
import { getWebhook } from "../lib/webhooks.js";
import { getMessageData } from "../lib/third/webhookMessage.js";
import { getMTAccount } from "../lib/metatrader.js";
import { getBinanceAccount } from "../lib/binanace.js";

import { rateLimit } from "../utils/rateLimit.js";
import { servicesURL } from "../utils/constant.js";

import { afterResponse } from "./afterResponse.js";

const app = express();
app.use(express.json());
app.use(bodyParser.text());

async function getAccountById(accountType, id) {
  if (accountType === "metatrader") return await getMTAccount(id);
  if (accountType === "binance") return await getBinanceAccount(id);

  return null;
}

app.post("/:id", async (req, res) => {
  const id = req.params.id;
  let message = req.body;
  console.log(message);
  if (!id) {
    return res.status(500).send("Invalid id");
  }
  if (!message) return res.status(500).send("Invalid message");

  try {
    const webhook = await getWebhook(id);

    if (!webhook) return res.status(200).send("Webhook not found");
    if (!webhook.active) return res.status(200).send("Webhook is not active");
    else {
      const messageData = getMessageData(
        message,
        webhook.advanced ? webhook.pair : null,
        webhook.advanced && webhook.fixedLotSize ? webhook.fixedLotSize : null
      );

      if (!messageData.isValid)
        return res.status(200).send("Message is not valid");

      const apps = webhook.apps;

      if (!apps || apps.length === 0)
        return res.status(200).send("No availble apps");

      const promises = [];

      for (const accountType in apps) {
        apps[accountType].forEach((account) => {
          if (
            (typeof account.value === "boolean" && account.value === true) ||
            typeof account.value === "object"
          ) {
            let value = [];
            if (typeof account.value === "object") {
              for (let key in account.value) {
                if (account.value[key] === true) {
                  value.push(key);
                }
              }
            } else {
              value.push(account.id);
            }
            const accountPromise = getAccountById(accountType, account.id).then(
              (accountDetails) => {
                if (accountDetails && Object.keys(accountDetails).length > 0) {
                  return {
                    accountType,
                    id: account.id,
                    value,
                    account: accountDetails,
                  };
                }
                return null;
              }
            );
            if (accountPromise !== null) {
              promises.push(accountPromise);
            }
          }
        });
      }

      if (promises.length === 0) {
      }

      const results = await Promise.all(promises);
      const appsWithData = results.filter((result) => result !== null);

      // return res.status(200).json(appsWithData);

      const apiPromises = appsWithData.map((appData) => {
        const url = `${servicesURL.trade}/${appData.accountType}`;
        return axios.post(url, {
          webhookId: webhook.id,
          messageData,
          account: appData.account,
          openOn: appData.value,
        });
      });

      const apiResponses = await Promise.all(apiPromises);
      const apiResponseData = apiResponses.map((response) => response.data);

      const after = await afterResponse(
        webhook.userId,
        id,
        message,
        messageData.msgType,
        webhook.apps,
        apiResponseData
      );

      return res.status(200).json(apiResponseData);
    }
  } catch (error) {
    return res.status(500).send(error.message);
  }
});

app.listen(4000, () => {
  console.log("Webhook receiver service running on port 4000");
});
