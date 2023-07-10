import { useState, useEffect, useContext, createContext } from "react";
import {
  listenToNewMTAccounts,
  deleteMTAccount,
  updateDisplayName,
  getMTAccountsByUserId,
  updateColor,
} from "../db/mtAccounts";
import moment from "moment";

export function GetMTAccounts() {
  const [mtAccounts, setMTAccounts] = useState([]);
  const [mt5Accounts, setMT5Accounts] = useState([]);
  const [mt4Accounts, setMT4Accounts] = useState([]);

  async function getAllMTAccounts(userId) {
    if (!userId) return;
    listenToNewMTAccounts(userId, (acc) => {
      setMTAccounts(filterData(userId, acc));
    });
  }

  useEffect(() => {
    if (mtAccounts.length > 0) {
      const mt5s = mtAccounts.filter((v) => v.type === "MT5");
      const mt4s = mtAccounts.filter((v) => v.type === "MT4");
      setMT4Accounts(mt4s);
      setMT5Accounts(mt5s);
    }
  }, [mtAccounts]);

  async function getAllMTAccountsWithoutListen(userId) {
    if (!userId) return;
    const all = await getMTAccountsByUserId(userId);

    const mt5s = all.filter((v) => v.type === "MT5");

    setMTAccounts(filterData(userId, mt5s));
  }

  function getData(accId = null, withWebHook = null, type = "MT4") {
    let data = [];

    const accounts = type === "MT4" ? mt4Accounts : mt5Accounts;
    accounts.forEach(function (v, i) {
      if (accId === null || accId === v.id) {
        if (v.data?.length > 0) {
          if (!withWebHook) {
            if (v.type === type)
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
            if (v.type === type)
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
    mtAccounts,
    mt5Accounts,
    mt4Accounts,
    setMTAccounts,
    setMT4Accounts,
    setMT5Accounts,
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

export function EditMTAccountColor(userId, accountId, defautColor) {
  const [mtcolor, setMtcolor] = useState(defautColor || "");

  async function editMTColor() {
    if (!userId || !accountId) return;
    const r = await updateColor(userId, accountId, mtcolor);
    return r;
  }

  return { mtcolor, setMtcolor, editMTColor };
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
        let p = Number(v?.profit) + Number(v?.commission) + Number(v?.swap);
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

const profitPerTime = (data, getProfit = true, wh, getAll = false) => {
  let r = {};

  data?.forEach((v) => {
    const stime = v.closeTimeGMT ? v.closeTimeGMT : v.closeTime;
    const time = moment(stime, "YYYY.MM.DD HH:mm:ss");
    const day = new Date(new Date(time).toLocaleDateString()).getDate();
    const month = new Date(new Date(time).toLocaleDateString()).getMonth();
    const year = new Date(new Date(time).toLocaleDateString()).getFullYear();

    let profit = Number(v.profit);
    if (v.swap) profit += Number(v.swap);
    if (v.commission) profit += Number(v.commission);

    if (v.ID === wh || !wh)
      if ((getProfit && profit >= 0) || (!getProfit && profit < 0) || getAll) {
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

        if (
          getAll &&
          r[year] !== undefined &&
          r[year][month] !== undefined &&
          r[year][month][day] !== undefined
        ) {
          if (r[year][month][day].trades === undefined)
            r[year][month][day] = { ...r[year][month][day], trades: [v] };
          else
            r[year][month][day] = {
              ...r[year][month][day],
              trades: [...r[year][month][day].trades, v],
            };
        }
      }
  });

  return r;
};

export function totalProfitPerTime(data, withWebHook) {
  const total = profitPerTime(data, false, withWebHook, true);

  // console.log(total);
  return total;
}

export function getDataFromAccountPerPeriod(
  account,
  period = [],
  withWebHook = null,
  addPerc = false
) {
  const loss = profitPerTime(account?.data, false, withWebHook);
  const profit = profitPerTime(account?.data, true, withWebHook);

  // console.log("period", period, profit, loss);

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
    let lv = new Date();
    if (i === il) {
      // console.log("pv", v);
    } else lv = i === il ? new Date(v).setDate(v.getDate() + 1) : period[i + 1];
    const range = getDates(v, lv);
    // if (i === 0) console.log("range", range, v, lv);

    range.forEach((d, j) => {
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

      const t = r.profit[v] + r.loss[v];
      // if (i === 0) console.log(year, month, day, t, profit, loss);
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
  var currentDate = moment(startDate, "YYYY.MM.DD HH:mm:ss");
  var stopDate = moment(stopDate, "YYYY.MM.DD HH:mm:ss");
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
  // console.log("moment", startTime, dates);

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
    // console.log(fdate);
    for (let i = 0; i < l; i++) {
      let d = fdate;
      d.setDate(fdate.getDate() - (i + 1));
      // console.log("----", d);
      ar[d] = 0;
    }
    r = { ...ar, ...r };
  }

  return r;
}

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
