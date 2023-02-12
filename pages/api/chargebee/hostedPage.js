import { getHostedPage } from "../../../db/subscriptions";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { id } = req.query;

    const r = await getHostedPage(id);
    // console.log(r);
    if (r?.hosted_page)
      if (r?.hosted_page?.content)
        return res.status(200).json(r?.hosted_page.content);
  }

  return res.status(200).json({});
}
