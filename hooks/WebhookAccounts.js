import { useState, useEffect } from "react";
import {
  addMT4Account,
  deleteMT4Account,
  getWebhookWithUserData,
} from "../db/webhooks";

export const WebhookMT4 = (id, webhooks) => {
  const [active, setActive] = useState([]);

  useEffect(() => {
    const wwh = webhooks.map((webhook) => {
      const r = webhook.MT4?.find((mt4) => mt4 === id);
      return { id: webhook.id, active: r ? true : false };
    });
    setActive(wwh);
  }, [webhooks]);

  const addMT4 = async (whID) => {
    const r = await addMT4Account(whID, id);
    if (r) activateWH(whID, true);
    return r;
  };

  const removeMT4 = async (whID) => {
    const r = await deleteMT4Account(whID, id);
    if (r) activateWH(whID, false);
    return r;
  };

  function activateWH(whID, status) {
    const i = active?.indexOf(active.find((whs) => whs.id === whID));
    if (i === -1) return;
    const r = active;
    r[i].active = status;
    setActive([...r]);
  }

  return { active, addMT4, removeMT4 };
};

export const WebhookWithData = (id) => {
  const [webData, setWebData] = useState(null);

  useEffect(() => {
    (async () => {
      const r = await getWebhookWithUserData(id);
      setWebData(r);
    })();
  }, [id]);

  return { webData };
};
