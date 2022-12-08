import { useState, useEffect, useContext, createContext } from "react";
import {
  listenToNewMTAccounts,
  deleteMTAccount,
  updateDisplayName,
} from "../db/mtAccounts";
import moment from "moment";

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

    data.sort(function (a, b) {
      // Turn your strings into dates, and then subtract them
      // to get a value that is either negative, positive, or zero.
      return new Date(a.closeTime) - new Date(b.closeTime);
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

export function EditMTAccountDisplayName(userId, accountId, defaultName) {
  const [mtname, setMtname] = useState(defaultName || "");

  async function editMTDisplayName() {
    if (!userId || !accountId) return;
    const r = await updateDisplayName(userId, accountId, mtname);
    return r;
  }

  return { mtname, setMtname, editMTDisplayName };
}

export const MTAccountsC = createContext(null);

export const MTAccountsCC = ({ children, value }) => {
  return <MTAccountsC.Provider value={value}>{children}</MTAccountsC.Provider>;
};

export const GetMTAccountsContext = () => useContext(MTAccountsC);

// --- DATA CALCULATION

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
      if (r[v.id] !== undefined) r[v.id] = Number(r[v.id]) + Number(v.profit);
      else r[v.id] = Number(v.profit);
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
    profitPerTimeWebhook,
  };
};

// const weekDay = [
//   "Sunday",
//   "Monday",
//   "Tuesday",
//   "Wednesday",
//   "Thursday",
//   "Friday",
//   "Saturday",
// ];

// export const monthNames = [
//   "January",
//   "February",
//   "March",
//   "April",
//   "May",
//   "June",
//   "July",
//   "August",
//   "September",
//   "October",
//   "November",
//   "December",
// ];

// export const monthNamesI = [
//   "Jan",
//   "Feb",
//   "Mar",
//   "Apr",
//   "May",
//   "Jun",
//   "Jul",
//   "Aug",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dec",
// ];

// function Last7Days() {
//   var result = [];
//   for (var i = 0; i < 7; i++) {
//     var d = new Date();
//     d.setDate(d.getDate() - i);
//     result.push(d);
//   }

//   return result;
// }

// export function lastWeek() {
//   const l7d = Last7Days();
//   const r = [];
//   l7d.forEach((v) => {
//     const dow = new Date(v).getDay();
//     r.push(weekDay[dow]);
//   });

//   return r.reverse();
// }

const profitPerTime = (data, getProfit = true, wh) => {
  let r = {};

  data?.forEach((v) => {
    const day = new Date(v.closeTime).getDate();
    const month = new Date(v.closeTime).getMonth();
    const year = new Date(v.closeTime).getFullYear();

    const profit = Number(v.profit);

    if (v.ID === wh || !wh)
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

export function getDataFromAccountPerPeriod(
  account,
  period = [],
  withWebHook = null
) {
  const loss = profitPerTime(account?.data, false, withWebHook);
  const profit = profitPerTime(account?.data, true, withWebHook);

  // console.log("period", period);

  const r = {
    profit: [],
    loss: [],
    total: [],
    pPerc: [],
    lPerc: [],
    tPerc: [],
  };

  const il = period.length - 1;
  period.forEach((v, i) => {
    if (i === il) return;
    const lv = i === il ? new Date(v).setDate(v.getDate() + 1) : period[i + 1];
    const range = getDates(v, lv);

    // console.log("range", range);

    range.forEach((d, i) => {
      const day = new Date(d).getDate();
      const month = new Date(d).getMonth();
      const year = new Date(d).getFullYear();

      if (loss[year] !== undefined) {
        if (loss[year][month] !== undefined) {
          if (loss[year][month][day] !== undefined) {
            if (r.loss[v]) r.loss[v] += loss[year][month][day].profit;
            else r.loss[v] = loss[year][month][day].profit;
          }
        }
      }

      if (profit[year] !== undefined) {
        if (profit[year][month] !== undefined) {
          if (profit[year][month][day] !== undefined) {
            if (r.profit[v]) r.profit[v] += profit[year][month][day].profit;
            else r.profit[v] = profit[year][month][day].profit;
          }
        }
      }

      if (!r.loss[v]) r.loss[v] = 0;
      if (!r.profit[v]) r.profit[v] = 0;

      // console.log(year, month, day, r);

      const t = r.profit[v] + r.loss[v];
      r.total[v] = t;
    });
  });

  const sb = account.accountStartBalance;
  let tp = 0,
    pp = 0,
    lp = 0;
  if (sb > 0)
    Object.keys(r.total).forEach((v, i) => {
      const t = r.total[v];
      const p = r.profit[v];
      const l = r.loss[v];

      if (t === 0) {
        r.tPerc[v] = 0;
        r.pPerc[v] = 0;
        r.lPerc[v] = 0;
      } else {
        tp += (t / sb) * 100;
        pp += (p / sb) * 100;
        lp += (l / sb) * 100;

        r.tPerc[v] = tp;
        r.pPerc[v] = pp;
        r.lPerc[v] = lp;
      }

      // console.log(v);
    });
  // console.log(r);

  return r;
}

function getDates(startDate, stopDate) {
  var dateArray = [];
  var currentDate = moment(startDate);
  var stopDate = moment(stopDate);
  while (currentDate < stopDate) {
    dateArray.push(moment(currentDate).format("YYYY-MM-DD"));
    currentDate = moment(currentDate).add(1, "days");
  }
  return dateArray;
}

export function getLastWeek() {
  var date = new Date();
  var tempDate = new Date();
  tempDate.setDate(date.getDate() + 1);
  var dates = [tempDate];

  for (var i = 0; i < 7; i += 1) {
    var tempDate = new Date();
    tempDate.setDate(date.getDate() - i);
    dates.push(tempDate);
  }

  dates.reverse();
  return dates;
}

export function getLastMonth() {
  var dates = [];
  var date = new Date();

  for (var i = 0; i < 30; i += 2) {
    var tempDate = new Date();
    tempDate.setDate(date.getDate() - i);
    dates.push(tempDate);
  }

  dates.reverse();
  return dates;
}

export function getLastYear() {
  var dates = [];
  var date = new Date();

  for (var i = 0; i < 365; i += 12) {
    var tempDate = new Date();
    tempDate.setDate(date.getDate() - i);
    dates.push(tempDate);
  }

  dates.reverse();
  return dates;
}

export function getFullYearMonths() {
  var dates = [];

  for (var i = 0; i <= 12; i += 1) {
    var tempDate = new Date();
    tempDate.setMonth(i);
    tempDate.setDate(1);
    dates.push(tempDate);
  }

  // dates.reverse();
  return dates;
}

export function getFullMonthsDays() {
  var dates = [];

  for (var i = 0; i <= 30; i += 1) {
    var tempDate = new Date();
    tempDate.setDate(i);
    dates.push(tempDate);
  }

  // dates.reverse();
  return dates;
}

export function getFullWeekDays() {
  var dates = [];
  const curr = new Date();

  for (var i = 0; i <= 7; i += 1) {
    var tempDate = new Date();
    tempDate.setDate(curr.getDate() - curr.getDay() + i);
    dates.push(tempDate);
  }

  // dates.reverse();
  return dates;
}
