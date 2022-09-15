import { useState, useEffect, useContext, createContext } from "react";
import { listenToNewMTAccounts } from "../db/mtAccounts";

export function GetMTAccounts() {
  const [mtAccounts, setMTAccounts] = useState([]);

  async function getAllMTAccounts(userId) {
    if (!userId) return;
    // const all = await getAlertsByUserId(userId);
    // setAlertsHook(all);
    listenToNewMTAccounts(userId, setMTAccounts);
  }

  return { mtAccounts, setMTAccounts, getAllMTAccounts };
}

export const MTAccountsC = createContext(null);

export const MTAccountsCC = ({ children, value }) => {
  return <MTAccountsC.Provider value={value}>{children}</MTAccountsC.Provider>;
};

export const GetMTAccountsContext = () => useContext(MTAccountsC);
