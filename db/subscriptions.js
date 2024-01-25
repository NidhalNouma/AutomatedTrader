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
  // console.log("getting sub  ...", id);
  const purl = "/api/v2/subscriptions/" + id;
  let r = null;

  try {
    r = await axios({
      url: purl,
      baseURL: URL,
      headers: { Authorization: authorization },
    });

    r = r.data;
    // console.log(r);
  } catch (e) {
    console.log("get subscription error => ", e.message, id);
  }

  return r;
}

export async function deleteSubscription(id) {
  const purl = "/api/v2/subscriptions/" + id + "/cancel_for_items";
  let r = null;
  try {
    r = await axios({
      method: "POST",
      url: purl,
      baseURL: URL,
      data: {
        credit_option_for_current_term_charges: "prorate",
        nd_of_term: "false",
      },
      headers: { Authorization: authorization },
    });

    r = r.data;
  } catch (e) {
    console.log("delete subscription error => ", e.message);
  }

  return r;
}

export async function cancelSubscriptionImmidiatly(id) {
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
    console.log("delete subscription error => ", e.message);
  }

  return r;
}
