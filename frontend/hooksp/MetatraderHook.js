import { useEffect, useState } from "react";
import { useUser } from "../contexts/UserContext";
import { useMetatrader } from "../contexts/MetatraderContext";
import {
  addMTAccount,
  updateDisplayName,
  updateColor,
  deleteMTAccount,
} from "../lib/metatrader";
import { addMTAccount as addMTAccountAPI } from "../lib/third/metaapi";
import moment from "moment";
import { color } from "chart.js/helpers";
import { data } from "autoprefixer";

export function AddMTAccount() {
  const { user } = useUser();

  const { getMTAccounts } = useMetatrader();

  const [type, setType] = useState("mt4");
  const [accountName, setAccountName] = useState("");
  const [accountLogin, setAccountLogin] = useState("");
  const [accountPassword, setAccountPassword] = useState("");
  const [accountServer, setAccountServer] = useState("");

  const [error, setError] = useState("");

  async function add() {
    setError("");

    if (!user?.uid) {
      setError("User is required");
      return;
    }

    if (!type) {
      setError("Type is required");
      return;
    }

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

    const rApi = await addMTAccountAPI(
      accountName,
      accountLogin,
      accountPassword,
      accountServer,
      type
    );

    console.log(rApi);

    if (rApi.error) {
      if (typeof rApi?.error === "string") setError(rApi.error);
      if (typeof rApi?.error?.message === "string")
        setError(rApi.error.message);
      else
        setError(
          "Account or server does not exist, please try again with a different account or contact us."
        );

      return;
    }

    const r = await addMTAccount(
      user.uid,
      rApi.id,
      accountName,
      accountServer,
      accountLogin,
      accountPassword,
      type
    );

    if (r.error) {
      if (typeof r?.error === "string") setError(r.error);
      else
        setError(
          "An error occurred while adding the account, please try again."
        );
      return;
    }

    await getMTAccounts();

    return true;
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
    add,
  };
}

export function EditAccountName(account) {
  const { user } = useUser();
  const { setMTAccounts } = useMetatrader();
  const [accountName, setAccountName] = useState(
    account?.accountDisplayName || ""
  );
  const [error, setError] = useState("");

  async function editAccountName() {
    if (!user || !account) {
      setError("Invalid data provided!");
      return;
    }

    const r = await updateDisplayName(user.uid, account.id, accountName);
    if (r.length > 0) setMTAccounts(r);

    return r;
  }

  return { accountName, setAccountName, editAccountName, error };
}

export function EditAccountColor(account) {
  const { user } = useUser();
  const { setMTAccounts } = useMetatrader();
  const [accountColor, setAccountColor] = useState(account?.color || "");
  const [error, setError] = useState("");

  async function editAccountColor() {
    if (!user || !account) {
      setError("Invalid data provided!");
      return;
    }

    const r = await updateColor(user.uid, account.id, accountColor);
    if (r.length > 0) setMTAccounts(r);

    return r;
  }

  return { accountColor, setAccountColor, editAccountColor, error };
}

export function DeleteAccount(account) {
  const { user } = useUser();
  const { getMTAccounts } = useMetatrader();
  const [error, setError] = useState("");

  async function deleteAccount() {
    if (!user || !account) {
      setError("Invalid data provided!");
      return;
    }
    const r = await deleteMTAccount(user.uid, account.id, account.accountApiId);

    if (r?.error) {
      setError(r.error);
      return false;
    } else await getMTAccounts();

    return true;
  }

  return { deleteAccount, error };
}

