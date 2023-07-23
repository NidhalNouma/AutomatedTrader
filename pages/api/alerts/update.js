import { getAlert, updateAlertAccount } from "../../../db/alerts";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { alertId, text, accountId, accountNumber, accountName } = req.body;
    let objText = {};

    if (text.length > 0) {
      const splitText = text.split(",");
      splitText.forEach(function (txt) {
        const splitTxt = txt.split(":");
        if (splitTxt.length > 0) {
          const key = splitTxt[0];
          const value = splitTxt.slice(1, splitTxt.length).join(":");
          objText[key] = value;
        }
      });
      console.log(accountId, text, objText);
      if (Object.keys(objText).length > 0) {
        await updateAlertAccount(alertId, accountId, objText);

        return res.status(200).json({ done: true });
      }
    }
  }
  return res.status(200).json({ done: false });
}
