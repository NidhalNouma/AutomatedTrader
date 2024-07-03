import { useState, useEffect, useContext, createContext } from "react";
import {
  listenToNewMTAccounts,
  deleteMTAccount,
  updateDisplayName,
  getMTAccountsByUserId,
  updateColor,
  addMTAccount,
  getAccountInformation,
  getHistoryOrders,
  updateLastHistoryData,
  getActiveOrders,
  closeTrade,
} from "../db/Metatrader_API";

import moment from "moment";
import io from "socket.io-client";

// import dynamic from "next/dynamic";
// const MetaApi = dynamic(
//   () => import("metaapi.cloud-sdk").then((mod) => mod.default),
//   { ssr: false }
// );

// const apiToken = process.env.NEXT_PUBLIC_META_API_TOKEN;
// const metaApi = new MetaApi(apiToken);
// console.log("IMPORT ---- ", metaApi);

export function GetMTAPIAccounts() {
  const [mtAPIAccounts, setMTAPIAccounts] = useState([]);
  const [mt5APIAccounts, setMT5APIAccounts] = useState([]);
  const [mt4APIAccounts, setMT4APIAccounts] = useState([]);

  async function getHistoryData(mt) {
    // const r = await getAccountInformation(mt.accountApiId);
    // Object.assign(mt, r.data);

    if (!mt) return mt;

    let loop = true;
    let count = 0;
    let rh = [];
    while (loop) {
      let res = await getHistoryOrders(mt.accountApiId, mt.lastUpdated, count);
      if (res?.length > 0) rh = [...rh, ...res];
      console.log(res, count);
      if (res.length >= 1000) count += 1000;
      else loop = false;
    }

    // console.log(mt.lastUpdated, mt);

    if (rh.length > 0) {
      const data = mergeData(rh);
      let accountStartBalance = null;
      let stBalance = rh.find((item) => item.type === "DEAL_TYPE_BALANCE");
      if (stBalance) accountStartBalance = stBalance.profit;
      mt["data"] = data;
      mt["accountStartBalance"] = accountStartBalance;
      // const nr = await updateLastHistoryData(
      //   mt.userId,
      //   mt.id,
      //   data,
      //   accountStartBalance
      // );

      // mt = nr;
    }

    // Object.assign(mt, r.data);

    return mt;
  }

  // useEffect(() => {
  //   const fetchDataAndSetInterval = async () => {
  //     await getHistoryData();
  //   };

  //   fetchDataAndSetInterval(); // Initial call

  //   const intervalId = setInterval(fetchDataAndSetInterval, 10 * 1000); // 60 000 milliseconds = 1 minute

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, [mtAPIAccounts.length]);

  async function getAllMTAPIAccounts(userId) {
    if (!userId) return;
    listenToNewMTAccounts(userId, (acc) => {
      setMTAPIAccounts(filterData(userId, acc));
    });
  }

  useEffect(() => {
    if (mtAPIAccounts.length > 0) {
      const accounts = mtAPIAccounts;

      const socket = io("");

      mtAPIAccounts.forEach((account) => {
        socket.emit("subscribe", account.accountApiId);

        socket.on("loaded", async (data) => {
          // console.log("DATA === >> ", data);
          const cAccount = mtAPIAccounts.find(
            (acc) => acc.accountApiId === data.accountId
          );

          if (cAccount) {
            const history = await getHistoryData(cAccount);
            if (data.accountInformation)
              Object.assign(cAccount, data.accountInformation);

            if (data.positions) cAccount["positions"] = data.positions;

            const newAccounts = accounts.map(
              (acc) => accounts.find((acc1) => acc1.id === cAccount.id) || acc
            );

            setMTAPIAccounts([...newAccounts]);
          }
        });

        socket.on("accountInfo", async (data) => {
          const cAccount = mtAPIAccounts.find(
            (acc) => acc.accountApiId === data.accountId
          );

          if (cAccount) {
            if (data.accountInformation)
              Object.assign(cAccount, data.accountInformation);

            const newAccounts = accounts.map(
              (acc) => accounts.find((acc1) => acc1.id === cAccount.id) || acc
            );

            setMTAPIAccounts([...newAccounts]);
          }
        });

        socket.on("positions", async (data) => {
          const cAccount = mtAPIAccounts.find(
            (acc) => acc.accountApiId === data.accountId
          );

          if (cAccount) {
            if (data.positions) cAccount["positions"] = data.positions;

            const newAccounts = accounts.map(
              (acc) => accounts.find((acc1) => acc1.id === cAccount.id) || acc
            );

            setMTAPIAccounts([...newAccounts]);
          }
        });
      });

      return () => {
        socket.disconnect();
      };
    }
  }, [mtAPIAccounts.length]);

  useEffect(() => {
    if (mtAPIAccounts.length > 0) {
      // let ids = accounts.map((account) => account.accountApiId);

      const mt5s = mtAPIAccounts.filter((v) => v.type === "mt5");
      const mt4s = mtAPIAccounts.filter((v) => v.type === "mt4");
      setMT4APIAccounts(mt4s);
      setMT5APIAccounts(mt5s);
    }
  }, [mtAPIAccounts]);

  async function getAllMTAPIAccountsWithoutListen(userId) {
    if (!userId) return;
    const all = await getMTAccountsByUserId(userId);

    const mt5s = all.filter((v) => v.type === "mt55");

    setMTAPIAccounts(filterData(userId, mt5s));
  }

  function getMTAPIData(accId = null, withWebHook = null, type = "mt4") {
    let data = [];
    const accounts = mtAPIAccounts;
    accounts.forEach(function (v, i) {
      if (accId === null || accId === v.id) {
        if (v.data?.length > 0) {
          if (!withWebHook) {
            // if (v.type === type || v.platform === type)
            v.data.forEach((d) => {
              data.push({
                ...d,
                accountName: v.accountName,
                accountDisplayName: v.accountDisplayName,
                accountId: v.id,
                accountColor: v.color,
              });
            });
          } else if (withWebHook) {
            // if (v.type === type || v.platform === type)
            v.data.forEach((d) => {
              if (d.Id == withWebHook)
                data.push({
                  ...d,
                  accountName: v.accountName,
                  accountDisplayName: v.accountDisplayName,
                  accountId: v.id,
                  accountColor: v.color,
                });
            });
          }
        }
      }
    });
    data.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.closeTime) - new Date(b.closeTime);
    });
    return data;
  }

  return {
    mtAPIAccounts,
    mt5APIAccounts,
    mt4APIAccounts,
    setMTAPIAccounts,
    setMT4APIAccounts,
    setMT5APIAccounts,
    getAllMTAPIAccounts,
    getAllMTAPIAccountsWithoutListen,
    getMTAPIData,
  };
}