function processTrades(
  trades,
  startTime,
  endTime,
  initialBalance,
  targetCount = 10,
  withPairs = false
) {
  // Convert start and end times to Date objects
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Step 1: Filter objects based on closeTime
  const filteredTrades = trades?.filter((trade) => {
    const closeTime = new Date(trade.closeTime);
    return closeTime >= start && closeTime <= end;
  });

  // Initialize the result array
  const result = [];

  // Helper function to aggregate trades
  const aggregateTrades = (trades) => {
    const aggregatedTrade = trades?.reduce(
      (acc, trade) => {
        acc.netprofit += trade.profit;
        acc.profit += trade.profit > 0 ? trade.profit : 0;
        acc.loss += trade.profit < 0 ? trade.profit : 0;
        acc.lotsize += trade.lot;
        acc.profitlot += trade.profit > 0 ? trade.lot : 0;
        acc.negative += trade.profit < 0 ? trade.lot : 0;
        acc.trades += 1;
        acc.profitTrades += trade.profit > 0 ? 1 : 0;
        acc.negativeTrades += trade.profit < 0 ? 1 : 0;
        if (trade.type == 0) {
          acc.longTrades += 1;
          acc.profitLongTrades += trade.profit > 0 ? 1 : 0;
          acc.lossLongTrades += trade.profit < 0 ? 1 : 0;
        } else if (trade.type == 1) {
          acc.shortTrades += 1;
          acc.profitShortTrades += trade.profit > 0 ? 1 : 0;
          acc.lossShortTrades += trade.profit < 0 ? 1 : 0;
        }

        // Aggregate pair data if withPairs is true
        if (withPairs) {
          if (!acc.pairs[trade.symbol]) {
            acc.pairs[trade.symbol] = {
              pair: trade.symbol,
              profit: 0,
              loss: 0,
              totalTrades: 0,
              lossTrades: 0,
              profitTrades: 0,
            };
          }
          const pair = acc.pairs[trade.symbol];
          pair.profit += trade.profit > 0 ? trade.profit : 0;
          pair.loss += trade.profit < 0 ? trade.profit : 0;
          pair.totalTrades += 1;
          pair.profitTrades += trade.profit > 0 ? 1 : 0;
          pair.lossTrades += trade.profit < 0 ? 1 : 0;
        }

        return acc;
      },
      {
        netprofit: 0,
        profit: 0,
        loss: 0,
        lotsize: 0,
        profitlot: 0,
        negative: 0,
        trades: 0,
        profitTrades: 0,
        negativeTrades: 0,
        longTrades: 0,
        profitLongTrades: 0,
        lossLongTrades: 0,
        shortTrades: 0,
        profitShortTrades: 0,
        lossShortTrades: 0,
        pairs: {},
        closeTime: trades[0]?.closeTime || startTime,
      }
    );

    // Calculate profit percentage
    if (initialBalance) {
      aggregatedTrade.netProfitPercentage =
        (aggregatedTrade.netprofit / initialBalance) * 100;
      aggregatedTrade.profitPercentage =
        (aggregatedTrade.profit / initialBalance) * 100;
      aggregatedTrade.lossPercentage =
        (aggregatedTrade.loss / initialBalance) * 100;
    } else {
      aggregatedTrade.netProfitPercentage = 0;
      aggregatedTrade.profitPercentage = 0;
      aggregatedTrade.lossPercentage = 0;
    }

    // Convert pairs object to array
    if (withPairs) {
      aggregatedTrade.pairs = Object.values(aggregatedTrade.pairs);
    } else {
      delete aggregatedTrade.pairs;
    }

    return aggregatedTrade;
  };

  // Handle case when targetCount is 1
  if (targetCount === 1) {
    result.push(aggregateTrades(filteredTrades));
  } else {
    // Step 2: Divide the time interval into equal periods
    const interval = (end - start) / (targetCount - 1);

    for (let i = 0; i < targetCount; i++) {
      const periodStart = new Date(start.getTime() + i * interval);
      const periodEnd =
        i === targetCount - 1
          ? end
          : new Date(start.getTime() + (i + 1) * interval);

      // Step 3: Aggregate objects within each period
      const periodTrades = filteredTrades.filter((trade) => {
        const closeTime = new Date(trade.closeTime);
        return closeTime >= periodStart && closeTime < periodEnd;
      });

      if (periodTrades.length > 0) {
        result.push(aggregateTrades(periodTrades));
      } else {
        // If no trades in this period, add a dummy trade with profit 0
        const dummyTrade = {
          netprofit: 0,
          profit: 0,
          loss: 0,
          lotsize: 0,
          profitlot: 0,
          negative: 0,
          trades: 0,
          profitTrades: 0,
          negativeTrades: 0,
          longTrades: 0,
          profitLongTrades: 0,
          lossLongTrades: 0,
          shortTrades: 0,
          profitShortTrades: 0,
          lossShortTrades: 0,
          profitPercentage: 0,
          pairs: [],
          closeTime: periodStart.toISOString(), // Start of the period
        };
        result.push(dummyTrade);
      }
    }

    // Ensure the first and last object have the correct closeTime
    if (result.length > 0) {
      result[0].closeTime = startTime;
      result[result.length - 1].closeTime = endTime;
    }
  }

  return result;
}

