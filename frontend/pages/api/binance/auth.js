import { validateCredentials } from "../../../lib/third/binanace";

export default async function handler(req, res) {
  const { apiKey, apiSecret, test } = req.body;

  const credentials = await validateCredentials({ apiKey, apiSecret, test });
  return res.json(credentials);
}
