import { useState, useEffect } from "react";

import axios from "axios";

import { useWebhook } from "../contexts/WebhookContext";
import { useMetatrader } from "../contexts/MetatraderContext";
import { useBinance } from "../contexts/BinanceContext";

import { servicesURL } from "../utils/constant";
import { getMessageData } from "../lib/third/webhookMessage.js";

export function OpenTrade() {
  const { webhooks } = useWebhook();
  const { mtAccounts } = useMetatrader();
  const { binanceAccounts } = useBinance();

  const [account, setAccount] = useState(null);
  const [accountOptions, setAccountOptions] = useState(null);
  const [webhook, setWebhook] = useState(null);
  const [webhookOptions, setWebhookOptions] = useState(null);
  const [message, setMessage] = useState(null);
  const [messageOptions, setMessageOptions] = useState(null);

  const [error, setError] = useState("");

  useEffect(() => {
    let groupOptions = [];

    if (mtAccounts?.length > 0) {
      let options = [];
      for (let i = 0; i < mtAccounts.length; i++) {
        const acc = mtAccounts[i];

        const option = { value: acc, label: acc.accountDisplayName };
        options.push(option);
      }

      groupOptions.push({
        label: "Metatrader",
        options,
      });
    }

    if (binanceAccounts?.length > 0) {
      let options = [];
      for (let i = 0; i < binanceAccounts.length; i++) {
        const acc = binanceAccounts[i];

        const option = { value: acc, label: acc.accountName };
        options.push(option);
      }

      groupOptions.push({
        label: "Binance",
        options,
      });
    }

    if (groupOptions.length > 0) {
      setAccountOptions(groupOptions);
      setAccount(groupOptions[0]);
    }
  }, [mtAccounts, binanceAccounts]);

  useEffect(() => {
    if (webhooks?.length > 0) {
      const options = [];
      for (let i = 0; i < webhooks.length; i++) {
        const w = webhooks[i];

        if (!w.advanced) {
          const option = { value: w, label: w.name };
          options.push(option);
        }
      }
      if (options.length > 0) {
        setWebhookOptions(options);
        setWebhook(options[0]);
      }
    }
  }, [webhooks]);

  useEffect(() => {
    if (webhook?.value && webhook.value?.messages?.length > 0) {
      setMessageOptions(webhook.value?.messages);
      setMessage(webhook.value.messages[0]);
    }
  }, [webhook]);

  async function sendTrade() {
    setError("");
    if (!account || !account.value) {
      setError("Account is required!");
      return false;
    }
    if (!webhook || !webhook.value) {
      setError("Webhook is required!");
      return false;
    }
    if (!message || !message.value) {
      setError("Message is required!");
      return false;
    }

    const accountId = account.value.id;
    const webhookId = webhook.value.id;
    const messageData = getMessageData(message.value);

    // console.log("Sending trade", account, webhook, message);
    console.log("Sending trade ... ", accountId, webhookId, messageData);

    // let url = "http://localhost:4001";
    let url = servicesURL.trade;

    let accountSrc = accountOptions.find((o) => {
      const r = o.options.find((v) => v.value.id === account.value.id);
      return r;
    });

    if (!accountSrc) {
      setError("Account source not availble!");
      return false;
    }

    let accountSrcName = accountSrc.label.toLowerCase();

    const r = await axios.post(
      url + "/" + accountSrcName,
      {
        account: account.value,
        webhookId,
        messageData,
      },
      {
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
        },
      }
    );

    if (r?.data?.errorMessage) {
      setError(r.data.errorMessage);
      return false;
    }

    return true;
  }

  return {
    account,
    setAccount,
    accountOptions,
    webhook,
    setWebhook,
    webhookOptions,
    message,
    setMessage,
    messageOptions,
    error,
    sendTrade,
  };
}