function mergeAndSortPairs(pairs) {
  // Merge pairs with the same pair name
  const mergedPairs = pairs.reduce((acc, pair) => {
    if (!acc[pair.pair]) {
      acc[pair.pair] = {
        pair: pair.pair,
        profit: 0,
        loss: 0,
        totalTrades: 0,
        lossTrades: 0,
        profitTrades: 0,
      };
    }
    acc[pair.pair].profit += pair.profit;
    acc[pair.pair].loss += pair.loss;
    acc[pair.pair].totalTrades += pair.totalTrades;
    acc[pair.pair].lossTrades += pair.lossTrades;
    acc[pair.pair].profitTrades += pair.profitTrades;

    return acc;
  }, {});

  // Convert the merged pairs object to an array
  const mergedPairsArray = Object.values(mergedPairs);

  // Sort the merged pairs array based on totalTrades
  mergedPairsArray.sort((a, b) => b.totalTrades - a.totalTrades);

  return mergedPairsArray;
}

export function AccountData() {
  const { mtAccounts } = useMetatrader();

  const [lineDataType, setLineDataType] = useState(0);
  const lineDataPeriodOption = [
    { value: "Year", label: "Year" },
    { value: "Month", label: "Month" },
    { value: "Week", label: "Week" },
    { value: "All", label: "All" },
  ];
  const [lineDataPeriod, setLineDataPeriod] = useState(lineDataPeriodOption[0]);
  const [lineData, setLineData] = useState(null);

  useEffect(() => {
    const data = [];

    if (mtAccounts?.length > 0)
      for (let account of mtAccounts)
        if (account?.historyData?.length > 0) {
          console.log(account);
          let startTime = moment()
            .startOf("year")
            .format("YYYY-MM-DD HH:mm:ss");
          if (lineDataPeriod.value === "Year")
            startTime = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
          else if (lineDataPeriod.value === "Month")
            startTime = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
          else if (lineDataPeriod.value === "Week")
            startTime = moment().startOf("week").format("YYYY-MM-DD HH:mm:ss");
          else if (lineDataPeriod.value === "All")
            startTime =
              account.historyData[0]?.closeTime ||
              moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");

          let endTime = moment();
          const targetCount = 10;

          const pr = processTrades(
            account?.historyData,
            startTime,
            endTime,
            account.accountStartBalance,
            targetCount
          );

          const dataset = {
            labels: pr.map(
              (v) =>
                new Date(v.closeTime).getMonth() +
                1 +
                "/" +
                new Date(v.closeTime).getDate()
            ),
            color: account.color,
            label: account.accountDisplayName,
            data: pr.map((v) =>
              lineDataType === 2
                ? v.loss
                : lineDataType === 1
                ? v.profit
                : v.netprofit
            ),
          };

          data.push(dataset);
        }

    setLineData(data);
  }, [mtAccounts, lineDataType, lineDataPeriod]);

  const [lineBarData, setLineBarData] = useState(null);
  const [lineBarAccount, setLineBarAccount] = useState(null);
  const [lineBarDataPeriod, setLineBarDataPeriod] = useState(
    lineDataPeriodOption[0]
  );
  const [lineBarDataValues, setLineBarDataValues] = useState({
    all: 0,
    today: 0,
    week: 0,
    month: 0,
    year: 0,
  });

  useEffect(() => {
    // if (lineBarAccount === null)
    if (mtAccounts?.length > 0)
      setLineBarAccount({
        label: mtAccounts[0].accountDisplayName,
        value: mtAccounts[0],
      });
  }, [mtAccounts]);

  useEffect(() => {
    if (lineBarAccount) {
      let account = lineBarAccount.value;

      let endTime = moment();
      let allDate =
        account?.historyData?.length > 0
          ? account.historyData[0]?.closeTime
          : moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
      let todayDate = moment().startOf("day").format("YYYY-MM-DD HH:mm:ss");
      let weekDate = moment().startOf("week").format("YYYY-MM-DD HH:mm:ss");
      let monthDate = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
      let yearDate = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");

      const allValue = processTrades(
        account?.historyData,
        allDate,
        endTime,
        account.accountStartBalance,
        1
      );
      const todayValue = processTrades(
        account?.historyData,
        todayDate,
        endTime,
        account.accountStartBalance,
        1
      );
      const weekValue = processTrades(
        account?.historyData,
        weekDate,
        endTime,
        account.accountStartBalance,
        1
      );
      const monthValue = processTrades(
        account?.historyData,
        monthDate,
        endTime,
        account.accountStartBalance,
        1
      );
      const yearValue = processTrades(
        account?.historyData,
        yearDate,
        endTime,
        account.accountStartBalance,
        1
      );

      setLineBarDataValues({
        all: allValue[0].netProfitPercentage,
        today: todayValue[0].netProfitPercentage,
        week: weekValue[0].netProfitPercentage,
        month: monthValue[0].netProfitPercentage,
        year: yearValue[0].netProfitPercentage,
      });
    }
  }, [lineBarAccount]);

  useEffect(() => {
    if (lineBarAccount) {
      let account = lineBarAccount.value;

      let startTime = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
      if (lineBarDataPeriod.value === "Year")
        startTime = moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");
      else if (lineBarDataPeriod.value === "Month")
        startTime = moment().startOf("month").format("YYYY-MM-DD HH:mm:ss");
      else if (lineBarDataPeriod.value === "Week")
        startTime = moment().startOf("week").format("YYYY-MM-DD HH:mm:ss");
      else if (lineBarDataPeriod.value === "All")
        startTime =
          account.historyData[0]?.closeTime ||
          moment().startOf("year").format("YYYY-MM-DD HH:mm:ss");

      let endTime = moment();

      const targetCount = 10;

      const pr = processTrades(
        account?.historyData,
        startTime,
        endTime,
        account.accountStartBalance,
        targetCount
      );

      const dataset1 = {
        labels: pr.map(
          (v) =>
            new Date(v.closeTime).getMonth() +
            1 +
            "/" +
            new Date(v.closeTime).getDate()
        ),
        color: `hsl(${getComputedStyle(
          document.documentElement
        ).getPropertyValue("--profit-color")})`,
        // color: account.color,
        label: "Profit",
        data: pr.map((v) => v.profitPercentage),
      };
      const dataset2 = {
        labels: pr.map(
          (v) =>
            new Date(v.closeTime).getMonth() +
            1 +
            "/" +
            new Date(v.closeTime).getDate()
        ),
        color: `hsl(${getComputedStyle(
          document.documentElement
        ).getPropertyValue("--loss-color")})`,
        label: "Loss",
        data: pr.map((v) => v.lossPercentage),
      };

      setLineBarData([dataset1, dataset2]);
    }
  }, [lineBarAccount, lineBarDataPeriod]);

  const [halfDoughnutData, setHalfDoughnutData] = useState(null);

  useEffect(() => {
    if (mtAccounts?.length > 0) {
      const data = {
        profitPercentage: 0,
        lossPercentage: 0,
      };
      for (let account of mtAccounts)
        if (account?.historyData?.length > 0) {
          let endTime = moment();
          let allDate = account.historyData[0]?.closeTime;

          const allValue = processTrades(
            account?.historyData,
            allDate,
            endTime,
            account.accountStartBalance,
            1
          );

          data.profitPercentage += allValue[0].profitTrades;
          data.lossPercentage += allValue[0].negativeTrades;
        }

      let totalTrades = data.lossPercentage + data.profitPercentage;
      data.lossPercentage = Math.abs((data.lossPercentage / totalTrades) * 100);
      data.profitPercentage = Math.abs(
        (data.profitPercentage / totalTrades) * 100
      );

      setHalfDoughnutData(data);
    }
  }, [mtAccounts]);

  const [trades, setTrades] = useState([]);
  const [doughnutData, setDoughnutData] = useState({
    data: [],
    labels: [],
    colors: [
      "#3d74a8",
      "#6ca834",
      "#a89a34",
      "#de6259",
      "#797fdb",
      "#b779db",
      "#db79bc",
    ],
  });

  useEffect(() => {
    if (mtAccounts?.length > 0) {
      let data = [];
      let pairsData = [];
      for (let account of mtAccounts)
        if (account?.historyData?.length > 0) {
          data = [...account.historyData, ...data];

          let endTime = moment();
          let allDate = account.historyData[0]?.closeTime;

          const allValue = processTrades(
            account?.historyData,
            allDate,
            endTime,
            account.accountStartBalance,
            1,
            true
          );

          const pairs = allValue[0].pairs;
          pairsData = [...pairs, ...pairsData];
        }

      pairsData = mergeAndSortPairs(pairsData);
      let p = { data: [], labels: [], colors: doughnutData.colors };
      for (let pair of pairsData) {
        if (p.data.length < 6) {
          p.data.push(pair.totalTrades);
          p.labels.push(pair.pair);
        }
      }

      setDoughnutData(p);
      data.sort((a, b) => new Date(b.closeTime) - new Date(a.closeTime));
      setTrades(data);
    }
  }, [mtAccounts]);

  return {
    lineData,
    lineDataType,
    lineDataPeriod,
    setLineDataPeriod,
    setLineDataType,
    lineDataPeriodOption,
    lineBarData,
    lineBarAccount,
    setLineBarAccount,
    lineBarDataPeriod,
    setLineBarDataPeriod,
    lineBarDataValues,
    halfDoughnutData,
    trades,
    doughnutData,
  };
}
