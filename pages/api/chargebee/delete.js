import { deleteSubscription } from "../../../db/subscriptions";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { id } = req.query;

    const r = await deleteSubscription(id);
    // console.log(r);
    if (r?.subscription) return res.status(200).json(r?.subscription);
  }

  return res.status(200).json({});
}
