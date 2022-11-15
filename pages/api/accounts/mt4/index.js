import { addMTAccount } from "../../../../db/mtAccounts";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const {
      userId,
      accountName,
      accountServer,
      accountNumber,
      accountBalance,
      accountEquity,
      accountStartBalance,
    } = req.body;

    if (userId && accountName && accountNumber && accountServer) {
      const r = await addMTAccount(
        userId,
        accountName,
        accountServer,
        accountNumber,
        accountBalance,
        accountEquity,
        accountStartBalance,
        "MT4"
      );
      if (r)
        return res.status(200).json({ id: r.id, exist: r.exist, done: true });
    }
  }

  return res.status(200).json({ done: false });
}
