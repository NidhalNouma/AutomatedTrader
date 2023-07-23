import { getAlert, updateAlertAccount } from "../../../db/alerts";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { alertId, text, accountId, accountNumber, accountName } = req.body;
    await updateAlertAccount(alertId, accountId, text);
    console.log(accountId, text);
    return res.status(200).json({ done: true });
  } else if (req.method === "GET") {
  }

  return res.status(200).json({ done: false });
}
