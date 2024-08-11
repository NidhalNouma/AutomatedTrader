import { getSubscription } from "../../../db/subscriptions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const r = await getSubscription(id);
    if (r?.subscription) return res.status(200).json(r?.subscription);
  }

  return res.status(200).json({});
}
