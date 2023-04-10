import {
  getUser,
  userKlavio,
  updateUserData,
  updateKlavioProfileMembership,
} from "../../../../db/user";

export default async function handler(req, res) {
  const { userId } = req.query;
  const { membership } = req.query;

  if (req.method === "POST" && membership)
    if (userId) {
      const user = await getUser(userId);
      if (user) {
        let profile = user?.klavio?.data || user?.klavio;

        if (!profile?.id) {
          let p = await userKlavio(userId, user);
          profile = p?.data;
        }

        //   console.log(profile.id, profile.attributes);
        if (profile) {
          let r = await updateKlavioProfileMembership(
            userId,
            profile.id,
            profile.attributes,
            membership
          );

          if (!r) r = profile;

          if (r) {
            const u = await updateUserData(userId, "klavio", r, false);
            return res.status(200).json({ done: true, r, u });
          }
        }
      }
    }

  return res.status(200).json({ done: false });
}
