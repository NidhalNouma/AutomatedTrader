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
      accountCurrency,
      accountCredit,
      accountCompany,
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
        accountCurrency,
        accountCredit,
        accountCompany,
        "MT5"
      );
      if (r.id)
        return res.status(200).json({ id: r.id, exist: r.exist, done: true });
      else res.status(200).json({ done: false, error: r.error });
    }
  }

  return res.status(200).json({ done: false, data: req.body });
}
