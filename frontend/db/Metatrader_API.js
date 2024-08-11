import { initializeApp } from "firebase/app";
import {
  getFirestore,
  doc,
  collection,
  query,
  where,
  serverTimestamp,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";

import { firebaseConfig } from "../utils/constant";
import axios from "axios";

const token = process.env.NEXT_PUBLIC_META_API_TOKEN;

const collName = "mtapi";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const apiURL = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";
const apiDataURL = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

async function getMTProfileByServerName(serverName, version) {
  console.log("Checking MT profiles for server ...", serverName);
  const v = version == "mt4" ? 4 : 5;
  try {
    const req = await axios.get(
      apiURL + "/users/current/provisioning-profiles?version=" + v,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    // console.log(req.data);
    if (req.data.error) {
      if (req.data.id) {
        console.log(req.data);
      }
      return { error: req.data.message };
    } else {
      let r = { valid: true, id: "" };
      if (req.data?.length > 0) {
        const data = req.data;
        for (let i = 0; i < data.length; i++) {
          const name = data[i].name;
          if (serverName.search(name) >= 0) r.id = data[i]._id;
        }
        // console.log(r, data);
      }
      return r;
    }
  } catch (e) {
    console.error("Error getting mt profiles: ", e);
    return { error: e };
  }
}

export async function addMTAccount(
  userId,
  accountName,
  accountNumber,
  accountPassword,
  accountServer,
  accountType,
  profileId = ""
) {
  console.log("Adding new MT API account ...");

  const transactionId = generateRandomString(32);

  try {
    if (profileId === "") {
      const pr = await getMTProfileByServerName(accountServer, accountType);
      if (pr.valid && pr.id) profileId = pr.id;
      console.log("profileId: ", profileId);
    }
    const req = await axios.post(
      apiURL + "/users/current/accounts",
      {
        login: accountNumber,
        password: accountPassword,
        name: accountName,
        server: accountServer,
        platform: accountType,
        region: "new-york",
        manualTrades: true,
        metastatsApiEnabled: true,
        magic: 0,
        provisioningProfileId: profileId,
      },
      {
        headers: {
          "auth-token": token,
          "transaction-id": transactionId,
        },
      }
    );
    // console.log(req);
    if (req.data.error) {
      if (req.data.id) {
        console.log(req.data);
      }
      return { error: req.data.message };
    } else {
      const r = await addMTAccountToFB(
        userId,
        req.data.id,
        accountName,
        accountServer,
        accountNumber,
        accountPassword,
        accountType
      );

      return r;
    }
  } catch (e) {
    console.error("Error adding account: ", e);
    return { error: e };
  }
}

export async function deleteMTAPIaccount(accountApiId) {
  console.log("delete account API ... ", accountApiId);

  try {
    const req = await axios.delete(
      apiURL + "/users/current/accounts/" + accountApiId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function getAccountInformation(accountApiId) {
  console.log("Get account information ... ", accountApiId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/account-information",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function getSymbolInformation(accountApiId, symbol) {
  console.log("Get symbol information ... ", accountApiId), symbol;

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/symbols/" +
        symbol +
        "/specification",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function getSymbolPrice(accountApiId, symbol) {
  console.log("Get symbol price ... ", accountApiId), symbol;

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/symbols/" +
        symbol +
        "/current-price",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function getHistoryOrders(accountApiId, startTime, offset = 0) {
  console.log("Get history trades ... ", accountApiId, startTime);

  const currentDate = new Date();
  const endTime = new Date(
    currentDate.setDate(currentDate.getDate() + 2)
  ).toISOString();

  if (!startTime)
    startTime = new Date(
      currentDate.setFullYear(currentDate.getFullYear() - 30)
    ).toISOString();
  else startTime = new Date(startTime).toISOString();

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/time/" +
        startTime +
        "/" +
        endTime +
        "?limit=1000&offset=" +
        offset,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      // console.log(startTime, endTime, req.data);
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function getActiveOrders(accountApiId) {
  console.log("Get Active trades ... ", accountApiId);

  try {
    const req = await axios.get(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/positions",
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code, e.response?.data?.message);
    return { error: e };
  }
}

export async function getHistoryOrderById(accountApiId, orderId) {
  console.log("Get History Order by OrderId ... ", accountApiId, orderId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/ticket/" +
        orderId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function getOrdernById(accountApiId, orderId) {
  console.log("Get order by orderId ... ", accountApiId, orderId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/orders/" +
        orderId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e.message };
  }
}

export async function getPositionById(accountApiId, positionId) {
  console.log("Get Position by PositionId ... ", accountApiId, positionId);

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/positions/" +
        positionId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e.message };
  }
}

export async function getHistoryPositionById(accountApiId, positionId) {
  console.log(
    "Get History position by positionId ... ",
    accountApiId,
    positionId
  );

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/position/" +
        positionId,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function openTrade(
  accountApiId,
  id,
  actionType,
  symbol,
  volume,
  sl,
  tp,
  slPrice,
  tpPrice,
  volumePercentage
) {
  console.log("Open a trade ... ", accountApiId);

  let slData = {};
  let tpData = {};

  // const symInfoReq = getSymbolInformation(accountApiId, symbol);
  // const [symInfo] = await Promise.all([symInfoReq]);

  if (slPrice)
    slData = { stopLossUnits: "ABSOLUTE_PRICE", stopLoss: Number(slPrice) };
  else if (sl) {
    slData = { stopLossUnits: "RELATIVE_PIPS", stopLoss: Number(sl) };
  }
  if (tpPrice)
    tpData = { takeProfitUnits: "ABSOLUTE_PRICE", takeProfit: Number(tpPrice) };
  else if (tp)
    tpData = {
      takeProfitUnits: "RELATIVE_PIPS",
      takeProfit: Number(tp),
    };

  if (volumePercentage) {
    const accInfoReq = getAccountInformation(accountApiId);
    const symPriceReq = getSymbolPrice(accountApiId, symbol);
    const symInfoReq = getSymbolInformation(accountApiId, symbol);

    const [accInfo, symPrice, symInfo] = await Promise.all([
      accInfoReq,
      symPriceReq,
      symInfoReq,
    ]);

    // console.log(accInfo.data, symPriceReq.data, symInfo.data);

    if (!slPrice && !sl) {
      return { error: "Can't use a volume percentage without a stop loss." };
    }

    if (accInfo.data) {
      const risk = (accInfo.data.balance * volume) / 100;
      console.log(risk, volume);
      if (symPrice.data) {
        const bid = symPrice.data.bid;
        const ask = symPrice.data.ask;

        if (symInfo.data) {
          console.log("##DEBUG--- start calculating positions");

          if (!symInfo.data)
            return { error: "Cannot retrieve symbol information" };
          const pipSize = symInfo.data.pipSize;

          const tickSize = symInfo.data.tickSize;
          // if actionType === 1/3/5 means SELL
          // if actionType === 0/2/4 means BUY
          let action = actionType % 2 ? bid : ask;
          let pips = slData.stopLoss;

          if (slPrice && !sl) pips = Math.abs(slPrice - action) / pipSize;
          slData.stopLoss = pips;
          let pipTicks = pipSize / tickSize;
          volume = risk / pips / (pipTicks * symPrice.data.lossTickValue);
          //console.log("Pips in tick", pips, pipTicks * pips );

          let str = String(symInfo.data.volumeStep);
          // console.log(str);
          let index = str.split(".")[1].length;

          if (symInfo.data.priceCalculationMode === "SYMBOL_CALC_MODE_CFD") {
            volume = volume / symInfo.data.contractSize;
          }
          volume = Number(volume.toFixed(index)); //METAAPI aprox y.xx, to consider only the first 2 digits after coma

          if (volume < symInfo.data.minVolume) volume = symInfo.data.minVolume;
          else if (volume > symInfo.data.maxVolume)
            volume = symInfo.data.maxVolume;
          //console.log(volume, pips);
        }
      }
    }
  }

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      {
        actionType:
          actionType == 0
            ? "ORDER_TYPE_BUY"
            : actionType == 1
            ? "ORDER_TYPE_SELL"
            : "",
        symbol: symbol,
        volume: Number(volume),
        clientId: id,
        ...slData,
        ...tpData,
      },
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function closeTradeByWHID(
  accountApiId,
  tradeId,
  symbol,
  actionType,
  partialClose = 0,
  all,
  moveToBE
) {
  console.log("Close a trade by webhook ID ... ", accountApiId, " ", tradeId);
  const res = [];

  const listOfTrades = await getActiveOrders(accountApiId);
  const positionType =
    actionType == 0
      ? "POSITION_TYPE_BUY"
      : actionType == 1
      ? "POSITION_TYPE_SELL"
      : "";

  for (let i = 0; i < listOfTrades.length; i++) {
    const trade = listOfTrades[i];
    console.log(
      "Close trade by webhook ID",
      trade.clientId,
      trade.volume,
      " | ",
      tradeId
    );
    if (all || trade.clientId?.search(tradeId) > 0)
      if (trade.symbol === symbol) {
        if (trade.type == positionType) {
          // console.log("Close a trade", trade);
          let pClose = trade.volume;
          if (partialClose > 0 && partialClose < 100) {
            pClose = (trade.volume * partialClose) / 100;
            // console.log(partialClose);
            pClose = Math.ceil(pClose * 100) / 100;
            // Math.round((partialClose + Number.EPSILON) * 100) / 100;
            // console.log(partialClose);
          }
          if (moveToBE) {
            const r1 = await modifyTPandSLprice(
              accountApiId,
              trade.id,
              trade.openPrice,
              trade.takeProfit
            );
            if (r1.orderId) {
              res.push({
                orderId: r1.positionId,
                trade: trade,
                // positionId: r1.positionId,
                msg: "Stop loss move to break even successfully",
              });
            } else {
              res.push({
                orderId: trade.id,
                error: r1.message,
                trade: trade,
                msg: "Error moving SL to breakeven",
              });
            }
          }
          const r = await closeTrade(
            accountApiId,
            trade.id,
            partialClose,
            pClose
          );
          // console.log(r);
          if (r.orderId) {
            res.push({
              trade: trade,
              orderId: r.orderId,
              msg: "Order closed successfully",
            });
          } else {
            res.push({
              trade: trade,
              orderId: trade.id,
              error: r.message,
              msg: "Error closing the order",
            });
          }
          console.log(res);
        }
      }
  }

  if (res.length === 0)
    res.push({
      error: "No trade availble to close!",
      msg: "No trade availble to close!",
    });

  return res;
}

export async function modifyTradeByWHID(
  accountApiId,
  tradeId,
  symbol,
  actionType,
  SL,
  slPrice,
  all
) {
  console.log("Modify a trade by webhook ID ... ", accountApiId, " ", tradeId);
  const res = [];

  const listOfTrades = await getActiveOrders(accountApiId);
  const positionType =
    actionType == 0
      ? "POSITION_TYPE_BUY"
      : actionType == 1
      ? "POSITION_TYPE_SELL"
      : "";

  for (let i = 0; i < listOfTrades.length; i++) {
    const trade = listOfTrades[i];
    if (all || trade.clientId?.search(tradeId) > 0)
      if (trade.symbol === symbol) {
        if (trade.type == positionType) {
          // console.log("Modify a trade", trade);
          const r = await modifyTrade(
            accountApiId,
            trade.id,
            SL,
            slPrice,
            null,
            trade.takeProfit
          );
          // console.log(r);
          if (r.positionId) {
            res.push({
              positionId: r.positionId,
              orderId: r.positionId,
              msg: "Order modified successfully",
            });
          } else {
            res.push({
              orderId: trade.id,
              positionId: trade.positionId,
              error: r.message,
              msg: "Error with updating the stop loss",
            });
          }
        }
      }
  }

  if (res.length === 0)
    res.push({
      error: "No trade availble to modify!",
      msg: "No trade availble to modify!",
    });

  return res;
}

export async function closeTrade(
  accountApiId,
  tradeId,
  partialClosePercentage = 0,
  partialClose = 0
) {
  console.log("Close a trade ... ", accountApiId, " ", tradeId);

  let data = {
    actionType: "POSITION_CLOSE_ID",
    positionId: tradeId,
  };

  if (partialClosePercentage > 0 && partialClosePercentage < 100)
    data = {
      actionType: "POSITION_PARTIAL",
      positionId: tradeId,
      volume: partialClose,
    };

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      data,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function modifyTrade(
  accountApiId,
  tradeId,
  sl,
  slPrice,
  tp,
  tpPrice
) {
  console.log(
    "Modify a trade ... ",
    accountApiId,
    " ",
    tradeId,
    "  ",
    sl,
    " ",
    slPrice
  );

  let slData = {};
  let tpData = {};

  if (slPrice)
    slData = { stopLossUnits: "ABSOLUTE_PRICE", stopLoss: Number(slPrice) };
  else if (sl)
    slData = { stopLossUnits: "RELATIVE_PIPS", stopLoss: Number(sl) };

  if (tpPrice)
    tpData = { takeProfitUnits: "ABSOLUTE_PRICE", takeProfit: Number(tpPrice) };
  else if (tp)
    tpData = { takeProfitUnits: "RELATIVE_PIPS", takeProfit: Number(tp) };

  let data = {
    actionType: "POSITION_MODIFY",
    positionId: tradeId,
    ...slData,
    ...tpData,
  };

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      data,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      // console.log(req.data);
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}

export async function modifyTPandSLprice(
  accountApiId,
  tradeId,
  SLprice,
  TPprice
) {
  console.log(
    "Modify a trade ... ",
    accountApiId,
    " ",
    tradeId,
    " new-sl ",
    SLprice
  );

  let data = {
    actionType: "POSITION_MODIFY",
    positionId: tradeId,
    stopLoss: Number(SLprice),
    takeProfit: Number(TPprice),
    stopLossUnits: "ABSOLUTE_PRICE",
  };

  try {
    const req = await axios.post(
      apiDataURL + "/users/current/accounts/" + accountApiId + "/trade",
      data,
      {
        headers: {
          "auth-token": token,
        },
      }
    );
    if (req.data.error) {
      return { error: req.data.message };
    } else {
      return req.data;
    }
  } catch (e) {
    console.error("Error : ", e.code);
    return { error: e };
  }
}
// ------------------

export async function listenToNewMTAccounts(userId, func) {
  const q = query(collection(db, collName), where("userId", "==", userId));
  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const whs = [];
    querySnapshot.forEach((doc) => {
      whs.push({ id: doc.id, ...doc.data() });
    });
    console.log("Current MT accounts: ", whs);
    const sortedAsc = whs.sort(
      (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
    );

    func(sortedAsc);
  });

  return unsubscribe;
}

export async function addMTAccountToFB(
  userId,
  accountApiId,
  accountName,
  accountServer,
  accountNumber,
  accountPassword,

  type
) {
  console.log("Adding new MT API account to FB ...");

  try {
    const docRef = await addDoc(collection(db, collName), {
      userId,
      accountApiId,
      accountName,
      accountDisplayName: accountName,
      accountServer,
      accountNumber,
      accountPassword,

      type,
      lastUpdated: "",
      data: [],
      color: getRandomColor(),
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef.id);
    return { id: docRef.id, exist: false };
  } catch (e) {
    console.error("Error adding document: ", e);
    return { error: e };
  }
}

export async function getMTAccount(id) {
  const docRef = doc(db, collName, id);
  const docSnap = await getDoc(docRef);

  console.log("Getting MT account from FB...", id);

  if (docSnap.exists()) {
    const wh = docSnap.data();
    return { id, ...wh };
  } else {
    console.log("No such document!");
    return null;
  }
}

export async function getMTAccountByAccount(
  userId,
  accountName,
  accountServer,
  accountNumber,
  accountPassword
) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId),
    where("accountName", "==", accountName),
    where("accountNumber", "==", accountNumber),
    where("accountServer", "==", accountServer),
    where("accountPassword", "==", accountPassword)
    // orderBy("created_at", "desc")
  );
  console.log("Getting MT accounts by accountData ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });
  if (whs.length === 0) return null;
  else return whs[0];
}

export async function deleteMTAccount(userId, accountId, accountApiId) {
  const docRef = doc(db, collName, accountId);

  const d = await deleteDoc(docRef);
  await deleteMTAPIaccount(accountApiId);

  const r = getMTAccountsByUserId(userId);
  return r;
}

export async function getMTAccountsByUserId(userId) {
  const q = query(
    collection(db, collName),
    where("userId", "==", userId)
    // orderBy("created_at", "desc")
  );
  console.log("Getting MT accounts by userId ...", userId);

  const querySnapshot = await getDocs(q);
  const whs = [];
  querySnapshot.forEach((doc) => {
    //console.log(`${doc.id} => ${doc.data()}`);
    whs.push({ id: doc.id, ...doc.data() });
  });

  const sortedAsc = whs.sort(
    (objA, objB) => Number(objB.created_at) - Number(objA.created_at)
  );
  //   console.log(whs);
  return sortedAsc;
}

export async function updateColor(userId, id, color) {
  console.log("Update MT color ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    color,
  });

  const r = getMTAccountsByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function updateLastHistoryData(
  userId,
  id,
  data,
  accountStartBalance
) {
  console.log("Update MT history ... ", id);
  const msgDoc = doc(db, collName, id);

  let time = "";
  if (data.length > 0) {
    for (let i = 0; i < data.length; i++) {
      const tr = data[i];
      if (time === "" || new Date(tr.openBrokerTime) > new Date(time))
        time = new Date(tr.openBrokerTime);
    }
  }

  const acc = await getMTAccount(id);
  if (acc) {
    if (!accountStartBalance) accountStartBalance = acc.accountStartBalance;

    if (!acc.lastUpdated || new Date(time) > new Date(acc.lastUpdated))
      if (acc.data?.length > 0) {
        data = [...acc.data, ...data];
      }

    console.log("Update MT histoa ... ", accountStartBalance, acc, data.length);

    await updateDoc(msgDoc, {
      lastUpdated: time,
      data,
      accountStartBalance,
    });
  }

  const r = getMTAccount(id);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

export async function updateDisplayName(userId, id, accountDisplayName) {
  console.log("Update MT display name ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    accountDisplayName,
  });

  const r = getMTAccountsByUserId(userId);
  return r;

  // const nwh = await getMTAccount(id);
  // return nwh;
}

function getRandomColor() {
  // var letters = "0123456789ABCDEF";
  // var color = "#";
  // for (var i = 0; i < 6; i++) {
  //   color += letters[Math.floor(Math.random() * 16)];
  // }
  // return color;
  var o = Math.round,
    r = Math.random,
    red = 155,
    green = 170,
    blue = 255;
  return (
    "rgba(" +
    o(r() * red) +
    "," +
    o(r() * green) +
    "," +
    o(r() * blue) +
    "," +
    r().toFixed(1) +
    ")"
  );
}
function generateRandomString(length) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}
