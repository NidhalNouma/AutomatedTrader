import crypto from "crypto";
import axios from "axios";

import {
  getAccountInfo,
  getSpotAccountInfo,
} from "../../../lib/third/binanace";

export default async function handler(req, res) {
  const { apiKey, apiSecret, test } = req.body;

  const fullAccountInfo = await getAccountInfo({ apiKey, apiSecret, test });
  const accountInfo = await getSpotAccountInfo({ apiKey, apiSecret, test });
  // const balances = accountInfo.balances.filter(
  //   (balance) => parseFloat(balance.free) + parseFloat(balance.locked) > 0
  // );

  // let totalBTC = 0;
  // let totalUSD = 0;

  // for (const balance of balances) {
  //   const asset = balance.asset;
  //   const assetBalance = parseFloat(balance.free) + parseFloat(balance.locked);
  //   let priceInBTC = 1;
  //   let priceInUSD = 1;

  //   if (asset !== "BTC") {
  //     priceInBTC = await getPrice(`${asset}BTC`);
  //   }

  //   if (asset !== "USDT" && asset !== "BUSD" && asset !== "USDC") {
  //     priceInUSD = await getPrice(`${asset}USDT`);
  //   }

  //   totalBTC += assetBalance * priceInBTC;
  //   totalUSD += assetBalance * priceInUSD;
  // }

  // console.log(totalBTC, " . ", totalUSD);

  return res.status(200).json({ accountInfo, fullAccountInfo });
  // return res.json(accountInfo);
}
