import { useState, useEffect } from "react";
import axios from "axios";

export const PlaceWebhookTrade = (mtAccounts, webhooks) => {
  const [accounts, setAccounts] = useState(mtAccounts);
  const [sAccount, setSAccount] = useState(
    mtAccounts?.length > 0 ? mtAccounts[0] : null
  );

  const [msgIndex, setMsgIndex] = useState(0);
  // console.log(mtAccounts);

  useEffect(() => {
    setAccounts(mtAccounts);
    setSAccount(mtAccounts?.length > 0 ? mtAccounts[0] : null);
  }, [mtAccounts]);

  // useEffect(() => {
  //   if (sbroker === brokers[0]) setAccounts(mtAccounts);
  //   else if (sbroker === brokers[1]) setAccounts(mt5Accounts);
  // }, [sbroker]);

  const [sWebhook, setSWebhook] = useState(
    webhooks?.length > 0 ? webhooks[0] : null
  );

  const [sMessage, setSMessage] = useState(
    sWebhook?.messages?.length > 0 ? sWebhook?.messages[0] : null
  );

  useEffect(() => {
    if (sWebhook === null)
      setSWebhook(
        sWebhook === null ? (webhooks?.length > 0 ? webhooks[0] : null) : null
      );
  }, [webhooks]);

  useEffect(() => {
    // console.log(sWebhook?.messages);
    const index = sWebhook?.messages?.length - 1 >= msgIndex ? msgIndex : 0;
    setSMessage(
      sWebhook?.messages?.length > 0 ? sWebhook?.messages[index] : null
    );
    setMsgIndex(index);
  }, [sWebhook]);

  useEffect(() => {
    if (sMessage && sWebhook) {
      setMsgIndex(sWebhook?.messages?.indexOf(sMessage));
    }
  }, [sMessage]);

  useEffect(() => {
    setError("");
  }, []);

  const [error, setError] = useState("");

  async function send(onComplete) {
    if (mtAccounts?.length <= 0) {
      setError("Please select an account!");
      return;
    }

    if (!sMessage) {
      setError("Please select a message!");
      return;
    }

    setError("");
    const msg =
      sMessage +
      " MANUEL-" +
      JSON.stringify({ account: [sAccount.accountApiId] }) +
      " ";
    // console.log(msg, sAccount, sWebhook);

    const r = await axios.post("/api/wh/" + sWebhook.id, msg, {
      headers: {
        "Content-Type": "text/plain",
      },
    });

    onComplete();
    return r;
  }

  return {
    sAccount,
    setSAccount,
    sWebhook,
    setSWebhook,
    sMessage,
    setSMessage,
    error,
    send,

    accounts,
  };
};