export function GetLiveTrades(account) {
  const [trades, setTrades] = useState([]);

  const getData = async () => {
    if (!account.accountApiId) return;

    const r = await getActiveOrders(account.accountApiId);
    // console.log(r);
    if (r.length >= 0) setTrades(r);
  };

  async function closeLiveTrade(tradeId) {
    const r = await closeTrade(account.accountApiId, tradeId);
    console.log("Closing a trade ...", r);
    await getData();
  }

  // useEffect(() => {
  //   getData(); // Initial call

  //   const intervalId = setInterval(getData, 5000); // 60000 milliseconds = 1 minute

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);

  return { trades, closeLiveTrade };
}

export function AddNewMTAccount() {
  const [type, setType] = useState("mt4");
  const [accountName, setAccountName] = useState("");
  const [accountLogin, setAccountLogin] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountServer, setAccountServer] = useState("");

  const [error, setError] = useState("");
  const [spin, setSpin] = useState(false);

  async function add(userId, close) {
    setError("");

    if (!accountName) {
      setError("Account name is required");
      return;
    }
    if (!accountLogin) {
      setError("Account login is required");
      return;
    }
    if (!accountPassword) {
      setError("Account password is required");
      return;
    }
    if (!accountServer) {
      setError("Account server is required");
      return;
    }

    setSpin(true);

    const r = await addMTAccount(
      userId,
      accountName,
      accountLogin,
      accountPassword,
      accountServer,
      type
    );
    // console.log(r);

    if (r.error) {
      if (typeof r?.error === "string") setError(r.error);
      else
        setError(
          "An error occurred while adding the account, please try again."
        );
      setSpin(false);
    } else {
      setSpin(false);
      close();
    }
  }

  return {
    type,
    setType,
    accountName,
    setAccountName,
    accountLogin,
    setAccountLogin,
    accountPassword,
    setAccountPassword,
    accountServer,
    setAccountServer,
    error,
    spin,
    add,
  };
}

export function RefreshAccountData(mtAccounts) {
  const [accountsData, setAccountsData] = useState(null);

  useEffect(() => {
    const fetchAccountInformation = async () => {
      //   console.log("Fetching account information...");
      try {
        const response = await getAccountInformation(mtAccounts.accountApiId);

        if (response.data.error) {
          console.error("Error in API response:", response.data);
        } else {
          //   console.log(
          //     "Account information fetched successfully:",
          //     response.data
          //   );
          setAccountsData({ ...response.data, ...mtAccounts });
        }

        // const r = await getHistoryOrders(mtAccounts.accountApiId);
        // console.log(r);
      } catch (error) {
        console.error(
          "An error occurred while fetching account information:",
          error
        );
      }
    };

    fetchAccountInformation();

    const intervalId = setInterval(fetchAccountInformation, 30000); // 60000 milliseconds = 1 minute

    return () => {
      clearInterval(intervalId);
    };
  }, [mtAccounts.accountApiId]);

  return accountsData;
}

export async function DeleteMTAccount(userId, accountId, accountApiId) {
  if (!userId || !accountId || !accountApiId) return;
  const r = await deleteMTAccount(userId, accountId, accountApiId);
  return r;
}

