import {
  getAllUsers,
  userKlavio,
  updateUserData,
  updateKlavioProfileMembership,
} from "../../../db/user";
import { getSubscription } from "../../../db/subscriptions";

import axios from "axios";
import { getPlanById } from "../../../utils/pricing";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const users = await getAllUsers();

    const l = users?.length;
    if (users && l > 0) {
      for (let i in users) {
        const user = users[i];

        let profile = user?.klavio?.data || user?.klavio;
        if (user?.subscriptionId && profile) {
          console.log("Profile ", i, " .subId ", user.subscriptionId);
          let sub = await getSubscription(user.subscriptionId);
          sub = sub?.subscription;

          const subObj = getPlanById(sub?.data);

          if (subObj) {
            let r = await updateKlavioProfileMembership(
              user.id,
              profile.id,
              profile.attributes,
              subObj.chargeBeeId
            );

            if (r) {
              const u = await updateUserData(user.id, "klavio", r, false);
            }
          }
        }
      }
      return res.status(200).json({ done: true });
    }
  }

  return res.status(200).json({ done: false });
}
