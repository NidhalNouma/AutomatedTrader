import { fetchAllOpenOrders } from "../../../lib/third/binanace";

export default async function handler(req, res) {
  const { apiKey, apiSecret, test } = req.body;

  const trades = await fetchAllOpenOrders({ apiKey, apiSecret, test });
  return res.status(200).json(trades);
}
