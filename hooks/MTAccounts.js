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

  const profitPerTime = (getProfit = true, wh) => {
    let r = {};

    data.forEach((v) => {
      const day = new Date(v.closeTime).getDate();
      const month = new Date(v.closeTime).getMonth();
      const year = new Date(v.closeTime).getFullYear();

      const profit = Number(v.profit);

      if (v.comment === wh || !wh)
        if ((getProfit && profit >= 0) || (!getProfit && profit < 0)) {
          if (r[year] !== undefined) {
            r[year].profit = Number(r[year].profit) + Number(profit);

            if (r[year][month] !== undefined) {
              r[year][month].profit =
                Number(r[year][month].profit) + Number(profit);

              if (r[year][month][day] !== undefined) {
                r[year][month][day].profit =
                  Number(r[year][month][day].profit) + Number(profit);
              } else r[year][month][day] = { profit };
            } else {
              r[year][month] = { profit };
              r[year][month][day] = { profit };
            }
          } else {
            r[year] = { profit };
            r[year][month] = { profit };
            r[year][month][day] = { profit };
          }
        }
    });
    return r;
  };

  const profitPerTimeWebhook = (whs) => {
    let r = {};

    whs.forEach((v) => {
      const profit = profitPerTime(true, v);
      const loss = profitPerTime(false, v);
      r[v] = { profit, loss, total: profit + loss };
    });

    return r;
  };

  return {
    totalProfit,
    profitPerPair,
    profitPerWebhook,
    profitPerTime,
    profitPerTimeWebhook,
  };
};

const weekDay = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const monthNamesI = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function Last7Days() {
  var result = [];
  for (var i = 0; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    result.push(d);
  }

  return result;
}

export function lastWeek() {
  const l7d = Last7Days();
  const r = [];
  l7d.forEach((v) => {
    const dow = new Date(v).getDay();
    r.push(weekDay[dow]);
  });

  return r.reverse();
}

export function getDataPerAccountLastWeek(account) {
  const l7d = Last7Days();
  const loss = profitPerTime(account?.data, false);
  const profit = profitPerTime(account?.data, true);

  // console.log(profit, loss);

  const r = { profit: [], loss: [], total: [] };
  l7d.forEach((v, i) => {
    const year = new Date(v).getFullYear();
    const month = new Date(v).getMonth();
    const day = new Date(v).getDate();

    if (loss[year] && loss[year][month] && loss[year][month][day]) {
      r.loss.push(loss[year][month][day]?.profit);
    } else r.loss.push(0);

    if (profit[year] && profit[year][month] && profit[year][month][day]) {
      r.profit.push(profit[year][month][day]?.profit);
    } else r.profit.push(0);

    const t = r.profit[r.profit.length - 1] + r.loss[r.loss.length - 1];
    r.total.push(t);
  });

  r.loss.reverse();
  r.profit.reverse();
  r.total.reverse();

  return r;
}

export function getDataPerAccountMonths(account) {
  const year = new Date().getFullYear();
  const loss = profitPerTime(account?.data, false);
  const profit = profitPerTime(account?.data, true);

  const r = { profit: [], loss: [], total: [] };
  monthNames.forEach((v, i) => {
    if (loss[year] !== undefined) {
      if (loss[year][i] !== undefined) {
        r.loss[v] = loss[year][i].profit;
      } else r.loss[v] = 0;
    } else r.loss[v] = 0;

    if (profit[year] !== undefined) {
      if (profit[year][i] !== undefined) {
        r.profit[v] = profit[year][i].profit;
      } else r.profit[v] = 0;
    } else r.profit[v] = 0;

    const t = r.profit[v] + r.loss[v];
    r.total[v] = t;
  });

  r.loss.reverse();
  r.profit.reverse();
  r.total.reverse();

  return r;
}

const profitPerTime = (data, getProfit = true, wh) => {
  let r = {};

  data?.forEach((v) => {
    const day = new Date(v.closeTime).getDate();
    const month = new Date(v.closeTime).getMonth();
    const year = new Date(v.closeTime).getFullYear();

    const profit = Number(v.profit);

    if (v.id === wh || !wh)
      if ((getProfit && profit >= 0) || (!getProfit && profit < 0)) {
        if (r[year] !== undefined) {
          r[year].profit = Number(r[year].profit) + Number(profit);

          if (r[year][month] !== undefined) {
            r[year][month].profit =
              Number(r[year][month].profit) + Number(profit);

            if (r[year][month][day] !== undefined) {
              r[year][month][day].profit =
                Number(r[year][month][day].profit) + Number(profit);
            } else r[year][month][day] = { profit };
          } else {
            r[year][month] = { profit };
            r[year][month][day] = { profit };
          }
        } else {
          r[year] = { profit };
          r[year][month] = { profit };
          r[year][month][day] = { profit };
        }
      }
  });
  return r;
};
