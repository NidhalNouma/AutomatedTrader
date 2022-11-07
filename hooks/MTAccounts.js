import { useState, useEffect, useContext, createContext } from "react";
import { listenToNewMTAccounts, deleteMTAccount } from "../db/mtAccounts";

export function GetMTAccounts() {
  const [mtAccounts, setMTAccounts] = useState([]);

  async function getAllMTAccounts(userId) {
    if (!userId) return;
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    listenToNewMTAccounts(userId, setMTAccounts);
  }

  function getData() {
    let data = [];
    mtAccounts.forEach(function (v, i) {
      console.log(v);
      if (v.data?.length > 0) data.push(...v.data);
    });

    return data;
  }

  return { mtAccounts, setMTAccounts, getAllMTAccounts, getData };
}

export async function DeleteMTAccount(userId, accountId) {
  if (!userId || !accountId) return;
  const r = await deleteMTAccount(userId, accountId);
  return r;
}

export const MTAccountsC = createContext(null);

export const MTAccountsCC = ({ children, value }) => {
  return <MTAccountsC.Provider value={value}>{children}</MTAccountsC.Provider>;
};

export const GetMTAccountsContext = () => useContext(MTAccountsC);

export const CalculateData = (data) => {
  const totalProfit = () => {
    let r = { profit: 0, loss: 0, total: 0, profitCnt: 0, lossCnt: 0 };
    data.forEach((v) => {
      let p = Number(v?.profit);
      r.total += p;
      if (p >= 0) {
        r.profit += p;
        r.profitCnt += 1;
      } else {
        r.loss += p;
        r.lossCnt += 1;
      }
    });
    return r;
  };

  const profitPerPair = () => {
    let r = {};

    data.forEach((v) => {
      if (r[v.symbol] !== undefined)
        r[v.symbol] = Number(r[v.symbol]) + Number(v.profit);
      else r[v.symbol] = Number(v.profit);
    });
    return r;
  };

  const profitPerWebhook = () => {
    let r = {};

    data.forEach((v) => {
      if (r[v.comment] !== undefined)
        r[v.comment] = Number(r[v.comment]) + Number(v.profit);
      else r[v.comment] = Number(v.profit);
    });
    return r;
  };

  return { totalProfit, profitPerPair, profitPerWebhook };
};
