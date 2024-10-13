// import { useRouter } from "next/router";
import axios from "axios";
import dotenv from "dotenv";
// Load environment variables
dotenv.config({ path: "/usr/src/app/.env" });

// console.log("ENV---Fle--------", process.env);

export const servicesURL = {
  webhook: process.env.NEXT_PUBLIC_WEBHOOK_RECEIVER_URL,
  trade: process.env.NEXT_PUBLIC_TRADE_MANAGEMENT_URL,
};

export const metaApiToken = process.env.NEXT_PUBLIC_META_API_TOKEN;

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "auth.automatedtrader.com",
  // authDomain: "automated-trader-fd733.firebaseapp.com",
  projectId: "automated-trader-fd733",
  storageBucket: "automated-trader-fd733.appspot.com",
  messagingSenderId: "1097394175779",
  appId: "1:1097394175779:web:5b307b63f15c80f73bd696",
  measurementId: "G-N59NRR3N6T",
};

export const sellixSecret = process.env.NEXT_PUBLIC_SELLIX_WEBHOOK_SECRET;

export const landingUrl = "/"; //process.env.NEXT_PUBLIC_LANDING_URL || "/";

export const telegramWebhookAPI = `https://api.telegram.org/bot${process.env.NEXT_PUBLIC_TELEGRAM_API_TOKEN}`;
const urlForTelegram = () =>
  // window.location.protocol +
  // "//" +
  // window.location.host +
  process.env.NEXT_PUBLIC_URL +
  "/api/telegram/webhook/" +
  process.env.NEXT_PUBLIC_TELEGRAM_API;
export async function telegramInit() {
  const res = await axios.get(
    `$(telegramWebhookAPI}/setWebhook?url=${urlForTelegram()}`
  );
  console.log(res);
}

// telegramInit();

export const listOfEmails = process.env.NEXT_PUBLIC_ALLOWED_EMAILS?.split(",");

export const videosUrls = {
  webhooksAT:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fwebhooks-AT.mp4?alt=media&token=f8bf7b15-9084-4211-9bfe-0004c0b40aa9",
  webhooksTradingView:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fwebook-tradingview.mp4?alt=media&token=797afe02-4f01-4a58-9871-b17c9044a0ff",
  tradePage:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Ftrade.mp4?alt=media&token=67420266-d010-46b4-b31c-d18bd1185bd6",
  telegramPage:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Ftelegram.mp4?alt=media&token=8612eae5-741b-4a8b-a0bb-1677bcd8251d",
  metatraderAddWebhooks:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fmetatrader-addwebhook.mp4?alt=media&token=d5aaa850-f988-4d8a-b520-63e26a401751",
  metatraderAddAccount:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fmetatrader-addaccount.mp4?alt=media&token=9c4a82b6-4474-46ba-b102-df1a8e0c9fb4",
  manualTrade:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Fmanual.mp4?alt=media&token=1acf2e9a-890e-4fc5-b2ee-43210c0cf378",
  alertsPage:
    "https://firebasestorage.googleapis.com/v0/b/automated-trader-fd733.appspot.com/o/files%2Fvideos%2Falerts.mp4?alt=media&token=a6db0f73-00fd-4e99-9f51-c0c39bd25184",
};
