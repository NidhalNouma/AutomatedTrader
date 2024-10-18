import { updateUserData, getUserByEmail } from "../../../lib/users";
import { pricingList, getPriceBySellixId } from "../../../utils/pricing";
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
        let data = payload.data;
        // handle valid webhook

        const price = getPriceBySellixId(data.product_id);

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
