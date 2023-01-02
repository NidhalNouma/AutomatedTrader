import { addDataToMTAccount } from "../../../../db/mtAccounts";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      accountId,
      accountBalance,
      accountEquity,
      data,
      lastOrder,
      gmtOffset,
    } = req.body;

    if (accountId && data?.length > 0) {
      const r = await addDataToMTAccount(
        accountId,
        accountBalance,
        accountEquity,
        data,
        lastOrder,
        gmtOffset
      );
      if (r) return res.status(200).json({ ...r, done: true });
    }
  }

  return res.status(200).json({ done: false });
}
