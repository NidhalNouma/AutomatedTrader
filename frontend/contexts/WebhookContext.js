import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import { useMetatrader } from "./MetatraderContext";
import { useBinance } from "./BinanceContext";
import {
  getWebhooksByUserId,
  getUserWebhooksWithTrades,
  completeWebhookTradeData,
} from "../lib/webhooks";

const WebhookContext = createContext();

export function WebhookProvider({ children }) {
  const { user } = useUser();
  const { mtAccountsData } = useMetatrader();
  const [webhooks, setWebhooks] = useState(null);

  const [webhooksWithTrades, setWebhooksWithTrades] = useState(null);
  // console.log(mtAccountsData, webhooksWithTrades);
  useEffect(() => {
    if (webhooks?.length > 0) {
      const wWithTrades = webhooks.map((webhook) => {
        let newWebhook = webhook;
        if (webhook.trades?.length > 0) {
          let newTrades = webhook.trades.map((trade) => {
            let newTrade = trade;
            if (trade.tradeSrc === "metatrader" && mtAccountsData?.length > 0) {
              const account = mtAccountsData.find(
                (acc) => acc.account.id === trade.accountId
              );
              if (!trade.trade || trade?.live)
                if (account) {
                  let findLiveTrade = account?.positions?.find(
                    (t) => t.id === trade.tradeId
                  );
                  if (findLiveTrade) {
                    // console.log(findLiveTrade);
                    newTrade.live = true;
                    let tr = {
                      ...findLiveTrade,
                      symbol: findLiveTrade.symbol,
                      type:
                        findLiveTrade?.type?.toUpperCase()?.search("BUY") >= 0
                          ? "Buy"
                          : "Sell",
                      open: findLiveTrade.openPrice,
                      close: findLiveTrade.currentPrice,
                      openTime: findLiveTrade.time,
                      profit: findLiveTrade.profit,
                    };
                    newTrade.trade = tr;
                  } else {
                    let findHistoryTrade = account?.account?.historyData?.find(
                      (t) =>
                        t.positionId === trade.tradeId || t.id === trade.tradeId
                    );

                    if (findHistoryTrade) {
                      newTrade.live = false;
                      newTrade.trade = findHistoryTrade;
                      completeWebhookTradeData(
                        webhook.id,
                        trade.tradeId,
                        trade.accountId,
                        trade.tradeSrc,
                        findHistoryTrade
                      );
                    }
                  }
                }
            }
            return newTrade;
          });

          newWebhook.trades = newTrades;
        }
        return newWebhook;
      });

      // console.log("wwwhh", wWithTrades);

      setWebhooksWithTrades(wWithTrades);
    } else setWebhooksWithTrades(webhooks);
  }, [webhooks, mtAccountsData]);

  const getAllWebhooks = async (userId, onlyPublic = false) => {
    if (!userId) return;
    let r = await getUserWebhooksWithTrades(userId);
    // console.log(r);
    if (r.length > 0)
      r = r.sort((a, b) => b?.created_at.seconds - a?.created_at.seconds);
    if (!onlyPublic) setWebhooks(r);
    else {
      const nr = r.filter((v, i) => v?.public);
      setWebhooks(nr);
    }
  };

  function changeWebhookData(data) {
    const i = webhooks.indexOf(webhooks.find((wh) => wh.id === data.id));
    if (i === -1) return;
    setWebhooks((whs) => {
      const r = whs;
      r[i] = data;
      return r;
    });
  }

  useEffect(() => {
    if (user) {
      getAllWebhooks(user.uid);
    }
  }, [user]);

  return (
    <WebhookContext.Provider
      value={{ webhooks, setWebhooks, getAllWebhooks, webhooksWithTrades }}
    >
      {children}
    </WebhookContext.Provider>
  );
}

export function useWebhook() {
  return useContext(WebhookContext);
}
