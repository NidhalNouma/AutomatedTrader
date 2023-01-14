import { useState, useEffect } from "react";
import axios from "axios";

export const PlaceWebhookTrade = (mtAccounts, webhooks) => {
  const [sAccount, setSAccount] = useState(
    mtAccounts?.length > 0 ? mtAccounts[0] : null
  );
  const [sWebhook, setSWebhook] = useState(
    webhooks?.length > 0 ? webhooks[0] : null
  );

  const [sMessage, setSMessage] = useState(
    sWebhook?.messages?.length > 0 ? sWebhook?.messages[0] : null
  );

  useEffect(() => {
    setSMessage(sWebhook?.messages?.length > 0 ? sWebhook?.messages[0] : null);
  }, [sWebhook]);

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
      "manual " + JSON.stringify({ account: sAccount.id }) + " " + sMessage;
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
  };
};
