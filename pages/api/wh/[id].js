import { rateLimit } from "../../../utils/rateLimit";

async function handler(req, res) {
  // Redirect to /api/webhook
  const { id } = req.query;
  res.redirect(307, "/api/webhook/" + id);
}

export default rateLimit(handler);