export function EditMTAccountDisplayName(userId, accountId, defaultName) {
  const [mtname, setMtname] = useState(defaultName || "");

  async function editMTDisplayName() {
    if (!userId || !accountId) return;
    const r = await updateDisplayName(userId, accountId, mtname);
    return r;
  }

  return { mtname, setMtname, editMTDisplayName };
}

export function EditMTAccountColor(userId, accountId, defautColor) {
  const [mtcolor, setMtcolor] = useState(defautColor || "");

  async function editMTColor() {
    if (!userId || !accountId) return;
    const r = await updateColor(userId, accountId, mtcolor);
    return r;
  }

  return { mtcolor, setMtcolor, editMTColor };
}

export const MTAPIAccountsC = createContext(null);

export const MTAPIAccountsCC = ({ children, value }) => {
  return (
    <MTAPIAccountsC.Provider value={value}>{children}</MTAPIAccountsC.Provider>
  );
};

export const GetMTAPIAccountsContext = () => useContext(MTAPIAccountsC);

function filterData(userId, accounts) {
  // return accounts;
  if (userId === process.env.NEXT_PUBLIC_TEST_PROFILE_ID) {
    const testWHs = process.env.NEXT_PUBLIC_TEST_WEBHOOKS_LIST_IDS;
    const testWHsIds = testWHs?.split(",");

    const newData = accounts.map((acc) => {
      // let cnt = 0;

      let data = acc.data;
      if (data?.length > 0) {
        data = data.map((t) => {
          let profit = t.profit;
          let type = t.type;
          let pips = t.pips;

          if (profit < 0) {
            profit = -profit;
            if (type === "0") type = "1";
            if (type === "1") type = "0";
            pips = -pips;

            // cnt += 1;
          }

          let ID = t.ID;
          if (testWHsIds?.length > 0) {
            const random = Math.floor(Math.random() * testWHsIds.length);
            ID = testWHsIds[random];
          }

          // console.log(ID);

          return { ...t, profit, pips, type, ID };
        });
      }
      // console.log(data);
      return { ...acc, data };
    });

    return newData;
  }

  return accounts;
}

function mergeData(data) {
  const mergedData = data?.reduce((accumulator, currentItem) => {
    if (currentItem.entryType === "DEAL_ENTRY_OUT") {
      const existingItem = data.find(
        (item) =>
          item.positionId === currentItem.positionId &&
          item.entryType === "DEAL_ENTRY_IN"
      );

      if (existingItem) {
        // delete existingItem["id"];
        // delete currentItem["swap"];
        // delete currentItem["commission"];
        // delete currentItem["profit"];

        if (existingItem.type === "DEAL_TYPE_BUY") currentItem["type"] = "0";
        else if (existingItem.type === "DEAL_TYPE_SELL") currentItem.type = "1";

        renameKey(currentItem, "time", "closeTime");
        renameKey(currentItem, "brokerTime", "closeBrokerTime");
        renameKey(currentItem, "volume", "lot");
        renameKey(currentItem, "price", "close");
        renameKey(currentItem, "orderId", "orderTicket");

        currentItem["open"] = existingItem["price"];
        currentItem["openTime"] = existingItem["time"];
        currentItem["openBrokerTime"] = existingItem["brokerTime"];

        accumulator.push(currentItem);
      }
    }
    return accumulator;
  }, []);

  //   console.log(mergedData);
  return mergedData;
}
function renameKey(obj, oldKey, newKey) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}

//   {
//     "id": "73619724",
//     "platform": "mt4",
//     "type": "DEAL_TYPE_SELL",
//     "time": "2023-09-05T20:55:56.000Z",
//     "brokerTime": "2023-09-05 23:55:56.000",
//     "commission": 0,
//     "swap": 0,
//     "profit": 0,
//     "symbol": "NASUSD.HKT",
//     "magic": 5790234,
//     "orderId": "73619724",
//     "positionId": "73619724",
//     "reason": "DEAL_REASON_UNKNOWN",
//     "brokerComment": "to #73619752",
//     "entryType": "DEAL_ENTRY_IN",
//     "volume": 100,
//     "price": 15493.8,
//     "stopLoss": 15501.8,
//     "accountCurrencyExchangeRate": 1,
//     "comment": "to #73619752",
//     "updateSequenceNumber": 1695829537000001
// }{
//     "id": "73619724",
//     "platform": "mt4",
//     "type": "DEAL_TYPE_BUY",
//     "time": "2023-09-05T20:59:12.000Z",
//     "brokerTime": "2023-09-05 23:59:12.000",
//     "commission": 0,
//     "swap": 0,
//     "profit": -180,
//     "symbol": "NASUSD.HKT",
//     "magic": 5790234,
//     "orderId": "73619724",
//     "positionId": "73619724",
//     "reason": "DEAL_REASON_UNKNOWN",
//     "brokerComment": "to #73619752",
//     "entryType": "DEAL_ENTRY_OUT",
//     "volume": 10,
//     "price": 15495.6,
//     "stopLoss": 15501.8,
//     "accountCurrencyExchangeRate": 1,
//     "comment": "to #73619752",
//     "updateSequenceNumber": 1695829537000001
// }
