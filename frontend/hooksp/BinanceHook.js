import { useState } from "react";
import { useUser } from "../contexts/UserContext";
import {
  addBinanceAccount,
  updateName,
  updateColor,
  deleteBinanceAccount,
} from "../lib/binanace";
import { useBinance } from "../contexts/BinanceContext";
import axios from "axios";

export function AddBinanceAccount() {
  const { user } = useUser();
  const { getBinanceAccounts } = useBinance();

  const [accountName, setAccountName] = useState("");
  const [apiKey, setApiKey] = useState("");
  const [apiSecretKey, setApiSecretKey] = useState("");
  const [testAccount, setTestAccount] = useState(false);

  const [error, setError] = useState("");

  async function add() {
    setError("");

    if (!user) {
      setError("User is required");
      return;
    }

    if (!accountName) {
      setError("Account name is required");
      return;
    }
    if (!apiKey) {
      setError("API Key is required");
      return;
    }
    if (!apiSecretKey) {
      setError("API Secret Key is required");
      return;
    }

    const apiExist = await axios.post("/api/binance/auth", {
      apiKey: apiKey,
      apiSecret: apiSecretKey,
      test: testAccount,
    });

    if (!apiExist.data?.valid) {
      setError("API key or API Secret key is not availble.");
      return;
    }

    const r = await addBinanceAccount(
      user.uid,
      accountName,
      apiKey,
      apiSecretKey,
      testAccount
    );

    if (r.error) {
      if (typeof r?.error === "string") setError(r.error);
      else
        setError(
          "An error occurred while adding the account, please try again."
        );
      return;
    }

    const res = await getBinanceAccounts();
    console.log(res);
    return true;
  }

  return {
    accountName,
    setAccountName,
    apiKey,
    setApiKey,
    apiSecretKey,
    setApiSecretKey,
    testAccount,
    setTestAccount,
    error,
    add,
  };
}

export function EditAccountName(account) {
  const { user } = useUser();
  const { setBinanceAccounts } = useBinance();
  const [accountName, setAccountName] = useState(account?.accountName || "");
  const [error, setError] = useState("");

  async function editAccountName() {
    if (!user || !account) {
      setError("Invalid data provided!");
      return;
    }

    const r = await updateName(user.uid, account.id, accountName);
    if (r.length > 0) setBinanceAccounts(r);

    return r;
  }

  return { accountName, setAccountName, editAccountName, error };
}

export function EditAccountColor(account) {
  const { user } = useUser();
  const { setBinanceAccounts } = useBinance();
  const [accountColor, setAccountColor] = useState(account?.color || "");
  const [error, setError] = useState("");

  async function editAccountColor() {
    if (!user || !account) {
      setError("Invalid data provided!");
      return;
    }

    const r = await updateColor(user.uid, account.id, accountColor);
    if (r.length > 0) setBinanceAccounts(r);

    return r;
  }

  return { accountColor, setAccountColor, editAccountColor, error };
}

export function DeleteAccount(account) {
  const { user } = useUser();
  const { setBinanceAccounts } = useBinance();
  const [error, setError] = useState("");

  async function deleteAccount() {
    if (!user || !account) {
      setError("Invalid data provided!");
      return;
    }
    const r = await deleteBinanceAccount(user.uid, account.id);
    if (r.length > 0) setBinanceAccounts(r);

    return r;
  }

  return { deleteAccount, error };
}
