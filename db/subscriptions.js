import axios from "axios";

const URL =
  "https://" + process.env.NEXT_PUBLIC_CHARGEBEE_SITE + ".chargebee.com";
const key = process.env.NEXT_PUBLIC_CHARGEBEE_API_KEY_B;
const encodedToken = Buffer.from(key + ":").toString("base64");
const authorization = `Basic ${encodedToken}`;

export async function getHostedPage(id) {
  const purl = "/api/v2/hosted_pages/" + id;
  let r = null;
  try {
    r = await axios({
      url: purl,
      baseURL: URL,
      headers: { Authorization: authorization },
    });

    r = r.data;
  } catch (e) {
    console.log("get hosted page error => ", e);
  }

  return r;
}

export async function getSubscription(id) {
  const purl = "/api/v2/subscriptions/" + id;
  let r = null;
  try {
    r = await axios({
      url: purl,
      baseURL: URL,
      headers: { Authorization: authorization },
    });

    r = r.data;
  } catch (e) {
    console.log("get subscription error => ", e);
  }

  return r;
}

export async function deleteSubscription(id) {
  const purl = "/api/v2/subscriptions/" + id + "/del";
  let r = null;
  try {
    r = await axios({
      method: "POST",
      url: purl,
      baseURL: URL,
      headers: { Authorization: authorization },
    });

    r = r.data;
  } catch (e) {
    console.log("get subscription error => ", e);
  }

  return r;
}
