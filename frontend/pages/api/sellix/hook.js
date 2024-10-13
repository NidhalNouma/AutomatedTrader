import { updateUserData, getUserByEmail } from "../../../lib/users";
import { sellixSecret } from "../../../utils/constant";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const payload = req.body;

    const headerSignature = req.headers["x-sellix-unescaped-signature"];
    const event = req.headers["x-aellix-event"] || payload?.event;

    try {
      const signature = crypto
        .createHmac("sha512", sellixSecret)
        .update(JSON.stringify(payload))
        .digest("hex");

      if (
        crypto.timingSafeEqual(
          Buffer.from(signature),
          Buffer.from(headerSignature, "utf-8")
        )
      ) {
        // handle valid webhook
        return res.status(200).json({ event });
      } else {
        // invalid webhook
      }
    } catch (e) {
      // console.error(e.message);
      return res
        .status(400)
        .json({ error: e.message, headers: req.headers, data: payload });
    }
  }

  return res.status(200).json({ done: false });
}
