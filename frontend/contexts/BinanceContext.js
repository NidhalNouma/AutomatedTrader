import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import axios from "axios";
import { getBinanceAccountsByUserId } from "../lib/binanace";
import { getAssetImageUrl } from "../utils/functions";

const BinanceContext = createContext();

const BATCH_SIZE = 400; // Number of assets to subscribe in each batch
const BATCH_DELAY = 1000; // Delay in milliseconds between each batch

export function BinanceProvider({ children }) {
  const { user } = useUser();
  const [binanceAccounts, setBinanceAccounts] = useState(null);
  const [binanceAccountsData, setBinanceAccountsData] = useState([]);

  async function getBinanceAccounts() {
    if (!user) return;
    const accounts = await getBinanceAccountsByUserId(user.uid);
    setBinanceAccounts(accounts || []);
    return accounts;
  }

  useEffect(() => {
    if (user) getBinanceAccounts();
  }, [user]);

  useEffect(() => {
    const fetchListenKey = async (apiKey, apiSecret, test) => {
      try {
        const body = {
          apiKey,
          apiSecret,
          test,
        };

        const [response, accountResponse] = await Promise.all([
          axios.post("/api/binance/auth", body),
          axios.post("/api/binance/accountInformation", body),
        ]);

        // if (test) {
        //   const r = await axios.post("/api/binance/openTrades", body);
        //   console.log("fetchAllOpenOrders ", r);
        // }

        return {
          listenKey: response.data.listenKey,
          accountInfo: accountResponse.data.accountInfo,
          fullAccountInfo: accountResponse.data.fullAccountInfo,
          totalValueInUSD: accountResponse.data.totalValueInUSD,
        };
      } catch (error) {
        console.error("Error fetching listen key:", error);

        return {
          listenKey: null,
          accountInfo: null,
        };
      }
    };

    const subscribeToPriceStream = (symbols, ws) => {
      ws.send(
        JSON.stringify({
          method: "SUBSCRIBE",
          params: symbols.map((symbol) => `${symbol?.toLowerCase()}usdt@trade`),
          id: new Date().getTime(),
        })
      );
    };

    const batchSubscribe = (symbols, ws) => {
      for (let i = 0; i < symbols.length; i += BATCH_SIZE) {
        const batch = symbols.slice(i, i + BATCH_SIZE);
        setTimeout(() => {
          subscribeToPriceStream(batch, ws);
        }, (i / BATCH_SIZE) * BATCH_DELAY);
      }
    };

    const connectWebSocket = async (account, setData, attempt = 1) => {
      const { listenKey, accountInfo, fullAccountInfo } = await fetchListenKey(
        account.apiKey,
        account.apiSecretKey,
        account.test
      );

      console.log("Account info .. ", accountInfo, fullAccountInfo, listenKey);

      if (fullAccountInfo) {
        const { spotInfo, usdMInfo, coinMInfo } = fullAccountInfo;

        const createBalanceData = (info) => {
          const arr = info.balances || info.assets;

          if (arr)
            return arr
              .filter(
                (balance) =>
                  parseFloat(balance.free) + parseFloat(balance.locked) > 0
              )
              .map((balance) => ({
                asset: balance.asset,
                balance: parseFloat(balance.free) + parseFloat(balance.locked),
                image: getAssetImageUrl(balance.asset), // Get the asset image URL
              }));

          return null;
        };

        const spotBalances = createBalanceData(spotInfo);
        const usdmBalances = createBalanceData(usdMInfo);
        const coinmBalances = createBalanceData(coinMInfo);

        const newAcc = {
          account: account,
          spot: { balances: spotBalances },
          usdm: { balances: usdmBalances },
          coinm: { balances: coinmBalances },
        };

        setData((prevData) => {
          const accIndex = prevData?.findIndex(
            (a) => a.account.id === account.id
          );

          if (accIndex === -1) {
            return [...prevData, newAcc];
          } else {
            const updatedData = [...prevData];
            updatedData[accIndex] = newAcc;
            return updatedData;
          }
        });
      }

      if (!listenKey) return;

      const wsUrl = account.test
        ? `wss://stream.testnet.binance.vision/ws/${listenKey}`
        : `wss://stream.binance.com:9443/ws/${listenKey}`;

      let ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connection opened for " + account.accountName);

        // Subscribe to account balance updates
        ws.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: ["outboundAccountPosition"],
            id: 1,
          })
        );

        // Subscribe to trade updates
        ws.send(
          JSON.stringify({
            method: "SUBSCRIBE",
            params: ["executionReport"],
            id: 2,
          })
        );

        // Gather all assets for subscription
        const allAssets = ["spot", "usdm", "coinm"].flatMap((type) => {
          const arr =
            fullAccountInfo[`${type}Info`]?.balances ||
            fullAccountInfo[`${type}Info`]?.assets;
          return arr
            ?.filter(
              (balance) =>
                parseFloat(balance.free) + parseFloat(balance.locked) > 0
            )
            .map((balance) => balance.asset)
            .filter((asset) => asset !== "USDT");
        });

        // Batch subscribe to asset price updates
        batchSubscribe(allAssets, ws);
      };

      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        // console.log("WebSocket message:", data);

        if (data.e === "outboundAccountPosition") {
          console.log("outboundAccountPosition :", data);
          // Update account balances
          setData((prevData) => {
            const accIndex = prevData.findIndex(
              (a) => a.account.id === account.id
            );
            if (accIndex !== -1) {
              const updatedData = [...prevData];
              ["spot", "usdm", "coinm"].forEach((type) => {
                updatedData[accIndex][type].balances = data.B.map(
                  (balance) => ({
                    asset: balance.a,
                    balance: parseFloat(balance.f) + parseFloat(balance.l),
                    image: getAssetImageUrl(balance.a),
                  })
                );
              });
              return updatedData;
            }
            return prevData;
          });
        } else if (data.e === "executionReport") {
          // Handle trade updates
          console.log("Trade update:", data);
        } else if (data.s && data.s.endsWith("USDT") && data.p) {
          // Handle price updates
          const asset = data.s.replace("USDT", "");
          const price = parseFloat(data.p);

          //   console.log(price, asset);

          setData((prevData) => {
            const accIndex = prevData.findIndex(
              (a) => a.account.id === account.id
            );
            if (accIndex !== -1) {
              const updatedData = [...prevData];
              ["spot", "usdm", "coinm"].forEach((type) => {
                const balanceIndex = updatedData[accIndex][
                  type
                ].balances?.findIndex((a) => a.asset === asset);

                if (balanceIndex && balanceIndex !== -1) {
                  updatedData[accIndex][type].balances[balanceIndex][
                    "usdtPrice"
                  ] =
                    price *
                    updatedData[accIndex][type].balances[balanceIndex].balance;
                }
              });
              return updatedData;
            }
            return prevData;
          });
        }
      };

      ws.onclose = (event) => {
        console.log(
          `WebSocket connection closed for ${account.accountName} with code: ${event.code} and reason: ${event.reason}`
        );
        // Attempt to reconnect after a delay
        // setTimeout(() => {
        //   connectWebSocket(account, setData);
        // }, 5000); // 5 seconds delay before reconnecting
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", account.accountName, error);
      };

      //   return () => {
      //     ws.close();
      //   };
    };

    if (binanceAccounts?.length > 0) {
      for (let account of binanceAccounts) {
        const accIndex = binanceAccountsData?.findIndex(
          (a) => a.account.id === account.id
        );
        if (accIndex === -1 || !binanceAccountsData)
          connectWebSocket(account, setBinanceAccountsData);
      }
    }
  }, [binanceAccounts]);

  useEffect(() => {
    if (!binanceAccounts) return;

    setBinanceAccountsData((prevData) => {
      // Create a new array to avoid mutating the state directly
      let newAccountsData = [...prevData];

      // Update existing accounts and mark them
      const updatedAccountIds = new Set();
      binanceAccounts.forEach((account) => {
        const index = newAccountsData.findIndex(
          (i) => i.account.id === account.id
        );
        if (index !== -1) {
          newAccountsData[index].account = account;
          updatedAccountIds.add(account.id);
        } else {
          // Add new accounts if they don't exist
          newAccountsData.push({
            account,
            spot: { balances: [] },
            usdm: { balances: [] },
            coinm: { balances: [] },
          });
        }
      });

      // Remove deleted accounts
      newAccountsData = newAccountsData.filter((data) =>
        updatedAccountIds.has(data.account.id)
      );

      return newAccountsData;
    });
  }, [binanceAccounts]);

  return (
    <BinanceContext.Provider
      value={{
        binanceAccounts,
        setBinanceAccounts,
        getBinanceAccounts,
        binanceAccountsData,
      }}
    >
      {children}
    </BinanceContext.Provider>
  );
}

export function useBinance() {
  return useContext(BinanceContext);
}
