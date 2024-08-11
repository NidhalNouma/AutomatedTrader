import { getAllUsers, userKlavio, updateUserData } from "../../../db/user";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const users = await getAllUsers();

    const l = users?.length;
    if (users && l > 0) {
      for (let i in users) {
        const user = users[i];
        // console.log(users.length);
        const r = await userKlavio(user.id, user);

        if (r) {
          const u = await updateUserData(user.id, "klavio", r, false);
        }
      }
      return res.status(200).json({ done: true });
    }
  }

  return res.status(200).json({ done: false });
}
