import { updateUserData, getUserByEmail } from "../../../lib/users";
import crypto from "crypto";

const secret = process.env.NEXT_PUBLIC_SELLIX_WEBHOOK_SECRET;

export default async function handler(req, res) {
  const headerSignature = req.headers["X-Sellix-Unescaped-Signature"];
  const payload = req.body;
  const event = req.headers["X-Sellix-Event"] || payload?.event;

  const signature = crypto
    .createHmac("sha512", secret)
    .update(payload)
    .digest("hex");

  console.log(req.headers);
  console.log(headerSignature);
  console.log(event);

  try {
    if (
      crypto.timingSafeEqual(
        Buffer.from(signature),
        Buffer.from(headerSignature, "utf-8")
      )
    ) {
      // handle valid webhook
    } else {
      // invalid webhook
    }
  } catch (e) {
    console.error(e.message);
    return res.status(400).json({ error: e.message, headers: req.headers });
  }

  return res.status(200).json({ done: false });
}
