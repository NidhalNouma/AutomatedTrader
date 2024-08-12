import { db } from "./firebase.js";
import {
  doc,
  collection,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDocs,
  setDoc,
  addDoc,
  getDoc,
  writeBatch,
  updateDoc,
  arrayUnion,
  arrayRemove,
  onSnapshot,
} from "firebase/firestore";
import { getRandomHexColor } from "../utils/functions.js";
import { getHistoryOrders, deleteMTAPIaccount } from "./third/metaapi.js";

const collName = "metatrader";

export async function addMTAccount(
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
      color: getRandomHexColor(),
      created_at: serverTimestamp(),
    });
    console.log("Document written with: ", docRef.id);

    const checkData = await checkHistoryData(docRef.id);
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
    let account = { id, ...wh };

    return account;
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
  if (whs.length === 0) return [];
  else {
    let account = whs[0];

    const historyCollection = collection(
      db,
      collName,
      account.id,
      "historyData"
    );
    const historySnapshot = await getDocs(historyCollection);

    let historyData = [];
    historySnapshot.forEach((doc) => {
      historyData = historyData.concat(doc.data().data);
    });

    return { ...account, historyData };
  }
}

export async function retrieveAccountWithHistory(accountId) {
  if (!accountId) return null;

  const accDoc = doc(db, collName, accountId);
  const accRef = await getDoc(accDoc);
  const account = accRef.data();

  if (!account) {
    console.error(`No account found with ID: ${accountId}`);
    return null;
  }

  // const q = collection(db, collName, accountId, "historyData");
  const q = query(
    collection(db, collName, accountId, "historyData"),
    orderBy("closeTime", "asc")
  );
  const historySnapshot = await getDocs(q);

  let historyData = [];
  historySnapshot.forEach((doc) => {
    historyData = historyData.concat(doc.data());
  });

  return { id: accRef.id, ...account, historyData };
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

export async function getUserAccountsWithHistory(userId) {
  const accounts = await getMTAccountsByUserId(userId);
  const accountsWithHistoryPromises = accounts.map(async (account) => {
    const accountWithHistory = await retrieveAccountWithHistory(account.id);
    return accountWithHistory;
  });

  const accountsWithHistory = await Promise.all(accountsWithHistoryPromises);
  return accountsWithHistory;
}

export async function deleteMTAccount(userId, accountId, accountApiId) {
  const docRef = doc(db, collName, accountId);

  const d = await deleteDoc(docRef);
  await deleteMTAPIaccount(accountApiId);

  const r = getUserAccountsWithHistory(userId);
  return r;
}

export async function updateColor(userId, id, color) {
  console.log("Update MT color ... ", id);
  const msgDoc = doc(db, collName, id);

  await updateDoc(msgDoc, {
    color,
  });

  const r = getUserAccountsWithHistory(userId);
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

  const r = getUserAccountsWithHistory(userId);
  return r;
}

export async function addHistoryDataBatch(accountId, newHistoryData) {
  if (!accountId || !newHistoryData || !newHistoryData.length) return;

  const batch = writeBatch(db);
  const historyCollection = collection(db, collName, accountId, "historyData");

  newHistoryData.forEach((data) => {
    // Assuming each data item has a unique id property for the custom ID
    const customId = data.orderTicket;
    if (customId) {
      const newDocRef = doc(historyCollection, customId);
      batch.set(newDocRef, data);
    }
  });

  try {
    await batch.commit();
    console.log("History data added successfully using batch with custom IDs.");
  } catch (error) {
    console.error(
      "Error adding history data using batch with custom IDs: ",
      error
    );
  }
}

export async function checkHistoryData(accountId) {
  if (!accountId) return accountId;

  const accDoc = doc(db, collName, accountId);
  const accRef = await getDoc(accDoc);
  const account = accRef.data();

  if (!account) {
    console.error(`No account found with ID: ${accountId}`);
    return;
  }

  console.log("Checking MT history data", accountId);

  const lastUpdated = account.lastUpdated
    ? account.lastUpdated.seconds * 1000
    : null;

  let loop = true;
  let count = 0;
  let rh = [];

  while (loop) {
    let res = await getHistoryOrders(account.accountApiId, lastUpdated, count);
    // if (res?.length > 0) rh = [...rh, ...res];
    if (res?.length > 0) {
      rh = [...rh, ...res];
    }

    if (res.length >= 1000) count += 1000;
    else loop = false;
  }

  if (rh.length > 0) {
    let data = mergeMTData(rh);

    let accountStartBalance = null;
    let stBalance = rh.find((item) => item.type === "DEAL_TYPE_BALANCE");
    if (stBalance) accountStartBalance = stBalance.profit;

    const lastTradeTime = new Date(
      Math.max(
        ...data.map(
          (trade) => new Date(trade.time ? trade.time : trade.closeTime)
        )
      )
    );

    // console.log(lastTradeTime, rh, data, accountStartBalance);

    if (lastTradeTime && data.length > 0) {
      const newData = {
        lastUpdated: lastTradeTime,
      };
      if (accountStartBalance)
        newData.accountStartBalance = accountStartBalance;

      await updateDoc(accDoc, newData);
      await addHistoryDataBatch(accountId, data);
    }
  }

  const r = await retrieveAccountWithHistory(accountId);
  return r;
}

function mergeMTData(data) {
  const mergedData = data?.reduce((accumulator, currentItem) => {
    if (currentItem.entryType === "DEAL_ENTRY_OUT") {
      const existingItem = data.find(
        (item) =>
          item.positionId === currentItem.positionId &&
          item.entryType === "DEAL_ENTRY_IN"
      );

      if (existingItem) {
        // delete existingItem["id"];
        // delete currentItem["swap"];
        // delete currentItem["commission"];
        // delete currentItem["profit"];

        if (existingItem.type === "DEAL_TYPE_BUY") currentItem["type"] = "0";
        else if (existingItem.type === "DEAL_TYPE_SELL") currentItem.type = "1";

        renameKey(currentItem, "time", "closeTime");
        renameKey(currentItem, "brokerTime", "closeBrokerTime");
        renameKey(currentItem, "volume", "lot");
        renameKey(currentItem, "price", "close");
        renameKey(currentItem, "orderId", "orderTicket");

        currentItem["open"] = existingItem["price"];
        currentItem["openTime"] = existingItem["time"];
        currentItem["openBrokerTime"] = existingItem["brokerTime"];

        accumulator.push(currentItem);
      }
    }
    return accumulator;
  }, []);

  //   console.log(mergedData);
  return mergedData;
}
function renameKey(obj, oldKey, newKey) {
  if (obj.hasOwnProperty(oldKey)) {
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
  }
}
