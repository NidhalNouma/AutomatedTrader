import { createContext, useContext, useEffect, useState } from "react";
import { useUser } from "./UserContext";
import {
  getMTAccountsByUserId,
  getUserAccountsWithHistory,
  checkHistoryData,
} from "../lib/metatrader";

const apiToken = process.env.NEXT_PUBLIC_META_API_TOKEN;
const MetatraderContext = createContext();

export function MetatraderProvider({ children }) {
  const { user } = useUser();
  const [metaapi, setMTAPI] = useState(null);
  const [mtAccounts, setMTAccounts] = useState(null);
  const [mtAccountsData, setMTAccountsData] = useState(null);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://unpkg.com/metaapi.cloud-sdk";
    script.async = true;
    script.onload = () => {
      const MetaApi = window.MetaApi.default;
      const api = new MetaApi(apiToken);
      setMTAPI(api);
    };
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function getAccountData(mtaccount) {
    const account = await metaapi.metatraderAccountApi.getAccount(
      mtaccount.accountApiId
    );
    const connection = account.getStreamingConnection();
    await connection.connect();
    await connection.waitSynchronized();
    const terminalState = connection.terminalState;
    return terminalState;
  }

  useEffect(() => {
    if (metaapi && mtAccounts?.length > 0) {
      const fetchAccountData = async () => {
        let data = [];
        for (let account of mtAccounts) {
          const accountData = await getAccountData(account);
          if (accountData) {
            const obj = {
              account,
              terminalState: accountData,
              positions: accountData.positions,
              information: accountData.accountInformation,
            };
            data.push(obj);
          }

          await checkHistoryData(account.id);
        }
        setMTAccountsData(data);
      };
      fetchAccountData();
    }
  }, [mtAccounts, metaapi]);

  async function getMTAccounts() {
    if (!user) return;
    const accounts = await getUserAccountsWithHistory(user.uid);
    console.log(accounts);
    setMTAccounts(accounts || []);
  }

  useEffect(() => {
    if (user) getMTAccounts();
  }, [user]);

  useEffect(() => {
    if (metaapi && mtAccounts?.length > 0) {
      const setupRealTimeListeners = async () => {
        const RiskManagement = window.MetaApi.RiskManagement;
        const EquityBalanceListener = window.MetaApi.EquityBalanceListener;
        const riskManagement = new RiskManagement(apiToken);

        class ExampleEquityBalanceListener extends EquityBalanceListener {
          constructor(accountApiId) {
            super(accountApiId);
            this.accountApiId = accountApiId;
          }

          async onEquityOrBalanceUpdated(equityBalanceData) {
            const account = await metaapi.metatraderAccountApi.getAccount(
              this.accountApiId
            );
            const connection = account.getStreamingConnection();
            const positions = connection.terminalState.positions;
            const information = connection.terminalState.accountInformation;

            setMTAccountsData((prevData) =>
              prevData?.map((data) =>
                data.account.accountApiId === this.accountApiId
                  ? { ...data, information, positions }
                  : data
              )
            );
          }
          async onConnected() {
            console.log("on connected event received");
          }
          async onDisconnected() {
            console.log("on disconnected event received");
          }
          async onError(error) {
            console.log("error event received", error);
          }
        }

        for (let account of mtAccounts) {
          const listener = new ExampleEquityBalanceListener(
            account.accountApiId
          );
          await riskManagement.riskManagementApi.addEquityBalanceListener(
            listener,
            account.accountApiId
          );
        }
      };
      setupRealTimeListeners();
    }
  }, [metaapi, mtAccounts]);

  return (
    <MetatraderContext.Provider
      value={{ mtAccounts, setMTAccounts, getMTAccounts, mtAccountsData }}
    >
      {children}
    </MetatraderContext.Provider>
  );
}

export function useMetatrader() {
  return useContext(MetatraderContext);
}
