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
