import { getUser, userKlavio, updateUserData } from "../../../db/user";

export default async function handler(req, res) {
  const { userId } = req.query;
  if (req.method === "POST")
    if (userId) {
      const user = await getUser(userId);
      if (user) {
        const r = await userKlavio(userId, user);

        if (r) {
          const u = await updateUserData(userId, "klavio", r, false);
          return res.status(200).json({ done: true, r, u });
        }
      }
    }

  return res.status(200).json({ done: false });
}
