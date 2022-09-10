// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { getWebhook } from "../../../db/webhooks";
import { addAlert } from "../../../db/alerts";

import { newAlert, getAlert } from "../../../db/manageAlerts";

export default async function handler(req, res) {
  const { id } = req.query;
  if (req.method === "POST") {
    const message = req.body;
    if (id && message) {
      const r = await getWebhook(id);
      if (r && r.active === true) {
        const alert = addAlert(id, message, r.userId, r.name);
        if (alert) {
          newAlert(id, {
            message: message,
            userId: r.userId,
            name: r.name,
            time: new Date(),
          });
          return res.status(200).json({ done: true });
        }
      }
    }
  } else if (req.method === "GET") {
    const r = getAlert(id);
    return res.status(200).json(r);
  }

  return res.status(200).json({ done: false });
}
