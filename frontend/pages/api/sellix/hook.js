import { updateUserData, getUserByEmail } from "../../../lib/users";
import { getPlanById } from "../../../utils/pricing";
import { sellixSecret } from "../../../utils/constant";
import crypto from "crypto";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const payload = req.body;

    const headerSignature = req.headers["x-sellix-unescaped-signature"];
    const event = req.headers["x-sellix-event"] || payload?.event;

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
        let data = payload.data;
        // handle valid webhook

        const price = getPlanById(data.product_id);

        console.log("Handeling request payload: ", price.planName);

        if (event === "order:paid") {
          if (price && price.planName === "Lifetime access")
            if (data.email) {
              const u = await getUserByEmail(data.email);
              if (u) {
                await updateUserData(u.id, { lifetimeAccess: true }, false);

                return res.status(200).json({ event, email: u.email, price });
              }
            }
        }

        if (event === "subscription:created") {
          if (price && price.planName)
            if (data.email) {
              const u = await getUserByEmail(data.email);
              if (u) {
                await updateUserData(
                  u.id,
                  {
                    subscriptionName: price.planName,
                    subscriptionActive: true,
                    subscriptionPID: data.product_id,
                  },
                  false
                );

                return res.status(200).json({ event, email: u.email, price });
              }
            }
        }

        if (event === "subscription:cancelled") {
          if (price && price.planName)
            if (data.email) {
              const u = await getUserByEmail(data.email);
              if (u) {
                await updateUserData(
                  u.id,
                  {
                    subscriptionName: price.planName,
                    subscriptionActive: false,
                  },
                  false
                );

                return res.status(200).json({ event, email: u.email, price });
              }
            }
        }

        return res.status(200).json({ event });
      } else {
        // invalid webhook

        return res.status(400).json({
          error: "invalid webook",
          headers: req.headers,
          data: payload,
        });
      }
    } catch (e) {
      // console.error(e.message);
      return res
        .status(400)
        .json({ error: e.message, headers: req.headers, data: payload });
    }
  }

  return res
    .status(200)
    .json({ done: false, method: req.method, headers: req.headers });
}
