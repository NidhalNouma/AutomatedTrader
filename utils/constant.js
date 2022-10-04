// import { useRouter } from "next/router";
import axios from "axios";

export const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "automated-trader-fd733.firebaseapp.com",
  projectId: "automated-trader-fd733",
  storageBucket: "automated-trader-fd733.appspot.com",
  messagingSenderId: "1097394175779",
  appId: "1:1097394175779:web:5b307b63f15c80f73bd696",
  measurementId: "G-N59NRR3N6T",
};

export const landingUrl = process.env.LANDING_URL || "/";

export function WebhhokURL() {
  return window.location.protocol + "//" + window.location.host + "/api/wh/";
}

export const MT4EAPath = process.env.NEXT_PUBLIC_MT4_EA;

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
