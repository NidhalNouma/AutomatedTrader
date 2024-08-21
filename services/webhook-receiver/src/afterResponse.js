import { addAlert, getAlertByTrade } from "../lib/alerts.js";
import { newWebhookTrade } from "../lib/webhooks.js";

export async function afterResponse(
  userId,
  webhookId,
  message,
  messageData,
  type,
  symbol,
  apps,
  tradesResponse
) {
  // console.log("afterResponse", tradesResponse);

  let trades = [];
  tradesResponse.forEach(async (trade) => {
    if (trade.tradeId) {
      const r = {
        tradeId: trade.tradeId,
        accountId: trade.accountId,
        accountSrc: trade.accountSrc,
        trades: account.trades,
      };
      trades.push(r);

      // Check if type is a market order
      if (type === 0)
        await newWebhookTrade(
          webhookId,
          trade.accountId,
          trade.tradeId,
          trade.accountSrc
        );
    }
  });

  // if (type == 0) {
  const r = await addAlert(
    userId,
    webhookId,
    message,
    messageData,
    type,
    symbol,
    tradesResponse,
    trades
  );
  // }
}
