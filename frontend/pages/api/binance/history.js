import crypto from "crypto";
import axios from "axios";

export default async function handler(req, res) {
  const { apiKey, apiSecret, test } = req.body;

  if (!apiKey || !apiSecret)
    return res.status(500).json({ error: "Invalid API Keys" });

  let timestamp = Date.now();
  let signature = crypto
    .createHmac("sha256", apiSecret)
    .update(`timestamp=${timestamp}`)
    .digest("hex");

  let baseURL = "https://api.binance.com";
  if (test) baseURL = "https://testnet.binance.vision";

  try {
    const url1 = baseURL + "/api/v3/exchangeInfo";
    const response1 = await axios.get(url1, {
      headers: {
        "X-MBX-APIKEY": apiKey,
      },
    });
    const symbols = response1.data.symbols.map((symbol) => symbol.symbol);

    console.log(symbols);
    const trades = [];

    for (let i = 0; i < symbols.length; i++) {
      const symbol = symbols[i];
      timestamp = Date.now();
      const params = `symbol=${symbol}&timestamp=${timestamp}`;
      signature = crypto
        .createHmac("sha256", apiSecret)
        .update(params)
        .digest("hex");
      const url = baseURL + `/api/v3/myTrades?${params}&signature=${signature}`;

      try {
        const response = await axios.get(url, {
          headers: {
            "X-MBX-APIKEY": apiKey,
          },
        });
        console.log(response.data);
        trades.push(...response.data);
      } catch (error) {
        console.error(`Failed to fetch trades for symbol ${symbol}`, error);
      }

      // Throttle the requests to avoid rate limits
      await sleep(1000); // Sleep for 1 second between requests
    }

    return res.status(200).json(trades);
  } catch (error) {
    return res
      .status(200)
      .json({ error: "Failed to fetch trades history ", err: error });
  }
}
