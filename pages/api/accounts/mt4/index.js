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
    } = req.body;

    if (userId && accountName && accountNumber && accountServer) {
      const r = await addMTAccount(
        userId,
        accountName,
        accountServer,
        accountNumber,
        accountBalance,
        accountEquity,
        "MT4"
      );
      if (r) return res.status(200).json({ id: r, done: true });
    }
  }

  return res.status(200).json({ done: false });
}
