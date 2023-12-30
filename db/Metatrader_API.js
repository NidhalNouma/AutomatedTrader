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

// import MetaApi from "metaapi.cloud-sdk";

const token = process.env.NEXT_PUBLIC_META_API_TOKEN;
// const api = new MetaApi(token);

const collName = "mtapi";
const app = initializeApp(firebaseConfig);
const db = getFirestore();

const apiURL = "https://mt-provisioning-api-v1.agiliumtrade.agiliumtrade.ai";
const apiDataURL = "https://mt-client-api-v1.new-york.agiliumtrade.ai";

export async function addMTAccount(
  userId,
  accountName,
  accountNumber,
  accountPassword,
  accountServer,
  accountType
) {
  console.log("Adding new MT API account ...");

  const transactionId = generateRandomString(32);

  try {
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
        magic: 0,
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
    console.error("Error : ", e);
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
    console.error("Error : ", e);
    return { error: e };
  }
}

export async function getHistoryOrders(accountApiId) {
  console.log("Get history trades ... ", accountApiId);

  const currentDate = new Date();
  const endTime = currentDate.toISOString();

  const startTime = new Date(
    currentDate.setFullYear(currentDate.getFullYear() - 30)
  ).toISOString();

  try {
    const req = await axios.get(
      apiDataURL +
        "/users/current/accounts/" +
        accountApiId +
        "/history-deals/time/" +
        startTime +
        "/" +
        endTime,
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
    console.error("Error : ", e);
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
    console.error("Error : ", e);
    return { error: e };
  }
}

export async function openTrade(accountApiId, id, actionType, symbol, volume) {
  console.log("Open a trade ... ", accountApiId);

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
        volume: volume,
        clientId: id,
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
    console.error("Error : ", e);
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
    if (all || trade.clientId?.search(tradeId) > 0)
      if (trade.symbol === symbol) {
        if (trade.type == positionType) {
          // console.log("Close a trade", trade);
          if (partialClose > 0) {
            partialClose = (trade.volume * partialClose) / 100;
            // console.log(partialClose);
            partialClose =
              Math.round((partialClose + Number.EPSILON) * 100) / 100;
            // console.log(partialClose);
          }
          if (moveToBE) {
            const r1 = await modifyTPandSLprice(
              accountApiId,
              trade.id,
              trade.openPrice,
              0
            );
            if (r1.orderId) {
              res.push({
                orderId: r1.positionId,
                msg: "Stop loss move to break even successfully",
              });
            } else {
              res.push({
                orderId: r1.positionId,
                error: r1.message,
                msg: "Error moving SL to breakeven",
              });
            }
          }
          const r = await closeTrade(accountApiId, trade.id, partialClose);
          // console.log(r);
          if (r.orderId) {
            res.push({
              orderId: r.orderId,
              msg: "Order closed successfully",
            });
          } else {
            res.push({
              orderId: trade.id,
              error: r.message,
              msg: "Error closing the order",
            });
          }
        }
      }
  }

  return res;
}

export async function modifyTradeByWHID(
  accountApiId,
  tradeId,
  symbol,
  actionType,
  SL,
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
          const r = await modifyTrade(accountApiId, trade.id, SL);
          // console.log(r);
          if (r.positionId) {
            res.push({
              orderId: r.positionId,
              msg: "Order modified successfully",
            });
          } else {
            res.push({
              orderId: trade.id,
              error: r.message,
              msg: "Error with updating the stop loss",
            });
          }
        }
      }
  }

  return res;
}

export async function closeTrade(accountApiId, tradeId, partialClose = 0) {
  console.log("Close a trade ... ", accountApiId, " ", tradeId);

  let data = {
    actionType: "POSITION_CLOSE_ID",
    positionId: tradeId,
  };

  if (partialClose > 0)
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
    console.error("Error : ", e);
    return { error: e };
  }
}

export async function modifyTrade(accountApiId, tradeId, SL) {
  console.log(
    "Modify a trade ... ",
    accountApiId,
    " ",
    tradeId,
    " new-sl ",
    SL
  );

  let data = {
    actionType: "POSITION_MODIFY",
    positionId: tradeId,
    stopLoss: Number(SL),
    stopLossUnits: "RELATIVE_PIPS",
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
    console.error("Error : ", e);
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
    console.error("Error : ", e);
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
