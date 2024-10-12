import { updateUserData, getUserByEmail } from "../../../lib/users";
import crypto from "crypto";

const secret = process.env.NEXT_PUBLIC_SELLIX_WEBHOOK_SECRET;

export default async function handler(req, res) {
  const headerSignature = req.headers["x-sellix-unescaped-signature"];
  const event = req.headers["X-Sellix-Event"];
  const payload = req.body;

  const signature = crypto
    .createHmac("sha512", secret)
    .update(payload)
    .digest("hex");

  console.log(event);
  console.log(payload);
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

  return res.status(200).json({ done: false });
}
