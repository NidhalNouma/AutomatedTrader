import { useState, useEffect, useContext, createContext } from "react";
import {
  listenToNewMTAccounts,
  deleteMTAccount,
  updateDisplayName,
  getMTAccountsByUserId,
} from "../db/mtAccounts";
import moment from "moment";

export function GetMTAccounts() {
  const [mtAccounts, setMTAccounts] = useState([]);

  async function getAllMTAccounts(userId) {
    if (!userId) return;
    listenToNewMTAccounts(userId, setMTAccounts);
  }

  async function getAllMTAccountsWithoutListen(userId) {
    if (!userId) return;
    const all = await getMTAccountsByUserId(userId);
    setMTAccounts(all);
  }

  function getData(withWebHook = null) {
    let data = [];
    mtAccounts.forEach(function (v, i) {
      console.log(v);
      if (v.data?.length > 0 && !withWebHook) data.push(...v.data);
      else if (v.data?.length > 0 && withWebHook) {
        v.data.forEach((v) => {
          if (v.Id == withWebHook) data.push(v);
        });
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
    mtAccounts,
    setMTAccounts,
    getAllMTAccounts,
    getAllMTAccountsWithoutListen,
    getData,
  };
}

export function getDataByWebhook(mtAccounts, withWebHook = null) {
  let data = [];
  mtAccounts.forEach(function (v, i) {
    console.log(v);
    if (v.data?.length > 0) data.push(...v.data);
  });

  if (withWebHook) data = data.filter((v) => v.ID === withWebHook);

  data.sort(function (a, b) {
    return new Date(a.closeTime) - new Date(b.closeTime);
  });

  console.log(data);

  return data;
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

export const CalculateData = (data, withWebHook = null) => {
  const totalProfit = () => {
    let r = { profit: 0, loss: 0, total: 0, profitCnt: 0, lossCnt: 0 };
    data.forEach((v) => {
      if (!withWebHook || v.withWebHook === v.ID) {
        let p = Number(v?.profit);
        r.total += p;
        if (p >= 0) {
          r.profit += p;
          r.profitCnt += 1;
        } else {
          r.loss += p;
          r.lossCnt += 1;
        }
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
    const day = new Date(v.closeTimeGMT).getDate();
    const month = new Date(v.closeTimeGMT).getMonth();
    const year = new Date(v.closeTimeGMT).getFullYear();

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
  withWebHook = null,
  addPerc = false
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
        const mult = 100;
        if (addPerc) {
          tp += (t / sb) * mult;
          pp += (p / sb) * mult;
          lp += (l / sb) * mult;
        } else {
          tp = (t / sb) * mult;
          pp = (p / sb) * mult;
          lp = (l / sb) * mult;
        }

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

export function getDaysFromTimeTillNow(startTime, sep = 1) {
  let dates = [];
  let endTime = new Date();
  endTime.setDate(new Date().getDate() + 1);

  const days = Math.floor(
    (endTime - new Date(startTime)) / (1000 * 60 * 60 * 24)
  );

  for (let i = 0; i < days + sep; i += sep) {
    let tempDate = new Date(startTime);
    tempDate.setDate(tempDate.getDate() + i);
    dates.push(tempDate);
  }

  // dates.reverse();
  return dates;
}

export function cleanData(data, numData, cleanTop0 = false) {
  const values = Object.values(data);
  const keys = Object.keys(data);

  if (cleanTop0)
    while (values[values.length - 1] === 0) {
      keys.pop();
      values.pop();
    }

  const length = values.length;

  // for (let i = 0; i < length; i++) {
  //   if (values[i] == 0) {
  //     values.slice(i, 1);
  //     keys.slice(i, 1);
  //   }
  // }

  // length = values.length;

  let r = [];

  let sep = Math.round(length / numData) + 1;
  if (length < numData) {
    sep = 1;
  }

  for (let i = 0; i <= length + sep; i += sep) {
    for (let j = i; j < i + sep; j++) {
      if (values[j] !== undefined) {
        if (r[keys[i]] === undefined) r[keys[i]] = values[j];
        else r[keys[i]] += values[j];
      }
    }
  }

  const minData = 4;
  const l = minData - Object.values(r).length;
  if (l > 0) {
    const ar = [];
    const fdate = new Date(Object.keys(r)[0]);
    console.log(fdate);
    for (let i = 0; i < l; i++) {
      let d = fdate;
      d.setDate(fdate.getDate() - (i + 1));
      console.log("----", d);
      ar[d] = 0;
    }
    r = { ...ar, ...r };
  }

  return r;
}
