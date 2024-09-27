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
  limit,
  addDoc,
  getDoc,
  writeBatch,
  updateDoc,
  deleteDoc,
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

    // const checkData = await checkHistoryData(docRef.id);
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

// Recursively delete documents in batches
async function deleteCollectionBatch(collectionRef, batchSize) {
  const q = query(collectionRef, limit(batchSize));
  const querySnapshot = await getDocs(q);
  const batch = writeBatch(db);

  querySnapshot.docs.forEach((doc) => {
    batch.delete(doc.ref);
  });

  await batch.commit();
  if (querySnapshot.size >= batchSize) {
    // Continue deleting if there are more documents to delete
    return deleteCollectionBatch(collectionRef, batchSize);
  }
}

export async function deleteMTAccount(userId, accountId, accountApiId) {
  const docRef = doc(db, collName, accountId);
  const collectionRef = collection(docRef, "historyData");

  try {
    // Start the recursive deletion of the trades collection
    await deleteCollectionBatch(collectionRef, 500);
    await deleteDoc(docRef);

    let r = await deleteMTAPIaccount(accountApiId);

    return r;
  } catch (e) {
    console.log(e);
    return { error: "An error occured!" };
  }
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

  const lastUpdated = account.lastTradeOpenTime
    ? account.lastTradeOpenTime.seconds * 1000
    : null;

  let loop = true;
  let count = 0;
  let rh = [];

  while (loop) {
    // let res = await getHistoryOrders(account.accountApiId, lastUpdated, count);
    let res = await getHistoryOrders(account.accountApiId, null, count);
    if (res?.length > 0) {
      rh = [...rh, ...res];
    }

    if (res.length >= 1000) count += 1000;
    else loop = false;
  }

  if (rh.length > 0) {
    let accountStartBalance = null;
    let stBalance = rh.find((item) => item.type === "DEAL_TYPE_BALANCE");
    if (stBalance) accountStartBalance = stBalance.profit;

    let allData = mergeMTData(rh, stBalance);

    let data = account?.lastTradeCloseTime
      ? allData.filter(
          (d) =>
            new Date(d.closeTime) > account?.lastTradeCloseTime?.seconds * 1000
        )
      : allData;

    const lastTradeTime = new Date(
      Math.max(
        ...data.map((trade) => {
          return new Date(trade.openTime);
        })
      )
    );

    const lastTradeCloseTime = new Date(
      Math.max(
        ...data.map((trade) => {
          return new Date(trade.closeTime);
        })
      )
    );

    console.log(data, allData);

    if (data.length > 0) {
      const newData = {
        lastTradeOpenTime: lastTradeTime,
        lastTradeCloseTime,
      };
      if (accountStartBalance)
        newData.accountStartBalance = accountStartBalance;

      await updateDoc(accDoc, newData);
      await addHistoryDataBatch(accountId, data);

      const r = await retrieveAccountWithHistory(accountId);
      return r;
    }
  }

  return null;
}

function mergeMTData(data, startBalance) {
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

        if (existingItem.type === "DEAL_TYPE_BUY") currentItem["type"] = "buy";
        else if (existingItem.type === "DEAL_TYPE_SELL")
          currentItem.type = "sell";

        renameKey(currentItem, "time", "closeTime");
        renameKey(currentItem, "brokerTime", "closeBrokerTime");
        renameKey(currentItem, "volume", "lot");
        renameKey(currentItem, "price", "close");
        renameKey(currentItem, "orderId", "orderTicket");

        currentItem["open"] = existingItem["price"];
        currentItem["openTime"] = existingItem["time"];
        currentItem["openBrokerTime"] = existingItem["brokerTime"];

        if (startBalance)
          currentItem["profitPercent"] =
            (Number(currentItem["profit"]) / Number(startBalance)) * 100;

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
